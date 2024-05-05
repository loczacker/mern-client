import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { data } from 'autoprefixer';

const BestSellerBooks = () => {
    const [books, setBooks] = useState([]);
    const axiosFetch = useAxiosFetch();

    useEffect(() => {
      //   fetch('http://localhost:5001/all-books').then(res => res.json()).then(data => setBooks(data.slice(0,
      // 8)))
      const fetchBooks = async () => {
        const response = await axiosFetch.get('/all-books');
        setBooks(response.data.slice(0,8));
      }

      fetchBooks();
    },[])
  return (
    <div>
        <BookCards books={books} headline='Best Seller Books'/>
    </div>
  )
}

export default BestSellerBooks;