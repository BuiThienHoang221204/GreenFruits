import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

function MyOrders() {
    const [myOrders, setMyOrders] = useState([])
    const {axios, user} = useAppContext()

    const fetchMyOrders = async () => {
        try {
            const {data} = await axios.get('/api/order/user')
            console.log(data);
            if(data.success){
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if(user){
            fetchMyOrders()
        }
    }, [user])
    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='font-medium text-2xl md:text-3xl'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {myOrders.map((order, index) => {
                return (
                    <div key={index} className='border border-gray-300 rounded-lg py-5 p-4 mb-4'>
                        <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                            <span>OrderId: {order._id}</span>
                            <span>Payment: {order.paymentType}</span>
                            <span>Total Amount: ${order.amount}</span>
                        </p>
                        {order.items.map((item, index) => {
                            return (
                                <div key={index} className={`flex max-md:flex-col md:items-center justify-between mt-4 ${order.items.length != index + 1 ? 'border-b border-gray-300 py-5' : ''}`}>
                                    <div className='flex max-md:flex-col md:items-center'>
                                        <div className='bg-primary/20 p-3 rounded-xl w-max'>
                                            <img src={item.product.image[0]} alt={item.name} className='w-16 h-16 object-cover rounded-lg' />
                                        </div>
                                        <div className='md:mx-8 max-sm:my-2'>
                                            <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                            <p className='text-sm text-gray-400'>Category: {item.product.category}</p>
                                        </div>
                                    </div>
                                    <div className='text-lg text-primary font-medium'>
                                        <p>Quantity: {item.quantity || "1"}</p>
                                        <p>Status: {item.status}</p>
                                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className='text-lg text-primary font-medium'>
                                        Amount: ${item.product.offerPrice * (item.quantity || 1)}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default MyOrders