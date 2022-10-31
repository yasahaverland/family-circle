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
            <div className='flex justify-center bg-gray-200 m-10 p-4 mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 p-3'>
                <p>Nutrition is a big part of a child’s life and an even bigger part of parent’s struggles. Hopefully you can find easy to understand and helpful insights on this topic with our Nutrition facts, and baby/toddler friendly recipes!</p>
            </div>
            <div className='flex  md:flex-row flex-col justify-between p-20 items-center'>
                <Link to='/nutrition/nutrition-info'className='flex'>
                    <div className='flex justify-center mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 shadow-lg p-3 w-40 h-40'>
                        <img src='https://cdn-icons-png.flaticon.com/512/3274/3274055.png' alt='food pyramid' className='w-20' />
                        <p>Nutrition Facts</p>
                    </div>
                </Link>
                 <Link to='/nutrition/recipes' className='flex'>
                    <div className='flex justify-center mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 shadow-lg p-3 w-40 h-40'>
                        <img src='https://cdn-icons-png.flaticon.com/512/2755/2755307.png' alt='recipe book icon' className='w-20'/>
                        <p>Recipes</p>
                    </div>
                </Link>
             </div>
        </div>
    )
}