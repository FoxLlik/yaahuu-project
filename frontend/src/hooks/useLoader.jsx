
import { useState } from 'react';

/**
 * Loading ийг хүсэлт явуулж байх хооронд харуулах эсэхийг ашиглах
 * @param {boolean} isFullScreen    бүтэн дэлгэцээр харуулах эсэх
 * @param {boolean} isSmall         Товч болон text зэргийн өмнө унших жижиг loader авах эсэх
 * @param {boolean} initValue       Loader ийн анхны утга
 */
export default function useLoader({
	isFullScreen = false,
	isSmall = false,
	initValue = false,
	timeout = false,
	source = null,
}) {
	const [isLoading, setLoading] = useState(initValue);

	const fetchData = async (axios) => {
		setLoading(true);
		const rsp = await axios.catch((err) => {
			if (timeout) {
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			} else {
				setLoading(false);
			}
			return Promise.reject(err);
		});
		if (timeout) {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} else {
			setLoading(false);
		}
		return rsp;
	};

	const cancel = () => {
		source && source.cancel("cancel");
	};

	return {
		Loader: isFullScreen ? (
			// <ComponentSpinner fallback={null}/>
            <h1>
                Full Screen Loader
            </h1>
		) : isSmall && (
			// <Spinner fallback={null}/>
            <h1>
                Small Loader
            </h1>
		),
		fetchData,
		isLoading,
		cancel,
	};
}
