import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function MainBanner() {
    return (
        <div className='relative rounded-2xl overflow-hidden shadow-md my-6'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10'></div>
            <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block object-cover h-[500px]' />
            <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden object-cover h-[400px]' />

            <div className='absolute inset-0 z-20 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24'>
                <span className='bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4'>100% Organic Products</span>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white md:text-white md:max-w-md lg:max-w-lg leading-tight lg:leading-tight mb-4'>
                    Naturally Fresh, Save More Every Day!
                </h1>
                
                <p className='text-white/90 mb-6 max-w-md'>
                    The freshest fruits and vegetables delivered straight to your door. We are committed to bringing you the highest quality products.
                </p>

                <div className='flex flex-wrap items-center gap-4 mt-2 font-medium'>
                    <Link to='/all-product' className='px-3 py-3 group flex items-center gap-2 md:px-6 md:py-3 bg-white hover:bg-gray-100 rounded-lg text-primary transition-colors cursor-pointer'>
                        Shop Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <Link to='/products/vegetables' className='px-3 py-3 group flex items-center gap-2 md:px-6 md:py-3 border border-white hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer'>
                        Explore
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
