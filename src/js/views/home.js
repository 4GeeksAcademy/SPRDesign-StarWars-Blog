import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import CharacterCard from "../component/characterCard";
import PlanetCard from "../component/planetCard";
import StarshipCard from "../component/starshipCard";
import VehicleCard from  "../component/vehicleCard";

export const Home = () => (
	<div className="container mt-5">
    <CharacterCard />
    <PlanetCard />
	<VehicleCard />
    <StarshipCard />
	
  </div>
	/*<div className="text-center mt-5">
		
		<h1>Hello Rigo!</h1>
		<p>
			<img src={rigoImage} />
		</p>
		<a href="#" className="btn btn-success">
			If you see this green button, bootstrap is working
		</a>
		
		
	</div>*/
);
