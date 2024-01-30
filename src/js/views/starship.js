import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function StarshipDescription() {
    const { id } = useParams()
    const [starship, setStarship] = useState({})

    function findNewId(oldID) {
        const idMap = {
          1: 2,
          2: 3,
          3: 5,
          4: 9,
          5: 11,
          6: 12,
          7: 13,
          8: 15,
          9: 17
        };
        return idMap[oldID] || null;
      }

      let updatedid = findNewId(id)

    useEffect(() => {
        async function getStarship() {
            let response = await fetch("https://swapi.dev/api/starships/" + updatedid)
            let data = await response.json()
            setStarship(data)
        }
        getStarship()
    }, [])

    

    return (
        <div className='description'>
            <div className='details title'>starship:{starship.name}</div>
            <div className='details'>model:{starship.model}</div>
            <div className='details'>manufacturer:{starship.manufacturer}</div>
            <div className='details'>credits:{starship.cost_in_credits}</div>
            <div className='details'>length:{starship.length}</div>
        </div>
    )
}