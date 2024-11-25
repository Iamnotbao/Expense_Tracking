import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from './components/mainpage'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
    <Routes>
      <Route path='expense_tracking/login' element={<Login/>}/>
      <Route path='expense_tracking/home' element={<MainPage/>}/>
    </Routes>
     </BrowserRouter>
     
    
  )
}

export default App
