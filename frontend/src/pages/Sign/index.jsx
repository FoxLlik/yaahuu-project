
import { Routes, Route } from 'react-router-dom'

import NotFound from "pages/Error/NotFound";
import Login from 'pages/Sign/Login'
// import Register from 'pages/Sign/Register'

export default function Sign()
{
    return (
        <>
            <Routes>
                <Route path={"/in/"} element={<Login />} />
                {/* <Route path={"/up/"} element={<Register />} /> */}

                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </>
    )
}
