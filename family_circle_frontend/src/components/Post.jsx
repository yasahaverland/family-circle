import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';

export default function Post({postImg, user}) {
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)
    const { postedBy, image, _id, save} = postImg
    
    const navigate = useNavigate()
    
    const userInfo = user
    // putting the two !! makes this statment return a true or false value
    let alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === userInfo?.sub))?.length

    // console.log(user)

    const deletePost = (id) => {
        client
          .delete(id)
          .then(() => {
            window.location.reload()
          });
      };

    const savePost = (id) => {
        if (!alreadySaved) {
          setSavingPost(true);
    
        // SANITY sintax
          client
            .patch(id)
            .setIfMissing({ save: [] })
            // save the object at the end 
            .insert('after', 'save[-1]', [{
              _key: uuidv4(),
              userId: userInfo?.sub,
              postedBy: {
                _type: 'postedBy',
                _ref: userInfo?.sub, 
              },
            }])
            .commit()
            .then(() => {
              window.location.reload()
              setSavingPost(false)
            })
        }
      }

    return(
        <div className='m-2'>
            <div 
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/imgpost-detail/${_id}`)}
                className=' relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
      
                <img className='rounded-lg w-full ' src={(urlFor(image).width(250).url())} alt='user-post' />
                {postHovered && (
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
                            {alreadySaved? (
                                <button type='button' className='bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                {save?.length}  Saved
                                </button>
                            ) : (
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    savePost(_id);
                                }}
                                type='button'
                                className='bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                >
                                {postImg?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                </button>
                            )}
                            {
                                postedBy?.id === userInfo?.sub && (
                                    <button
                                      type='button'
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deletePost(_id);
                                      }}
                                      className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
                                    >
                                      <AiTwotoneDelete />
                                    </button>
                                    )
                            }
                         
                        </div>

                    </div> 
                )}

            </div>
           <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                <img
                className="w-8 h-8 rounded-full object-cover"
                src={postedBy?.image}
                alt="user-profile"
                />
                <p className="font-semibold capitalize">{postedBy?.userName}</p>
           </Link>
        </div>
    )
}