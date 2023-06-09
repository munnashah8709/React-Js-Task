import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todoapp from '../Component/Todoapp'
import Home from '../Component/Home'
import Weather from '../Component/Weather'
import DragDropApp from '../Component/DragDrop/DragDropApp'
import ChartList from '../Component/ChartComponent/ChartList.js'


function Roustes() {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/TodoApp' element={<Todoapp />} />
          <Route path='/weatherapp' element={<Weather />} />
          <Route path='/Dragdrop' element={<DragDropApp />} />
          <Route path='/chartinterface' element={<ChartList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Roustes
