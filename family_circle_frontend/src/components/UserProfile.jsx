import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const activeBtnStyles = 'bg-blue-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

export default function UserProfile({user}) {

    const [currentUser, setCurrentUser] = useState();
    const [postImgs, setPostImgs] = useState();
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const query = userQuery(userId);
        console.log(query)
        client.fetch(query).then((data) => {
            setCurrentUser(data[0]);
        });
      }, [userId]);
    
    useEffect(() => {
        if (text === 'Created') {
          const createdPostsQuery = userCreatedPostsQuery(userId);
    
          client.fetch(createdPostsQuery).then((data) => {
            setPostImgs(data);
            console.log(data)
          });
        } else {
          const savedPostsQuery = userSavedPostsQuery(userId);
    
          client.fetch(savedPostsQuery).then((data) => {
            setPostImgs(data);
          });
        }
      }, [text, userId]);

    const logout = () => {
        localStorage.clear();
    
        navigate('/login');
      }
    
    if (!user) return <Spinner message="Loading profile" />

    return(
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="flex flex-col justify-center items-center">
                    <img
                        className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                        src='https://www.conserve-energy-future.com/wp-content/uploads/2020/07/Sunflower.jpg'
                        alt="user-pic"
                    />
                    <img
                        className="rounded-full w-30 h-30 -mt-10 shadow-xl object-cover"
                        src={user.image}
                        alt="user-pic"
                    />
                </div>
                <h1 className="font-bold text-3xl text-center mt-3">
                    {user.userName}
                </h1>
                <div className="absolute top-0 z-1 right-0 p-2">
                    {userId === user._id && (
                        <button
                        type='button'
                        className='bg-white border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                        onClick={() => {
                          googleLogout()
                          logout()
                        }}
                        >
                        <AiOutlineLogout color='red' fontSize={21} />
                      </button>
                    )}
                </div>
            </div>
            <div className="text-center mb-7">
                <button
                    type="button"
                    onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('created');
                    }}
                    className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                >
                    Created
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                    setText(e.target.textContent);
                    setActiveBtn('saved');
                    }}
                    className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                >
                    Saved
                </button>
            </div>
            <div className="px-2">
                <MasonryLayout postImgs={postImgs} />
            </div>

            {postImgs?.length === 0 && (
                <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                    No Pins Found!
                </div>
            )}

        </div>
    )
}