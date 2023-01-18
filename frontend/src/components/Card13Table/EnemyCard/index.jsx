
export default function EnemyCard({ cardCount, playerId })
{

    let mainClasses
    let cards = []

    for (let idx=0; idx < cardCount; idx++)
    {

        let offset

        switch (playerId)
        {
            /** Дээд талын тоглогч */
            case 1:

                offset = { "left":`calc(100px + ${(idx) * 30}px)` }

                cards.push(
                    <div
                        className={`absolute md:w-[42px] md:h-[56px] xl:w-[60px] xl:h-[80px] xl:-mt-2`}
                        style={offset}
                        key={"card ".concat(playerId).concat(idx)}
                    >
                        <div
                            className="w-full h-full rounded bg-[url('images/card13/rectangle-36.png')] bg-[length:100%_100%] bg-no-repeat "
                            key={'back '}
                        >
                        </div>
                    </div>
                )

                break;

            /** Зүүн талын тоглогч */
            case 2:

                if (idx >= 7)
                {
                    offset = { "top":`calc(0px + ${(idx-7) * 30}px)`, 'right':`146px` }
                }
                else
                {
                    offset = { "top":`calc(0px + ${(idx) * 30}px)`, 'right':`86px` }
                }

                cards.push(
                    <div
                        className={`absolute md:w-[42px] md:h-[56px] xl:w-[60px] xl:h-[80px]`}
                        style={offset}
                        key={"card ".concat(playerId).concat(idx)}
                    >
                        <div
                            className="w-full h-full rounded bg-[url('images/card13/rectangle-36.png')] bg-[length:100%_100%] bg-no-repeat "
                            key={'back '}
                        >
                        </div>
                    </div>
                )

                break;

            /** Баруун талын тоглогч */
            case 3:

                if (idx >= 7)
                {
                    offset = { "top":`calc(0px + ${(idx-7) * 30}px)`, 'left':`146px` }
                }
                else
                {
                    offset = { "top":`calc(0px + ${(idx) * 30}px)`, 'left':`86px` }
                }

                cards.push(
                    <div
                        className={`absolute md:w-[42px] md:h-[56px] xl:w-[60px] xl:h-[80px]`}
                        style={offset}
                        key={"card ".concat(playerId).concat(idx)}
                    >
                        <div
                            className="w-full h-full rounded bg-[url('images/card13/rectangle-36.png')] bg-[length:100%_100%] bg-no-repeat "
                            key={'back '}
                        >
                        </div>
                    </div>
                )

                break;
        }

    }


    return (
        <>
            {cards}
        </>
    )
}
