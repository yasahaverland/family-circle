import React, { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import { client } from "../client"
import { recipeQuery } from '../utils/data'
import RecipesLayout from "./RecipesLayout"
import Spinner from './Spinner'


export default function Recipes({user}){
    const [loading, setLoading] = useState(false)
    const [ recipes, setRecipes] = useState()

    useEffect(() => {
        setLoading(true)

        client.fetch(recipeQuery).then((data) => {
            setRecipes(data)
            setLoading(false)
        })
    },[])

    if (loading) {
        return (
          <Spinner message={`Loading`}/>
        )
      }
    return(
        <div>
            <h1 className='flex p-3 text-3xl font-extrabold text-navy'>Recipes</h1>
            {recipes && <RecipesLayout user={user && user} recipes={recipes} /> }

           <div className='flex justify-center bg-gray-200 m-10 p-4 mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 p-3'>
                <p>
                    You can fin all these recipes with videos and more at <Link to='https://babyfoode.com/blog/40-dinner-ideas-for-toddler-and-kids/' target='_blank' className='text-blue'>Baby Foode.</Link>
                </p>

            </div>
        </div>
    )
}