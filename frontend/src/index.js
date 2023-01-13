
import { lazy } from 'react'

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// styles
import 'styles/index.scss'
import 'index.css'

// ** Lazy load app
const LazyApp = lazy(() => import("App"))

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <BrowserRouter>
        <LazyApp />
    </BrowserRouter>
)
