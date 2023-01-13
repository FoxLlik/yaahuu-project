const info = require('../utils/rsp/info')
const { Stringformat } = require('../utils')

const successFn = (req, res, next) => {

    /**
     * Амжилттай болсон мэдээлэл буцаах
     * @param {string} infoCode амжилттай болсон мэдээллийн code
     * @returns response буцаана
     */
    function sendInfo(infoCode, ...args)
    {
        const _info = info[infoCode]
        return res.status(_info.statusCode).json(
            {
                success: true,
                info: {
                    code: _info.code,
                    name: _info.name,
                    message: Stringformat(_info.message, args)
                },
                error: {}
            }
        )
    }

    /**
     * Амжилттай ажилласаны дараах data -г буцаах нь
     * @param {any} data тухайн service ээс хамаарч юу ч байж болно
     * @param {number} statusCode status code
     * @returns response буцаана
     */
    function sendData(data, statusCode=200) {
        return res.status(statusCode).json(
            {
                success: true,
                data: data,
                error: {}
            }
        )
    }

    /**
     * Амжилттай ажилласаны дараах data болон info буцаах нь
     * @param {any} data тухайн service ээс хамаарч юу ч байж болно
     * @param {number} statusCode status code
     * @returns response буцаана
     */
    function sendDataInfo(infoCode, data, statusCode=200) {
        const _info = info[infoCode]
        return res.status(statusCode).json(
            {
                success: true,
                info: {
                    code: _info.code,
                    name: _info.name,
                    message: Stringformat(_info.message)
                },
                data: data,
                error: {}
            }
        )
    }

    req.sendInfo = sendInfo
    req.sendData = sendData
    req.sendDataInfo = sendDataInfo
    next()
}

module.exports = successFn
