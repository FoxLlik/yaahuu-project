
import { useState, useMemo } from "react";

import ProfileImage from "../ProfileImage";
import MyCard from "../MyCard";

export default function MyPlayer()
{
    const [ playerDeck, setPlayerDeck ] = useState(['', '', '', '', '', '', '', '', '', '', '', '', ''])

    const ready = true

    const selectedCard = e => {
        e.preventDefault();

        e.currentTarget.classList.toggle('-mt-3');
    }

    const displayCards = useMemo(() => {

        let newHand = playerDeck.map((card, idx) => {

            let offset = {"left":`calc(100px + ${(idx) * 32}px`};

            return (
                <MyCard
                    key={"card".concat(idx)}
                    offset={offset}
                    selectCard={(e) => selectedCard(e)}
                    card={playerDeck}
                />
            )
        })

        return newHand
    })

    const displayButton = useMemo(() => {
        return (
            <div className="absolute flex xl:mt-32 xl:left-48 ">
                <button disabled={false} className="draw-button p-4 border" >
                    <span>Тоглъё</span>
                </button>
                <button disabled={false} className="pass-button p-4 border ml-4" >
                    <span>Өнжье</span>
                </button>
            </div>
        )
    })

    return (
        <div className='absolute xl:bottom-12 left-1/4 -translate-x-1/3 flex' >

            <ProfileImage className='w-10 h-10 lg:w-20 lg:h-20' />
            {displayCards}
            {displayButton}

        </div>
    )
}
