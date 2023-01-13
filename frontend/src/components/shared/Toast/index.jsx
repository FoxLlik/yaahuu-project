
import { ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Toast()
{
    return (
        <>
            <ToastContainer
                theme='colored'
                role='alert'
                transition={Zoom}
            />
        </>
    )
}
