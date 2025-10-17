import { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";



const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext);

  const [showFilters,setShowFilters] = useState(false);

  const [filterProducts,setFilterProducts] = useState([]);

  const [category,setcategory]= useState([]);

  const [subCategory,setSubCategory] = useState([]);

  const [sortType,setSortType] = useState('default');

  const togglecategory=(e)=>{
    // agar selected cate. category array me presenet h then , we need to remove it
    if (category.includes(e.target.value)) {
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    } 
    // means category array me selected nahi h , need to add in the category array
    else {
      // [...prev, e.target.value] = purana array ke saare elements + naya selected value add.
      setcategory(prev=>[...prev,e.target.value])
    }
  }

  const togglesubcategory=(e)=>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
    } 
    else {
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  // after making category and subcategory ,combine both of them
  // Apply filters based on selected categories and subcategories
  const applyFilter=()=>{
    // copy all the products
    // .slice() bina original array ko change kiye ek shallow copy banata hai.
    let productscopy=products.slice();

    if (showSearch && search) {
      productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productscopy=productscopy.filter(item=>category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productscopy=productscopy.filter(item=>subCategory.includes(item.subCategory));
    }

    setFilterProducts(productscopy);
    // now filterProducts = productscopy
  }
  
    useEffect(()=>{
        applyFilter();
    },[category,subCategory, search,showSearch,products]);


  useEffect(() => {
    setFilterProducts(products);
  },[])

  // Sort products based the price :Low to High or High to Low
  const sortproduct = ()=>{
      const fpCopy=filterProducts.slice();
      switch (sortType) {
        case'low-to-high':
        // a and b represents two products
          setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
          break;

        case 'high-to-low':
          setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
          break;

        default:
          applyFilter();
          break;
      }
  }
  
  useEffect(()=>{
    sortproduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* filters option*/}
      <div className="min-w-60">
        <p onClick={() => setShowFilters(!showFilters)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} alt=""  className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} />
        </p>

        {/* category filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block `}>
          <p className="mb-3 text-sm font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Men'} onChange={togglecategory}/>Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Women'} onChange={togglecategory}/>Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Kids'} onChange={togglecategory}/>Kids
            </p>
          </div>
        </div>

        {/* Subcategorie filter  */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block `}>
          <p className="mb-3 text-sm font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Topwear'} onChange={togglesubcategory}/>Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Bottomwear'} onChange={togglesubcategory}/>Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox"  className="w-3 " value={'Winterwear'} onChange={togglesubcategory}/>Winterwear
            </p>
          </div>
        </div>

      </div>

      {/* Right Side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'}/>

          {/* Product sort  */}
          <select onChange={(e) => setSortType(e.target.value)} className="border border-gray-300 text-sm px-2">
            <option value="default">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection
