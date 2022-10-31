import React from "react";
import {NavLink, Link, Routes, Route} from 'react-router-dom'
import foodExemples from '../assets/foodexemples.png' 
import produceCalendar from '../assets/produce_calendar.jpg'

export default function NutritionInfo(){

    return(
        <div>
            <h1 className='flex p-3 text-3xl font-extrabold text-gray-900'>Childhood Nutrition Facts</h1>
            <div className='flex justify-center bg-gray-200 m-10 p-4 mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 p-3'>
                <p>Healthy eating in childhood and adolescence is important for proper growth and development and to prevent various health conditions. <Link to='https://www.dietaryguidelines.gov/' target='_blank' className='text-blue'>The Dietary Guidelines for Americans, 2020/2025</Link>  recommend that people aged 2 years or older follow a healthy eating pattern that includes the following:</p>
                <ul className='list-disc'> 
                    <li>
                        A variety of fruits and vegetables.
                    </li>
                    <li>
                        Whole grains.
                    </li>
                    <li>
                        Fat-free and low-fat dairy products.
                    </li>
                    <li>
                        A variety of protein foods.
                    </li>
                    <li>
                        Oils. 
                    </li>
                </ul>
            </div>
            <div className='flex justify-center bg-gray-200 m-10 p-4 mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 p-3'>
                <h2 className='font-bold'>Tips for the perfect main corse</h2>
                <p>Here are some exemples of foods from each Food Type that can be part of a healthy main corse. Hopefully these exemples will help you visualize the opitios and inspire you to mix and match to create a delitious meal your little one would like.</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={foodExemples} alt='food Exemples from each food category' className=' flex px-6 w-50' />
            
                <div className='flex justify-center bg-gray-200 m-10 p-4 mb-20 items-center flex-col border-2 border-solid rounded-lg border-gray-300 p-3'>
                    <p>
                         Another amazing tip is to know what are the produces in season where you live, this way not only you can save money, but also serve the freshest ingredients for your family.
                    </p>
                    <p>
                        You can check out the chart bellow or go to <Link to='https://www.seasonalfoodguide.org/' target='_blank' className='text-blue'>Seasonal Foodguide</Link>  to search what is in season near you.
                    </p>

                </div>
                <img src={produceCalendar} alt='produce harvest calendar' className='flex w-50 p-5'/> 
            </div>
      
        </div>
    )
}