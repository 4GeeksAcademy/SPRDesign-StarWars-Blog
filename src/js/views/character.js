import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function CharacterDescription() {
    const { id } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        async function getCharacter() {
            let response = await fetch(`https://swapi.dev/api/people/${id}`);
            let data = await response.json();
            setCharacter(data);
        }
        getCharacter();
    }, []);


    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '900px', border: '2px solid gold', backgroundColor: 'transparent' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                            alt="Character"
                            className="img-fluid"
                            style={{ borderRight: '2px solid gold' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="card-title">{character.name}</p>
                                    <p className="card-text-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida libero sed tempus convallis. Ut consectetur ante quis nibh laoreet malesuada. Integer dignissim ligula sed turpis fermentum, commodo condimentum tortor sollicitudin. Mauris aliquet nibh dictum nunc tempor auctor. Curabitur vel velit bibendum, venenatis justo et, dictum velit.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Height: <span>{character.height}</span></p>
                                    <p className="card-text">Mass: <span>{character.mass}</span></p>
                                    <p className="card-text">Hair Color: <span>{character.hair_color}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Skin Color: <span>{character.skin_color}</span></p>
                                    <p className="card-text">Eye Color: <span>{character.eye_color}</span></p>
                                    <p className="card-text">Birth Year: <span>{character.birth_year}</span></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Gender: <span>{character.gender}</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

