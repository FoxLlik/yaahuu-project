
import { useContext, useState, useEffect } from "react";

import AuthContext from "./authContext";

import useApi from "hooks/useApi";
import useLoader from "hooks/useLoader"

export default function AuthState({ children })
{

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // Apis
    const userApi = useApi().user
    const { fetchData } = useLoader({})

    const contextData = {
        loading,
        user,
        setUser,
    };


    useEffect(() => {
        /** Хэрэглэгч нэвтэрсэн эсэхийг мэдэх, мэдээллийг авах */
        async function getUser()
        {
            const { success, data } = await fetchData(userApi.check()).catch(err => {
                setLoading(false);
                return err
            })
            if (success && data.isLogin)
            {
                if (data.user) setUser(data.user)
            }
            setLoading(false);
        }
        getUser()
    }, []);

    return (
        <AuthContext.Provider
            value={contextData}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
