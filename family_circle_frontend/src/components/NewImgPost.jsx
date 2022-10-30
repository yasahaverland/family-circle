import React, {useState, useEffect } from "react"
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Form, useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Spinner from './Spinner'
import { client } from '../client'
import { collections } from "../utils/data"

export default function NewImgPost({user}) {

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState()
    const [imageAsset, setImageAsset] = useState('')
    const [wrongImageType, setWrongImageType] = useState(false)
    const [collection, setCollection] = useState([])

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!user) {
    //       setAlert({
    //         variant: "danger",
    //         message: "Please sign in to make a post!",
    //       });
    //       navigate("/login");
    //     }
    //   }, [user]);
    

    // sanity sintax -- upload done by sanity
    const uploadImage = (e) => {
        const { type, name } = e.target.files[0];
        // uploading asset to sanity
        if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
          setWrongImageType(false);
          setLoading(true);
          client.assets
            .upload('image',  e.target.files[0], { contentType: type, filename: name })
            .then((document) => {
              setImageAsset(document);
              setLoading(false);
            })
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        } else {
          setLoading(false);
          setWrongImageType(true);
        }
      }

      const savePost = () => {
        if (title && about && imageAsset?._id && collection) {
          const doc = {
            _type: 'imgpost',
            title,
            about,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset?._id,
              },
            },
            userId: user._id,
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
           collection,
          };
          client.create(doc).then(() => {
            navigate('/')
            collections.push(collection)
          });
        } else {
          setFields(true);
    
          setTimeout(
            () => {
              setFields(false);
            },
            2000,
          );
        }
      }
           
    console.log('COLECTIONS', collection)
    return(
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5"> 
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
            )}
            <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    {/* upload img square */}
                    <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && (<Spinner />)}
                        {wrongImageType && (<p> wrong file type.</p>)}
                        {!imageAsset ? (
                            // eslint-disable-next-line jsx-a11y/label-has-associated-control
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">Click to upload</p>
                                    </div>
                                    <p className="mt-32 text-gray-400">
                                        Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                 />
                            </label>
                        ) : (
                            <div className="relative h-full">
                                <img
                                    src={imageAsset?.url}
                                    alt="uploaded-pic"
                                    className="h-full w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add your title"
                        className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
                    />
                    {user && (
                        <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                        <img
                            src={user.image}
                            className="w-10 h-10 rounded-full"
                            alt="user-profile"
                        />
                        <p className="font-bold">{user.userName}</p>
                        </div>
                    )}
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Tell everyone what your Post is about"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />
                    <input
                        type="text"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        placeholder='Create new Collection'
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />
                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text:lg sm:text-xl">Add to a Collection</p>
                            <select
                                onChange={(e) => {
                                setCollection(e.target.value);
                                }}
                                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                            >
                                <option value="others" className="sm:text-bg bg-white">Select Collection</option>
                                {collection.map((item) => (
                                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                        {item.name}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="button"
                                onClick={savePost}
                                className="bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                            >
                                Save Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}