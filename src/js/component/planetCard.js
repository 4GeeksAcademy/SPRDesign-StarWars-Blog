import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function PlanetCard() {
    const [planets, setPlanets] = useState([]);
    const { store, actions } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getPlanets() {
            let response = await fetch("https://swapi.tech/api/planets/");
            let data = await response.json();
            setPlanets(data.results);
        } 
        getPlanets();
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
        setCurrentIndex((prevIndex) => Math.min(groupedPlanets.length - 1, prevIndex + 1));
    };

    const isFavorite = (planet) => store.favorites.includes(planet.name);

    const groupedPlanets = [];
    for (let i = 0; i < planets.length; i += 4) {
        groupedPlanets.push(planets.slice(i, i + 4));
    }

    return (
        <div className='mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-3">
                <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
                <h1 className='character-title'>Planets</h1>
                <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
            </div>

            <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>
                {groupedPlanets.map((group, groupIndex) => (
                    <Carousel.Item key={groupIndex}>
                        <div className="d-flex justify-content-around">
                            {group.map((planet, index) => (
                                <div key={index} className="card" style={{ width: "16rem", border: "2px solid gold", background:"transparent" }}>
                                    <img src={`https://starwars-visualguide.com/assets/img/planets/${(planet.uid)}.jpg`} className="card-img-top" alt="Planet Photo" style={{ borderBottom: '2px solid gold'}} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{planet.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/planet-description/" + (planet.uid)} className="btn btn-warning text-white">Learn More</Link>
                                            <button
                                                onClick={() => handleFavorites(planet.name)}
                                                className={`btn ${isFavorite(planet) ? 'btn-warning text-dark' : 'btn-dark text-white'}`}
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
