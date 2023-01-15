
import { Helmet } from "react-helmet"

import BgGlassmorphism from "components/BgGlassmorphism"
import SectionHero2 from "components/SectionHero/SectionHero2"
import SectionHowItWork from "components/SectionHowItWork"
import SectionLargeSlider from "components/SectionLargeSlider"
import SectionSubscribe2 from "components/SectionSubscribe2"
import BackgroundSection from "components/BackgroundSection"
import SectionGridFeatureNFT2 from "components/SectionGridFeatureNFT2"

export default function Home()
{
    return (
        <div className="nc-PageHome relative overflow-hidden">
            <Helmet>
				<title>YAAHUU || Цагийг зугаатай өнгөрөөе</title>
			</Helmet>

            {/* GLASSMOPHIN */}
            <BgGlassmorphism />

            <div className="container relative mt-5 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">

                {/* SECTION HERO */}
				<SectionHero2 />

                {/* SECTION 2 */}
				<SectionHowItWork className="mt-24 lg:mt-40 xl:mt-48" />

            </div>

            {/* SECTION LAERGE SLIDER */}
			<div className="bg-neutral-100/70 dark:bg-black/20 py-20 lg:py-32">
				<div className="container">
					<SectionLargeSlider />
				</div>
			</div>

            <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">

                {/* SECTION */}
				<SectionSubscribe2 />

                {/* SECTION */}
				<div className="relative py-20 lg:py-28">
					<BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
					<SectionGridFeatureNFT2 />
				</div>

            </div>

        </div>
    )
}
