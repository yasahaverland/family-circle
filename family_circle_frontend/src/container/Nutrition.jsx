import React from "react";
import {NavLink, Link, Routes, Route} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import NutritionInfo from "../components/NutritionInfo";
import Recipes from "../components/Recipes";
import  { FaPlateUtensils }  from 'react-icons/fa'

export default function Nutrition(){
    const scrollRef = useRef(null)
    return(
        <div className='relative pb-2 h-full justify-center items-center'>
            <div className='flex flex-col pb-5'>
                <h1 className='flex p-3 text-3xl font-extrabold text-gray-900'>Nutrition</h1>
            </div>
            <div className='flex flex-row justify-between p-20 items-center'>
                <Link to='/nutrition/nutrition-info'className='flex font-bold'>
                    Nutrition Facts
                </Link>

                <Link to='/nutrition/recipes' className='flex font-bold'>
                    Recipes
                </Link>
             </div>
        </div>
    )
}