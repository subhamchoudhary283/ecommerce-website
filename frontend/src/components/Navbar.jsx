import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
// ...rest of your code...
const NavBar = () => {

  //   const [visible, setVisible] = useState(false);
// Ye React state hook hai.
// visible ek state variable hai jo decide karega ki mobile menu (sidebar) open hai ya close.
// setVisible ek function hai jisse tum visible ki value change kar sakte ho.
// false ka matlab hai by default sidebar hidden.

  const[visible,setVisible] = useState(false);
  const navigate = useNavigate();

  const {setShowSearch,getCartCount , token , setToken, setCartItems} = useContext(ShopContext);

  const logout = ()=>{
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'>
      <img src={assets.logo} className='w-36' alt="" />
      </Link>
      {/* hidden means screen size less than 640px child of it will become hidden  */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-red-500 transition-colors duration-200 '>
          <p>HOME</p>
          {/* w-2/4 means 50% of the parent width */}
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>  
        </NavLink>

        <NavLink to='/collection'  className='flex flex-col items-center gap-1 hover:text-red-500 transition-colors duration-200'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/about'  className='flex flex-col items-center gap-1 hover:text-red-500 transition-colors duration-200'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/contact'  className='flex flex-col items-center gap-1 hover:text-red-500 transition-colors duration-200'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>
      <div className='flex item-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>
        <div className='group relative'>
          <img onClick={()=>token ? null :navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/>
              
          {/*  Drop down menu */}
          {token && 
          <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
          
          }
        </div>
        <Link to='/cart' className='relative'>
                  <img src={assets.cart_icon}  alt=""  className='w-5 min-w-5'/>
                  <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        {/* sm:hidden means for small and above screen size , it will be hidden  */}
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden'/>
      </div>
      
      {/* sidebar menu for small screen */}
      <div className={`absolute top-5 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?'w-full':'w-0'}`}>
              <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                  <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180'/>  
                  <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} to='/' className='py-2 pl-6 border'>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-2 pl-6 border'>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/about' className='py-2 pl-6 border'>About</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2 pl-6 border'>Contact</NavLink>
              </div>
      </div>

    </div>
  )

}

export default NavBar