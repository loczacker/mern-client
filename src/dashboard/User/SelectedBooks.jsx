import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SelectedBooks = () => {
  const {currentUser} = useUser();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPage = Math.ceil(books.length / itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`cart/${currentUser?.email}`)
      .then((res) => {
      setBooks(res.data);
      setLoading(false);
    })
    .catch((error) =>{
      console.error(error)
      setLoading(false);
    })
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className='my-6'>
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Selected</span> Book</h1>
      </div>
    </div>
  )
}

export default SelectedBooks