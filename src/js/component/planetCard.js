import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'

export default function PlanetCard() {

  const [planet, setPlanet] = useState([])
  const { store, actions } = useContext(Context)

  useEffect(() => {
    async function getplanet() {
      let response = await fetch("https://swapi.dev/api/planets/")
      let data = await response.json()
      setPlanet(data.results)
    }
    getplanet()
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
      <h1 className='planet-title'>Planets</h1>

      <div className="d-flex col-10 overflow-auto mt-5 mx-auto card-container" >
        {planet?.map((planet, index) => (
          <div key={index} className="card" style={{ minWidth: "300px" }}>

            <img src="https://static.wikia.nocookie.net/starwars/images/7/72/Teth-TVE.png/revision/latest?cb=20190423045047" className="card-img-top" alt="..." />

            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <Link to={"/planet-description/" + (index + 1)} className="btn btn-primary">Learn More</Link>
              <button onClick={(e) => handleFavorites(planet.name)}>❤️</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}