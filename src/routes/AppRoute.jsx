import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { Signup } from '../components/Signup'
import Home from '../components/Home'
import { AddExpenseForm } from '../components/AddExpenseForm'

function AppRoute() {
  return (
    <Routes>
        <Route   path='/' element={<Home/>}/>
        <Route   path='/signup/login' element={<Signup/>}/>
        <Route path='/expense' element={<AddExpenseForm/>}/>
        
    </Routes>
  )
}

export default AppRoute
