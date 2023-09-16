import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"




import {BrowserRouter, Routes, Route,Link} from "react-router-dom"

export default function App() {
  
  return (
    <BrowserRouter>
     
    <Routes>
    <Route  index element={<Home />}/>
    <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
    </BrowserRouter>
    
  )
}
