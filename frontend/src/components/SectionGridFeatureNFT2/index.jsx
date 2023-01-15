
import HeaderFilterSection from "components/HeaderFilterSection";
import CardNFT2 from "components/CardNFT2";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";

export default function SectionGridFeatureNFT2()
{
    return (
		<div className="nc-SectionGridFeatureNFT2 relative">
			<HeaderFilterSection />
			<div
				className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}
			>
				{Array.from("111111111").map((_, index) => (
					<CardNFT2 key={index} />
				))}
			</div>
			<div className="flex mt-16 justify-center items-center">
				<ButtonPrimary loading>Show me more</ButtonPrimary>
			</div>
		</div>
	);
}
