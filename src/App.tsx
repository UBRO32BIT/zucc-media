import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Main } from './pages/home/Main';
import { Login } from './pages/auth/Login';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="">
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="" element={<Main />}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </SnackbarProvider>
      
    </div>
  );
}

export default App;
