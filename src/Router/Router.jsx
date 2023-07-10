import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Game from '../pages/Game'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/game/:game' element={<Game/>}/>
        <Route path='/*' element={<Navigate to='/'/>} />
    </Routes>
    </>
  )
}

export default Router