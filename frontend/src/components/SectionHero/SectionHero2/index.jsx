
import imagePng from 'images/hero-right-3.png'
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import HeroSearchForm from 'components/HeroSearchForm/HeroSearchForm';

export default function SectionHero2({ className='', children })
{
    return (
        <div
			className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
		>
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
					<h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
						Тоглоом тоглоод мөнгө олцгооё 🖼
					</h2>
					<span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
						Тоглоом тоглоод NFT олоод, NFT-ээрээ гоёод эсвэл <br />{" "}
						NFT-ээ зараад мөнгө олцгооё
					</span>
					<ButtonPrimary>
						<span>Тоглох</span>
					</ButtonPrimary>
				</div>
				<div className="flex-grow">
					<img className="w-full" src={imagePng} alt="hero" />
				</div>
			</div>

			<div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
				<HeroSearchForm />
			</div>
		</div>
    )
}
