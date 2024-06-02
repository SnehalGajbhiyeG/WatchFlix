import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header';
import GptSearch from './GptSearch';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import { useSelector } from 'react-redux';

const Browse = () => {
  
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies(); 
  usePopularMovies(); 

  return (
    <div>
      <Header/> 
      {
        showGptSearch ? (
          <GptSearch/>
        ) : (
          <>
              <MainContainer />
              <SecondaryContainer />
          </>
        )
      }
         
      {/*
      
      MainContainer
         - VideoBackground
         - VideoTitle
      SecondaryContainer
         - MovieList * n
            - cards * n 
      
      */}
    </div>
  )
}

export default Browse