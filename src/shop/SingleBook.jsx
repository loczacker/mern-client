import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import useUser from '../hooks/useUser';
import useAxiosSecure from '../hooks/useAxiosSecure';
import OtherBooks from '../home/OtherBooks';

const SingleBook = () => {
  const { _id, bookTitle, authorName, imageURL, bookDescription, price } = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const axiosSecure = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axiosSecure.get(`/favourite/${currentUser.email}`)
        .then(res => {
          const isBookInFavorites = res.data.some(item => item.bookTitle === bookTitle);
          setIsFavorite(isBookInFavorites);
        })
        .catch(error => {
          console.error("Error fetching favourite items:", error);
        });
    }
  }, [axiosSecure, currentUser, bookTitle]);

  useEffect(() => {
    if (currentUser) {
      axiosSecure.get(`/cart/${currentUser.email}`)
        .then(res => {
          setCartItems(res.data);
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [axiosSecure, currentUser]);

  const handleSelect = (id, bookTitle) => {
    axiosSecure.get(`/book/${id}`);
    if (!currentUser) {
      navigate('/login');
      return alert("Please Login First!");
    }

    const bookExistsInCart = cartItems.some(item => item.bookTitle === bookTitle);
    if (bookExistsInCart) {
      return alert("This book is already in your cart!");
    } else {
      const data = {
        bookId: id,
        bookTitle: bookTitle,
        userMail: currentUser.email,
        data: new Date()
      };

      axiosSecure.post('/add-to-cart', data)
        .then(res => {
          setCartItems([...cartItems, data]); // Update cartItems state with the new item
          alert("Successfully added to the cart!");
          console.log(res.data);
        })
        .catch(error => {
          console.error("Error adding to cart:", error);
        });
    }
  };

  const handleToggleFavorite = (id, bookTitle) => {
    if (!currentUser) {
      navigate('/login');
      return alert("Please Login First!");
    }

    if (isFavorite) {
      // Remove book from favourites
      axiosSecure.delete(`/delete-favourite-item/${id}`)
        .then(() => {
          setIsFavorite(false);
          alert("Removed from favourites!");
        })
        .catch(error => {
          console.error("Error removing from favourites:", error);
        });
    } else {
      // Add book to favourites
      axiosSecure.post('/add-to-favourite', {
        bookId: id,
        bookTitle: bookTitle,
        userMail: currentUser.email,
        data: new Date()
      })
        .then(() => {
          setIsFavorite(true);
          alert("Added to favourites!");
        })
        .catch(error => {
          console.error("Error adding to favourites:", error);
        });
    }
  };

  return (
    <div className=''>
      <div className='max-w-8xl mx-auto p-10 mt-20 px-4 lg:px-24'>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
          <div className='flex flex-col gap-6 lg:w-full'>
            <img src={imageURL} alt='' className='w-[400px] h-[600px] rounded-lg' />
          </div>
          <div className='flex flex-col gap-6 lg:w-2/'>
            <div>
              <span className='text-violet-600 font-semibold text-5xl'>{bookTitle}</span>
              <h1 className='text-3xl font-bold mt-2'>{authorName}</h1>
            </div>
            <p className='text-gray-700 text-lg mt-4'>
              {bookDescription}
            </p>
            <h6 className='text-4xl font-semibold mt-6'>$ {price}</h6>
            <div className='flex items-center gap-6 mt-6'>
              <button
                onClick={() => handleSelect(_id, bookTitle)}
                title={role === 'admin' ? 'Admin cannot add to cart' : ''}
                disabled={role === 'admin'}
                className='bg-violet-800 text-white disabled:bg-red-300 font-semibold py-4 px-8 rounded-xl h-full hover:bg-red-700'
              >
                Add to cart
              </button>
              <button
                onClick={() => handleToggleFavorite(_id, bookTitle)}
                title={role === 'admin' ? 'Admin cannot add to cart' : ''}
                disabled={role === 'admin'}
                className={`focus:outline-none text-3xl py-4 px-8 rounded-xl h-full border ${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-500'
                  } hover:border-red-700 ${isFavorite ? '' : 'disabled:bg-gray-300'}`}
              >
                <FaHeart />
              </button>

            </div>
          </div>
        </div>
      </div>
      <div>
        <OtherBooks/>
      </div>
    </div>
  );
};

export default SingleBook;
