import React from 'react'
import bgImg from '../assets/dashboard/jaconda-14.png'

const About = () => {
  return (
    <div>
      <div className='h-screen mt-28 px-4 lg:px-24'>
        <h1 className='text-2xl font-bold'>About Book Master</h1>
        <img src={bgImg} alt='' className='h-full w-fit'/>
      </div>
    </div>
  )
}

export default About