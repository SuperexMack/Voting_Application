import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import OfficerLogin from './Authentication/OfficerLogin';
import Officersignup from './Authentication/OfficerSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navbar/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Register/>}></Route>
    <Route path='/officerlogin' element={<OfficerLogin/>}></Route>
    <Route path='/officersignup' element={<Officersignup/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
