// class
const Game13 = require('../gameFile/card13/card13')
const Player = require('../gameFile/card13/player')
const Viewer = require('../gameFile/card13/viewer')
const Bot = require('../gameFile/card13/bot')

// js file
const errorInfo = require('../gameFile/card13/rsp/errors')

// utils
const { nameSpaceRoomsCount } = require('../utils/socket')
const {addUser, removeUser, getUser, getUsersInRoom} = require('../utils/socket/user')

const {
    CONNECT,
    JOIN_ROOM,
    ROOM_PLAYER_COUNT,
    ROOMS_PLAYER_COUNT,
    ROOM_DATA,
    ROOM_JOINED_VIEWER,
    ROOM_JOINED_PLAYER,
    ROOM_LEAVE_PLAYER,
    ROOM_LEAVE_VEAWER,
    READY_CHECK,
    ROOM_STATE,
    PLAYER_HAND,
    TURN_PLAYER,
    SEND_CARD_MOVE,
    CARD_MOVE_INFO,
    PASS,
    LEAVE_ROOM,
    DISCONNECT,
    ROUND_END,

    CHAT_MESSSAGE,
    SEND_INFO_TO_ALL_ROOM,
    ROOM_INFO_FROM_ADMIN,
    ERROR,
} = require('../gameFile/card13/actions')

const players = []

const gameInfos = []

exports.card13 = (adminNameSpace) =>
{
    adminNameSpace.on(CONNECT, (socket) => {
        var currentRoomId
        var currentUserId
        /**
         * Room-д холбогдох
         * @param {object} data тухайн өрөөнд нэвтэрсэн хэрэглэгчийн мэдээлэл
         * @emit нэвтэрсэн хэрэглэгчийн мэдээлэл
         */
        socket.on(JOIN_ROOM, (data) =>
        {
            // new
            const user = addUser({ socketId: socket.id, nickName: data?.nickName, room: data?.room, avatar: data?.avatar, _id: data?._id })
            // Хэрэглэгч үүссэн байна!

            socket.join(user.room)
            currentRoomId = user.room
            currentUserId = user._id

            let game13 = gameInfos[currentRoomId] == undefined ? new Game13 : gameInfos[currentRoomId]

            // Нэвтрэх үед тоглогч байсан тоглоомтой нь reconnect хийх
            if(game13.isPlayer(currentUserId))
            {
                game13.setPlayerSocketId(currentUserId, socket.id)
                gameInfos[currentRoomId] = game13
            }
            else if (game13.getPlayersCount() <= 3 && game13.getGameState() === 'open')
            {
                const player = new Player(
                    currentUserId,
                    user.socketId,
                    user.nickName,
                    0,
                    user.avatar,
                )
                if (game13.getBotCount() > 0)
                {
                    const removedBotIds = game13.removeBot(1)
                    this.autoFunctions.reportRemovedBotInfo(removedBotIds)
                }

                game13.addPlayer(player)
                game13.setWaitingGameStartWithBot()
                adminNameSpace.in(currentRoomId).emit(ROOM_JOINED_PLAYER, player)
            }
            else
            {
                const viewer = new Viewer(
                    currentUserId,
                    user.nickName,
                    user.avatar,
                )
                game13.addViewer(viewer)
                adminNameSpace.in(currentRoomId).emit(ROOM_JOINED_VIEWER, viewer)
            }

            gameInfos[currentRoomId] = game13
            adminNameSpace.in(socket.id).emit(ROOM_DATA, game13.getGame13WithOutDeck())
            adminNameSpace.emit(ROOM_PLAYER_COUNT, nameSpaceRoomsCount(adminNameSpace))

            if(game13.isPlayer(currentUserId))
            {
                const deck = game13.getPlayerDeck(currentUserId)
                adminNameSpace.in(socket.id).emit(PLAYER_HAND, deck)
            }
        })

        /**
         * Ready check тоглогогчид бэлэн байгааг шалшах нь
         */
        socket.on(READY_CHECK, (data) =>
        {
            let game13 = gameInfos[currentRoomId]
            const isReady = data.isReady

            if (!game13)
            {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_005'])
                return
            }

            const player = game13.setReadyCheck(currentUserId, isReady)
            gameInfos[currentRoomId] = game13

            if (player)
            {
                adminNameSpace.in(currentRoomId).emit(READY_CHECK, { _id: player._id, isReady:isReady })
            }

            if (game13.getReadyPlayerCount() === 4 && game13.gameState === 'open')
            {
                // NOTE: Тоглоомыг эхлүүлнэ!
                let deck = game13.shuffle(game13.players)
                let turnPlayer = undefined

                // NOTE: Гарах тоглогчийн _id солих
                game13.setTurnPlayerNumber(deck.state.GameStarter)

                // HELPER: BOT-той тоглогч байх үед хамгийн эхний гараа булаах
                game13.players.map(player =>
                    {
                        if (!player.isBot)
                            game13.setTurnPlayerNumber(player._id)
                    })

                game13.setGameState('started')
                game13.setRoomId(currentRoomId)

                let playerList = game13.players

                game13.setPlayers(playerList)
                gameInfos[currentRoomId] = game13

                adminNameSpace.in(currentRoomId).emit(ROOM_STATE, {state: 'started'})
                playerList.map((player) =>
                {
                    player.deck = deck[player._id]
                    adminNameSpace.in(player.socketId).emit(PLAYER_HAND, deck[player._id])
                })

                turnPlayer = game13.getGameTurnPlayerNumber()
                const time = game13.setTurnPlayerTime(turnPlayer, game13.gameSettings.playerTurnWaitTime)
                game13.setPrevGameCards([], turnPlayer)

                if (time && turnPlayer)
                    adminNameSpace.in(currentRoomId).emit(TURN_PLAYER, { turnPlayer, time })
            }
        })

        /**
         * Room-ээс гарах
         * @emit өрөөнөөс гарсан хэрэглэгчийн ID
         */
        socket.on(LEAVE_ROOM, () =>
        {
            socket.leave(currentRoomId)

            let game13 = gameInfos[currentRoomId]
            if(game13 && game13.gameState === 'open')
            {
                const {user, isPlayer} = game13.removeUser(currentUserId)
                if (user)
                {
                    removeUser(socket.id);
                    gameInfos[currentRoomId] = game13

                    if (isPlayer)
                        adminNameSpace.in(currentRoomId).emit(ROOM_LEAVE_PLAYER, user._id)
                    else
                        adminNameSpace.in(currentRoomId).emit(ROOM_LEAVE_VEAWER, user._id)
                }
                // Өрөө тоглогчгүй болох үед бүх bot устагна
                const playersCount = game13.getPlayersCount()
                if(playersCount > 0)
                {
                    game13.setWaitingGameStartWithBot()
                }
                else
                {
                    const removedBotIds = game13.removeBot(game13.getBotCount())
                    this.autoFunctions.reportRemovedBotInfo(removedBotIds)
                }

                adminNameSpace.emit(ROOM_PLAYER_COUNT, nameSpaceRoomsCount(adminNameSpace))
            }
        })

        /**
         * Тоглогчийн гаргасан хөзрийн хөдөлгөөн
         */
        socket.on(SEND_CARD_MOVE, (data) =>
        {
            let _id = currentUserId
            let removeCards = data.removeCards
            let game13 = gameInfos[currentRoomId]

            if (!game13) {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_001'])
                return
            }

            if(!game13.validatePlayerTurn(_id))
            {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_002'])
                return
            }

            if(!game13.validatePlayerHandCards(_id, removeCards))
            {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_003'])
                return
            }

            const { validateMovedCard, validateMovedError } = game13.validatePlayerMovedCard(_id, removeCards)
            if(!validateMovedCard)
            {
                adminNameSpace.in(socket.id).emit(ERROR, validateMovedError)
                return
            }

            this.autoFunctions.sendCardFromPlayer(removeCards, _id)
        });

        /**
         * Тоглолтыг өнжих socket
         * @emit өнжсөн тоглогч
         */
        socket.on(PASS, () =>
        {
            let game13 = gameInfos[currentRoomId]

            if (!game13) {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_001'])
                return
            }

            if(!game13.validatePlayerTurn(currentUserId))
            {
                adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_002'])
                return
            }

            const {game13Info, error} = game13.playerPassAction(currentUserId)

            if (error)
            {
                adminNameSpace.in(socket.id).emit(ERROR, error)
                return
            }

            gameInfos[currentRoomId] = game13Info

            let turnPlayer = game13Info.getGameTurnPlayerNumber()

            const time = game13Info.setTurnPlayerTime(turnPlayer, game13Info.gameSettings.playerTurnWaitTime)

            if (time && turnPlayer)
                adminNameSpace.in(currentRoomId).emit(TURN_PLAYER, { turnPlayer, time })
        })

        /**
         * Socket-оос disconnect хийх
         * @emit өрөөнөөс гарсан хэрэглэгчийн ID
         */
        socket.on(DISCONNECT, () =>
        {
            let game13 = gameInfos[currentRoomId]
            if(game13 && game13.gameState === 'open')
            {
                const {user, isPlayer} = game13.removeUser(currentUserId)
                if (user)
                {
                    removeUser(socket.id);
                    gameInfos[currentRoomId] = game13

                    if (isPlayer)
                        adminNameSpace.in(currentRoomId).emit(ROOM_LEAVE_PLAYER, user._id)
                    else
                        adminNameSpace.in(currentRoomId).emit(ROOM_LEAVE_VEAWER, user._id)
                }
                // Өрөө тоглогчгүй болох үед бүх bot устагна
                const playersCount = game13.getPlayersCount()
                if(playersCount > 0)
                {
                    game13.setWaitingGameStartWithBot()
                }
                else
                {
                    const removedBotIds = game13.removeBot(game13.getBotCount())
                    this.autoFunctions.reportRemovedBotInfo(removedBotIds)
                }
                adminNameSpace.emit(ROOM_PLAYER_COUNT, nameSpaceRoomsCount(adminNameSpace))
            }
        });

        socket.on(CHAT_MESSSAGE, (data) =>
        {
            adminNameSpace.in(currentRoomId).emit(CHAT_MESSSAGE, data.msg);
        });

        /**
         * Тухайн өрөөны мэдэгдлүүдийг явуулах нь
         */
        socket.on(ROOM_INFO_FROM_ADMIN, (data) =>
        {
            adminNameSpace.in(currentRoomId).emit(ROOM_INFO_FROM_ADMIN, data.info)
        })

        /**
         * Бүх өрөөлүү msg явуулах
         */
        socket.on(SEND_INFO_TO_ALL_ROOM, (data) =>
        {
            adminNameSpace.emit(CHAT_MESSSAGE, data.msg)
        });

        /**
         * Нийт өрөөний хэрэглэгчийн тоо
         */
        socket.on(ROOMS_PLAYER_COUNT, () =>
        {
            adminNameSpace.emit(ROOM_PLAYER_COUNT, nameSpaceRoomsCount(adminNameSpace))
        })


        // socket-д ашиглах functions
        exports.autoFunctions =
        {
            /**
             * Хүлээлгийн цаг дуусах үед ашиглах pass function
             */
            passPlayer: function()
            {
                let game13 = gameInfos[currentRoomId]

                if (!game13)
                {
                    adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_005'])
                    return
                }

                let turnPlayer = game13.getGameTurnPlayerNumber()
                const time = game13.setTurnPlayerTime(turnPlayer, game13.gameSettings.playerTurnWaitTime)

                if (time && turnPlayer)
                    adminNameSpace.in(currentRoomId).emit(TURN_PLAYER, { turnPlayer, time })
            },

            /**
             * Хүлээлгийн цаг дуусах үед тоглогчийн хамгийн муу хөзрийг гаргана
             * @param {Array} removeCards       хөзөр
             * @param {String} _id              тоглогчийн Id
             */
            sendCardFromPlayer: function(removeCards, _id)
            {
                let game13 = gameInfos[currentRoomId]

                if (!game13 && socket)
                {
                    adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_005'])
                    return
                }
                removeCards =game13.sortHandCard(removeCards)

                const { newGame13, isNewRound } = game13.setCardMove(_id, removeCards)

                // Тоглолтыг эхлэхэд тоглогч бүрт дахин хөзөр тараана
                if(isNewRound)
                {
                    let playerList = newGame13.players

                    playerList.map((player) =>
                    {
                        adminNameSpace.in(player.socketId).emit(PLAYER_HAND, player.deck)
                    })

                    let {scoreWithTime, roundEndTime} = game13.getPlayersScore()
                    let winner = game13.getWinner()

                    // Тоглоглт дуусахгүй next round эхлэж байх үе
                    if(winner === undefined)
                    {
                        adminNameSpace.in(currentRoomId).emit(ROUND_END, scoreWithTime)
                    }
                    // Тоглолт дууссан нь
                    else
                    {
                        adminNameSpace.in(currentRoomId).emit(ROOM_STATE, { state: 'ended', playersScore: scoreWithTime })
                    }
                }

                gameInfos[currentRoomId] = newGame13

                let turnPlayer = newGame13.getGameTurnPlayerNumber()
                const time = newGame13.setTurnPlayerTime(turnPlayer, newGame13.gameSettings.playerTurnWaitTime)

                adminNameSpace.in(currentRoomId).emit(CARD_MOVE_INFO, { _id, cards: removeCards, lastPlayerId: newGame13.getLastMovedId() })

                if (time && turnPlayer)
                    adminNameSpace.in(currentRoomId).emit(TURN_PLAYER, { turnPlayer, time })

            },

            /**
             * Тоглолт дуусах үед тоглолтын мэдээллийг хадгалан
             */
            endGame: function()
            {
                const game13 =  gameInfos[currentRoomId]

                if (!game13)
                {
                    adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_005'])
                    return
                }

                //TODO: Тоглолтын мэдээллийг base-хадгалах
                let {scoreWithTime: playersScore, roundEndTime: roundEndTime} = game13.getPlayersScore()
                // Тоглолт дууссанг зарлах
                adminNameSpace.in(currentRoomId).emit(ROOM_STATE, { state: 'ended', playersScore })

                // Тоглоглийг дуусгаж өрөөний мэдээллийг шинэчлэх
                this.createNewGame(game13)
            },

            /**
             * Тухайн өрөөнд холбогдсон бүх socket салгах
             */
            disconnectUsers: function()
            {
                adminNameSpace.in(currentRoomId).disconnectSockets();
            },

            /**
             * Тоглоглийг дуусгаж өрөөний мэдээллийг шинэчлэх
             */
            createNewGame: function(game13)
            {
                this.disconnectUsers()
                newGame = game13.resetGame()
                gameInfos[currentRoomId] = undefined
            },

            /**
             * Өрөөний тоглогчийн бэлэн хүлээх төлөвт оруулах
             */
            roomPlayersReadyCheckFalse: function()
            {
                let game13 =  gameInfos[currentRoomId]

                if (!game13)
                {
                    adminNameSpace.in(socket.id).emit(ERROR, errorInfo['CARD_13_ERR_005'])
                    return
                }

                let players = game13.players

                players.map(player =>
                    {
                        game13.setReadyCheck(player._id, false)
                        adminNameSpace.in(currentRoomId).emit(READY_CHECK, { _id: player._id, isReady:false })
                    })

                gameInfos[currentRoomId] = game13
                return game13
            },

            /**
             * Bot нэмэх үед socket-оор мэдээллэх function
             * @param {Array} bots нэмэгдсэн bot-нуудынг агуулсан ist
             */
            reportCreatedBotInfo: function (bots)
            {
                bots.map(bot =>
                    {
                        adminNameSpace.in(currentRoomId).emit(ROOM_JOINED_PLAYER, bot)
                    })
            },

            /**
             * Bot хасагдах үед socket-оор мэдээллэх function
             * @param {Array} bots хасагдсан bot-нуудынг агуулсан list
             */
            reportRemovedBotInfo: function (botsId)
            {
                botsId.map(botId =>
                    {
                        adminNameSpace.in(currentRoomId).emit(ROOM_LEAVE_PLAYER, botId)
                    })
            }
        }
    });

}


