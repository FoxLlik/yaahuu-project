
import ScoreTableImage from 'images/card13/scoreBoard.png'

import Star from './Star'

export default function ScoreTable()
{

    const statusBg = ' bg-[linear-gradient(to_bottom,#5c2316_-8%,#7c3118_-4%,#ab451a_2%,#ad481c_2%,#c66e34_6%,#db8d48_11%,#eba557_15%,#f6b762_20%,#fdc169_25%,#ffc46b_31%)] rounded-lg '

    

    return (
        <div className='w-48 lg:w-56 relative'>

            <img src={ScoreTableImage} alt="ScoreTableImage" className='w-full' />

            <div className='absolute w-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

                <div className={`${statusBg} w-full h-10 mt-2`}>
                    <Star className='h-full' />
                </div>

                <div className={`${statusBg} w-full h-10 mt-2`}>
                    <Star className='h-full' />
                </div>

                <div className={`${statusBg} w-full h-10 mt-2`}>
                    <Star className='h-full' />
                </div>

                <div className={`${statusBg} w-full h-10 mt-2`}>
                    <Star className='h-full' />
                </div>

            </div>

        </div>
    )
}
