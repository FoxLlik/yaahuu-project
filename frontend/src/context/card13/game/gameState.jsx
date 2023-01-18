
import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/auth/authContext";
import GameContext from "context/card13/game/gameContext";
import SocketContext from "context/socket/socketContext";

import {
    JOIN_ROOM,
    LEAVE_ROOM,

    ROOMS_PLAYER_COUNT,

    ROOM_DATA,
    ROOM_STATE,

    TURN_PLAYER,
    ROOM_PLAYER_COUNT,

    ROUND_END,
} from 'utils/socket/card13/actions'

const PLAYER_CONFIG = {
    0: {},
    1: {},
    2: {},
    3: {},
}

const gameStateEnded = "ended"

export default function GameState(
{
    // history,
    children,
    roomName
})
{

    const { manager } = useContext(SocketContext)
    const [ socketSpace ] = useState(manager.socket("/card13"))

    const { user } = useContext(AuthContext)

    // Тоглоомын State - үүд
    const [ rooms, setRooms ] = useState({})
    const check = Date.now() + 10000
    const date = new Date(check)
    const [ time, setTime ] = useState(date)
    const [ winner, setWinner ] = useState(undefined)
    const [ gameState, setGameState ] = useState('open')
    const [ players, setPlayers ] = useState(PLAYER_CONFIG)
    const [ turnPlayerNumber, setTurnPlayerNumber ] = useState(undefined)
    const [ prevGameCards, setPrevGameCards ] = useState({
        cards: [],
        lastPlayerId: undefined,
    })
    const [ gameSettings, setGameSettings ] = useState({
        roadToScore: 30,
        roundEndWaitTime: 10,
        playerTurnWaitTime: 10,
        startWithBotTime: 10,
        botTurnWaitTime: 5,
    })
    const [ currentPlayers, setCurrentPlayers ] = useState([])

    const getPlayer = (playerIdx) => {
        let player = currentPlayers[playerIdx]

        if (player === undefined) {
            player = {}
        }

        return player
    }

    useEffect(() => {
        const me = currentPlayers.find(player => player?._id === user._id)

        if (me)
        {
            const playerNumber = me.playerNumber
            var newPlayers = {...PLAYER_CONFIG}

            if (playerNumber === 0) {
                newPlayers[0] = me
                newPlayers[1] = getPlayer(1)
                newPlayers[2] = getPlayer(2)
                newPlayers[3] = getPlayer(3)

            } else if (playerNumber === 1) {
                newPlayers[0] = me
                newPlayers[1] = getPlayer(2)
                newPlayers[2] = getPlayer(3)
                newPlayers[3] = getPlayer(0)

            } else if (playerNumber === 2) {
                newPlayers[0] = me
                newPlayers[1] = getPlayer(3)
                newPlayers[2] = getPlayer(0)
                newPlayers[3] = getPlayer(1)

            } else if (playerNumber === 3) {
                newPlayers[0] = me
                newPlayers[1] = getPlayer(0)
                newPlayers[2] = getPlayer(1)
                newPlayers[3] = getPlayer(2)

            }
            setPlayers(newPlayers)
        }
    }, [currentPlayers])

    useEffect(() => {
        if (socketSpace)
        {

            /** Өрөөнд болж байгаа тоглолтын мэдээллийг сонсох нь */
            socketSpace.on(ROOM_DATA, (game13) => {
                setGameState(game13.gameState)

                setCurrentPlayers(game13.players)
                setGameSettings(game13.gameSettings)
                setPrevGameCards(game13.prevGameCards)
                setTurnPlayerNumber(game13.turnPlayerNumber)
            })

            /** Нийт өрөөний мэдээллийг сонсох нь */
            socketSpace.on(ROOM_PLAYER_COUNT, (data) => {
                setRooms(data)
            })

            /** Тоглолтын төлөвийг сонсох нь */
            socketSpace.on(ROOM_STATE, ({ state, playersScore }) => {
                setGameState(state)

                if (state === gameStateEnded) {
                    findWinner(playersScore)
                    setCurrentPlayers(prevPlayers => setPlayersScoreWithDeck(prevPlayers, playersScore))

                }
            })

            /** Аль тоглогч гарахыг сонсох нь */
            socketSpace.on(TURN_PLAYER, ({ turnPlayer, time }) => {
                setTurnPlayerNumber(turnPlayer)
                setTime(time)
            })

            /** Round дууссанг сонсох нь */
            socketSpace.on(ROUND_END, (data) => {
                setCurrentPlayers(prevPlayers => setPlayersScoreWithDeck(prevPlayers, data))

            })

        }
    }, [socketSpace])

    /**
     * Тоглогчидын оноог шинэчлэх нь
     * @param {Object} prevPlayers state-ийн өмнөх төлөв
     * @param {Object} data тоглогчидын оноог агуулж байгаа object
     * @returns Players
     */
    function setPlayersScoreWithDeck(prevPlayers, data) {
        let newPlayers = [...prevPlayers]
        newPlayers.map(player => {
            player.score = data[player._id]
            player.deckLength = 13
        })

        return newPlayers
    }

    /**
     * Хожсон тоглогчийн шинэчлэх нь
     * @param {Object} playersScore тоглогчидын оноог агуулж байгаа object
     */
    function findWinner(playersScore) {
        var winner = user._id
        var score = playersScore[user._id]

        Object.keys(playersScore).map(key => {
            let checkScore = playersScore[key]
            if (score > checkScore) {
                winner = key
            }
        })
        setWinner(winner)

    }

    /** Тухайн өрөө рүү холбогдох */
    const joinRoomEmit = (roomName) =>
    {
        socketSpace.emit(JOIN_ROOM, { room: roomName, ...user })
    }

    /** Тухайн өрөөнөөс гарах */
    const leaveRoomEmit = () =>
    {
        socketSpace.emit(LEAVE_ROOM, { room: roomName, ...user })
    }

    /** Өрөөнд доторх тоглогчдын тоо */
    const roomsPlayerCountEmit = () =>
    {
        socketSpace.emit(ROOMS_PLAYER_COUNT)
    }

    return (
        <GameContext.Provider
            value={{
                joinRoomEmit,
                leaveRoomEmit,
                roomsPlayerCountEmit,

                rooms,
                players,
                gameState,
                gameSettings,
                prevGameCards,
                currentPlayers,
                turnPlayerNumber,

                time,
                winner,

                setCurrentPlayers,
                setPrevGameCards,
            }}
        >
            {children}
        </GameContext.Provider>
    )

}
