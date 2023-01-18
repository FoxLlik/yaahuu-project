
import profileBorder from 'images/card13/profileBorder.png'
import noImage from 'images/noimage.jpg'

export default function ProfileImage({ imageSrc=noImage, className='' })
{

    return (
        <div className={`inline-block relative ${className} `} >

            <img
                className='absolute w-4/5 h-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover'
                src={imageSrc}
                alt=""
            />

            <img
                className='absolute w-full h-full'
                src={profileBorder}
                alt="profileBorder"
            />

        </div>
    )
}
