import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes> 
            <Route path="/*" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  )
}
