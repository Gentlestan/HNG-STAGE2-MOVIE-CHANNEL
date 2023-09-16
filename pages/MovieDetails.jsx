

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import group21 from "../images/Group-21.png"
import frame from "../images/Frame-3.png"
import star from "../images/Star.png"
import group50 from "../images/Group-50.png"
import group51 from  "../images/Group-51.png"


export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  
   const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);
  
  

  useEffect(() => {
    const apiKey = "357b23f45153643280911902dc5b08b2";
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
   

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
          
          // Convert the release_date to UTC format
        const releaseDate = new Date(data.release_date);
        const utcReleaseDate = releaseDate.toUTCString();
          
        setMovieDetails({
            ...data,
            release_date: utcReleaseDate,
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
      
      
    // Fetch movie credits to get directors, writers, and stars
    fetch(creditsUrl)
      .then((res) => res.json())
      .then((data) => {
        // Find directors and writers in the crew
        const crew = data.crew;
        const directorList = crew.filter((member) => member.job === "Director");
        const writerList = crew.filter((member) => member.department === "Writing");

        // Extract names of directors and writers
        const directorNames = directorList.map((director) => director.name);
        const writerNames = writerList.map((writer) => writer.name);

        // Extract names of cast members (stars)
        const castList = data.cast;
        const starNames = castList.map((star) => star.name);

        setDirectors(directorNames);
        setWriters(writerNames);
        setStars(starNames);
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
      
      
  }, [id]);

  if (!movieDetails) {
    // Render a loading indicator or message while fetching data
    return <div>Loading...</div>;
  }

  return (
      
    <div className="container" >
    <div className="movidetails-container">
        <div className="movie-nav-container">
            <div className="nav-img">
                <img src={group21}/>
            </div>
        </div>
      <div>
      <div className="backdrop-container">
        <img
          className="poster-img"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt="Movie Poster"
        />
        <img className="img-frame" src={frame}/>
        </div>
        
        <div className="title-cont">
        <p data-testid="movie-title"> {movieDetails.title}</p>
        <p data-testid="movie-release-date">{movieDetails.release_date}</p>
        <p className="runtime-txt" >Runtime: {movieDetails.runtime} minutes</p>
        <img src={star} />
        <p>{movieDetails.vote_average} | {movieDetails.vote_count} votes</p>
        </div>
        <div className="overview">
        {movieDetails.overview}
        <div >
         <img src={group50} />
          <img src={group51} />
        </div>
        </div>
        {/* You can display other movie details here */}
        
        <div className="back-to-home">
        <Link to="/">Click to Homepage</Link>
        </div>

         <div className="actors-directors">
         <p>Directors: {directors.join(", ")}</p>
         <p>Writers: {writers.join(", ")}</p>
         <p>Stars: {stars.join(", ")}</p> 
        </div>    
      </div>
      </div>
    </div>
  );
}
