
import { Link } from "react-router-dom";
import Avatar from "components/shared/Avatar";
import NcImage from "components/shared/NcImage/NcImage";
import VerifyIcon from "components/VerifyIcon";

import nfts9 from "images/nfts/9.png";
import nfts10 from "images/nfts/10.png";
import nfts11 from "images/nfts/11.png";
import nfts12 from "images/nfts/12.png";

export default function CollectionCard2(
{
    className,
    imgs = [nfts9, nfts10, nfts11, nfts12],
})
{
    return (
        <div className={`CollectionCard2 group relative ${className}`}>
			<div className="relative flex flex-col rounded-2xl overflow-hidden">
				<NcImage
					containerClassName="aspect-w-8 aspect-h-5"
					src={imgs[0]}
				/>
				<div className="grid grid-cols-3 gap-1.5 mt-1.5">
					<NcImage containerClassName="w-full h-28" src={imgs[1]} />
					<NcImage containerClassName="w-full h-28" src={imgs[2]} />
					<NcImage containerClassName="w-full h-28" src={imgs[3]} />
				</div>
			</div>
			<div className="relative mt-5 ">
				{/* TITLE */}
				<h2 className="font-semibold text-2xl group-hover:text-primary-500 transition-colors">
					Awesome collection
				</h2>
				{/* AUTHOR */}
				<div className="mt-2 flex justify-between">
					<div className="flex items-center  truncate">
						<Avatar sizeClass="h-6 w-6" />
						<div className="ml-2 text-sm truncate">
							<span className="font-normal hidden sm:inline-block">
								Creator
							</span>
							{` `}
							<span className="font-medium">
								{'Хэрлэн Түвшинбаяр'}
							</span>
						</div>
						<VerifyIcon iconClass="w-4 h-4" />
					</div>
					<span className="mb-0.5 ml-2 inline-flex justify-center items-center px-2 py-1.5 border-2 border-secondary-500 text-secondary-500 rounded-md text-xs !leading-none font-medium">
						1.255 Items
					</span>
				</div>
			</div>
			<Link to={"/page-collection"} className="absolute inset-0 "></Link>
		</div>
    )
}
