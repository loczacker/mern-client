import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return <>
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
    <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
      {/* left side */}
      <div className='md: w-1/2 space-y-8 h-full'>
        <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Books <span
        className='text-blue-700'>for the Best Prices</span></h2>
        <p className='md:w-4/5'>
        In the beautiful yet mysterious world of the planet Green, a strange dark shadow begins to emerge, carrying with it plots and the threat of destruction.
         Can a group of young characters uncover the truth behind this shadow and thwart the looming danger?
          "Shadow Over Planet Green" is a promising science fiction book, inviting readers to follow the footsteps of bold characters as they face challenging trials and uncover secrets hidden within the vast universe.
           It's a story of courage, friendship, and the thirst for discovery, taking you on an unlimited adventure on the planet Green.</p>
        <div>
          <input type='search' name='search' id='search' placeholder='Search a book' className='py-2
          px-2 rounded-s-sm outline-none'/>
          <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black
            transition-all ease-in duration-200'>Search</button>
        </div>
      </div>
      {/* right side */}
      <div>
        <BannerCard></BannerCard>
      </div>
      </div>
    </div>
  </>
}

export default Banner