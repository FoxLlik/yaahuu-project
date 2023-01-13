
import { useContext } from "react"

import Header from "components/Layout/Header"
import Footer from "components/Layout/Footer"

export default function Layout({ children })
{

    return (
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <Header />
                {children}
            <Footer />
        </div>
    )
}
