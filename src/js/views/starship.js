import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function StarshipDescription() {
    const { id } = useParams()
    const [starship, setStarship] = useState({})
 
    useEffect(() => {
        async function getStarship() {
            let response = await fetch("https://swapi.dev/api/starships/" + id)
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