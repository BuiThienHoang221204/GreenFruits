import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

function ProductCategory() {
    const { products } = useAppContext()
    const { category } = useParams()

    const searchCategory = categories.find(item => item.path.toLowerCase() === category)
    const filteredProducts = products.filter(product => product.category.toLowerCase() === searchCategory.path.toLowerCase())
    return (
        <div className='mt-16 flex flex-col'>
            {searchCategory && (

                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                </div>
            )}
            {filteredProducts.length > 0 ? (
                <div className='flex flex-wrap gap-8 mt-6 items-start justify-center md:justify-start'>
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ):(
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium text-primary'>No Product found in this category.</p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory