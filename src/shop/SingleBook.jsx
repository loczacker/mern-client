import React, { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../ultilities/providers/AuthProvider';

const SingleBook = () => {
  const {_id, bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price } = useLoaderData();
  const [activeImg, setActiveImg] = useState({ imageURL });
  const [amount, setAmount] = useState(1);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    
    axiosSecure.get(`/book/${id}`)
    // .then(res => setBooks(res.data)).catch(err => console.log(err));
    if (!currentUser) {
      navigate('/login');
      return alert("Please Login First!")
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
  }

  return (
    <div className='max-w-7xl mx-auto p-8 mt-28 px-4 lg:px-24'>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-full'>
          <img src={imageURL} alt='' className='h-96'/>
        </div>
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
            <button
              onClick={() => handleSelect(_id, bookTitle)}
              title={role === 'admin' ? 'Admin cannot add to cart' : ''}
              disabled={role === 'admin'}
              className='bg-violet-800 text-white  disabled:bg-red-300 font-semibold py-3 px-6 rounded-xl h-full hover:bg-red-700'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
