var mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        firstName:
            {
                type: String,
                required: [false, 'Бүртгэлтэй нэр байна']
            },
        lastName:
            {
                type: String,
                required: false
            },
        nickName:
            {
                type: String,
                unique: [true, 'Бүртгэлтэй nickname байна.'],
                required: true,
            },
        phoneNumber:
            {
                type: mongoose.Types.Decimal128,
                required: false,
            },
        email:
            {
                match: /.+\@.+\..+/,
                unique: [true, 'Бүртгэлтэй мейл байна'],
                type: String,
                lowercase: true,  // орж ирсэн бүх утгыг жижиг үсэг болгон өөрчлөнө
                required: [false, 'Бүртгэлтэй мейл байна']
            },
        password:
            {
                type: String,
                // required: true
            },
        lastLogin:
            {
                type: Date,
                required: false,
                default: Date.now
            },
        token:
            {
                type: String,
                unique: true,
                required: false,
            },
        isActive:
            {
                type: Boolean,
                required: true,
                default: false
            },
        dateJoined:
            {
                type: Date,
                required: false,
            },
        avatar:
            {
                type: String,
            },
        isVerified:
            {
                type: Boolean,
                required: true,
                default: false
            }
    },
    {
        timestamps: true
    }
)

/** Хэрэглэгч email-ээ баталгаажуулаагүй бол хэрэглэгчийн мэдээллийг устгах */
UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800, partialFilterExpression: { isVerified: false } });

/**
 * нууц үгийг bcrypt хашлах нь
 */
UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

/**
 * Нууц үгийг хөрвүүлэн зөв эсхийг шалгах
 * @param {string} password
 */
UserSchema.methods.comparePassword = async function (password) {
    const isMatch = bcrypt.compareSync(password, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)
