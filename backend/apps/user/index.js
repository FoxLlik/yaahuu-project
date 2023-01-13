const jwt = require('jsonwebtoken');

const CError = require('../../utils/rsp')
const crypto = require('crypto');

const userService = require('../../services/user')
const signService = require('../../services/user/sign')
const verification = require('../../services/verification')


/**
 * Анх вэбийг ажиллуулж байхад нэвтэрсэн эсэхийг шалгах
 * @returns Object => { isLogin: Boolean, user: Object }
 */
exports.check = async(req, res) =>
{
    const token = req.cookies[process.env.TOKEN_NAME];

    let userData = {
        isLogin: false,
        user: {}
    }

    /** Token байхгүй бол нэвтэрсэн биш гэсэн үг */
    if (!token)
    {
        return req.sendData(userData)
    }
    /** Token байгаа бол хэрэглэгчийн мэдээллийг буцаана */
    else
    {
        try {

            const validToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            let userId = validToken.id;

            const user = await userService.getUserProfile(
                userId
            )

            userData = {
                isLogin: true,
                user: user
            }

            req.sendData(userData)

        } catch (err)
        {
            throw new CError("ERR_001")
        }
    }
}

// Нэвтэрсэн хэрэглэгчийн id-г авч профайл мэдээлүүдийг хайна
exports.get = async (req, res) =>
{
    const userId = req.userId
    const user = await userService.getUserProfile(
        userId
    )

    req.sendData(user)
}

/**
 * Нэвтрэх
 * @param {string} req.body.username            Нэвтрэх нэр
 * @param {string} req.body.password            Нэвтрэх нууц үг
 */
exports.login = async(req, res) =>
{
    var { username, password } = req.body
    /** Орж ирсэн майл хаягийн утгын бүх утгыг жижиг болгож байна! */
    username = username.toLowerCase();

    const userProfile = await signService.in(username, password, res)
        .catch(
            err =>
            {
                throw new CError(err.message)
            }
        )
    // req.sendDataInfo("INF_011", userProfile)
}

/**
 * Бүртгүүлэх
 */
exports.createAccount = async(req, res) =>
{
    /** хэрэглэгчийг үүсгэх нь */
    const user = await signService.up(req.body)
    .catch(
        err =>
        {
            throw new CError(err.message)
        }
    )

    /**хэрэглэгчид бүртгэлээ баталгажуулах mail илгээх */
    await verification.sendMail(req, user.token)

    req.sendInfo("INF_008")
}

/**
 *   Mail баталгаажуулан аккоунт үүсгэж байгаа хэсэг
 */
exports.confirm = async (req) =>
{
    const token = req.query.token;
    /** Хэрэглэгчийн токеноос мэдээлэл авах */
    const user = await verification.confirmEmail(token)
        .catch(
            err =>
            {
                throw new CError(err.message)
            }
        )

    req.sendInfo("INF_004", 'Бүртгэл')
}

/**
 * Системээс гарах Logout
 */
exports.signOut = async (req, res) =>
{
    signService.out(req, res)
    req.sendInfo('INF_004', 'Гарах үйлдэл')
};
