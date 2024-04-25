import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return <>
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
    <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
      {/* left side */}
      <div className='md: w-1/2 space-y-8 h-full'>
        <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Books <span
        className='text-blue-700'>for the Best Prices</span></h2>
        <p className='md:w-4/5'>
        Trong thế giới tươi đẹp nhưng đầy bí ẩn của hành tinh Xanh, một bóng đen lạ kì bắt đầu xuất hiện, mang theo những âm mưu và nguy cơ tàn phá.
        Liệu nhóm nhân vật trẻ tuổi có thể khám phá sự thật đằng sau bóng đen này và ngăn chặn mối đe dọa tiềm ẩn?
        "Bóng Đen Trên Hành Tinh Xanh" là một cuốn sách viễn tưởng đầy hứa hẹn, mời bạn đọc theo chân những nhân vật táo bạo, đối mặt với những thử thách khó khăn và khám phá những bí mật ẩn giấu trong vũ trụ bao la.
        Một câu chuyện về lòng dũng cảm, tình bạn và khao khát khám phá, đưa bạn vào một cuộc phiêu lưu không giới hạn trên hành tinh Xanh.</p>
        <div>
          <input type='search' name='search' id='search' placeholder='Search a book' className='py-2
          px-2 rounded-s-sm outline-none'/>
          <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black
            transition-all ease-in duration-200'>Search</button>
        </div>
      </div>
      {/* right side */}
      <div>
        <BannerCard></BannerCard>
      </div>
      </div>
    </div>
  </>
}

export default Banner