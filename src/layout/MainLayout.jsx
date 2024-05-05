import React from 'react'
import { Outlet } from 'react-router-dom'
import MyFooter from '../components/MyFooter'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>
    <Outlet/>
    </div>
    <MyFooter/>
    </>
  )
}

export default MainLayout