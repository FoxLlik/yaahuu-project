
/**
 * Intersection Observer browser дээр ажиллахыг шалгах
 */
export const checkInViewIntersectionObserver = ({
	target,
	options = { root: null, rootMargin: `0%`, threshold: 0 },
	callback,
	freezeOnceVisible = false,
}) => {
	const _funCallback = (entries, observer) => {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				//
				callback();
				//  ---- IF TRUE WE WILL UNOBSERVER AND FALSE IS NO
				if (freezeOnceVisible) {
					observer.unobserve(entry.target);
				}
			}
			return true;
		});
	};

	// _checkBrowserSupport-----
	if (typeof window.IntersectionObserver === "undefined") {
		console.error(
			"window.IntersectionObserver === undefined! => Your Browser is Notsupport"
		);
		return;
	}

	const observer = new IntersectionObserver(_funCallback, options);
	target && observer.observe(target);
};

/**
 * Safari эсэхийг шалгах
 */
export const isSafariBrowser = () => {
	// @ts-ignore
	// return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	return (
		navigator.userAgent.indexOf("Safari") > -1 &&
		navigator.userAgent.indexOf("Chrome") <= -1
	);
};
