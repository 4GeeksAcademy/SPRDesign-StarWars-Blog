import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function VehicleDescription() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({})

     useEffect(() => {
        async function getVehicle() {
            let response = await fetch("https://swapi.dev/api/vehicles/" + id)
            let data = await response.json()
            setVehicle(data)
        }
        getVehicle()
    }, [])
  
    return (
        <div className='description'>
            <div className='details title'>starship:{vehicle.name}</div>
            <div className='details'>model:{vehicle.model}</div>
            <div className='details'>manufacturer:{vehicle.manufacturer}</div>
            <div className='details'>credits:{vehicle.cost_in_credits}</div>
            <div className='details'>length:{vehicle.length}</div>
        </div>
    )
}