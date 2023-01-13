const Bot = require('./bot')

const HIGH_CARD = require('./cardValidation/highCard')
const PAIRS = require('./cardValidation/pairs')
const THREE_PAIRS = require('./cardValidation/threePairs')
const FIVE_RANKS = require('./cardValidation/fiveRanks')
const gameSocket = require('../../socket/card13')

const errors = require('./rsp/errors')
const botInfo = require('../botInfo')

const { setTimeFromNow, setRandomNumber } = require('./utils/index.js')

// Хөзрийн дүрсний эрэмбийг тогтоох нь
dursRank = {
    "s": 4,         //  S -> ♤ Гил ♤
    "h": 3,         //  H -> ♥ Бунд ♥
    "c": 2,         //  C -> ♧ Цэцэг ♧
    "d": 1,         //  D -> ♢ Дөөшиг ♢
}

tooRank = {
    "2": 13,        // 2 ->
    "a": 12,        // A ->
    "k": 11,        // K ->
    "q": 10,        // Q ->
    "j": 9,         // J ->
    "10": 8,        // 10 ->
    "9": 7,         // 9 ->
    "8": 6,         // 8 ->
    "7": 5,         // 7 ->
    "6": 4,         // 6 ->
    "5": 3,         // 5 ->
    "4": 2,         // 4 ->
    "3": 1,         // 3 ->
}

class Card13 {
    constructor(gameState="open") {
        this.gameState = gameState
        this.players = []
        this.viewers = []
        this.turnPlayerNumber = undefined
        this.prevGameCards = {
            cards: [],
            lastPlayerId: undefined,
        }
        this.round = undefined
        this.winner = undefined
        this.gameSettings = {
            roadToScore: 30,
            roundEndWaitTime: 10,
            playerTurnWaitTime: 10,
            startWithBotTime: 10,
            botTurnWaitTime: 5,
        }
    }
    #waitingTurnPlayer =  undefined
    #waitingGameStartWithBot = undefined
    #roomId = undefined

    /**
     * Сүүлд хөзөр гаргасан тоглогчийн id
     * @returns id
     */
    getLastMovedId()
    {
        return this.prevGameCards.lastPlayerId
    }

    /**
     * тоглогчдын хөзрийг хасах
     * @returns game13
     */
    getGame13WithOutDeck()
    {
        let game13 = JSON.parse(JSON.stringify(this));
        game13.players.map(player =>
            {
                player.deck = []
            })
        return game13
    }

    /**
     * Bot мэдэлэл
     * @returns bot
     */
    getBots()
    {
        return this.players.filter(player =>
            {
                if(player.isBot)
                {
                    return true
                }
                else
                {
                    return false
                }
            })
    }

    /**
     * Өрөөнд байгаа тоглогчийг авах
    * @returns өрөөн дэх тоглогчид
     */
    getPlayers()
    {
        return this.players.filter(player =>
            {
                if(!player.isBot)
                {
                    return true
                }
                else
                {
                    return false
                }
            })
    }

    /**
     * Bot-ний ширхэгийн тоог авах
     */
    getBotCount()
    {
        return this.players.filter(player =>
            {
                if(player.isBot)
                {
                    return true
                }
                else
                {
                    return false
                }
            }).length
    }

    /**
     * Өрөөнд байгаа тоглогчийн тоог авах
    * @returns өрөөн хэдэн ширхэг тоглогч байгааг буцаанаа
     */
    getPlayersCount()
    {
        return this.players.filter(player =>
            {
                if(!player.isBot)
                {
                    return true
                }
                else
                {
                    return false
                }
            }).length
    }

    /**
     * Bot болон тоглогчдын мэдээллийг авах
     * @returns bot + players
     */
    getPlayersWithBot()
    {
        return this.players
    }

    /**
     * Өрөөнд байгаа тоглогчийн тоо дээр bot тоо нэмсэн утга
     * @returns playerCount + botCount
     */
    getPlayersCountWithBot()
    {
        return this.getPlayersCount() + this.getBotCount()
    }

    /**
     * Хүлээлгийн хугацааны мэдээллийг авах
     * @returns хүлээлгийн тоглогчийн id хугацаа
     */
    getWaitingTurnPlayer()
    {
        return this.#waitingTurnPlayer
    }

    /**
     * Өрөөний id
     * @returns room id
     */
    getRoomId()
    {
        return this.#roomId
    }

    /**
     * Тоглогчдыг өрөөд join хийх хүлээлгийн хугацаа
     * @returns тоглолт bot-той эхлэх хүлээлгийн хугацаа
     */
    getWaitingGameStartWithBot()
    {
        return this.#waitingGameStartWithBot
    }

    /**
     * Хожсон тоглогчийн id буцаана
     * @returns _id
     */
    getWinner()
    {
        return this.winner
    }

    /**
     * Тоглолтын төлвийг авах нь
     * @returns game state
     */
    getGameState() {
        return this.gameState
    }

    /**
     * Хөзөр гаргах тоглогчийн id-ийг буцаана
     * @returns тоглогчийн id
     */
    getGameTurnPlayerNumber()
    {
        return this.turnPlayerNumber
    }

    /**
     * Тоглогчийн мэдээллийг авах
     */
    getPlayer(_id)
    {
        const player = this.players.find(player => player._id === _id)
        return player ? player : null
    }

    /**
     * Тоглогчийн гар байгаа хөзрийн list буцаана
     * @param {*} playerId player id
     * @returns deck list
     */
    getPlayerDeck(_id)
    {
        const player = this.players.find(player => player._id === _id)
        return player ? player.deck : null
    }

    getPlayerIsLoss(_id)
    {
        const player = this.players.find(player => player._id === _id)
        return player ? player.isLoss : true
    }

    /**
     * Тоглогчдын онооны  мэдээллийг авах нь
     * @returns тоглогчлын оноо
     */
    getPlayersScore()
    {
        let scoreWithTime = {}
        const roundEndTime = setTimeFromNow(this.roundEndWaitTime)
        this.players.map(player =>
            {
                let score = player.getScore()

                scoreWithTime[player._id] = score
            })

        return {scoreWithTime, roundEndTime}
    }

    /**
     * Бэлэн тоглогчдын тоо
     * @returns number
     */
    getReadyPlayerCount()
    {
        let count = 0
        this.players.map((player) =>
            {
                if(player.isBot)
                    count++
                else if(player.readyCheck)
                {
                    count++
                }
            })
        return count
    }

    // Өрөөнд холбогдсон тоглогчийг нэмэх
    addPlayer(player)
    {
        this.players.push(player)
        this.fixPlayersIndex()
    }

    // Өрөөнд үзэгч нэмэх
    addViewer(viewer)
    {
        this.viewers.push(viewer)
    }

    /**
     * Тоглогчдын дугаарлалыг засах
     */
    fixPlayersIndex()
    {
        let players = this.getPlayers()
        let bots = this.getBots()
        let newPlayerList = []
        let lastIndex = 0
        players.map((player, index) =>
            {
                player.setPlayerNumber(index)
                newPlayerList.push(player)
                lastIndex = index
            })
        bots.map((bot, index) =>
            {
                bot.setPlayerNumber(lastIndex + index + 1)
                newPlayerList.push(bot)
            })

        return newPlayerList
    }

    /**
     * Хэрэглэгч өрөөнөөс хасах
     * @param {String} _id  Хэрэглэгчийн id
     * @returns өрөөнөөс гарсан хэрэглэгчийн мэдээлэл
     */
    removeUser(_id) {
        var user = undefined
        var isPlayer = false

        this.players = this.players.filter((player) =>
            {
                if(player && player._id !== _id)
                {
                    return player
                }
                else
                {
                    user = player
                    isPlayer = true
                }
            })

        if (user === undefined)
        {
            this.viewers = this.viewers.filter((viewer) =>
            {
                if(viewer && viewer._id !== _id)
                    return viewer
                else
                    user = viewer
            })
        }

        // Үлдсэн тоглогчийн playerNumber засах
        this.fixPlayersIndex()
        return {user, isPlayer}
    }

    isBot(_id)
    {
        return this.players.find(player => player._id === _id && player.isBot)
    }

    /**
     * Тухайн id-тай хэрэглэгч тоглогч эсэхийг шалгах нь
     * @param {String} _id хэрэглэгчийн id
     * @returns Хэрэглэгчийн мэдээлэл / null
     */
    isPlayer(_id)
    {
        return this.players.find(player => player._id === _id)
    }

    /**
     * Толгогчийн socket id өөрчлөхөд ашиглана
     * @param {String} _id хэрэлэгчийн id
     * @param {String} socketId socket id
     */
    setPlayerSocketId(_id, socketId)
    {
        this.players.find(player =>
            {
                if(player._id === _id)
                    player.setSocketId(socketId)
            })
    }

    /**
     * Хожсон тоглогчийн id
     * @param {String} _id Хожсон тоглогчийн id
     */
    setWinner(_id)
    {
        this.winner = _id
    }

    setGameState(gameState) {
        this.gameState = gameState
    }

    setPlayers(players) {
        this.players = players
    }

    /**
     * Тоглогчийн хөзрийг оноох нь
     * @param {String} playerId player _id
     * @param {Array} deck deck
     */
    setPlayerHandDeck(playerId, deck)
    {
        let player = this.players.find(player => player._id===playerId)
        player.readyCheck = deck
        return player
    }

    /**
     * set Ready check
     * @param {String} _id Тоглогчийн Id
     */
    setReadyCheck(_id, isReady)
    {
        var changedPlayer = undefined

        this.players.find(player =>
            {
                if(player._id === _id)
                {
                    player.setReadyCheck(isReady)
                    changedPlayer = player
                }
            })

        return changedPlayer
    }

    /**
     * Хүлээлгийн хугацааг тохируулах
     * @param {Object} waitingTurnPlayer
     */
    setWaitingTurnPlayer(waitingTurnPlayer)
    {
        this.#waitingTurnPlayer = waitingTurnPlayer
    }

    /**
     * Өрөөний id хадгалах
     * @param {String} roomId id
     */
    setRoomId(roomId)
    {
        this.#roomId =roomId
    }

    /**
     * Тоглолт bot-той эхлэх хугацааг тохируулах
     * @param {Object} waitingGameStartWithBot
     */
    setWaitingGameStartWithBot()
    {
        if (this.gameState === 'open' && this.getPlayersCountWithBot() < 4)
        {
            const time = this.gameSettings.startWithBotTime
            this.stopWaitingGameStartWithBot()
            const setPlayerTurnTime = setTimeout(() =>
            {
                const botList = this.addBot()
                gameSocket.autoFunctions.reportCreatedBotInfo(botList)
                gameSocket.autoFunctions.roomPlayersReadyCheckFalse()
                this.stopWaitingGameStartWithBot()
            }, time * 1000)

            this.#waitingGameStartWithBot = setPlayerTurnTime
            return setTimeFromNow(time)
        }
        else
        {
            return
        }
    }

    /**
     * Тоглогч үйлдэл хийсэн бол хүлээлгийн хугацааг зогсооно
     */
    stopWaitingTurnPlayer()
    {
        let waitingTurnPlayer = this.#waitingTurnPlayer
        if (waitingTurnPlayer === undefined)
        {
            //NOTO: алдаа буцаах эсэх
            return
        }
        else
        {
            clearTimeout(waitingTurnPlayer)
            this.#waitingTurnPlayer = undefined
        }
    }

    /**
     * Тоглогч өрөөнд join хийсэн эсвэл тоглолт эхлэсэн бол хүлээлгийн хугацааг зогсооно
     */
    stopWaitingGameStartWithBot()
    {
        let waitingGameStartWithBot = this.#waitingGameStartWithBot
        if(waitingGameStartWithBot === undefined)
        {
            return
        }
        else
        {
            clearTimeout(waitingGameStartWithBot)
            this.#waitingGameStartWithBot = undefined
        }
    }

    /**
     * Хөзөр гаргасан тоглогчийг бүртгэх
     * @param {String} _id       Хөзөр гаргасан тоглогчийн id
     * @param {Array} cards     Гаргасан хөзөрүүд
     * @returns тоглолтын мэдээлэл game13 class
     */
    setCardMove(_id, cards)
    {
        let players = this.players
        let isNewRound = false
        let turnPlayerIdx
        let playerDeckLength = undefined

        this.stopWaitingTurnPlayer()

        for (let i = 0; i < players.length; i++) {
            if (players[i]._id === _id) {
                playerDeckLength = players[i].removeCardFromDeck(cards)
                turnPlayerIdx = i
            }
        }

        if (playerDeckLength > 0 && !this.getPlayerIsLoss(_id))
        {
            this.setPlayers(players)

            if(cards.length > 0)
            {
                this.setPrevGameCards(cards, _id)
            }
            let NextturnPlayerIdx = this.findNextPlayerIndex(turnPlayerIdx)
            let turnPlayerNumber = players[NextturnPlayerIdx]._id

            this.setTurnPlayerNumber(turnPlayerNumber)
        }
        //Дараагийн round эхлүүлэх нь
        else if (playerDeckLength === 0 && !this.getPlayerIsLoss(_id))
        {
            isNewRound = true
            this.calculatePlayersScore()
            this.setPrevGameCards([], _id)
            this.setTurnPlayerNumber(_id)

            const { isEnd, winner } = this.checkGameIsEnd()

            // Тоглолт дуусах үед ялагчийг хадгалах
            if ( isEnd && winner )
            {
                this.setWinner(winner)
                gameSocket.autoFunctions.endGame()
            }
            else
            {
                this.addRoundCount()
                let deck = this.shuffle(this.players)

                this.players.map((player) =>
                    {
                        if(!player.isLoss)
                            player.setDeck(deck[player._id])
                        else
                        {
                            player.setDeckLengthFromDeck()
                            player.setDeck([])
                        }
                    })
            }
        }

        return { newGame13: this, isNewRound: isNewRound }
    }

    /**
     * Тоглолт дууссан эсэхийг шалгах нь
     * @returns тоглолт дууссан эсэх
     */
    checkGameIsEnd()
    {
        let isEnd = false
        let winner = undefined

        const count = this.players.filter(player =>
            {
                if(!player.isLoss)
                {
                    winner = player._id
                    return true
                }
                else
                {
                    return false
                }
            }).length

        if (count === 1)
            isEnd = true

        return  {isEnd, winner}
    }

    /**
     * Дараагийн хожигдоогүй гарах хүнийг олох нь
     * @param {Number} lastPlayerIndex Сүүлийн гарсан тоглогчийн index
     * @returns {Number} nextPlayerInx гарах тоглогчийн index
     */
    findNextPlayerIndex(lastPlayerIndex)
    {
        let players = this.players
        let i = 0
        let nextPlayerIndex = lastPlayerIndex
        let nextPlayerInx = undefined
        while (i < players.length)
        {
            nextPlayerIndex++
            if (nextPlayerIndex > 3)
            {
                nextPlayerIndex = 0
            }
            if(!players[nextPlayerIndex].isLoss)
            {
                nextPlayerInx = nextPlayerIndex
                i = players.length
            }
            else if(nextPlayerIndex === lastPlayerIndex)
            {
                nextPlayerInx = lastPlayerIndex
                i = players.length
            }
            i++
        }
        return nextPlayerInx
    }

    /**
     * round тоо нэмэх
     */
    addRoundCount()
    {
        this.round = this.round + 1
    }

    /**
     * Тоглоглтийн оноог тооцох
     */
    calculatePlayersScore()
    {
        this.players = this.players.map(player =>
            {
                if (!player.isLoss)
                {
                    let newScore = player.calculateScore()
                    let score = player.addScore(newScore)
                    if (score >= this.gameSettings.roadToScore)
                    {
                        player.setLoss()
                    }
                }
                return player
            })
    }

    /**
     * Өрөөн дэх бүх тоглогчдыг not ready болгох
     */
    setAllPlayerNotReady()
    {
        this.players = this.players.map((player) => player.readyCheck = false)
    }

    /**
     * гарах тоглогчийн id солих функц
     * @param {string} _id тоглогчийн id
     */
    setTurnPlayerNumber(_id) {
        this.turnPlayerNumber = _id
    }

    setPrevGameCards(cards, _id) {
        this.prevGameCards = {
            cards: cards,
            lastPlayerId: _id,
        }
    }

    createDeck() {
        var durs = Object.keys(dursRank)
        var tooList = Object.keys(tooRank)
        var deck = new Array();

        var count = 0;

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= tooList.length - 1; j++) {
                deck[count++] = durs[i] + tooList[j]
            }
        }

        return deck;
    }

    sortHandCard(deck) {
        let too
        let durs
        for(let i = 0; i < deck.length; i++){
            for(let j = 0; j < deck.length - i - 1; j++){
                durs = deck[j].charAt(0)
                too = deck[j].slice(1)

                let dursNext = deck[j + 1].charAt(0)
                let tooNext = deck[j + 1].slice(1)

                if(tooRank[tooNext] < tooRank[too] || ( tooRank[tooNext] == tooRank[too] && dursRank[dursNext] < dursRank[durs])){
                    [deck[j + 1],deck[j]] = [deck[j],deck[j + 1]]
                }
            }
        }

        return deck
    }

    playerHander(deck, userList) {
        let playerDeck = {}

        for(let user of userList) {
            playerDeck[user._id] = []
        }

        let playerNumber = 0
        let count = 0
        for(let card of deck)
        {
            count++
            // Тоглогтыг эхлэхлүүлэх тоглогч
            if (card=='d3')
            {
                playerDeck[`state`] = {
                    "GameStarter": userList[playerNumber]._id,
                }
            }
            playerDeck[userList[playerNumber]._id].push(card)
            if (count == 13)
            {
                count = 0
                playerDeck[userList[playerNumber]._id] = this.sortHandCard(playerDeck[userList[playerNumber]._id])
                playerNumber++
            }
        }

        return playerDeck
    }

    /**
     * Хөзөр холих нь
     * @param {Array} userList тоглогчдын жагсаалт
     * @returns тоглогчдод тараасан хөзрүүд
     */
    shuffle(userList)
    {
        let deck = this.createDeck()
        let index = deck.length,  randomIndex;
        while (index != 0) {
            randomIndex = Math.floor(Math.random() * index)
            index--
            [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]]
        }

        return this.playerHander(deck, userList);
    }

    /**
     * Тоглогч өнжих
     * @param {String} _id тоглогчийн id
     */
    playerPassAction(_id, fromWait=false)
    {
        let turnPlayerId = this.getLastMovedId()
        // Тоглогч ээлж дээрээ өнжиж болохгүй
        if (turnPlayerId === _id && !fromWait)
        {
            return { game13Info: null, error: errors['CARD_13_ERR_006'] }
        }

        this.stopWaitingTurnPlayer()
        let turnPlayerIdx
        let players = this.players

        for (let i = 0; i < players.length; i++) {
            if (players[i]._id === _id) {
                turnPlayerIdx = i
            }
        }

        if (turnPlayerId !== _id)
        {
            let NextturnPlayerIdx = this.findNextPlayerIndex(turnPlayerIdx)
            let turnPlayerNumber = players[NextturnPlayerIdx]._id

            this.setTurnPlayerNumber(turnPlayerNumber)
        }

        // Хүлээлгийн хугацаа дууссан тохиолдолд
        if(fromWait)
        {
            // Тухайн тоглогч хамгийн сүүл гарсан тоглогч бол хамгийн муу хөзрийг гаргана
            if (turnPlayerId === _id)
            {
                const deck = this.getPlayerDeck(_id)

                if(deck)
                {
                    let cards = []
                    cards.push(deck[0])
                    if(cards.length > 0)
                        gameSocket.autoFunctions.sendCardFromPlayer(cards, _id)
                }
            }
            // Pass
            else
            {
                gameSocket.autoFunctions.passPlayer()
            }
        }

        return { game13Info: this, error: null}
    }


    /**
     * Тухайн тоглогчийн гарааны ээлж эсэхийг шалгах
     * @param {String} playerId Хөзөр гаргасан тоглогчийн id
     * @returns true / false
     */
    validatePlayerTurn(playerId)
    {
        let validate = false
        if(this.getGameTurnPlayerNumber() === playerId)
            validate = true
        return validate
    }

    /**
     * Хөзөр гаргасан тоглогчийн хөзөр тоглогчийн гарт байгаа хөзөр мөн эсэхийг шалгах нь
     * @param {String} playerId тоглогчийн id
     * @return true / false
     */
    validatePlayerHandCards(playerId, removeCards)
    {
        let validatePlayerHandCards
        const deck = this.getPlayerDeck(playerId)

        validatePlayerHandCards = removeCards.every(card =>
            {
                return deck.includes(card)
            })

        return validatePlayerHandCards
    }

    validatePlayerMovedCard(_id, removeCards)
    {
        let validateMovedCard = true
        let validateMovedError = null
        let lastMove = this.prevGameCards.cards
        let lastMovePlayerId = this.getLastMovedId()
        let lastmoveLength = lastMove.length
        let removeCardsLength = removeCards.length

        // Хамгийн сүүлд гарсан тоглогч тойроод бүгд pass хийсэн тохиолдолд гарж болно
        if (_id === lastMovePlayerId && removeCardsLength > 0)
        {
            // TODO хөзрийг шалгах
            return { validateMovedCard, validateMovedError }
        }
        // Хамгийн сүүлд гарсан тоглогч тойрж ирэхэд заавал гарна
        else if  (_id == lastMovePlayerId && removeCardsLength === 0)
        {
            validateMovedCard = false
            validateMovedError = errors['CARD_13_ERR_006']
            return { validateMovedCard, validateMovedError }
        }
        // Хамгийн сүүлд гарсан тоглогч байхгүй бол skip validate
        if (lastmoveLength === 0 || removeCardsLength === 0 )
        {
            return { validateMovedCard, validateMovedError }
        }

        // Хамгийн сүүл гарсан хөзрийн тоо болон тоглогчийн гарсан хөзрийн тоо зөрөөтэй бол дарахгүй гэж үзнэ
        if (lastmoveLength !== removeCardsLength)
        {
            validateMovedCard = false
            validateMovedError = errors['CARD_13_ERR_007']
            return { validateMovedCard, validateMovedError }
        }

        let lastMoveKey = lastMove.join('')
        let removeCardKey = removeCards.join('')
        let lastRank = 0
        let removeCardRank = 0

        if(removeCardsLength === 1)
        {
            lastRank = HIGH_CARD[lastMoveKey]
            removeCardRank = HIGH_CARD[removeCardKey]
        }
        else if (removeCardsLength === 2)
        {
            lastRank = PAIRS[lastMoveKey]
            removeCardRank = PAIRS[removeCardKey]
        }
        else if (removeCardsLength === 3)
        {
            lastRank = THREE_PAIRS[lastMoveKey]
            removeCardRank = THREE_PAIRS[removeCardKey]
        }
        else if (removeCardsLength === 5)
        {
            lastRank = FIVE_RANKS[lastMoveKey]
            removeCardRank = FIVE_RANKS[removeCardKey]
        }
        if(lastRank >= removeCardRank)
        {
            validateMovedCard = false
            validateMovedError = errors['CARD_13_ERR_007']
            return { validateMovedCard, validateMovedError }
        }

        return { validateMovedCard, validateMovedError }
    }

    /**
     * Одоогийн цагаас time секундын дарааа цагийг буцаана
     * @param {Number} time секунд
     * @returns now + time
     */
    setTurnPlayerTime(_id, time)
    {
        const setPlayerTurnTime = setTimeout(() =>
            {
                this.playerPassAction(_id, true)
            }, time * 1000)

        this.setWaitingTurnPlayer(setPlayerTurnTime)

        if(this.isBot(_id))
        {
            setTimeout(() =>
                {
                    this.callBotMove(_id)
                }, setRandomNumber(this.gameSettings.botTurnWaitTime, 0) * 1000)
        }
        return setTimeFromNow(time)
    }

    /**
     * Bot хөзөр гаргах нь
     * @param {*} _id хөзөр гаргах bot id
     */
    callBotMove(_id)
    {
        const lastMovedPlayerId = this.getLastMovedId()
        const lastMOvedCard = this.prevGameCards.cards
        const player = this.getPlayer(_id)

        const movedcards = player.generateBotMove(lastMovedPlayerId, lastMOvedCard)
        if (movedcards.length === 0)
        {
            this.playerPassAction(_id, true)
        }
        else
        {
            gameSocket.autoFunctions.sendCardFromPlayer(movedcards, _id)
        }
    }

    /**
     * Тухайн өрөөний мэдээлллийг reset хийх нь
     */
    resetGame()
    {
        this.gameState = 'open'
        this.players = []
        this.viewers = []
        this.turnPlayerNumber = undefined
        this.prevGameCards = {
            cards: [],
            lastPlayerId: undefined,
        }
        this.round = undefined
        this.winner = undefined
        this.gameSettings = {
            roadToScore: 30,
            roundEndWaitTime: 10,
            playerTurnWaitTime: 10,
            startWithBotTime: 5,
        }

        return this
    }

    /**
     * Өрөөний үлдсэн сул суудал дээр Bot үүсгэх нь
     * @return үүссэн botList
     */
    addBot()
    {
        let createdBotList = []
        let playerCount = this.getPlayersCountWithBot()
        let botList = [...botInfo]
        let oldPlayers = this.getPlayersWithBot()

        for (let i=0; i<4-playerCount; i++)
        {
            var bodyOfBot = botList[Math.floor(Math.random()*botList.length)];
            var index = botList.indexOf(bodyOfBot)
            if(index != 1)
            {
                botList.splice(index, 1)
            }
            const bot = new Bot(
                'bot_' + setRandomNumber(300000000000),
                bodyOfBot?.nickName,
                playerCount + i,
                bodyOfBot?.avatar
                )

            createdBotList.push(bot)
        }
        this.players = oldPlayers.concat(createdBotList)

        return createdBotList
    }

    /**
     * Өгөгдсөн тооний дагуу өрөөнөөс bot хасах
     * @param {Number} removeBotCount хасах bot-ний тоо
     * @return устгасан bot-нуудын id
     */
    removeBot(removeBotCount)
    {
        const botsList = this.getBots()
        const playersList = this.getPlayers()
        let removedBotIds = []
        const newBotList = botsList.slice(removeBotCount)
        this.players = playersList.concat(newBotList)

        botsList.map(bot =>
            {
                if (removeBotCount > 0)
                {
                    removedBotIds.push(bot._id)
                    removeBotCount--
                }
            })

        return removedBotIds
    }
}

module.exports = Card13
