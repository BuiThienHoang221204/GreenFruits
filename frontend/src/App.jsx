import React from 'react'
import './App.css'
import {Routes, Route, useLocation } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { AppProvider, useAppContext} from './context/AppContext'
import { Header } from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import Contact from './pages/Contact'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Chatbox from './components/Chatbox'
import Comments from './pages/seller/Comments'
import Loading from './components/Loading'

function App() {
  const isSellerPath = useLocation().pathname.includes('/seller')// check xem có phải là đường dẫn của seller hay không
  const {showUserLogin, isSeller} = useAppContext()
  return (
      <div className='text-default min-h-screen text-gray-700 bg-white'>
        {isSellerPath ? null : <Header/>}
        {showUserLogin ? <Login/> : null}
        <Toaster/>
        <Chatbox/>
        <div className={`${isSellerPath ? "":"container mx-auto"}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/all-product' element={<AllProduct/>} />
            <Route path='/products/:category' element={<ProductCategory/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/my-orders' element={<MyOrders/>} />
            <Route path='/loader' element={<Loading/>} />
            <Route path='/products/:category/:id' element={<ProductDetails/>} />
            <Route path='/add-address' element={<AddAddress/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
              <Route index element = {isSeller ? <AddProduct/> : null}/>
              <Route path='product-list' element = {<ProductList/> }/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='comments' element={<Comments/>}/>
            </Route>
          </Routes>
        </div>
        {!isSellerPath && <Footer/>}
      </div>
  )
}

export default App