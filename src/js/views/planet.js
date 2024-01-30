import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function PlanetDescription() {
    const { id } = useParams()
    const [planet, setPlanet] = useState({})

    useEffect(() => {
        async function getPlanet() {
            let response = await fetch("https://swapi.dev/api/planets/" + id)
            let data = await response.json()
            setPlanet(data)
        }
        getPlanet()
    }, [])

    return (
        <div className='description'>
            <div className='details title'>planet name:{planet.name}</div>
            <div className='details'>rotation period:{planet.rotation_period}</div>
            <div className='details'>orbital period:{planet.orbital_period}</div>
            <div className='details'>diameter:{planet.diameter}</div>
            <div className='details'>climate:{planet.climate}</div>
        </div>
    )
}