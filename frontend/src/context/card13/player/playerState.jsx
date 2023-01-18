
import React, { useContext, useEffect, useState } from "react";

import GameContext from "context/card13/game/gameContext";
import PlayerContext from "context/card13/player/playerContext";
import AuthContext from "context/auth/authContext";
import SocketContext from "context/socket/socketContext";

import { addToast } from "hooks/useToast";

import {
    PASS,
    ERROR,
    READY_CHECK,
    PLAYER_HAND,
    SEND_CARD_MOVE,

    CARD_MOVE_INFO,
    ROOM_JOINED_PLAYER,
    ROOM_LEAVE_PLAYER,
} from 'utils/socket/card13/actions'

export default function PlayerState({ children })
{
    const { manager } = useContext(SocketContext)
    const [ socketSpace, setSocketSpace ] = useState(manager.socket("/card13"))

    const { user } = useContext(AuthContext)
    const { setCurrentPlayers, setPrevGameCards } = useContext(GameContext)

    const [deck, setDeck] = useState([])

    useEffect(() => {
        if (socketSpace) {
            /** Өрөөнд орж ирсэн хэрэглэгчийн мэдээллийг сонсох нь */
             socketSpace.on(ROOM_JOINED_PLAYER, (player) => {
                setCurrentPlayers((prevPlayers) => addPlayer(prevPlayers, player))
            })

            /** Өрөөнөөс гарсан тоглогчийг сонсох нь */
            socketSpace.on(ROOM_LEAVE_PLAYER, (_id) => {
                setCurrentPlayers(prevPlayers => removePlayer(prevPlayers, _id))
            })

            /** Гаргасан модыг сонсох нь */
            socketSpace.on(CARD_MOVE_INFO, ({ _id, cards, lastPlayerId }) => {
                setCurrentPlayers(prevPlayers => setPlayerDeck(prevPlayers, _id, cards))

                // Тоглогчийн модыг шинэчлэх нь. Гаргасан модыг тоглогчийн хөзрөөс хасаж байна
                if (user._id === _id) {
                    setDeck(prevDeck => {
                        let newDeck = prevDeck.filter((card) => !cards.includes(card))
                        return newDeck
                    })
                }

                // Газрын мод болон сүүлд гарсан тоглогчийн мэдээллийг солих нь
                setPrevGameCards({
                    cards,
                    lastPlayerId,
                })

            })

            /** Хэрэглэгч тоглоход бэлэн эсэхийг мэдээллийг сонсох нь */
            socketSpace.on(READY_CHECK, ({ _id, isReady }) => {
                setCurrentPlayers(prevPlayers => setReadyCheck(prevPlayers, _id, isReady))
            })

            /** Тоглогчийн хөзрийг тоглогчид оноох нь */
            socketSpace.on(PLAYER_HAND, (deck) => {
                setDeck(deck)
            })

            socketSpace.on(ERROR, (error) => {
                addToast({
                    text: error.message,
                    type: "warning",
                })
            })

        }
    }, [socketSpace])

    /**
     * Шинээр орж байгаа тоглогчийг нэмэх функц
     * @param {Object} prevPlayers state-ийн өмнөх утга
     * @param {Object} player Шинээр нэмэгдэж байгаа тоглогч
     * @returns Players
     */
    function addPlayer(prevPlayers, player) {
        let newPlayers = [...prevPlayers]

        const me = newPlayers.find(currentPlayer => currentPlayer._id === player._id)
        if (!me) {
            newPlayers.push(player)
        }

        return newPlayers
    }

    /**
     * Өрөөнөөс гарсан тоглогчийг хасах функц
     * @param {Object} prevPlayers state-ийн өмнөх утга
     * @param {String} _id өрөөнөөс гарсан тоглогчийн _id
     * @returns Players
     */
    function removePlayer(prevPlayers, _id) {
        let newPlayers = []
        let numberIdx = 0
        for (let i = 0; i < prevPlayers.length; i++) {
            let player = prevPlayers[i]
            if (player._id !== _id) {
                player.playerNumber = numberIdx
                newPlayers.push(player)

                numberIdx++
            }
        }

        return newPlayers
    }

    /**
     * Тоглогчидын бэлэн эсэхийг солих функц
     * @param {Object} prevPlayers state-ийн өмнөх утга
     * @param {String} _id Бэлэн эсэхээ илтгэж байгаа тоглогчийн _id
     * @param {Boolean} isReady Бэлэн эсэх
     * @returns Players
     */
    function setReadyCheck(prevPlayers, _id, isReady) {
        let newPlayers = [...prevPlayers]

        newPlayers.map(player => {
            if (player._id === _id) {
                player.readyCheck = isReady
            }
        })

        return newPlayers
    }

    /**
     * Тоглогч гарсаны дараа тоглогчийн хөзрийн тоог өөрчлөх функц
     * @param {Object} prevPlayers state-ийн өмнөх утга
     * @param {String} _id Гарсан тоглогчийн _id
     * @param {Array} cards Гарсан тоглогчийн хөзөр
     * @returns Players
     */
    function setPlayerDeck(prevPlayers, _id, cards) {
        let newPlayers = [...prevPlayers]

        newPlayers.map((player, idx) => {
            if (player?._id === _id) {
                prevPlayers[idx].deckLength = player.deckLength - cards.length
            }
        })

        return newPlayers
    }

    /**
     * Тоглогч болон эсэхийг илгээх socket
     * @param {Boolean} isReady Бэлэн эсэх
     */
    const readyCheckEmit = (isReady) => {
        socketSpace.emit(READY_CHECK, { isReady, ...user })
    }

    /**
     * Гаргасан хөзрийг илгээх socket
     * @param {Array} removeCards Гаргасан хөзөр
     */
    const sendCardMoveEmit = (removeCards) => {
        socketSpace.emit(SEND_CARD_MOVE, { removeCards: removeCards })
    }

    /**
     * Pass хийж байгааг илгээх socket
     */
    const passEmit = () => {
        socketSpace.emit(PASS)
    }

    return (
        <PlayerContext.Provider
            value={{
                deck,

                passEmit,
                readyCheckEmit,
                sendCardMoveEmit,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )

}
