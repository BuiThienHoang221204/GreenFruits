import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'
export const Header = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, axios } = useAppContext()

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                navigate('/')
                toast.success("Đăng xuất thành công")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Đăng xuất thất bại")
        }

    }
    //khi click vào input search sẽ chuyến sang all product
    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/all-product')
        }
    }, [searchQuery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">

            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/all-product'>All Product</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>

                <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                    <img src={assets.cart_icon} alt="cart" className='w-6 h-6' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt="profile" className='w-10 h-10' />
                        <ul className='hidden group-hover:block absolute top-10 -right-10 shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm cursor-pointer z-40 bg-gray-100'>
                            <li className='p-1.5 pl-3 hover:bg-primary/20' onClick={() => navigate('my-orders')}>My Orders</li>
                            <li className='p-1.5 pl-3 hover:bg-primary/20' onClick={logout}>Logout</li>
                        </ul>
                    </div>

                )}
            </div>

            <div className='md:hidden flex'>
                <div className="relative cursor-pointer mx-6" onClick={(e) => {
                    e.stopPropagation(),
                        navigate('/cart')
                }}
                >
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 h-6' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to='/all-product' onClick={() => setOpen(false)}>All Product</NavLink>
                    {user &&
                        <NavLink to='/my-orders' onClick={() => setOpen(false)}>My Order</NavLink>
                    }
                    <NavLink to='/contact' onClick={() => setOpen(false)}>Contact</NavLink>
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false),
                                setShowUserLogin(true)
                        }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}

                </div>
            )}

        </nav>
    )
}