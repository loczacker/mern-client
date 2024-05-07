import React from 'react'
import Banner from '../components/Banner';
import BestSellerBooks from './BestSellerBooks';
import FavBook from './FavBook';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';
import Review from './Review';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const {user} = useAuth();
  console.log(user);
  return (
    <div>
      <Banner/>
      <BestSellerBooks/>
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Review/>
    </div>
  )
} 

export default Home;