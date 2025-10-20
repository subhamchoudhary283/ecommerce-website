import { createContext, useEffect, useState } from "react";
// imported all the product details , products=[{},{},{},{}]
// now we get the product data from api instead of hardcoded data
// import {products} from '../assets/assets'
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

//here we created a context variable that is ShopContext  -> use export so that we can access it in any other component also
export const ShopContext= createContext();

// here we create a context provider function
const ShopContextProvider=(props)=>{

    const currency='₹';
    const delivery_fee=10;

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    
    const[search,setSearch]= useState('');
    const [showSearch,setShowSearch] = useState(false);  

    const [cartItems,setCartItems]=useState({});

    const [products,setProducts]=useState([]);

    // Initialize token from localStorage
const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || "";
});

// Update localStorage when token changes
useEffect(() => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}, [token]);

    const navigate=useNavigate();

    const addToCart=async(itemId,size)=>{
        if (!size) {
            toast.error('Please select a size');
            // toast.success('✅ Operation completed!');
            // toast.info('ℹ️ Here is some info...');
            // toast.warn('⚠️ This is a warning!');
            // toast('💬 Default toast message'); // default style
            return;
        }
        let cartData= structuredClone(cartItems);
        if (cartData[itemId]) { 
            if (cartData[itemId][size]) {
                cartData[itemId][size]+=1;    
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);

        // console.log("outside of token")
        if(token){
            // console.log("inside of token")
            try {
                // console.log("inside try block of token")
                await axios.post(backendUrl + "/api/cart/add", {itemId, size}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error("Error in adding to cart");
            }
        }
        else{
            
        }
    }
    
   const getCartCount = () => {
        let totalcount = 0;

         for (const items in cartItems) {
            for (const item in cartItems[items]) {
              try {
                if (cartItems[items][item] > 0) {
                    totalcount += cartItems[items][item];
                }
              } catch (error) {
                console.error(error); // log or handle the error
                }
        }
    }

    return totalcount;
};

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl + "/api/cart/update", {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error("Error in updating cart");
            }
        }
    }

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                let itemInfo = products.find((product)=>product._id === items);
                for(const item in cartItems[items]){
                    try{
                        if (cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }

                    } catch (error) {
                        console.error(error); // log or handle the error
                    }
                }
            }
        }
        return totalAmount;
    }

    const getProductsdata=async()=>{
        try {
            const response=await axios.get(backendUrl + "/api/product/list");
            if(response.data.success){
                setProducts(response.data.products);
            }   else {
                toast.error("Error in fetching products");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in fetching products");
        }
  }

  const getUserCart = async (token) => {
    try {
        const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          toast.error("Error in fetching cart");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in fetching cart");
      }
  }

    useEffect(()=>{
        getProductsdata();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
        }
    },[])
    useEffect(() => {
    if (token) {
        getUserCart(token);
    }
}, [token]);



    // Ye object banane ka purpose hai saare data (variables) aur functions ko ek bundle me collect karna.
    // Fir is value object ko React Context Provider me pass karte ho:
    const value={
        products ,
        currency,
        delivery_fee,
        search, setSearch,showSearch, setShowSearch
        ,cartItems,addToCart,getCartCount,setCartItems,
        updateQuantity,getCartAmount,navigate , backendUrl , token,setToken
    }

    return (
        // Every context object in React comes with a special Provider component.
        // Ye Provider ka kaam hai — data ko share karna with all components inside it.

        <ShopContext.Provider value={value}>
            {/* {props.children}
            props.children matlab wo components jo tumne <ShopContextProvider> ke andar wrap kiye hain.   -->> go to main.jsx */}
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;
