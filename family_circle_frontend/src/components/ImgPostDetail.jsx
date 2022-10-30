import React, {useState, useEffect} from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { postDetailMorePinQuery, postDetailQuery } from '../utils/data';
import Spinner from './Spinner';

export default function ImgPostDetail({ user }) {
    const { imgpostId } = useParams();
    const [posts, setPosts] = useState();
    const [postDetail, setPostDetail] = useState();
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    
    const fetchPostDetails = () => {
        const query = postDetailQuery(imgpostId);
    
        if (query) {
          client.fetch(`${query}`).then((data) => {
            setPostDetail(data[0])
            if (data[0]) {
              const query1 = postDetailMorePinQuery(data[0]);
              client.fetch(query1).then((res) => {
                setPosts(res);
              });
            }
          });
        }
      };
    
    useEffect(() => {
        fetchPostDetails();
      }, [imgpostId]);
    
    const addComment = () => {
        if(comment) {
          setAddingComment(true);
    
          client
            .patch(imgpostId )
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
            .commit()
            .then(() => {
              fetchPostDetails();
              setComment('');
              setAddingComment(false);
            })
        }
      }
    
      if (!postDetail) {
        return (
          <Spinner message="Loading Post" />
        );
      }
    return(
        <>
        {postDetail && (
            <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
                <div className="flex justify-center items-center md:items-start flex-initial">
                    <img
                        className="rounded-t-3xl rounded-b-lg"
                        src={(postDetail?.image && urlFor(postDetail?.image).url())}
                        alt="user-post"
                    />
                </div>
                <div className="w-full p-5 flex-1 xl:min-w-620">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <a
                                href={`${postDetail.image.asset.url}?dl=`}
                                download
                                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                                >
                                <MdDownloadForOffline />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold break-words mt-3">
                            {postDetail.title}
                        </h1>
                        <p className="mt-3">{postDetail.about}</p>
                    </div>
                    <Link to={`/user-profile/${postDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
                        <img src={postDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                        <p className="font-bold">{postDetail?.postedBy.userName}</p>
                    </Link>
                    <h2 className="mt-5 text-2xl">Comments</h2>
                    <div className="max-h-370 overflow-y-auto">
                        {postDetail?.comments?.map((item) => (
                            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                                <img
                                    src={item.postedBy?.image}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    alt="user-profile"
                                />
                                <div className="flex flex-col">
                                    <p className="font-bold">{item.postedBy?.userName}</p>
                                    <p>{item.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap mt-6 gap-3">
                        <Link to={`/user-profile/${user._id}`}>
                            <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                        </Link>
                        <input
                            className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                            type="text"
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-green-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                            onClick={addComment}
                        >
                            {addingComment ? 'Doing...' : 'Done'}
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}