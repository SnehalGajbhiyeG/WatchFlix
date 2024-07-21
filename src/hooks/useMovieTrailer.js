

import React from 'react';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const trailerVideo = useSelector(store => store.movies.trailerVideo)

    // Fetch trailer video && updating the store with the trailer video data

    const getMovieVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
             API_OPTIONS
        );

        const json = await data.json();
        //console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
       // console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
       !trailerVideo && getMovieVideos();
    }, []);

    return (
        <div>


        </div>
    )
}

export default useMovieTrailer