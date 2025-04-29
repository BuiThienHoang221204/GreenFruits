import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

function BestSellers() {
  const { products } = useAppContext()

  return (
    <div className='bg-white p-4 rounded-2xl shadow-sm'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
          <span className='text-primary'>Best</span>Seller
        </h2>
        <a href="/all-product" className='text-primary hover:text-primary-dull font-medium flex items-center'>
          Xem tất cả
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
      <div className='flex flex-wrap gap-6 justify-center items-center md:justify-start mt-6'>
        {products.filter(p => p.inStock).slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSellers