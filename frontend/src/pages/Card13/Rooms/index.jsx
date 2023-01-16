
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection";
import Pagination from "components/shared/Pagination";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor";

import CardGame from "components/CardGame";
import SectionHero3 from "components/SectionHero/SectionHero3";

export default function Rooms({ className = "" })
{
    return (
		<div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
			<Helmet>
				<title>Search || Ciscryp NFT Template</title>
			</Helmet>
			<div className="container px-4">
				{/* SECTION HERO */}
				<SectionHero3 />
			</div>

			<div className="container py-16 lg:pb-28 lg:pt-10 space-y-16 lg:space-y-28">
				<main>
					{/* LOOP ITEMS */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
						{Array.from("11111111").map((_, index) => (
							<CardGame key={index} />
						))}
					</div>

					{/* PAGINATION */}
					<div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
						<Pagination />
						<ButtonPrimary loading>Show me more</ButtonPrimary>
					</div>
				</main>

				{/* === SECTION 5 === */}
				<div className="relative py-16 lg:py-28">
					<BackgroundSection />
					<SectionSliderCollections />
				</div>

				{/* SUBCRIBES */}
				<SectionBecomeAnAuthor />
			</div>
		</div>
	);
}
