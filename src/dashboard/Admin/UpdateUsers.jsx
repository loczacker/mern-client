import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useLoaderData } from 'react-router-dom';

const UpdateUsers = () => {
    const {user} = useAuth();
    const userCredentials = useLoaderData();
    const axiosFetch = axiosFetch();
    const axiosSecure = axiosSecure();


  return (
    <div>UpdateUsers</div>
  )
}

export default UpdateUsers