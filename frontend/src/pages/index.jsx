
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "pages/ScrollToTop"
import NotFound from "pages/Error/NotFound";
import Sign from "pages/Sign"
import Card13 from "pages/Card13";
import Home from "pages/Home";
import Subscription from "pages/Subscription";

import Toast from "components/shared/Toast";
import LoginRequired from "components/LoginRequired";

export const pages = [
	{ path: "/", Component: Home, checkLogin: false },
	{ path: "/subscription", Component: Subscription, checkLogin: false },
];

export default function Pages()
{
    return (
        <>

            <ScrollToTop />
            <Toast />
            <Routes>
                {pages.map(({ Component, path, checkLogin }) => {

                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                checkLogin
                                ? <LoginRequired><Component /></LoginRequired>
                                : <Component />
                            }
                        />
                    );
                })}

                <Route path="/sign/*" element={<Sign />} />
                <Route path="/card13/*" element={<Card13 />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </>
    )
}
