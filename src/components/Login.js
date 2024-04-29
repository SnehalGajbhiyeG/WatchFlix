import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { checkValidateData } from '../utils/validate';
import Header from './Header';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom'
import { updateProfile } from "firebase/auth";

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

  const name = useRef(null); 
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data  
    // console.log(email.current.value)
    // console.log(password.current.value) 

    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message); 
    if (message) return; 

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
        )

        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
          console.log(user); 
          navigate("/browse"); 
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ errorMessage)
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user); 
          navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage); 
        });
    }
  }; 

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg " />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (<input
          ref = {name}
          type="text"
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-gray-700' />)}

        <input
          ref={email}
          type="text"
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700' />

        <input
          ref={password}
          type="password"
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700' />

        <p className='text-red-500 font-bold'>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 hover:bg-red-800 w-full rounded-lg '
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to WatchFlix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  )
}

export default Login