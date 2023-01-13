const mongoose = require('mongoose');

const User = require('../../models/user')
const CError = require("../../utils/rsp")
const mail = require('../../utils/verificationMail/sender');

/** Тухайн хэрэглэгчийн тохиргоог авах нь
 * @param {string} userId хэрэглэгчийн ID
 * @return {Object} config хэрэглэгчийн тохиргоо
*/
exports.getUserConfig = async (userId) =>
{
    const config = await UserConfig.findOne(
        { user: userId },
        {
            _id: 0,
            user: 0,
            registerFrontImage: 0,
            registerBackImage: 0,
            selfieImage: 0,
            createdAt: 0,
            updatedAt: 0,
            terms: 0,
            __v: 0
        }
    )
    return config
}

/**
 * Хэрэглэгчийн мэдээлэл болон тохиргоо баазаас авах
 * @param {object} userId хэрэглэгчийн id
 * @returns хэрэглэгчийн profile болон тохиргоо
 */
exports.getUserProfile = async (userId) =>
{
    const user = await User.findById(
        userId,
        {
            _id: 1,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            email: 1,
            isAdmin: 1,
            avatar: 1,
            nickName: 1,
        }
    )
    // const config = await this.getUserConfig(userId);
    /** KYC баталгаажуулалтын хамгийн сүүлийн утгыг хадгалаад буцаана */
    // config._doc.kyc = config._doc.kyc[config._doc.kyc.length - 1]

    return user
}
