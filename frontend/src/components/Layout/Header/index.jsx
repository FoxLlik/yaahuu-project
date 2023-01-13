
import { useContext } from "react";

import AuthContext from "context/auth/authContext";

import HeaderNotLogged from "components/Layout/Header/HeaderNotLogged";
import HeaderLogged from "components/Layout/Header/HeaderLogged"

import { useLocation } from "react-router-dom";

export default function Header()
{

    const { user } = useContext(AuthContext)

    let location = useLocation();

    return Object.keys(user).length === 0 ? <HeaderNotLogged /> : <HeaderLogged />;
}
