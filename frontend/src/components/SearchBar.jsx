import { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";


const SearchBar = () => {
    // initialy search=''  and visible=false    and  showSearch=false
    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);

    // using location hook we can get the path of the url
    const location=useLocation();
    // means search bar only visible on collection page
    useEffect(()=>{
        if (location.pathname.includes('collection')){
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    },[location]);

    // when searchbar will be true then this div will be displayed otherwise it will return null
    // if searchbar is true and visible is true then it will display the search bar
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center ">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 mx-3 rounded-full w-3/4 sm:w-1/4">
                <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text"  placeholder="Search" className="flex-1 outline-none bg-inherit text-sm"/>
                <img src={assets.search_icon} alt="" className="w-4"/>
        </div>
        <img onClick={()=>(setShowSearch(false))} src={assets.cross_icon} alt="" className="inline w-3 cursor-pointer"/>
      
    </div>
  ):null
}

export default SearchBar
