import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'

export default function StarshipCard() {

  const [starships, setStarships] = useState([])
  const { store, actions } = useContext(Context)

  useEffect(() => {
    async function getStarships() {
      let response = await fetch("https://swapi.dev/api/starships/")
      let data = await response.json()
      setStarships(data.results)
    }
    getStarships()
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
      <h1 className='starship-title'>Starships</h1>

      <div className="d-flex col-10 overflow-auto mt-5 mx-auto card-container" >
        {starships?.map((starship, index) => (

          <div key={index} className="card" style={{ minWidth: "300px" }}>
            <img src="https://www.denofgeek.com/wp-content/uploads/2019/12/x-wing.jpg?fit=1944%2C1339" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{starship.name}</h5>
              <Link to={"/starship-description/" + (index + 1)} className="btn btn-primary">Learn More</Link>
              <button onClick={(e) => handleFavorites(starship.name)}>❤️</button>
            </div>
          </div>

        ))}
      </div>

    </div>
  )
}