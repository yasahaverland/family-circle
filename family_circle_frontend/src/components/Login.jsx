import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import background from '../assets/treebg.jpg'
import logo from '../assets/logo_name_white.png'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'

export default function Login() {

    const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
    
    function handleCallBackResponse(response) {
         console.log('Encoded jwt id token: ' + response.credential)
         const userObject = jwt_decode(response.credential)
         console.log(userObject)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size:'large'}
        )
    }, [])
 
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className='relative w-full h-full'>
                <img 
                    src={background} alt='tree with hadsprint as leafs' className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width='200px' alt='logo' />
                    </div>
                    <div className='shadow-2xl'>
                        <div id='signInDiv'></div>
                            {/* clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justfy-center items-center p-3 rounded-lg cursor-pointer'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className='mr-4' /> Sign in with google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin' */}


                    </div>
                </div>

            </div>
            Login
        </div>
    )
}