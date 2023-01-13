
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "pages/ScrollToTop"
import NotFound from "pages/Error/NotFound";
import Sign from "pages/Sign"
import Home from "pages/Home";

import Toast from "components/shared/Toast";

export const pages = [
	{ path: "/", component: Home },
];

export default function Pages()
{
    return (
        <>

            <ScrollToTop />
            <Toast />
            <Routes>

                {pages.map(({ component, path }) => {
                    const Component = component;
                    return (
                        <Route key={path} element={<Component />} path={path} />
                    );
                })}

                <Route path="/sign/*" element={<Sign />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </>
    )
}
