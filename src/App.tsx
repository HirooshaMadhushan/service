import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/signup/signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Layout from "./Pages/Layout/Layout";
import Contact from './Pages/Contact/Contact';
import Booking from './Pages/Booking/Booking';
import './index.css';



function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap main pages in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="booking" element={<Booking />} />
        </Route>

        {/* Auth pages without layout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
