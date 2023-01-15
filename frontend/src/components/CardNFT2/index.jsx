
import { Link } from "react-router-dom";
import Avatar from "components/shared/Avatar";
import NcImage from "components/shared/NcImage/NcImage";
import ItemTypeImageIcon from "components/ItemTypeImageIcon";
import LikeButton from "components/shared/Button/LikeButton";
import ItemTypeVideoIcon from "components/ItemTypeVideoIcon";
import Prices from "components/Prices";
import RemainingTimeNftCard from "components/RemainingTimeNftCard";

import nfts1 from "images/nfts/1.png";
import nfts2 from "images/nfts/2.png";
import nfts3 from "images/nfts/3.png";
import nfts4 from "images/nfts/4.png";
import nfts5 from "images/nfts/5.png";
import nfts6 from "images/nfts/6.png";
import nfts7 from "images/nfts/7.png";
import nfts8 from "images/nfts/8.png";
import nfts9 from "images/nfts/9.png";
import nfts10 from "images/nfts/10.png";
import nfts11 from "images/nfts/11.png";
import nfts12 from "images/nfts/12.png";
import nfts13 from "images/nfts/13.png";
import nfts14 from "images/nfts/14.png";
import nfts15 from "images/nfts/15.png";
import nfts16 from "images/nfts/16.png";

const nftsImgs = [
	nfts1,
	nfts2,
	nfts3,
	nfts4,
	nfts5,
	nfts6,
	nfts7,
	nfts8,
	nfts9,
	nfts10,
	nfts11,
	nfts12,
	nfts13,
	nfts14,
	nfts15,
	nfts16,
];

export default function CardNFT2({ className = "", isLiked })
{
    const renderAvatars = () => {
		return (
			<div className="hidden md:flex -space-x-1.5 ">
				<Avatar
					containerClassName="ring-2 ring-white "
					sizeClass="h-5 w-5 text-sm"
				/>
				<Avatar
					containerClassName="ring-2 ring-white "
					sizeClass="h-5 w-5 text-sm"
				/>
				<Avatar
					containerClassName="ring-2 ring-white "
					sizeClass="h-5 w-5 text-sm"
				/>
			</div>
		);
	};

    return (
		<div
			className={`nc-CardNFT2 relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5  ${className}`}
			data-nc-id="CardNFT2"
		>
			<div className="relative flex-shrink-0 ">
				<div>
					<NcImage
						containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
						src={
							nftsImgs[
								Math.floor(Math.random() * nftsImgs.length)
							]
						}
						className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
					/>
				</div>

				{/* NFT TYPE */}
				{Math.random() > 0.5 ? (
					<ItemTypeVideoIcon className="absolute bottom-2.5 right-2.5 w-7 h-7 md:w-9 md:h-9" />
				) : (
					<ItemTypeImageIcon className="absolute bottom-2.5 right-2.5 w-7 h-7 md:w-9 md:h-9" />
				)}

				{/* LIKE AND AVATARS */}
				<div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
					<LikeButton liked={isLiked} className=" !h-9" />
					{renderAvatars()}
				</div>

				{/* ----TIME--- */}
				<RemainingTimeNftCard contentClassName="right-5 top-1/2 -translate-y-1/2 pb-1" />

				<div className="absolute left-[-1px] bottom-[-0.4px] ">
					<svg
						className="text-white dark:text-neutral-900 w-64 md:w-[281px]"
						width="281"
						viewBox="0 0 281 99"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 0V99H258.059C248.54 99 239.92 93.3743 236.089 84.6606L205.167 14.3394C201.335 5.62568 192.716 0 183.197 0H0Z"
							fill="currentColor"
						/>
					</svg>

					<div className="absolute left-4 bottom-0 w-48 ">
						<h2 className={`text-lg font-semibold `}>
							CloneF #{Math.floor(Math.random() * 1000) + 1000}
						</h2>

						<div className="w-full mt-1.5 flex justify-between items-end ">
							{/* <Prices2 /> */}
							<Prices labelTextClassName="bg-white dark:bg-neutral-900 " />
							<span className="block text-neutral-500 dark:text-neutral-400 text-xs">
								{Math.floor(Math.random() * 90) + 10} in stock
							</span>
						</div>
					</div>
				</div>
			</div>

			<Link to={"/nft-detailt"} className="absolute inset-0"></Link>
		</div>
	);

}
