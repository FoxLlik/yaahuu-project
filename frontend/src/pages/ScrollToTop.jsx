
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Өөр хуудасанд шилжих болгонд хуудасны хамгийн дээр байх
 */
export default function ScrollToTop()
{
	const locationPathname = useLocation().pathname;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [locationPathname]);

	return null;
};
