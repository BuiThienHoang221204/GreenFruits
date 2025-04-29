import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

function BestSellers() {
  const { products } = useAppContext()
  console.log(products.filter(p => p.inStock));
  return (
    <div className='mt-6'>
      <p className='text-2xl md:text-3xl font-medium'>BestSellers</p>
      <div className='flex flex-wrap gap-7 justify-center items-center md:justify-start mt-6'>
        {products.filter(p => p.inStock).slice(0,5).map((p, index) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default BestSellers