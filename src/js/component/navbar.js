import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar mt-0 mb-3 custom-navbar">

			<Link to="/">
				<img src={"https://cdn.worldvectorlogo.com/logos/star-wars-4.svg"} alt="Logo" height="60" className="mr-2 logo" />
			</Link>

			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites?.map((favorite, index) => (
							<li key={index} className="dropdown-item">{favorite}<a onClick={(e) => actions.deleteFavorite(favorite)}>x</a></li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

