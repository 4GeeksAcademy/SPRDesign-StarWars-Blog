import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
   
    return (
        <nav className="navbar mt-0 mb-3 custom-navbar">
            <div className="d-flex align-items-center justify-content-center w-100">
                <Link to="/" className="mr-auto">
                    <img src={"https://cdn.worldvectorlogo.com/logos/star-wars-4.svg"} alt="Logo" height="80" className="logo" />
                </Link>
            </div>

        </nav>
    );
};

