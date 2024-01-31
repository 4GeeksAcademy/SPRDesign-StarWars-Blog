import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex justify-content-end">
            <div className="dropdown">
                <button className="btn dropdown-toggle btn-favorites" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                    <i className="far fa-star"></i>
                    Favorites (<span style={{ color: 'yellow' }}>{store.favorites.length}</span>)
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
    );
};
