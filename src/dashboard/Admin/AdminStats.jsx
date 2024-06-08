import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminStats = ({users}) => {
    const [data, setData] = useState();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/admin-stats').then(res => setData(res.data)).catch(err => console.log(err))
    }, [])
    console.log(data)
  return (
    <div>
        <div>
        <div className='flex items-center bg-white border rounded-sm overflow-hidden mr-10'>
            <div className='p-4 bg-green-400'>
            <svg xmlns='http:/www.w3.org/2000/svg' className='h-12 w-12 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6
                0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/>
            </svg>
            </div>
            <div className='px-4 text-gray-700'>
                <h3 className='text-sm tracking-wider'>Total Member</h3>
                <p className='text-3xl'>{users?.length}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AdminStats