const Verification = require("../../models/verification")
const mail = require("../../utils/verificationMail/sender")
const User = require("../../models/user")

/**
 * Бүртгэл баталгаажуулах mail илгээх, хэрэглэгчийн мэдээлэл хадгалан
 * @param {Object} req.body Бүртгэлийн мэдээлэл
 */
exports.sendMail = async (req, token) =>
{
    mail.send(req, token, 'sign/verification', 'И-мэйл баталгаажуулахын тулд доорх товч дээр дарна уу.')
}

/**
 * Хэрэглэгчийн баталгаажуулах mail-ийн токеноос мэдээлэл авах
 * @param {Object} token хэрэлэгчийн мэдээлэл агуулсан jwt
 * @returns хэрэглэгчийн мэдээлэл
 */
exports.confirmEmail = async (token) =>
{
    const user = await User.findOne({ token:token })

    if(!user)
        throw new Error('ERR_009')

    user.isVerified = true
    user.save();

    return user;
}
