
import Navbar from "@/components/navbar/index";
import React from "react";

type Props ={
    children: React.ReactNode
}

const Layout = async({children}:Props) => {
    // Layout just renders navbar and children - no redirects here
    // Redirects are handled by the dashboard page.tsx
    return (
        <div className="grid grid-cols-1">
            <Navbar  />
            {children}
        </div>
    )
}
export default Layout