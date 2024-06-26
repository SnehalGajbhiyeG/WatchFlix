
import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => { 

    const trailerVideo = useSelector(store => store.movies?.trailerVideo)

    useMovieTrailer(movieId); 

    return (
        <div className='w-screen overflow-hidden'>
            <iframe 
            className='w-screen aspect-[16/9]'
           // src="https://www.youtube.com/embed/e1k1PC0TtmE?si=63Fb72YJ7-F4VZ9r" 
            src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?&autoplay=1&mute=1"}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            frameBorder="0"
            >
            </iframe>
        </div>
    )
}

export default VideoBackground