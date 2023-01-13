
/**
 * Unique string үүсгэх
 * @param {string} prefix Unique string-ний эхлэх үг
 * @returns ID буцна
 */
export function ncNanoId(prefix = "nc_")
{
	return (
		prefix + Date.now() + "_" + Math.floor(Math.random() * 999999999999999)
	);
}

