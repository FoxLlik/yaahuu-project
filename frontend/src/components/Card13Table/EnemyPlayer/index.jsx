
import ProfileImage from "../ProfileImage";
import EnemyCard from "../EnemyCard";

export default function EnemyPlayer({ playerId })
{

    let mainClasses

    switch (playerId)
    {
        /** Дээд талын тоглогч */
        case 1:
            mainClasses = '-top-3 left-1/4 -translate-x-1/3 flex'
            break;

        /** Зүүн талын тоглогч */
        case 2:
            mainClasses = 'top-[43%] -translate-y-[50%] -left-3 flex'
            break;

        /** Баруун талын тоглогч */
        case 3:
            mainClasses = 'top-[43%] -translate-y-[50%] -right-3'
            break;
    }

    return (
        <>
            <div className={`absolute ${mainClasses}`}>

                <ProfileImage className='w-16 h-16 lg:w-20 lg:h-20 md:-mt-1' />

                <EnemyCard cardCount={13} playerId={playerId} />

            </div>
        </>
    )
}
