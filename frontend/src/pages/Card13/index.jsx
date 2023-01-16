
import { Routes, Route } from 'react-router-dom'

import NotFound from "pages/Error/NotFound";
import Rooms from './Rooms';

export default function Card13()
{
    return (
        <>
            <Routes>
                <Route path={"/rooms/"} element={<Rooms />} />

                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </>
    )
}
