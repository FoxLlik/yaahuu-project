
import { CheckIcon } from "@heroicons/react/24/solid"

import ButtonPrimary from "components/shared/Button/ButtonPrimary"
import ButtonSecondary from "components/shared/Button/ButtonSecondary"

import { pricings } from "utils/data/subscription"

export default function Subscription({ className = 'marker:' })
{

    const renderPricingItem = (pricing, index) => {
        return (
            <div
				key={index}
				className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
					pricing.isPopular
						? "border-primary-500"
						: "border-neutral-100 dark:border-neutral-700"
				}`}
			>
				{pricing.isPopular && (
					<span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
						Хамгийн сайн сонголт
					</span>
				)}
				<div className="mb-8">
					<h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
						{pricing.name}
					</h3>
					<h2 className="text-5xl leading-none flex items-center">
						<span>{pricing.pricing}</span>
						<span className="text-lg ml-1 font-normal text-neutral-500">
							{pricing.per}
						</span>
					</h2>
				</div>
				<nav className="space-y-4 mb-8">
					{pricing.features.map((item, index) => (
						<li className="flex items-center" key={index}>
							<span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
								<CheckIcon
									className="w-5 h-5"
									aria-hidden="true"
								/>
							</span>
							<span className="text-neutral-700 dark:text-neutral-300">
								{item}
							</span>
						</li>
					))}
				</nav>
				<div className="flex flex-col mt-auto">
					{pricing.isPopular ? (
						<ButtonPrimary>Сонгох</ButtonPrimary>
					) : (
						<ButtonSecondary>
							<span className="font-medium">Сонгох</span>
						</ButtonSecondary>
					)}
					<p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
						{pricing.desc}
					</p>
				</div>
			</div>
        )
    }

    return (
        <div
			className={`nc-PageSubcription container pb-24 lg:pb-32 ${className}`}
			data-nc-id="PageSubcription"
		>
			<header className="text-center max-w-2xl mx-auto my-20">
				<h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					<span className="mr-4 text-3xl md:text-4xl leading-none">
						💎
					</span>
					Төлбөрийн хэсэг
				</h2>
				<span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
					Та өөрт хамгийн тохирох сонголтоо сонгоно уу
				</span>
			</header>
			<section className="text-neutral-600 text-sm md:text-base overflow-hidden">
				<div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
					{pricings.map(renderPricingItem)}
				</div>
			</section>
		</div>
    )
}
