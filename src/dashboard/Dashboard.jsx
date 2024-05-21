import React from 'react'
import useUser from '../hooks/useUser'
import {HashLoader} from "react-spinners"
import DashboardNavigate from '../routers/DashboardNavigate';

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

  if(isLoading) {
    return <div className='flex justify-center items-center h-screen'>
    <HashLoader color="#36d7b7"
    size={50} />
    </div>
  }
  return (
    <DashboardNavigate/>
  )
}

export default Dashboard