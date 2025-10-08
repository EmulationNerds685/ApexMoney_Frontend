import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Signup } from '../components/Signup'
import Home from '../components/Home'

function AppRoute() {
  return (
    <Routes>
        <Route   path='/' element={<Home/>}/>
        <Route   path='/signup/login' element={<Signup/>}/>
        
    </Routes>
  )
}

export default AppRoute
