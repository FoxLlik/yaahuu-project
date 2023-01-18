
export default function MyCard({ offset, selectCard, card })
{
    return (
        <div
            style={offset}
            className='absolute xl:w-[60px] xl:h-[80px] mt-0 cursor-pointer transition '
            onClick={selectCard}
        >
            <div
                className="w-full h-full rounded bg-[url('images/card13/rectangle-36.png')] bg-[length:100%_100%] bg-no-repeat "
            ></div>
        </div>
    )
}
