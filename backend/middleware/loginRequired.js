const jwt = require('jsonwebtoken');
const CError = require('../utils/rsp')

const asyncHandler = require('../middleware/asyncHandler');

/**
 * Токеноос хэрэглэгч нэвтэрсэн байгаа эсэхийг шалгана
 * @param {*} req.cookies Cookie
 * @param {*} res.user Хэрэглэгчийн токен
 * @param {*} next Дараагийн middware лүү шилжих
 */
const loginRequired = asyncHandler(async (req, res, next) =>
{
    const token = req.cookies[process.env.TOKEN_NAME];

    if (!token)
        throw new CError("ERR_006");
    try
    {
        const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = validToken.id;
        req.userEmail = validToken.email
        // TODO: эрхийг засаж янзлах
        if(validToken.id === '639c2ca5f0f6da35258985d6')
        {
            req.isPro = true
        }
        else
        {
            req.isPro = false
        }
        next();
    }
    catch (err)
    {
        if (err instanceof jwt.TokenExpiredError)
        {
            throw new CError("ERR_024");
        }
        throw new CError("ERR_006");
    }
})

module.exports = loginRequired
