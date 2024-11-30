import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from './components/MainPage';
import Income from './components/Income';
import Expense from './components/Expense';
import Share_Expense from './components/Share_Expense';
import User from './components/User';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='expense_tracking/login' element={<Login/>}/>
      <Route path='expense_tracking/home' element={<MainPage/>}/>
      <Route path='expense_tracking/home/income' element={<Income/>}/>
      <Route path='expense_tracking/home/expense' element={<Expense/>}/>
      <Route path='expense_tracking/home/user' element={<User/>}/>
      <Route path='expense_tracking/home/share_table' element={<Share_Expense/>}/>

    </Routes>
     </BrowserRouter>
     
    
  )
}

export default App
