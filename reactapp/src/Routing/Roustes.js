import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todoapp from '../Component/Todoapp'
import Home from '../Component/Home'
import Weather from '../Component/Weather'

function Roustes() {
  return (
    <div>
       <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/TodoApp' element={<Todoapp />} />
          <Route path='/weatherapp' element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Roustes
