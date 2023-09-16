//import React from "react"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

export default function Card(props){
    
    return(
        <div data-testid= "movie-card" >
              <Link className="link" to={`/movies/${props.id}`}>
             <img data-testid= "movie-poster" src={`https://image.tmdb.org/t/p/w500${props.posterPath}`} alt="Movie Poster" />
             <p data-testid= "movie-release-date">{props.releaseDate}</p>
             <h4 data-testid= "movie-title">{props.title}</h4>
             </Link>
             
        </div>
    )
}
