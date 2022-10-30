import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

export default function Feed({user}) {
    const [loading, setLoading] = useState(false);
    const [ postImgs, setPostImgs] = useState();
    const { collectionId } = useParams();
    useEffect(() => {
        if (collectionId) {
          setLoading(true);
          const query = searchQuery(collectionId);
          client.fetch(query).then((data) => {
            setPostImgs(data);
            setLoading(false);
          });
        } else {
          setLoading(true);
    
          client.fetch(feedQuery).then((data) => {
            setPostImgs(data);
            setLoading(false);
          });
        }
       
    }, [collectionId]);

    if (loading) {
        return (
          <Spinner message={`Loading`}/>
        );
      }
    return(
            <div>
                {postImgs && (
                    <MasonryLayout user={user} postImgs={postImgs} />
                )}
            </div>
    )
}