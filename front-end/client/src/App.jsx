import React from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login'
import MainPage from './components/mainpage'
import Signup from './components/Signup'
import ChartComponent from './components/ChartComponent';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
    //<MainPage/>
    //<Signup/>
    //<ChartComponent/>
  );
}

export default App
