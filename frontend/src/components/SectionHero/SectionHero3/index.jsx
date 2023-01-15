
import imagePng from 'images/hero4.png'

export default function SectionHero3({ className='' })
{
    return (
        <div
			className={`nc-SectionHero3 relative ${className}`}
			data-nc-id="SectionHero3"
		>
			<div className="mt-10 lg:mt-0 lg:absolute lg:container z-10 inset-x-0 top-[10%] sm:top-[20%]">
				<div className="flex flex-col items-start max-w-2xl space-y-5 xl:space-y-8 ">
					<span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
						Тоглоом
					</span>
					<h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
						13 модны покер
					</h2>
				</div>
			</div>
			<div className="relative aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-4">
				<img
					className="absolute inset-0 object-cover rounded-[32px]"
					src={imagePng}
					alt="hero"
				/>
			</div>
		</div>
    )
}
