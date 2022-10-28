import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import background from '../assets/treebg.jpg'
import logo from '../assets/logo_name_white.png'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

export default function Login(props) {

    // const [user, setUser] = useState({name: '', sub:'', picture:''})

    // const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
    // // const [ user, setUser ] = useState({})
    // const navigate = useNavigate()
    
    // function handleCallBackResponse(response) {
    //      console.log('Encoded jwt id token: ' + response.credential)
    //      const userObject = jwt_decode(response.credential)
    //     //  setUser(userObject)
    //      const { name, sub, picture } = userObject
    //      console.log(userObject)
    //      const doc = {
    //         _id: sub,
    //         _type: 'document',
    //         userName: name,
    //         image: picture
    //      }

    //      client.createIfNotExists(doc)
    //         .then(() => {
    //             navigate('/', { replace: true})
    //         })
    // }

    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: clientId,
    //         callback: handleCallBackResponse
    //     });

    //     google.accounts.id.renderButton(
    //         document.getElementById('signInDiv'),
    //         { theme: 'outline', size:'large'}
    //     )
    // }, [])
 
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className='relative w-full h-full'>
                <img 
                    src={background} alt='tree with hadsprint as leafs' className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width='300px' alt='logo' />
                    </div>
                    <div className='shadow-2xl'>
                        <div >
                            <GoogleLogin 
                                onSuccess={(response) => props.createOrGetUser(response)}
                                onError={() => console.log('error')}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}