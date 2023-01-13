/**
 *  url дээрээс query -г яг зөв query -г ялгаж авах middleware
 * @param {object} mainQuery тухайн api д үйлчлэх query байна
 */
const queryParser = (mainQuery) => (req, res, next) => {
    const urlParams = new URLSearchParams(req.query);
    const reqParams = Object.fromEntries(urlParams);

    const mainParamKeys = Object.keys(mainQuery)

    const query = mainParamKeys.reduce((beforeValue, currentValue) =>
    {
        let value = ''

        if (reqParams.hasOwnProperty(currentValue))
        {
            value = reqParams[currentValue]
            if (value.includes(process.env.QUERY_MULTIPLE_SYMBOL))
            {
                value = value.split(process.env.QUERY_MULTIPLE_SYMBOL)
            }
            value = value
        }
        else value = mainQuery[currentValue]

        beforeValue[currentValue] = value
        return beforeValue
    }, {})

    req.query = query
    next()
}

module.exports = queryParser
