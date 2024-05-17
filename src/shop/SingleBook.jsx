import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../hooks/useUser';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../ultilities/providers/AuthProvider';

const SingleBook = () => {
  const {_id, bookTitle, authorName, imageURL,category, 
    bookDescription, bookPDFURL, price }= useLoaderData();
  const [activeImg, setActiveImg] = useState({imageURL})
  const [amount, setAmount] = useState(1)
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const { user } = useContext(AuthContext);

  return (
    <div className='max-w-7xl mx-auto p-8 mt-28 px-4 lg:px-24'>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-full'>
          <img src={imageURL} alt='' className='h-96'/>
        </div>
        {/* About */}
        <div className='flex flex-col gap-4 lg:w-2/'>
          <div>
            <span className='text-violet-600 font-semibold text-4xl'>{bookTitle}</span>
            <h1 className='text-2xl font-bold'>{authorName}</h1>
          </div>
          <p className='text-gray-700'>
            {bookDescription}
          </p>
          <h6 className='text-2xl font-semibold'>$ {price}</h6>
          <div>
            {/* <div className='flex flex-row items-center gap-12'>
              <button className='bg-gray-100 py-2 px-5 rounded-lg text-violet-800 text-3xl'
              onClick={() => {
                setAmount((prev) => prev - 1)
              }}>-</button>
              <span className='py-4 px-6 rounded-lg'>{amount}</span>
              <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl'
              onClick={() => {
                setAmount((prev) => prev + 1)
              }}>+</button>
            </div> */}
            <button
            title={role === 'admin' ? 'Admin can not be able to select' : ''}
            disabled={role === 'admin'}
            className='bg-violet-800 text-white  disabled:bg-red-300 font-semibold py-3 px-6 rounded-xl h-full hover:bg-red-700'
            >Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBook