import React from 'react';
import {useSelector} from 'react-redux'; 
import { lang } from '../utils/languageConstants';

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='sm:w-3/4 md:w-1/2 bg-black rounded-lg grid grid-cols-12'>
        <input
          type="text"
          classsName="p-4 col-span-10 bg-gray-800 text-white rounded-lg focus:outline-none"
         placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
        >
          {lang[langKey].search}

        </button>
      </form>
    </div>
  )
}

export default GptSearchBar