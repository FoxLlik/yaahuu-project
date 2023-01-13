
import { Link } from "react-router-dom";

import logoImg from "images/yaahuu-logo-dark.png";
import logoLightImg from "images/yaahuu-logo-white.png";

/**
 * Лого зураг
 */
export default function Logo({ img = logoImg, imgLight = logoLightImg, className = "" })
{
    return (
        <Link
			to="/"
			className={`ttnc-logo inline-block text-primary-6000 focus:outline-none ${className} `}
		>
			{/* THIS USE FOR MY CLIENT */}
			{/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
			{img ? (
				<img
					className={`block max-h-12 ${
						imgLight ? "dark:hidden" : ""
					}`}
					src={img}
					alt="Logo"
				/>
			) : (
				"Logo Here"
			)}
			{imgLight && (
				<img
					className="hidden max-h-12 dark:block"
					src={imgLight}
					alt="Logo-Light"
				/>
			)}
		</Link>
    )
}
