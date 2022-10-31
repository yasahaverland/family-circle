import React, { useState, useEffect } from "react"
import jwt_decode from 'jwt-decode'
import { useParams, useNavigate } from 'react-router-dom'
import { recipeQuery } from '../utils/data'
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import Spinner from './Spinner'
import { client, urlFor } from '../client';

export default function Recipe(recipe){
    const [loading, setLoading] = useState(false)
    const [ recipeHovered, setRecipeHovered] = useState(false)
    const [savingRecipe, setSavingRecipe] = useState(false)

   

    const navigate = useNavigate()
    const image = recipe.recipe.image
    const _id = recipe.recipe._id

    const deletePost = (id) => {
        client
          .delete(id)
          .then(() => {
            window.location.reload()
          })
      }

    console.log(image)

    return(
        <>
        <div>
            <div 
                onMouseEnter={() => setRecipeHovered(true)}
                onMouseLeave={() => setRecipeHovered(false)}
                onClick={() => navigate(`/nutrition/recipes/${_id}`)}
                className=' relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
                <img className='rounded-lg p-6 w-full' alt='recipe pic' src={(urlFor(image).width(350).url())} />    
                {recipeHovered && (
                    <div
                    className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                    style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            <button
                                type='button'
                                onClick={(e) => {
                                e.stopPropagation()
                                deletePost(_id)
                                }}
                                className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
                            >
                                <AiTwotoneDelete />
                            </button>
                        </div>
                </div>
                )}
            </div>

            
            
        </div>
        </>
    )
}