
import facebook from "images/socials/facebook.svg";
import twitter from "images/socials/twitter.svg";
import telegram from "images/socials/telegram.svg";
import youtube from "images/socials/youtube.svg";

const socialsDemo = [
	{ name: "Facebook", icon: facebook, href: "https://www.facebook.com/" },
	{ name: "Twitter", icon: twitter, href: "https://twitter.com/" },
	{ name: "Youtube", icon: youtube, href: "https://youtube.com/" },
	{ name: "Telegram", icon: telegram, href: "https://telegram.org/" },
];

/**
 * Social холбоосуудын жагсаалт
 * @param {String} className Жагсаалтын class
 * @param {String} itemClass Icon-ын class
 * @param {Array} socials Жагсаалт --> [ {name: '', icon: '', href: ''} ]
 */
const SocialsList = ({
	className = "",
	itemClass = "block w-6 h-6",
	socials = socialsDemo,
}) => {
	return (
		<nav
			className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
			data-nc-id="SocialsList"
		>
			{socials.map((item, i) => (
				<a
					key={i}
					className={`${itemClass}`}
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					title={item.name}
				>
					<img src={item.icon} alt="" />
				</a>
			))}
		</nav>
	);
};

export default SocialsList;
