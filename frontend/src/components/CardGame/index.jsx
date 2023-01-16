
import { Link } from "react-router-dom";
import Avatar from "components/shared/Avatar";
import NcImage from "components/shared/NcImage/NcImage";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";

import nfts3 from "images/nfts/3.png";

export default function CardGame({ className = "", isLiked })
{
    const renderAvatars = () => {
		return (
			<div className="flex -space-x-1 ">
				<Avatar
					containerClassName="ring-2 ring-white dark:ring-neutral-900"
					sizeClass="h-5 w-5 text-sm"
				/>
				<Avatar
					containerClassName="ring-2 ring-white dark:ring-neutral-900"
					sizeClass="h-5 w-5 text-sm"
				/>
				<Avatar
					containerClassName="ring-2 ring-white dark:ring-neutral-900"
					sizeClass="h-5 w-5 text-sm"
				/>
				<Avatar
					containerClassName="ring-2 ring-white dark:ring-neutral-900"
					sizeClass="h-5 w-5 text-sm"
				/>
			</div>
		);
	};

    return (
		<div
			className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
			data-nc-id="CardNFT"
		>
			<div className="relative flex-shrink-0 ">
				<div>
					<NcImage
						containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
						src={
							nfts3
						}
						className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
					/>
				</div>

				<div className="absolute top-3 inset-x-3 flex"></div>
			</div>

			<div className="p-4 py-5 space-y-3">
				<div className="flex justify-between">
					{renderAvatars()}
					<span className="text-neutral-700 dark:text-neutral-400 text-xs">
						Өрөөнд 1/3
					</span>
				</div>

				<div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

				<div className="flex flex-row-reverse ">
					<ButtonPrimary>Тоглох</ButtonPrimary>
				</div>
			</div>

			<Link to={"/nft-detailt"} className="absolute inset-0"></Link>
		</div>
	);

}
