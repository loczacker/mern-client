import React, { useContext, useEffect, useState } from 'react'

import { Card } from "flowbite-react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { AuthContext } from '../ultilities/providers/AuthProvider';
import useUser from '../hooks/useUser';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {currentUser} = useUser();
  const role = currentUser?.role;
  const {user} = useContext(AuthContext);
  console.log("The current user", user)

  useEffect(() => {
    // fetch("http://localhost:5001/all-books").then(res => res.json()).then(data => setBooks(data));
    axiosFetch
      .get("/all-books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [])

  //handle add to cart
  const handleSelect = (id) => {
    axiosSecure.get(`/book/${id}`)
    // .then(res => setBooks(res.data)).catch(err => console.log(err));
    if(!currentUser){
      navigate('/login');
      return toast.error("Please Login First!")
    }

    axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
    .then( res => {
      if(res.data.bookId === id) {
        return toast.error("Already Selected")
      } else {
        const data = {
          bookId: id,
          userMail : currentUser.email,
          data: new Date()
        }

        toast.promise(axiosSecure.post('/add-to-cart', data))
        .then(res => {
          console.log(res.data)
        }), {
          pending: 'Selecting...',
          success: {
            render({data}){
              return "Selected Successfully!"
            }
          },
          error: {render({data}){
            // When the promise reject, data will contains the error
            return `Error: ${data.message}`
          }
          }
        }
      }
    })
  }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>ALL Books are here</h2>

      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols=2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => <Card
            key={book._id}
            className="max-w-sm"
            >
            <img src={book.imageURL} alt='' className='h-96'/>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>
                {book.bookTitle}
              </p>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>

            {/* <Link to={`/book/${book._id}`}><button
            className='px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>Buy Now</button></Link> */}
            <button
            onClick={() => handleSelect(book._id)}
            title={role === 'admin' ? 'Admin can not be able to select' : '' }
            disabled={role === 'admin'}
            className='px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>Buy Now</button>
          </Card>)
        }
      </div>
    </div>
  )
}

export default Shop