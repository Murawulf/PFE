import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './about';
import Home from './Home';
import Reservation from './Reservation';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Profile from './Profile'; // Corrected import path
import Omra from './Omra';
import Groupe from './groupe';
import Comite from './comite';
import Voiture from './Voiture';
import Hotel from './Hotel';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Corrected component prop */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/omra" element={<Omra />} />
        <Route path="/voiture" element={<Voiture />} />
        <Route path="/groupe" element={<Groupe />} />
        <Route path="/comite" element={<Comite />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/Profile/:name" exact component={Profile} />

      </Routes>
    </Router>
  );
}

export default App;
