import React, {useState} from "react";
import Masonry from 'react-masonry-css';
import Post from './Post';

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

export default function MasonryLayout ({postImgs}) {
    console.log({postImgs})
    return(
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
            {postImgs?.map((postImg) => <Post key={postImg._id} postImg={postImg} className="w-max" />)}
        </Masonry>
    )
}