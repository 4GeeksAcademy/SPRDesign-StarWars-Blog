import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function CharacterDescription() {
    const { id } = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {
        async function getCharacter() {
            let response = await fetch("https://swapi.dev/api/people/" + id)
            let data = await response.json()
            setCharacter(data)
        }
        getCharacter()
    }, [])

    return (
        <div className='description'>
            <div className='details title'>character:{character.name}</div>
            <div className='details'>hair color:{character.hair_color}</div>
            <div className='details'>eye color:{character.eye_color}</div>
            <div className='details'>birth year:{character.birth_year}</div>
            <div className='details'>height:{character.height}</div>
        </div>
    )
}