import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { recipeQuery } from '../utils/data'
import Masonry from 'react-masonry-css';
import Spinner from './Spinner'
import Recipe from "./Recipe";

export default function RecipesLayout({recipes}){
    const [loading, setLoading] = useState(false)
    // const [ recipes, setRecipes] = useState()

    const breakpointColumnsObj = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1,
      };

    return(
        <div>
            <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointColumnsObj}>
                {recipes?.map((recipe) => <Recipe key={recipe._id} recipe={recipe} className='w-max'/>)}
            </Masonry>
        </div>
    )
}