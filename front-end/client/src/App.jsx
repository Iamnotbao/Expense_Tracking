import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from './components/MainPage';
import Income from './components/Income';
import Expense from './components/Expense';
import Share_Expense from './components/Share_Expense';
import User from './components/User';
import Profile_DashBoard from './components/Profile_Dashboard';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='expense_tracking/login' element={<Login/>}/>
      <Route path='expense_tracking/' element={<MainPage/>}/>
      <Route path='expense_tracking/income' element={<Income/>}/>
      <Route path='expense_tracking/expense' element={<Expense/>}/>
      <Route path='expense_tracking/user' element={<User/>}/>
      <Route path='expense_tracking/share_table' element={<Share_Expense/>}/>
      <Route path='expense_tracking/profile' element={<Profile_DashBoard/>}/>

    </Routes>
     </BrowserRouter>
     
    
  )
}

export default App
