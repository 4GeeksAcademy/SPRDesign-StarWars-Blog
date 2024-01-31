
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function starshipCard() {
    const [starships, setStarships] = useState([]);
    const { store, actions } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getStarships() {
            let response = await fetch("https://swapi.dev/api/starships/");
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

    // Agrupar personajes en conjuntos de tres
    const groupedStarships = [];
    for (let i = 0; i < starships.length; i += 3) {
        groupedStarships.push(starships.slice(i, i + 3));
    }

    return (

        <div className='mb-5'>

            <div className="d-flex justify-content-between mt-5 mb-3">
                <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
                <h1 className='starship-title'>Starships</h1>
                <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
            </div>

            <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>

                {groupedStarships.map((group, groupIndex) => (

                    <Carousel.Item key={groupIndex}>
                        <div className="d-flex justify-content-around">
                            {group.map((starship, index) => (
                                <div key={index} className="card" style={{ width: "18rem" }}>
                                    <img src="https://www.denofgeek.com/wp-content/uploads/2019/12/x-wing.jpg?fit=1944%2C1339" className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{starship.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/starship-description/" + (groupIndex * 3 + index + 1)} className="btn btn-warning text-white">Learn More</Link>
                                            <button onClick={() => handleFavorites(starship.name)} className="btn btn-warning text-white"><i className="far fa-star"></i></button>
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