import Navbar from "./Navbar.tsx";
import React from "react";
interface LayoutProps {
    children:React.ReactNode
}

const Layout=({children}:LayoutProps)=>{
    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}
export default Layout