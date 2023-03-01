import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Details.css'
import Button from '@mui/material/Button';

function Details() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [details, setDetails] = useState(useSelector(store => store.details))
    const genres = useSelector(store => store.genres);
    console.log('what do i have in genres/details: ', genres, details);
    // Need to get joint table for genres and also get title, description, and poster image
    // will need to create a new reducer for these details
    // const [movie, setMovie] = useState((useSelector(store => store.movies));

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const handleClick = () => {
        history.push('/')
    }

    return (
        <>
            <h2>Details</h2>
            <h3>{details.title}</h3>
            {genres.map((genre, i)=> {
                console.log('genres ', genre);
                return (
                <div key={i}>
                    <p>{genre.name}</p>
                </div>
                );
            })}
            <div>
                <img src={details.poster} alt={details.title}/>
                <p>{details.description}</p>
            </div>
            <Button onClick={handleClick} variant="contained">Back!</Button>
        </>

    );
}

export default Details;