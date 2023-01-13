
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { addToast } from 'hooks/useToast';

import AuthContext from "context/auth/authContext";

/**
 * Нэвтэрсэн эсэхийг Route дотор шалгана
 */
export default function LoginRequired({ children })
{
    const { user } = useContext(AuthContext)

    const location = useLocation()

    /** Нэвтэрсэн бол цааш явуулж үгүй бол toast гаргаж login лүү үсэргэнэ */
    if (Object.keys(user).length === 0)
    {
        addToast(
        {
            text: 'Та нэвтрэх үйлдэл хийнэ үү!',
            time: 3000,
            type: 'warning',
        })
        return (
            <Navigate to={'/sign/in'} replace={true} state={{ from: location }} />
        )
    }
    else
    {
        return children
    }

}
