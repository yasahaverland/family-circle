import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

// add search bar to search recipes only!!
export default function NavBar({ user }) {

    if (user) {
        return (
            <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7 '>
                <div className='flex gap-3 '>
                    <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                        <img src={user.image} alt='user-pic' className='w-12 h-12 rounded-full ' />
                    </Link>
                    <Link to='/upload-new-img' className='bg-navy text-white rounded-full w-12 h-12 md:w-12 md:h-12 flex justify-center items-center'>
                        <IoMdAdd />
                    </Link>
                </div>
            </div>
        );
    }

    return null;
    
}