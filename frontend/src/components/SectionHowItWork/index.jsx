
import NcImage from "components/shared/NcImage/NcImage";
import HIW1img from "images/HIW1img.png";
import HIW2img from "images/HIW2img.png";
import HIW3img from "images/HIW3img.png";
import HIW4img from "images/HIW4img.png";
import VectorImg from "images/VectorHIW.svg";
import Badge from "components/shared/Badge";

const DEMO_DATA = [
	{
		id: 1,
		img: HIW1img,
		imgDark: HIW1img,
		title: "Тоглоом тоглох",
		desc: "Тоглоомоо сонгож ороод хүссэн тоглоомоо тоглоно. ",
	},
	{
		id: 2,
		img: HIW2img,
		imgDark: HIW2img,
		title: "NFT цуглуулах",
		desc: "Тоглоом тоглож NFT олох боломжтой.",
	},
	{
		id: 3,
		img: HIW3img,
		imgDark: HIW3img,
		title: "NFT арилжах",
		desc: "Олсон NFT-ээ зарж болон худалдан авах боломжтой.",
	},
	{
		id: 4,
		img: HIW4img,
		imgDark: HIW4img,
		title: "Мөнгө олох",
		desc: "Тоглоод олсон NFT-ээ зарж мөнгө олох боломжтой.",
	},
];

export default function SectionHowItWork({ className = "", data = DEMO_DATA })
{
    return (
        <div
			className={`nc-SectionHowItWork  ${className}`}
			data-nc-id="SectionHowItWork"
		>
			<div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
				<img
					className="hidden md:block absolute inset-x-0 -top-1"
					src={VectorImg}
					alt="vector"
				/>
				{data.map((item, index) => (
					<div
						key={item.id}
						className="relative flex flex-col items-center max-w-xs mx-auto"
					>
						<NcImage
							containerClassName="mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
							src={item.img}
						/>
						<div className="text-center mt-auto space-y-5">
							<Badge
								name={`Алхам ${index + 1}`}
								color={
									!index
										? "blue"
										: index === 1
										? "pink"
										: index === 2
										? "yellow"
										: "green"
								}
							/>
							<h3 className="text-lg font-semibold">
								{item.title}
							</h3>
							<span className="block text-neutral-500 dark:text-neutral-400">
								{item.desc}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
    )
}
