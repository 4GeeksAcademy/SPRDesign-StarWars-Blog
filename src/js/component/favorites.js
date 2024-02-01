import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    const handleDeleteFavorites = (event, favorite) => {
        event.preventDefault();
        actions.deleteFavorites(favorite);   
    };

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
                            <Link to="#" onClick={(event) => handleDeleteFavorites(event, favorite)} style={{ cursor: 'pointer', marginLeft: '50px', color: 'yellow'}}><i className="far fa-trash-alt"></i></Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
