
import { XMarkIcon } from "@heroicons/react/24/solid";

import { twFocusClass } from "utils/style";

const ButtonClose = ({ className = "", onClick = () => {} }) => {
	return (
		<button
			className={
				`w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${className} ` +
				twFocusClass()
			}
			onClick={onClick}
		>
			<span className="sr-only">Close</span>
			<XMarkIcon className="w-5 h-5" />
		</button>
	);
};

export default ButtonClose;
