import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/NavBar'
import Feed from '../components/Feed'
import ImgPostDetail from '../components/ImgPostDetail'
import NewImgPost from '../components/NewImgPost'

export default function Posts({ user }) {
  console.log(user)
    return(
        <div className='px-2 md:px-5'> 
             <div className="bg-gray-50">
                <Navbar user={user && user} />
            </div>
        <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed user={user} />} />
          <Route path="/collection/:collectionId" element={<Feed user={user} />} />
          <Route path="/imgpost-detail/:imgpostId" element={<ImgPostDetail user={user && user} />} />
          <Route path="/upload-new-img" element={<NewImgPost user={user && user} />} />
        </Routes>
      </div>
    </div>
    )
}