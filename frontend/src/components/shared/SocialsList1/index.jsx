import React from "react";
import facebook from "images/socials/facebook.svg";
import vimeo from "images/socials/vimeo.svg";
import twitter from "images/socials/twitter.svg";
import telegram from "images/socials/telegram.svg";
import youtube from "images/socials/youtube.svg";

const socials = [
	{ name: "Facebook", icon: facebook, href: "#" },
	{ name: "Vimeo", icon: vimeo, href: "#" },
	{ name: "Youtube", icon: youtube, href: "#" },
	{ name: "Telegram", icon: telegram, href: "#" },
	{ name: "Twitter", icon: twitter, href: "#" },
];

const SocialsList1 = ({ className = "space-y-3" }) => {
	const renderItem = (item, index) => {
		return (
			<a
				href={item.href}
				className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
				key={index}
			>
				<div className="flex-shrink-0 w-5 ">
					<img src={item.icon} alt="" />
				</div>
				<span className="hidden lg:block text-sm">{item.name}</span>
			</a>
		);
	};

	return (
		<div
			className={`nc-SocialsList1 ${className}`}
			data-nc-id="SocialsList1"
		>
			{socials.map(renderItem)}
		</div>
	);
};

export default SocialsList1;
