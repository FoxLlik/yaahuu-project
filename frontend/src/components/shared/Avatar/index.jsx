
import React from "react";

import noImage from 'images/noimage.jpg'
import VerifyIcon from "../../VerifyIcon";

const Avatar = ({
	containerClassName = "ring-1 ring-white dark:ring-neutral-900",
	sizeClass = "h-6 w-6 text-sm",
	radius = "rounded-full",
	imgUrl = noImage,
	userName,
	hasChecked,
	hasCheckedClass = "w-4 h-4 bottom-1 -right-0.5",
}) => {

	const url = imgUrl || "";
	const name = userName || "John Doe";

	return (
		<div
			className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
		>
			{url && (
				<img
					className={`absolute inset-0 w-full h-full object-cover ${radius}`}
					src={url}
					alt={name}
				/>
			)}
			<span className="wil-avatar__name">{name[0]}</span>

			{hasChecked && (
				<span className={`  text-white  absolute  ${hasCheckedClass}`}>
					<VerifyIcon className="" />
				</span>
			)}
		</div>
	);
};

export default Avatar;
