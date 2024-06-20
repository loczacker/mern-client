import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ScaleLoader } from 'react-spinners';

const BookPurchasedDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [bookDetail, setBookDetail] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/book/${id}`)
      .then(res => setBookDetail(res.data))
      .catch(err => console.error(err));
  }, [id, axiosSecure]);

  if (!bookDetail) {
    return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
  }

  const handleReadBookClick = () => {
    window.open(bookDetail.bookPDFURL, '_blank');
  };

  return (
    <div className='flex flex-col items-center mt-20'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex justify-center lg:w-1/2 p-8'>
            <img src={bookDetail.imageURL} alt={bookDetail.bookTitle} className='w-full h-auto object-cover rounded-lg' />
          </div>
          <div className='lg:w-1/2 p-14 flex flex-col justify-between'>
            <div>
              <h1 className='text-5xl font-bold text-gray-800 mb-4'>{bookDetail.bookTitle}</h1>
              <h2 className='text-2xl text-gray-600 mb-6'>by {bookDetail.authorName}</h2>
              <p className='text-gray-700 mb-6'>{bookDetail.bookDescription}</p>
            </div>
            <div className='flex justify-center mt-6'>
              <button
                onClick={handleReadBookClick}
                className='bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300'>
                Read Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPurchasedDetail;
