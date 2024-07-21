import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCart = ({posterPath}) => {
  return (
    <div className='sm:w-36 md:w-44 pr-4 rounded-sm'>
      <img alt="Movie Cart" 
      src={IMG_CDN_URL + posterPath}
      />
    </div>
  )
}

export default MovieCart; 