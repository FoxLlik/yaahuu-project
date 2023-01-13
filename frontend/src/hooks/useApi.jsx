
import axios from "axios";

import { addToast } from "hooks/useToast";

export default function useApi(isDisplay=true)
{
    const source = axios.CancelToken.source();

    const instance = axios.create(
        {
            baseURL: process.env.REACT_APP_SERVER_URL,
            withCredentials: true, // Хүсэлт болгонд ээр cookie явуулах нь
        }
    );

    /**
     * Axios ийн response датанаас
     */
    instance.interceptors.response.use(
        function (rsp) {
            const data = rsp.data
            //  хэрвээ хүсэлт амжилттай болоод тэр нь info буцааж байх юм бол toast гаргах
            if (typeof data?.success === 'boolean' && data?.info) {
                /** Хүсэлтийн хариуг харуулах нь */
                let text = data?.info?.message
                if (isDisplay) {
                    addToast(
                        {
                            text,
                            time: 3000,
                            type: "success",
                        }
                    )
                }
            }
            return data;
        },
        function (err) {
            let error = err?.response?.data
            /** хүсэлт явахгүй алдаа гарсан бол backend асуудалтай болсон байнаа гэж үзээд алдааны toast харуулах */
            if (error?.success === undefined) {
                error = {
                    success: false,
                    error: {
                        message: "Сервер дээр алдаа гарсан байна",
                        name: "ERROR 004",
                        code: 4,
                    }
                }
            }

            /** Алдааны messege ийг харуулах нь */
            if (error?.error?.message) {
                let text = error?.error?.message
                if (isDisplay) {
                    /** Хүсэлтийн хариуг харуулах нь */
                    addToast({
                        text,
                        time: 3000,
                        type: "error",
                    })
                }
            }

            return Promise.reject(error);
        }
    );

    /**
     * DataTable-ийн query params
     * @param {number} page Харах гэж байгаа хуудасны дугаар
     * @param {number} limit Хүснэгтийн өгөгдлийн хэмжээ
     * @param {String} sort Эрэмбэ
     * @returns Жишээ нь: page=1&limit=10&sort=name
     */
    // const dataTableQuerys = (page, limit, sort) => {
    //     return `page=${page}&limit=${limit}&sort=${sort?.field || ""}`
    // }

    return {
        source,
		instance,
        //  Хэрэглэгчийн мэдээлэл
		user: {
            check: () => instance.get('/api/v1/user/check/'),
            get: () => instance.get('/api/v1/user/'),
            googleSingIn: data => instance.post('/api/v1/user/google-login/', data),
            login: data => instance.post('/api/v1/user/login/', data),
            register: data => instance.post('/api/v1/user/register/', data),
            logout: () => instance.get('/api/v1/user/logout/'),
		}
    }
}
