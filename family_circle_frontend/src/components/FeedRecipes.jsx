import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { recipeQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

export default function FeedRecipes(){
    const [loading, setLoading] = useState(false)
    const [ recipes, setRecipes] = useState()

    return(
        <div>
           Feed Recipes
            
        </div>
    )
}