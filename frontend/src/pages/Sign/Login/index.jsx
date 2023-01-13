
import React, { useContext } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "react-google-login"
import { Helmet } from "react-helmet";

import { gapi } from "gapi-script"

import useApi from "hooks/useApi";
import useLoader from "hooks/useLoader";
import AuthContext from "context/auth/authContext";

import Input from "components/shared/Input";
import ButtonPrimary from "components/shared/Button/ButtonPrimary";

import facebookSvg from "images/Facebook.svg"
import googleSvg from "images/Google.svg";

// const loginSocials = [
// 	{
// 		name: "Facebook - ээр нэвтрэх",
// 		icon: facebookSvg,
// 	},
// 	{
// 		name: "Google - ээр нэвтрэх",
// 		icon: googleSvg,
//         onclickFunc: 'handleSignInGoogle()'
// 	},
// ];

export default function PageLogin({ className="" })
{

    const navigate = useNavigate()
    const location = useLocation()
    const { fetchData } = useLoader({})

    const userApi = useApi().user
    const { setUser, user } = useContext(AuthContext)

    console.log('user', user)

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        isSignedIn: false,
        accessType: "offline",
    })

    async function getUser(userDetail) {
        const { success, data } = await fetchData(userApi.googleSingIn(userDetail))
        if (success && Object.keys(data).length > 0)
        {
            // TODO: Нэвтэрсэн хэрэглэгч гэсэн үг home хуудас руу үсрүүлж байна!
            setUser(data)
            if (location?.state?.from?.pathname)
            {
                navigate(location?.state?.from?.pathname)
            }
            else
            {
                navigate('/')
            }
        }
    }

    function onSuccess(res) {
        const userDetail = res.profileObj
        getUser(userDetail)
    }

    function onFailure(res) {
        console.log("login failed", res)
    }

    const handleSignInGoogle = async () => {
        const auth = await gapi.auth2.getAuthInstance();

        if (auth.isSignedIn.get()) {
            // TODO: user нэвтэрсэн байгаа гэсэн үг
            const userDetail = auth.currentUser.get().getBasicProfile()

            const data = {
                nickName: userDetail.getName(),
                email: userDetail.getEmail(),
                firstName: userDetail.getGivenName(),
                lastName: userDetail.getFamilyName(),
                avatar: userDetail.getImageUrl(),
            }

            getUser(data)
        } else {
            signIn()
        }
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault()

        let email = event.target.email.value
        let password = event.target.password.value

        let inputDatas = {
            'email': email,
            'password': password,
        }

        const { success, data } = await fetchData(userApi.login(inputDatas))
        if (success && Object.keys(data).length > 0) {

            setUser(data)
            if (location?.state?.from?.pathname)
            {
                navigate(location?.state?.from?.pathname)
            }
            else
            {
                navigate('/')
            }
        }
    }

    const loginSocials = [
        {
            name: "Facebook - ээр нэвтрэх",
            icon: facebookSvg,
            onclickFunc: () => {}
        },
        {
            name: "Google - ээр нэвтрэх",
            icon: googleSvg,
            onclickFunc: handleSignInGoogle
        },
    ];

    return (
        <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
            <Helmet>
                <title>Нэвтрэх || YAAHUU</title>
            </Helmet>
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Нэвтрэх
                </h2>
                <div className="max-w-md mx-auto space-y-6">
                    <div className="grid gap-3">
                        {loginSocials.map((item, index) => (
                            <button
                                key={index}
                                onClick={ item?.onclickFunc }
                                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                            >
                                <img
                                    className="flex-shrink-0"
                                    src={item.icon}
                                    alt={item.name}
                                />
                                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                                    {item.name}
                                </h3>
                            </button>
                        ))}
                    </div>
                    {/* OR */}
                    <div className="relative text-center">
                        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                            Эсвэл
                        </span>
                        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
                    </div>
                    {/* FORM */}
                    <form
                        className="grid grid-cols-1 gap-6"
                        onSubmit={handleSubmit}
                    >
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                И-мэйл хаяг
                            </span>
                            <Input
                                type="email"
                                placeholder="example@example.com"
                                className="mt-1"
                                name='email'
                            />
                        </label>
                        <label className="block">
                            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                                Нууц үг
                                <Link
                                    to="/forgot-pass"
                                    className="text-sm text-green-600"
                                >
                                    Нууц үгээ мартсан бол?
                                </Link>
                            </span>
                            <Input
                                type="password"
                                className="mt-1"
                                name='password'
                            />
                        </label>
                        <ButtonPrimary type="submit">Үргэлжлүүлэх</ButtonPrimary>
                    </form>

                    {/* ==== */}
                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        Шинэ хэрэглэгч болох? {` `}
                        <Link to="/signup" className="text-green-600">
                            Бүртгүүлэх
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
