import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";

const MobileLinks = () => {
    const location = useLocation();
  return (
    <div className="w-full py-1 flex justify-around items-end bg-white " >
    <div className='h-[10%]  flex flex-col justify-end  items-center' >
      <Link to={"/dashboard"} ><img src="/assets/dashboard.svg" alt="not found" width={25} height={25} className={`cursor-pointer ${location.pathname==="/dashboard"? "filter-blue" : "filter-gray"}`} /></Link>
      <Link to={"/dashboard"} className={` ${location.pathname==="/dashboard"?"text-blue-500":"text-gray-500"} text-xs `} >Dashboard</Link>
     </div>
     <div className='flex flex-col justify-end  items-center' >
      <Link to={"/teach"} ><img src="/assets/teach.svg" alt="not found" width={25} height={25} className={`cursor-pointer ${location.pathname==="/teach"? "filter-blue" : "filter-gray"}`} /></Link>
     <Link to={"/teach"} className={` ${location.pathname==="/teach"?"text-blue-500":"text-gray-500"} text-xs `} >Teach</Link>
     </div>
     <div className='flex flex-col jjustify-end  items-center' >
      <Link to={"/take-class"} ><img src="/assets/class.svg" alt="not found" width={25} height={25} className={`cursor-pointer ${location.pathname==="/take-class"? "filter-blue" : "filter-gray"}`} /></Link>
      <Link to={"/take-class"} className={` ${location.pathname==="/take-class"?"text-blue-500":"text-gray-500"} text-xs `} >Take class</Link>
      </div>
     <div className='flex flex-col justify-end  items-center' >
      <Link to={"/class-library"} ><img src="/assets/library.svg" alt="not found" width={25} height={25} className={`cursor-pointer ${location.pathname==="/class-library"? "filter-blue" : "filter-gray"}`} /></Link>
      <Link to={"/class-library"} className={` ${location.pathname==="/class-library"?"text-blue-500":"text-gray-500"} text-xs `} >Class Library</Link>
      </div>
      <div className='flex flex-col justify-end items-center' >
      <Link to={"/doubt"}><img src="/assets/doubt.svg" alt="not found" width={25} height={25} className={`cursor-pointer ${location.pathname==="/doubt"? "filter-blue" : "filter-gray"}`} /></Link>
      <Link to={"/doubt"} className={` ${location.pathname==="/doubt"?"text-blue-500":"text-gray-500"} text-xs `} >Doubt</Link>
     </div>
     </div>
  )
}

export default MobileLinks
