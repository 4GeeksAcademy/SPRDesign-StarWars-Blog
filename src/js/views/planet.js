import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function PlanetDescription() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [planet, setPlanet] = useState({});

    useEffect(() => {
        async function getPlanet() {
            let response = await fetch(`https://swapi.tech/api/planets/${id}`);
            let data = await response.json();
            console.log(data);

            setPlanet(data?.result?.properties);
        }
        getPlanet();
    }, []);

    // Función para manejar el retorno a la página principal
    const handleReturn = () => {
        navigate('/'); // Redirige a la página principal
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="card mx-auto" style={{ maxWidth: '900px', border: '2px solid gold', backgroundColor: 'transparent' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                            alt="Planet"
                            className="img-fluid"
                            style={{ borderRight: '2px solid gold', borderBottom: '2px solid gold' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="card-title">{planet.name}</p>
                                    <p className="card-text-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida libero sed tempus convallis. Ut consectetur ante quis nibh laoreet malesuada. Integer dignissim ligula sed turpis fermentum, commodo condimentum tortor sollicitudin. Mauris aliquet nibh dictum nunc tempor auctor. Curabitur vel velit bibendum, venenatis justo et, dictum velit.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Climate: <span>{planet.climate}</span></p>
                                    <p className="card-text">Diameter: <span>{planet.diameter}</span></p>
                                    <p className="card-text">Gravity: <span>{planet.gravity}</span></p>
                                    <p className="card-text">Terrain: <span>{planet.terrain}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Orbit Period: <span>{planet.orbital_period}</span></p>
                                    <p className="card-text">Population: <span>{planet.population}</span></p>
                                    <p className="card-text">Rotation Period: <span>{planet.rotation_period}</span></p>
                                    <p className="card-text">Water Surface: <span>{planet.surface_water}</span></p>
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

