import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar mt-0 mb-3 custom-navbar">
            <div className="d-flex align-items-center justify-content-center w-100">
                <Link to="/" className="mr-auto">
                    <img src={"https://cdn.worldvectorlogo.com/logos/star-wars-4.svg"} alt="Logo" height="70" className="logo" />
                </Link>
            </div>

            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn dropdown-toggle btn-navbar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites 
                        <i className="far fa-star"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {store.favorites?.map((favorite, index) => (
                            <li key={index} className="dropdown-item">
                                {favorite}
                                <a onClick={() => actions.deleteFavorite(favorite)}>x</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

