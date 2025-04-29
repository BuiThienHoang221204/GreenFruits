import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSellers'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

function Home() {
  return (
    <div className='mt-10 mx-5'>
        <MainBanner />
        <Categories />
        <BestSeller/>
        <BottomBanner/>
        <NewsLetter/>
    </div>
  )
}

export default Home