import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import './App.css'
import Nav from './Components/Navbar'
import Home from './Pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/learning" element={<Learning />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/detect/:number" element={<Detection />} />
        <Route path="/overall" element={<Overalltest />} />
        <Route path="/course" element={<Coursetest />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

// export default App
