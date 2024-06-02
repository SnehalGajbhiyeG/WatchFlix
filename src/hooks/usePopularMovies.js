
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants'
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {

    // Fetch Data from TMDB API and update store 
    const dispatch = useDispatch();

    const getNowPopularMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?page=1',
            API_OPTIONS
        );

        const json = await data.json();
        // console.log(json.results);
        dispatch(addPopularMovies(json.results));
    };

    useEffect(() => {
        getNowPopularMovies();
    }, []);

}

export default usePopularMovies; 