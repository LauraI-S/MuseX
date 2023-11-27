import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../src/pages/Home';
import SignUp from '../src/pages/SignUp';
import Login from './pages/Login';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
