
import useWindowDimensions from 'hooks/useWindowDimensions'

import EnemyPlayer from 'components/Card13Table/EnemyPlayer';
import MyPlayer from 'components/Card13Table/MyPlayer';

import ScoreTable from 'components/Card13Table/ScoreTable';

export default function Table()
{
    /** Дэлгэцийн өргөн */
    const { width } = useWindowDimensions();
    const mobileSize = 1024

    const mainBg = `
        bg-[url("images/card13/table.png")]
        bg-no-repeat
        bg-[length:100%_auto]
        top-32 sm:top-48 lg:top-1/2 -translate-y-1/2
    `

    const boardSize = `w-[320px] h-[162px] sm:w-[600px] sm:h-[314px] md:w-[720px] md:h-[364px] lg:w-[800px] lg:h-[405px] xl:w-[1000px] xl:h-[560px]`

    return (

        width >= mobileSize
        ?
        <div className={`container relative h-[calc(100vh-88px)] w-full`}>

            <div className='absolute mr-0 xl:mr-8 2xl:mr-32 bottom-4 lg:top-0 right-0'>
                <ScoreTable />
            </div>

            <div className={`relative m-auto ${boardSize} ${mainBg} top-1/2 -translate-y-1/2`}>

                <EnemyPlayer playerId={1} />
                <EnemyPlayer playerId={2} />
                <EnemyPlayer playerId={3} />

                <MyPlayer />

            </div>
        </div>
        :
        <p>Та утасны хувилбарыг татна уу</p>
    )
}
