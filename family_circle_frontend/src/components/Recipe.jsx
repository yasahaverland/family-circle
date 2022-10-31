import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { recipeQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { client, urlFor } from '../client';

export default function Recipe(recipe){
    const [loading, setLoading] = useState(false)
    const [ recipes, setRecipes] = useState()
    const image = recipe.recipe.image
    console.log(recipe.recipe.image)

    return(
        <div>
            <img className='rounded-lg w-full' alt='recipe pic' src={(urlFor(image).width(250).url())} />
        </div>
    )
}