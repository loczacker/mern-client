import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../hooks/useUser';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SingleBook = () => {
  const {_id, bookTitle, authorName, imageURL,category, 
    bookDescription, bookPDFURL, price }= useLoaderData();
  const [activeImg, setActiveImg] = useState({imageURL})
  const [amount, setAmount] = useState(1)
  return (
    // <div className='mt-28 px-4 lg:px-24'>
    // <img src={imageURL} alt='' className='h-96'/>
    // <h2>{bookTitle}</h2>
    // </div>
    <div className='max-w-7xl mx-auto p-8'>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
          <img src={imageURL} alt='' className='w-[305px] h-[350px] aspect-square object-cover rounded-lg'/>
        </div>
        {/* About */}
        <div className='flex flex-col gap-4 lg:w-2/'>
          <div>
            <span className='text-violet-600 font-semibold'>Special Book</span>
            <h1 className='text-3xl font-bold'>best book</h1>
          </div>
          <p className='text-gray-700'>
            {bookDescription}
          </p>
          <h6 className='text-2xl font-semibold'>$ {price}</h6>
          <div>
            <div className='flex flex-row items-center gap-12'>
              <button className='bg-gray-100 py-2 px-5 rounded-lg text-violet-800 text-3xl'
              onClick={() => {
                setAmount((prev) => prev - 1)
              }}>-</button>
              <span className='py-4 px-6 rounded-lg'>{amount}</span>
              <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'
              onClick={() => {
                setAmount((prev) => prev + 1)
              }}>+</button>
            </div>
            <button className='bg-violet-800 text-white font-semibold py-3 px-6 rounded-xl h-full'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBook