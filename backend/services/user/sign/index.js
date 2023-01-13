const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const User = require('../../../models/user');

const { timeToMs } = require('../../../utils/date')

const userService = require('../index');

/**
 *  Нэвтрэлт
 * @param {string} email        нэвтрэх цахим хаяг
 * @param {string} password     нэвтрэх нууц үг
 * @param {object} res          cookie г оноох
 * @returns нэвтрэх мэдээлэл
 */
exports.in = async (email, password, res) =>
{
    //хэрэглэгчийн имейлийг шалгана
    const user = await User.findOne(
        {
            email: email,
        }
    )

    //хэрэглэгчийн мэдээлэл байгаа эсэхийг шалгаж буй
    if (user === null) {
        throw new Error('ERR_005')
    }

    /**
     *
     */
    const isMatch = await user.comparePassword(password.toString())
    if(!isMatch)
        throw new Error('ERR_005')

    if(!user.isVerified)
        throw new Error('ERR_012')

    const userProfile = await userService.getUserProfile(user._id.toString());

    // нэвтрэх үед хэрэглэгчийн id-г токенд хадгална
    let token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        //токений хүчинтэй хугацааг хадгалж буй
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE_TIME
        }
    )

    /** Cookie үүсгэж байгаа түүний тохиргоо */
    const cookieOption = {
        expires: new Date(Date.now() + timeToMs(process.env.JWT_EXPIRE_TIME)),
        httpOnly: true,
    }

    //Токенийг cookie-нд хадгална
    res.cookie(process.env.TOKEN_NAME, token, cookieOption);
    return userProfile;
}

/**
 * Хэрэглэгч шинээр бүртгэх
 * @param {object} content бүртгэх мэдээлэл
 * @returns үүсгэсэн бүртгэх мэдээлэл
 */
exports.up = async (content) =>
{
    /**Email баталгаажуулах token */
    const token = crypto.randomBytes(6).toString('hex')
    content.token = token

    const user = new User(content)

    await user.save()
        .catch((err) =>
            {
                throw new Error("ERR_001")
            }
        )

    return user
}

/**
 * cookie-г аван cookie ны хугацааг дуусгана
 */
exports.out = (req, res) =>
{
    res.cookie(process.env.TOKEN_NAME, "", { maxAge: 0 })
};

/**
 * @param {object} body gmail хэрэглэгчийн мэдээлэл
 * @return userProfile
*/
exports.googleLogin = async (res, body) =>
{
    // хэрэглэгчийн имейлийг шалгана
    let user = await User.findOne(
        {
            email: body.email,
        }
    )

    if(!user)
    {
        body['isVerified'] = true
        body['isActive'] = true
        const newUser = new User(body)

        user = await newUser.save()
            .catch((err) =>
                {
                    throw new Error("ERR_001")
                }
            )
    }

    // нэвтрэх үед хэрэглэгчийн id-г токенд хадгална
    let token = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
            email: user.email,
        },
        //токений хүчинтэй хугацааг хадгалж буй
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE_TIME
        }
    )

    /** Cookie үүсгэж байгаа түүний тохиргоо */
    const cookieOption = {
        expires: new Date(Date.now() + timeToMs(process.env.JWT_EXPIRE_TIME)),
        httpOnly: true,
    }

    //Токенийг cookie-нд хадгална
    res.cookie(process.env.TOKEN_NAME, token, cookieOption);

    return user
}
