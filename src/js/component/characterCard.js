import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Carousel } from 'react-bootstrap';

export default function CharacterCard() {
    const [characters, setCharacters] = useState([]);
    const { store, actions } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getCharacters() {
            let response = await fetch("https://swapi.tech/api/people/");
            let data = await response.json();
            setCharacters(data.results);
        }
        getCharacters();
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
        setCurrentIndex((prevIndex) => Math.min(groupedCharacters.length - 1, prevIndex + 1));
    };

    const isFavorite = (character) => store.favorites.includes(character.name);

    const groupedCharacters = [];
    for (let i = 0; i < characters.length; i += 4) {
        groupedCharacters.push(characters.slice(i, i + 4));
    }

    return (
        <div className='mb-5'>
            <div className="d-flex justify-content-between mt-5 mb-3">
                <button className="btn btn-warning text-white" onClick={showPrevious}>{'<'}</button>
                <h1 className='character-title'>Characters</h1>
                <button className="btn btn-warning text-white" onClick={showNext}>{'>'}</button>
            </div>

            <Carousel activeIndex={currentIndex} onSelect={() => null} controls={false} indicators={false}>
                {groupedCharacters.map((group, groupIndex) => (
                    <Carousel.Item key={groupIndex}>
                        <div className="d-flex justify-content-around">
                            {group.map((character, index) => (
                                <div key={index} className="card" style={{ width: "16rem", border: "2px solid gold", background:"transparent" }}>
                                    <img src={`https://starwars-visualguide.com/assets/img/characters/${(character.uid)}.jpg`} className="card-img-top" alt="Character Photo" style={{ borderBottom: '2px solid gold'}} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{character.name}</h5>
                                        <div className="d-flex justify-content-between">
                                            <Link to={"/character-description/" + (character.uid)} className="btn btn-warning text-white">Learn More</Link>
                                            <button
                                                onClick={() => handleFavorites(character.name)}
                                                className={`btn ${isFavorite(character) ? 'btn-warning text-dark' : 'btn-dark text-white'}`}
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
