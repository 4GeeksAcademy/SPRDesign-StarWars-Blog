import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export default function CharacterCard() {

    const [characters, setCharacters] = useState([]);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        async function getCharacters() {
            let response = await fetch("https://swapi.dev/api/people/");
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

    return (
        <div>
            <h1 className='character-title'>Characters</h1>

            <div className="d-flex col-10 overflow-auto mt-5 mx-auto card-container">
                {characters?.map((character, index) => (
                    <div key={index} className="card" style={{ minWidth: "300px" }}>
                        <img src="https://lumiere-a.akamaihd.net/v1/images/ct_starwarsgalaxyofadventures_r2d2_ddt-17324_26b8e267.jpeg?region=0,0,600,600" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                            <Link to={"/character-description/" + (index + 1)} className="btn btn-primary">Learn More</Link>
                            <button onClick={(e) => handleFavorites(character.name)}>❤️</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}