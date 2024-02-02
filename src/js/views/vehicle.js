import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function VehicleDescription() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        async function getVehicle() {
            let response = await fetch(`https://swapi.tech/api/vehicles/${id}`);
            let data = await response.json();
            setVehicle(data?.result?.properties);
        }
        getVehicle();
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
                            src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                            alt="Vehicle"
                            className="img-fluid"
                            style={{ borderRight: '2px solid gold', borderBottom: '2px solid gold' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="card-title">{vehicle.name}</p>
                                    <p className="card-text-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida libero sed tempus convallis. Ut consectetur ante quis nibh laoreet malesuada. Integer dignissim ligula sed turpis fermentum, commodo condimentum tortor sollicitudin. Mauris aliquet nibh dictum nunc tempor auctor. Curabitur vel velit bibendum, venenatis justo et, dictum velit.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text">Cargo Capacity: <span>{vehicle.cargo_capacity}</span></p>
                                    <p className="card-text">Consumables: <span>{vehicle.consumables}</span></p>
                                    <p className="card-text">Cost: <span>{vehicle.cost_in_credits}</span></p>
                                    <p className="card-text">Crew: <span>{vehicle.crew}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">Length: <span>{vehicle.length}</span></p>
                                    <p className="card-text">Manufacturer: <span>{vehicle.manufacturer}</span></p>
                                    <p className="card-text">Passengers: <span>{vehicle.passengers}</span></p>
                                    <p className="card-text">Speed: <span>{vehicle.max_atmosphering_speed}</span></p>
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

