import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import SideBar from '../components/SideBar'

function AllProduct() {
    const { products, searchQuery, filteredCategory } = useAppContext()
    const [filterProducts, setFilterProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(1)
    const productPerPages = 12
    const indexOfLastProduct = productPerPages * currentProduct
    const indexOfFirstProduct = indexOfLastProduct - productPerPages
    const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilterProducts(filteredCategory.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setFilterProducts(filteredCategory)
        }
    }, [products, searchQuery, filteredCategory])

    return (
        <div className='flex'>
            <SideBar />
            <div className='md:ml-12 mt-16 flex flex-col'>
                <div className='flex flex-col w-max items-end'>
                    <p className='text-2xl md:text-3xl font-medium'>All Product</p>
                    <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                </div>
                <div >
                    {currentProducts.length > 0 ? (
                        <>
                            <div className='flex flex-wrap lg:gap-8 gap-10 mt-6 items-start justify-center md:justify-start'>
                                {currentProducts.filter(product => product.inStock).map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </div>
                            <div className="flex items-center justify-center mt-6 gap-2">
                                {([...Array(Math.ceil(products.length / productPerPages))]).map((_, index) => (
                                    <div key={index}>
                                        <div className="flex gap-2 text-gray-500 text-sm md:text-base mt-6">
                                            <button
                                                onClick={() => setCurrentProduct(index + 1)}
                                                type="button"
                                                className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square transition-all rounded-sm ${currentProduct === index + 1 ? 'bg-primary text-white' : 'border border-gray-300/60 hover:bg-gray-300/10'}`}>{index + 1}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='h-[40vh] flex items-center justify-center'>
                            <p className='text-2xl font-medium text-primary'>No Product found in this category.</p>
                        </div>
                    )}
                </div>


            </div>
        </div>

    )
}

export default AllProduct