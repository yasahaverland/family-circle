import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { client } from './client'

function App() {
  const [user, setUser] = useState({})
  
  const navigate = useNavigate()


// create or get user = if user is already in database, get it, but if user is NOT in database, create one!
// functions is invoked everytime user logs in
  const createOrGetUser = async(response) => {
    const userObject = jwt_decode(response.credential)
    console.log(userObject)
    localStorage.setItem('user' , userObject)
    const { name, sub, picture } = userObject

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    setUser(userObject)
    client.createIfNotExists(doc)
        .then(() => {
            navigate('/', { replace: true})
        })

  }


  
  useEffect(() => {
    if(!user) navigate('/login')  
  },[])
  
  return (
   <GoogleOAuthProvider 
      clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      >
    <Routes>
        <Route path='login' element={<Login createOrGetUser={createOrGetUser} user={user} />}/>
        <Route path='/*' element={<Home user={user} />}/>
    </Routes>
  </GoogleOAuthProvider>
  );
}

export default App;
