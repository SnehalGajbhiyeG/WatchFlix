import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser} from '../utils/userSlice'; 
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import logo from '../images/logo.png'; 


const Header = () => { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const user = useSelector(store => store.user); 
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      navigate("/error"); 
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }));
          navigate("/browse")

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/") 
      }
    }); 

    // Unsubscribe when component unmounts 
    return () => unsubscribe();
  }, []); 

  const handleGptSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView())
  } 

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }; 

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between '>
      <img 
      className='w-72 mx-auto md:mx-0 p-4 hover:scale-110 transition-transform duration-300'
      src={logo}
     // src={watchflixlogo}
      alt="logo" />

    {user && (
    <div className='flex p-2 justify-between'> 
   { showGptSearch && (
   <select 
    className='p-2 m-2 bg-gray-900 text-white'
    onChange={handleLanguageChange}
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.identifier} value={lang.identifier}>
          {lang.name}
        </option>
      )) }
    </select>
    )}

    <button 
    className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
    onClick={handleGptSearchClick}
    >
      {showGptSearch ? "Homepage" : "GPT Search"}
    </button>

      <img 
      className='hidden md:block w-10 h-10'
      src={user?.photoURL}
      alt="usericon" 
      />
      <button onClick={handleSignOut} className=' text-white font-bold'>
        (Sign Out)
      </button>
    </div>)}
    </div>
  )
}

export default Header