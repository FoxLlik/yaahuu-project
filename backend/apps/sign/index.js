const CError = require('../../utils/rsp')
const crypto = require('crypto');

const signService = require('../../services/user/sign')
const verification = require('../../services/verification')
/**
 * Нэвтрэх
 * @param {string} req.body.email            Нэвтрэх нэр
 * @param {string} req.body.password            Нэвтрэх нууц үг
 */
exports.login = async(req, res) =>
{
    var { email, password } = req.body
    /** Орж ирсэн майл хаягийн утгын бүх утгыг жижиг болгож байна! */
    email = email.toLowerCase();

    const userProfile = await signService.in(email, password, res)
        .catch(
            err =>
            {
                throw new CError(err.message)
            }
        )
    req.sendDataInfo("INF_011", userProfile)
}

/**
 * Бүртгүүлэх
 */
exports.register = async(req, res) =>
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
 *  Google oauth (gmail) ашиглаж нэвтэрсэн бол хэрэглэгчийн бүртгэл байгаа эсэхийг шалгаад байхгүй бол account үүсгэнэ байвал нэврүүлнэ.
 *  @param {string} req.body.email                  Gmail
 *  @param {string} req.body.familyName             Овог
 *  @param {string} req.body.givenName              Хэрэглэгчийн нэр
 *  @param {string} req.body.googleId               Google id
 *  @param {string} req.body.imageUrl               Gmail profile url
 *  @param {string} req.body.name                   Бүтэн нэр
*/
exports.googleLogin = async (req, res) =>
{
    const body = req.body;

    /** Хэрэглэгчийн токеноос мэдээлэл авах */
    const user = await signService.googleLogin(res, body)
        .catch(
            err =>
            {
                throw new CError(err.message)
            }
        )

    req.sendData(user)
}

/**
 * Системээс гарах Logout
 */
exports.signOut = async (req, res) =>
{
    signService.out(req, res)
    req.sendInfo('INF_004', 'Гарах үйлдэл')
};
