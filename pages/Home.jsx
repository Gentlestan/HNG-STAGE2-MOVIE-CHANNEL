import React from "react"
import Card from "./Card"
import bgImp from "../images/tv.png"
import bgImp1 from "../images/menu4.png"
import desc from "../images/Description-Box.png"
import footer from "../images/Footer.png"

export default function Home(){
    const [top10Movies, setTop10Movies] = React.useState([])
    
    React.useEffect(()=>{
    const apiKey = "357b23f45153643280911902dc5b08b2";
    const apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
    
     // Fetch the top-rated movies using the API key
     fetch(`${apiUrl}?api_key=${apiKey}`)
     .then(res=>res.json())
     .then(data=>{
        // Log the top 10 movies or an empty array
         const top10MoviesArray = Array.isArray(data.results)
          ? data.results.slice(0, 10)
          : [];
        setTop10Movies(top10MoviesArray)
      })
      .catch((error) => {
        console.error("Error fetching top 10 movies:", error);
      });
        
    },[])
      
    return(
        <div className="container">
        <div className="hero">
        <div className="hero-container">
        <div className="moviebox-container">
            <img src={bgImp}/>
            <h1 className="hero-moviebox-text">MovieBox</h1>
        </div>
        <div className="search-container">
              <input
              placeholder="What do you want to watch?"
              className="search-input"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="sign-in-img">
            <p className="sign-in">Sign in</p>
            <img src={bgImp1}/>
            </div>
        </div>
        <div className="desc-box">
        <img src={desc}/>
        </div>
        </div>
        <div>
            <h1>Featured movie</h1>
            <div data-testid= "movie-poster-info">
            {top10Movies.map((movie) => (
            <Card
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            releaseDate={movie.release_date}
            title={movie.title}
          />
          
        ))}
        </div>
        <div className="container-social"> <img className="social" src={footer}/></div>
        </div>  
        </div>
    )
}





