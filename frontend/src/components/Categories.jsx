import React from 'react'
import {categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

function Categories() {
    const { navigate } = useAppContext()
    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                    <span className='text-primary'>Cate</span>gories
                </h2>
                <a href="/all-product" className='text-primary hover:text-primary-dull font-medium flex items-center'>
                    Xem tất cả
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6'>
                {categories.map((category, index) => (
                    <div 
                        key={index} 
                        className='group cursor-pointer overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300'
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`)
                            scrollTo(0, 0)
                        }}
                    >
                        <div className='p-4 flex flex-col items-center justify-center relative' style={{ backgroundColor: category.bgColor }}>
                            <img 
                                src={category.image} 
                                alt={category.text} 
                                className='h-28 object-contain group-hover:scale-110 transition-transform duration-300' 
                            />
                        </div>
                        <div className='py-2 text-center'>
                            <p className='font-medium text-gray-800'>{category.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories