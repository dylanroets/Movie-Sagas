import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies)

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleDetails = (movie) => {
        console.log('movie selected: ', movie);
        // dispatch the details for the specific movie
        dispatch({ type: 'SET_DETAILS', payload: movie })
        // sending get genres request with specific ID for DB
        dispatch({ type: 'FETCH_GENRES', payload: {id: movie.id}})
        console.log('movieid being sent ', movie.id);
        // routes to the details page on click
        history.push('/details')
    }

    return (
        <>
            <main>
                <h1>MovieList</h1>
                <section className="moviesList">
                    {movies.map(movie => {
                        return (
                            <Card sx= {{ width: '500'}} className="film" key={movie.id} >
                                <CardActionArea>
                                <CardContent>
                                <img onClick={ () => handleDetails(movie)} src={movie.poster} alt={movie.title}/>
                                <Typography gutterBottom variant="p" component="div">
                                {movie.title}
                                </Typography>
                                </CardContent>
                                </CardActionArea>
                            </Card>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

export default MovieList;