import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // cho phép gửi cookie từ backend về frontend
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // đường dẫn đến backend

export const AppContext = createContext()
export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    //phân role user và seller
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({}); // Giỏ hàng của người dùng
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]); //lọc danh mục trong all product


    //kiểm tra user đã đăng nhập hay chưa
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(true)
                setCartItems(data.user.cartItems)
            } else {
                setUser(false)
            }
        } catch (error) {
            setUser(false)
        }
    }

    //kiểm tra seller đã đăng nhập hay chưa
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    //load dữ liệu product
    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    /* 
        structuredClone là một hàm trong JavaScript được sử dụng để tạo một bản sao sâu (deep copy) của một đối tượng hoặc mảng.
       có nghĩa là nó sẽ sao chép tất cả các thuộc tính và giá trị của đối tượng hoặc mảng, gồm các đối tượng con bên 
       trong nó, mà không tạo ra liên kết với đối tượng gốc.
     */

    //thêm product vào giỏ hàng
    const addToCart = (itemId) => {
        //clone dữ liệu giỏ hàng
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success('Added to cart')
    };
    //cập nhật giỏ hàng
    const updateCart = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success('Cart updated')
    };
    //xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        setCartItems(cartData)
        toast.success('Removed from cart')
    };
    //lấy số lượng mặt hàng trong giỏi hàng 
    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item] //cartItems[item] tức là key trong object
        }
        return totalCount
    }
    //lấy tổng giá trị của giỏ hàng
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100; //làm tròn đến 2 chữ số thập phân
    }
    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProduct()
    }, [])

    //cập nhật database giỏ hàng (cartItems)
    useEffect(() => {
        const updateCartItems = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (data.success) {
                    toast.success('Cập nhật giỏ hàng thành công')
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error('Cập nhật giỏ hàng thất bại')
            }
        }
        if(user){
            updateCartItems()
        }

    },[cartItems])

    const value = {
        navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,
        products, addToCart, updateCart, removeFromCart, cartItems, searchQuery, setSearchQuery, 
        getCartCount, getCartAmount, axios, fetchProduct, setCartItems, filteredCategory, setFilteredCategory
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext)
}