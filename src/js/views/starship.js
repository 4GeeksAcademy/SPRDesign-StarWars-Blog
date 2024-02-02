import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function StarshipDescription() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [starship, setStarship] = useState({});

    useEffect(() => {
        async function getStarship() {
            let response = await fetch(`https://swapi.tech/api/starships/${id}`);
            let data = await response.json();
            setStarship(data?.result?.properties);
        }
        getStarship();
    }, []);

    // Función para manejar el retorno a la página principal. Recordar importar UseNavigate
    const handleReturn = () => {
        navigate('/'); // Redirige a la página principal
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="card mx-auto" style={{ maxWidth: '900px', border: '2px solid gold', backgroundColor: 'transparent' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                            alt="Starship"
                            className="img-fluid"
                            style={{ borderRight: '2px solid gold', borderBottom: '2px solid gold' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="card-title">{starship.name}</p>
                                    <p className="card-text-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida libero sed tempus convallis. Ut consectetur ante quis nibh laoreet malesuada. Integer dignissim ligula sed turpis fermentum, commodo condimentum tortor sollicitudin. Mauris aliquet nibh dictum nunc tempor auctor. Curabitur vel velit bibendum, venenatis justo et, dictum velit.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Cargo Capacity: <span>{starship.cargo_capacity}</span></p>
                                    <p className="card-text">Consumables: <span>{starship.consumables}</span></p>
                                    <p className="card-text">Cost: <span>{starship.cost_in_credits}</span></p>
                                    <p className="card-text">Crew: <span>{starship.crew}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Length: <span>{starship.length}</span></p>
                                    <p className="card-text">Manufacturer: <span>{starship.manufacturer}</span></p>
                                    <p className="card-text">Passengers: <span>{starship.passengers}</span></p>
                                    <p className="card-text">MGLT: <span>{starship.MGLT}</span></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-3">
                <button className="btn btn-warning text-white" onClick={handleReturn}>
                    Back to main
                </button>
            </div>

        </div>
    );
}

