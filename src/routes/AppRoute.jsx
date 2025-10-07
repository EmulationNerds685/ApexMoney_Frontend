import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Signup } from '../components/Signup'
import Hero from '../components/HeaderHero'

function AppRoute() {
  return (
    <Routes>
        <Route   path='/' element={<Hero/>}/>
        <Route   path='/signup/login' element={<Signup/>}/>
        
    </Routes>
  )
}

export default AppRoute
