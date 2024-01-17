import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Main } from './pages/home/Main';
import { Login } from './pages/auth/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="" element={<Main />}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
