import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function vehicleCard() {
    const [vehicles, setvehicles] = useState([]);
    const { store, actions } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getvehicles() {
            let response = await fetch("https://swapi.dev/api/vehicles/");
            let data = await response.json();
            setvehicles(data.results);
        }
        getvehicles();
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
        setCurrentIndex((prevIndex) => Math.min(groupedvehicles.length - 1, prevIndex + 1));
    };

    const isFavorite = (vehicle) => store.favorites.includes(vehicle.name);

    const groupedvehicles = [];
    for (let i = 0; i < vehicles.length; i += 4) {
        groupedvehicles.push(vehicles.slice(i, i + 4));
    }

    return (
        <div className='mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-3">
                <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
                <h1 className='character-title'>vehicles</h1>
                <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
            </div>

            <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>
                {groupedvehicles.map((group, groupIndex) => (
                    <Carousel.Item key={groupIndex}>
                        <div className="d-flex justify-content-around">
                            {group.map((vehicle, index) => (
                                <div key={index} className="card" style={{ width: "16rem", border: "2px solid gold", background:"transparent" }}>
                                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${(groupIndex * 4 + index + 1)}.jpg`} className="card-img-top" alt="Vehicle Photo" style={{ borderBottom: '2px solid gold'}} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{vehicle.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/vehicle-description/" + (groupIndex * 4 + index + 1)} className="btn btn-warning text-white">Learn More</Link>
                                            <button
                                                onClick={() => handleFavorites(vehicle.name)}
                                                className={`btn ${isFavorite(vehicle) ? 'btn-warning text-dark' : 'btn-dark text-white'}`}
                                            >
                                                <i className="far fa-star"></i>
                                            </button>
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
