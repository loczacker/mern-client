import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUser from '../../hooks/useUser';
import { Link } from 'react-router-dom';

const MyPurchased = () => {
    const [uniqueData, setUniqueData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();

    useEffect(() => {
        axiosSecure.get(`purchased-books/${currentUser?.email}`)
            .then(res => {
                const uniqueTitles = [...new Set(res.data.map(item => item.bookTitle))];
                const uniqueItems = uniqueTitles.map(title => res.data.find(item => item.bookTitle === title));
                setUniqueData(uniqueItems);
            }).catch(err => console.error(err));
    }, [axiosSecure, currentUser]);

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-8 text-center'>My Purchased Books</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    uniqueData.map((item, index) => (
                        <div key={index} className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between'>
                            <img src={item.imageURL} alt={item.bookTitle} className='w-full h-84 object-cover' />
                            <div className='p-6 flex flex-col justify-between h-full'>
                                <div>
                                    <h2 className='text-2xl font-bold mb-2'>{item.bookTitle}</h2>
                                    <p className='text-gray-700 mb-4'>by {item.authorName}</p>
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <Link to={`/dashboard/book-purchased-detail/${item._id}`}>
                                        <button className='bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300'>
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
    );
}

export default MyPurchased;
