/**
 * String дотор {0} дотор argument -д байгаа утгыг оноох нь
 * @param {string} string Үндсэн үг
 * @returns зассан үг
 */
exports.Stringformat = function(string)
{
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    return string.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

/**
 * Орж ирсэн үгийн бүх үсгийг том болгож хувиргана
 * @param {string} string Хувиргах үг
 * @returns Хувиргасан үг
 */
exports.upperCase = function(string)
{
    return string.toUpperCase();
}

/**
 * Mongoose ээс filter лэж авсан датаг JSON болгох нь
 * @param {object} mongooseObj mongoose data
 * @returns json
 */
exports.objToJson = function(mongooseObj)
{
    const strData = JSON.stringify(mongooseObj)
    const parsedData = JSON.parse(strData)
    return parsedData
}

/**
 * Тоог хасах argument -д бүх тоог хасах нь
 */
exports.minus = function()
{
    var args = Array.prototype.slice.call(arguments);
    const result = args.reduce(
        (beforeValue, currentValue) =>
        {
            return parseFloat(beforeValue) - parseFloat(currentValue)
        },
    )
    return result
}

/**
 * Тоог нэмэх argument -д бүх тоог нэмэх нь
 */
exports.plus = function()
{
    var args = Array.prototype.slice.call(arguments);
    const result = args.reduce(
        (beforeValue, currentValue) =>
        {
            return parseFloat(beforeValue) + parseFloat(currentValue)
        },
    )
    return result
}

/**
 * Тоог үржих argument -д бүх тоог үржих нь
 */
exports.multiply = function()
{
    var args = Array.prototype.slice.call(arguments);
    const result = args.reduce(
        (beforeValue, currentValue) =>
        {
            return parseFloat(beforeValue) * parseFloat(currentValue)
        },
    )
    return result
}

/**
 * Тоог хуваах argument -д бүх тоог хуваах нь
 */
exports.divide = function()
{
    var args = Array.prototype.slice.call(arguments);
    const result = args.reduce(
        (beforeValue, currentValue) =>
        {
            return parseFloat(beforeValue) / parseFloat(currentValue)
        },
    )
    return result
}

/**
 * Бүхэл нэмэх тоо эсэхийг шалгах
 * @param {number} number тоо байх
 */
exports.isNaturalNumber = function(number)
{
    var parsedNumber = parseInt(number, 10);
    return parsedNumber >= 0 && parsedNumber.toString() === number.toString();
}

/**
 * хувийг олох нь
 * @param {number} parts хэдэн хувийг олох
 * @param {number} whole 100 хувьд нь хэд байх
 * @returns 100 аас хэд нь тэдэн хувь
 */
exports.caluclatePercantage = (whole, parts) =>
{
    const result = this.multiply(this.divide(parts, whole), 100)
    return result
}

/**
 * 100 хувийн хэдэн хувь нь хэд байгааг олох
 * @param {number} whole         100 хувьд нь хэд байх
 * @param {number} percentage    100 аас хэдэн хувь
 * @returns 100 ын тэдэн хувь нь хэд
 */
exports.calculateParts = (whole, percentage) =>
{
    const result = this.divide(this.multiply(whole, percentage), 100)
    return result
}
