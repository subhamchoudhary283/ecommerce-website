import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [list,setList]=useState([]);
  const fetchList=async()=>{
    try{
      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error("Error in fetching products");
      }
    }
    catch(err){
      console.log(err);
      toast.error("Error in fetching products");
    }
  }

  // remove product
  const removeproduct=async(id)=>{
    try{
      const response = await axios.delete(backendUrl + "/api/product/remove",{data:{id}, headers: {token} });
      if(response.data.success){
        toast.success("Product deleted successfully");
        await fetchList();
      }
      else{
        toast.error("Product deletion failed");
      }
    }
    catch(err){
      console.log(err);
      toast.error("Error in deleting product");
    }
  }

  useEffect(()=>{fetchList()},[])


  return (
    <>
      <p className='mb-2'>All products List</p>
      <div className='flex flex-col gap-2'>
        {/*````````````````````` List table titles ``````````````````````````*/}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b className='text-center'>Category</b>
          <b className='text-center'>Price</b>
          <b className='text-center'>Actions</b>
        </div>
        {/*`````````````````````````` Product list `````````````````````*/}

        {
        list.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm gap-2'>
            <img className='w-12 ' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p className='text-center'>{item.category}</p>
            <p className='text-center'>{currency}{item.price}</p>
            <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
        }
      </div>

    </>
  )
}

export default List
