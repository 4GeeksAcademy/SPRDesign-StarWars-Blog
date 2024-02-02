import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function StarshipCard() {
    const [starships, setStarships] = useState([]);
    const { store, actions } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getStarships() {
            let response = await fetch("https://swapi.tech/api/starships/");
            let data = await response.json();
            setStarships(data.results);
        }
        getStarships();
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
        setCurrentIndex((prevIndex) => Math.min(groupedStarships.length - 1, prevIndex + 1));
    };

    const isFavorite = (starship) => store.favorites.includes(starship.name);

    const groupedStarships = [];
    for (let i = 0; i < starships.length; i += 4) {
        groupedStarships.push(starships.slice(i, i + 4));
    }

    return (
        <div className='mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-3">
                <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
                <h1 className='character-title'>Starships</h1>
                <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
            </div>

            <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>
                {groupedStarships.map((group, groupIndex) => (
                    <Carousel.Item key={groupIndex}>
                        <div className="d-flex justify-content-around">
                            {group.map((starship, index) => (
                                <div key={index} className="card" style={{ width: "16rem", border: "2px solid gold", background:"transparent" }}>
                                    <img src={`https://starwars-visualguide.com/assets/img/starships/${(starship.uid)}.jpg`} className="card-img-top" alt="Starship Photo" style={{ borderBottom: '2px solid gold'}} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{starship.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/starship-description/" + (starship.uid)} className="btn btn-warning text-white">Learn More</Link>
                                            <button
                                                onClick={() => handleFavorites(starship.name)}
                                                className={`btn ${isFavorite(starship) ? 'btn-warning text-dark' : 'btn-dark text-white'}`}
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
