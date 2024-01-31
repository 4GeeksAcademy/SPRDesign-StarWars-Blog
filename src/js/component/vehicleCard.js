import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'

export default function VehicleCard() {

  const [vehicles, setVehicles] = useState([])
  const { store, actions } = useContext(Context)

  useEffect(() => {
    async function getVehicles() {
      let response = await fetch("https://swapi.dev/api/vehicles/")
      let data = await response.json()
      setVehicles(data.results)
    }
    getVehicles()
  }, [])

  function handleFavorites(item) {
    if (store.favorites.includes(item)) {
      actions.deleteFavorites(item)
    }
    else {
      actions.addFavorites(item)
    }
  }

  return (
    <div>
      <h1 className='vehicle-title'>Vehicles</h1>

      <div className="d-flex col-10 overflow-auto mt-5 mx-auto card-container" >
        {vehicles?.map((vehicle, index) => (
          <div key={index} className="card" style={{ minWidth: "300px" }}>
            <img src="https://static.wikia.nocookie.net/swse/images/7/71/HAVw_A5_Juggernaut.png/revision/latest?cb=20190702182036" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{vehicle.name}</h5>
              <Link to={"/vehicle-description/" + (index + 1)} className="btn btn-primary">Learn More</Link>
              <button onClick={(e) => handleFavorites(vehicle.name)}>❤️</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}