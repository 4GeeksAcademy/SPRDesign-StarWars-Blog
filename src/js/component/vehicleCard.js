import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function VehicleCard() {
  const [vehicles, setVehicles] = useState([]);
  const { store, actions } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getVehicles() {
      let response = await fetch("https://swapi.dev/api/vehicles/");
      let data = await response.json();
      setVehicles(data.results);
    }
    getVehicles();
  }, []);

  function handleFavorites(item) {
    if (store.favorites.includes(item)) {
      actions.deleteFavorites(item);
    } else {
      actions.addFavorites(item);
    }
  }

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => Math.min(groupedVehicles.length - 1, prevIndex + 1));
  };

  // Agrupar personajes en conjuntos de tres
  const groupedVehicles = [];
  for (let i = 0; i < vehicles.length; i += 3) {
    groupedVehicles.push(vehicles.slice(i, i + 3));
  }

  return (

    <div className='mb-5'>

      <div className="d-flex justify-content-between mt-5 mb-3">
        <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
        <h1 className='vehicle-title'>Vehicles</h1>
        <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
      </div>

      <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>

        {groupedVehicles.map((group, groupIndex) => (

          <Carousel.Item key={groupIndex}>
            <div className="d-flex justify-content-around">
              {group.map((vehicle, index) => (
                <div key={index} className="card" style={{ width: "18rem" }}>
                 {/* <img src="https://static.wikia.nocookie.net/swse/images/7/71/HAVw_A5_Juggernaut.png/revision/latest?cb=20190702182036" className="card-img-top" alt="..."/> */}
                 <img src={`https://starwars-visualguide.com/assets/img/vehicles/${(groupIndex * 3 + index + 1)}.jpg`} className="card-img-top" alt="Vehicle Photo" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{vehicle.name}</h5>
                    <div className="d-flex justify-content-between">
                      <Link to={"/vehicle-description/" + (groupIndex * 3 + index + 1)} className="btn btn-warning text-white">Learn More</Link>
                      <button onClick={() => handleFavorites(vehicle.name)} className="btn btn-warning text-white"><i className="far fa-star"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>

        ))}

      </Carousel>

    </div>
  );
}