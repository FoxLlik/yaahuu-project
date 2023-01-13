const UserSchema = require("../../../models/user")

// Нэвтрэх хуудасны validate
exports.sign =
{
    email:
    {
        isEmail:
        {
            bail: true,
            errorMessage: 'И-мэйл ээ оруулна уу.'
        }
    },
    password:
    {
        notEmpty:
        {
            errorMessage: 'Нууц үгээ оруулна уу.'
        }
    }
},

//Бүртгүүлэх хуудасны validate
exports.register =
{
    // phoneNumber:
    // {
    //     errorMessage: 'Утасны дугаараа 8 оронтой тоогоор оруулна уу',
    //     isLength:
    //     {
    //         options: { min: 8, max: 8 }
    //     },
    //     matches:
    //     {
    //         options: [/^\d{8}$/],
    //         errorMessage: "Тоо оруулна уу"
    //     },
    //     trim: true
    // },
    nickName:
        {
            notEmpty:
            {
                errorMessage: 'Тоглогчийн нэрээ оруулна уу.'
            },
        },
    email:
        {
            isEmail:
            {
                bail: true,
                errorMessage: 'И-мэйл оруулна уу.'
            },
            custom:
            {
                options: value =>
                {
                    return UserSchema.find(
                        {
                            email: value
                        })
                        .then(user =>
                            {
                                if (user.length > 0)
                                    return Promise.reject('И-мэйл хаяг бүртгэлтэй байна.')
                            })
                }
            }
        },
    password:
        {
            notEmpty:
            {
                errorMessage: 'Нууц үгээ оруулна уу.'
            },
            isLength:
            {
                errorMessage: 'Нууц үг хамгийн багадаа 8 тэмдэгттэй байна',
                options: { min: 8 },
            },
        },
        passwordVerify:
        {
            notEmpty:
            {
                errorMessage: 'Нууц үгээ давтаж оруулна уу.'
            },
            custom:
            {
                errorMessage: 'Нууц үг ижил байх ёстой.',
                options: (value, { req }) => value === req.body.password
            }
        }
},

// нууц үг сэргээх
exports.resetPassword =
{
    password:
    {
        notEmpty:
        {
            errorMessage: 'Нууц үгээ оруулна уу.'
        },
        isLength:
        {
            errorMessage: 'Нууц үг хамгийн багадаа 8 тэмдэгттэй байна',
            options: { min: 8 },
        },
    },
    passwordVerify:
    {
        notEmpty:
        {
            errorMessage: 'Нууц үгээ давтаж оруулна уу.'
        },
        custom:
        {
            errorMessage: 'Нууц үг ижил байх ёстой.',
            options: (value, { req }) => value === req.body.password
        }
    }
}
