import Logo from "../../shared/Logo";
import SocialsList1 from "../../shared/SocialsList1";
import React from "react";

const widgetMenus = [
	{
		id: "5",
		title: "Онцгой хэсгүүд",
		menus: [
			{ href: "#", label: "Installation" },
			{ href: "#", label: "Release Notes" },
			{ href: "#", label: "Upgrade Guide" },
			{ href: "#", label: "Browser Support" },
			{ href: "#", label: "Editor Support" },
			{ href: "#", label: "Dark Mode" },
		],
	},
	{
		id: "1",
		title: "Тусламж",
		menus: [
			{ href: "#", label: "Design features" },
			{ href: "#", label: "Prototyping" },
			{ href: "#", label: "Design systems" },
			{ href: "#", label: "Pricing" },
			{ href: "#", label: "Customers" },
			{ href: "#", label: "Security" },
		],
	},
	{
		id: "2",
		title: "Хаяг",
		menus: [
			{ href: "#", label: "Best practices" },
			{ href: "#", label: "Support" },
			{ href: "#", label: "Developers" },
			{ href: "#", label: "Learn design" },
			{ href: "#", label: "What's new" },
			{ href: "#", label: "Releases" },
		],
	},
	{
		id: "4",
		title: "Холбоо барих",
		menus: [
			{ href: "#", label: "yaahuu@yahuu.mn" },
			{ href: "#", label: "88448567" },
			{ href: "#", label: "Community Resources" },
			{ href: "#", label: "Contributing" },
			{ href: "#", label: "Concurrent Mode" },
			{ href: "#", label: "API Reference" },
		],
	},
];

const Footer = () => {
	const renderWidgetMenuItem = (menu, index) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
					{menu.title}
				</h2>
				<ul className="mt-5 space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a
								key={index}
								className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="nc-Footer relative py-20 lg:pt-32 lg:pb-28 border-t border-neutral-200 dark:border-neutral-700">
			<div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
				<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
					<div className="col-span-2 md:col-span-1">
						<Logo />
					</div>
					<div className="col-span-2 flex items-center md:col-span-3">
						<SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
					</div>
				</div>
				{widgetMenus.map(renderWidgetMenuItem)}
			</div>
		</div>
	);
};

export default Footer;
