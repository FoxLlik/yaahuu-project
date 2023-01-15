
import { useState } from "react";
import CardLarge1 from "components/CardLarge1";

import nftsLarge1 from "images/nfts/large1.png";
import nftsLarge2 from "images/nfts/large2.png";
import nftsLarge3 from "images/nfts/large3.png";

const nftsLargeImgs = [nftsLarge1, nftsLarge2, nftsLarge3];

export default function SectionLargeSlider({ className ="" })
{
    const [indexActive, setIndexActive] = useState(0);

    const handleClickNext = () => {
		setIndexActive((state) => {
			if (state >= 2) {
				return 0;
			}
			return state + 1;
		});
	};

	const handleClickPrev = () => {
		setIndexActive((state) => {
			if (state === 0) {
				return 2;
			}
			return state - 1;
		});
	};

    return (
		<div className={`nc-SectionLargeSlider relative ${className}`}>
			{[1, 1, 1].map((_, index) =>
				indexActive === index ? (
					<CardLarge1
						key={index}
						isShowing
						featuredImgUrl={nftsLargeImgs[index]}
						onClickNext={handleClickNext}
						onClickPrev={handleClickPrev}
					/>
				) : null
			)}
		</div>
	);

}
