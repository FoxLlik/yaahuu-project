
import ProfileImage from 'components/Card13Table/ProfileImage'

import scoreStar from 'images/card13/scoreStar.png'

export default function Star({ className='', number='' })
{

    var scoreStyle

    scoreStyle = ' bg-[linear-gradient(to_bottom,#898625_0%,#5a5b1c_100%)] '
    // scoreStyle = ' bg-[linear-gradient(to_bottom,#fbed53_0%,#ee8a17_84%)] '

    return (
        <>
            <div className={`${className} flex flex-row`}>

                <div className='basis-1/4 relative'>
                    <img
                    className='mt-1 md:mt-0'
                        src={scoreStar}
                        alt="scoreStar"
                    />
                    <span
                        className='absolute text-[#EE8A17] text-lg top-1/2 left-1/2 -translate-x-2/3 -translate-y-1/2'
                        style={{ textShadow: '0 0 1px #000' }}
                    >1</span>
                </div>

                <div className='basis-1/4'>
                    <ProfileImage className='w-10 h-10' imageSrc='https://scontent.fuln8-1.fna.fbcdn.net/v/t39.30808-6/321389332_1344108043077139_8674718236590057113_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bLCY5EOHGsUAX9m-YQ-&_nc_ht=scontent.fuln8-1.fna&oh=00_AfCDMttCJHA6V7VQZ3HEHef2I3-QyN6zm1CqTNKy1n6FYQ&oe=63C9EB6D' />
                </div>

                <div className='basis-1/2 text-center mt-1'>
                    <span
                        className={`tracking-wider bg-clip-text text-2xl md:text-3xl  ${scoreStyle} font-black`}
                        style={{
                            textShadow: '0 2px 0 rgba(0, 0, 0, 0.25)',
                            WebkitTextStroke: '1px #fff',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >30</span>
                </div>

            </div>
        </>
    )
}
