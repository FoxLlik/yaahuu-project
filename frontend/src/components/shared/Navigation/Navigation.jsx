import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "utils/data/navigation";

function Navigation() {
	return (
		<ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
			{NAVIGATION_DEMO_2.map((item) => (
				<NavigationItem key={item.id} menuItem={item} />
			))}
		</ul>
	);
}

export default Navigation;
