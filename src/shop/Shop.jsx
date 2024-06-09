import React, { useContext, useEffect, useState } from 'react'

import { Alert, Card } from "flowbite-react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { AuthContext } from '../ultilities/providers/AuthProvider';
import useUser from '../hooks/useUser';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Transition } from '@headlessui/react'

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { currentUser } = useUser();
  const role = currentUser?.role;
  const { user } = useContext(AuthContext);
  console.log("The current user", user)

  useEffect(() => {
    // fetch("http://localhost:5001/all-books").then(res => res.json()).then(data => setBooks(data));
    axiosFetch
      .get("/all-books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [])

  const handleHover = (index) => {
    setHoveredCard(index);
  }

  //handle add to cart
  // const handleSelect = (id, bookTitle) => {
  //   axiosSecure.get(`/book/${id}`)
  //   // .then(res => setBooks(res.data)).catch(err => console.log(err));
  //   if (!currentUser) {
  //     navigate('/login');
  //     return alert("Please Login First!")
  //   }

  //   axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
  //     .then(res => {
  //       if (res.data.bookId === id) {
  //         return alert("Already Selected")
  //       } else {
  //         const data = {
  //           bookId: id,
  //           bookTitle: bookTitle,
  //           userMail: currentUser.email,
  //           data: new Date()
  //         }

  //         axiosSecure.post('/add-to-cart', data)
  //           .then(res => {
  //             alert("Successfully added to the cart!");
  //             console.log(res.data)
  //           })
  //       }
  //     })
  // }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h1 className='text-5xl font-bold text-center text-secondary'>All Books are here</h1>

      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {
          books.map((book, index) => (
            <div
              onMouseLeave={() => handleHover(null)}
              key={index}
              className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary
              w-full h-[350px] mx-auto dark:bg-slate-600 rouneded-lg sadow-lg overflow-hidden cursor-pointer`}
              onMouseEnter={() => handleHover(index)}>
              <div className='relative h-48'>
                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300
              ${hoveredCard === index ? "opacity-60" : ""}`} />
                <img src={book.imageURL} alt='' className='object-cover w-full h-full' />

                <Transition
                  show={hoveredCard === index}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {/* <div className='absolute inset-0 flex items-center justify-center'>
                    <button
                      onClick={() => handleSelect(book._id, book.bookTitle)}
                      title={role === 'admin' ? 'Admin can not be able to select' : ''}
                      disabled={role === 'admin'}
                      className='px-4 py-2 text-white disabled:bg-red-300
                    bg-secondary duration-300 rounded hover:bg-red-700'>Add to cart</button>
                  </div> */}
                </Transition>

                {/*detail */} 
                <div className='px-6 py-2'>
                  <h3
                    className='font-semibold mb-1'>{book.bookTitle}</h3>
                  <p className='text-gray-500 text-xs'>Author name: {book.authorName}</p>
                  <div className='flex items-center justify-between mt-4'>
                    <span className='text-gray-600 text-xs'>Category : {book.category}</span>
                    <span className='text-green-500 font-semibold'>${book.price}</span>
                  </div>

                  <Link to={`/book/${book._id}`}>
                    <button
                      className='px-4 py-2 mt-4 mb-2 w-full mx-auto text-white
                     disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Shop