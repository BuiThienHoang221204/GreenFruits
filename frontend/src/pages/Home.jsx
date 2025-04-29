import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSellers'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import { features } from '../assets/assets'

function Home() {
  return (
    <div className='bg-gradient-to-b from-green-50 to-white'>
      {/* Hero Section */}
      <div className='px-4 md:px-0'>
        <MainBanner />
      </div>

      {/* Feature Icons Section */}
      <div className='mt-12 py-8 bg-white shadow-sm'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4'>
            {features.map((feature, index) => (
              <div key={index} className='flex flex-col items-center text-center p-4 transition-transform hover:scale-105'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3'>
                  <img src={feature.icon} alt={feature.title} className='w-8 h-8' />
                </div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>{feature.title}</h3>
                <p className='text-gray-500 text-sm'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-10'>
        {/* Categories Section */}
        <div className='mb-16 bg-white p-4 rounded-2xl shadow-sm'>
          <Categories />
        </div>

        {/* Best Sellers Section */}
        <div className='mb-16'>
          <BestSeller />
        </div>

        {/* Banner khuyến mãi */}
        <div className='mb-16 bg-gradient-to-r from-primary/90 to-primary rounded-2xl overflow-hidden shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='p-8 md:p-12 flex flex-col justify-center'>
              <span className='text-white text-sm font-medium bg-white/20 px-4 py-1 rounded-full inline-block mb-4 w-max'>Special Offer</span>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Up to 25% Off Your First Order</h2>
              <p className='text-white/80 mb-6'>Sign up as a member to receive more exciting offers from GreenFruits.</p>
              <a href="/all-product" className='bg-white text-primary hover:bg-gray-100 py-3 px-6 rounded-lg font-medium transition-colors w-max'>Shop Now</a>
            </div>
            <div className='hidden md:block'>
              <BottomBanner />
            </div>
          </div>
        </div>

        {/* Đăng ký nhận tin */}
        <NewsLetter />
      </div>
    </div>
  )
}

export default Home