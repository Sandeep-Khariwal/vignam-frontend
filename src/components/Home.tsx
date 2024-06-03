import React, { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Teach from './Teach.tsx';
import TakeClass from './TakeClass.tsx';
import ClassLibrary from "./ClassLibrary.tsx"
import Doubt from "./Doubt.tsx"
import Dashboard from './Dashboard.tsx';
import { FaBars } from "react-icons/fa6";
import MobileLinks from './MobileLinks.tsx';

const Home = () => {
    const [collapse,setCollapse] = useState<boolean>(true)
    const location = useLocation();
    
  return (
    <div className=" w-full flex flex-col lg:flex-row h-screen ">
       <div className="  w-full lg:hidden block fixed bottom-0 " >
        <div className='w-full flex justify-center items-center ' ><MobileLinks/></div>
      </div>

    <div className={` duration-300 ease-in-out ${collapse?"lg:w-[15rem] ":"lg:w-[5rem]"} w-full shadow-right h-auto lg:h-screen  `}>
      
      <div className="w-full h-[10%] flex justify-start items-center pl-5 mt-8 ">
      <img src="/assets/school.svg" alt="not found" width={40} height={40} className=" mr-3 rounded-full  " />
      {collapse && <h2 >School Name</h2>}
      </div>

      <div className="h-[90%] w-full hidden lg:block " >
        <div className="w-full flex lg:flex-col " >
         <div className='hidden lg:block' >
         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2 " >
         {!collapse? <FaBars onClick={()=>setCollapse(!collapse)} className='text-xl cursor-pointer text-gray-700 ' /> : <img src="/assets/collapse.svg" alt="not found" width={20} height={20} className='cursor-pointer' />}
          {collapse && <button onClick={()=>setCollapse(!collapse)} className='font-semibold ml-4 text-gray-500 cursor-pointer ' >Collapse</button>}
         </div>
         </div>

         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2 " >
          <Link to={"/dashboard"} ><img src="/assets/dashboard.svg" alt="not found" width={20} height={20} className={`cursor-pointer ${location.pathname==="/dashboard"? "filter-blue" : "filter-gray"}`} /></Link>
          {collapse && <Link to={"/dashboard"} className={` ${location.pathname==="/dashboard"?"text-blue-500":"text-gray-500"} font-semibold ml-4 `} >Dashboard</Link>}
         </div>

         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2" >
          <Link to={"/teach"} ><img src="/assets/teach.svg" alt="not found" width={20} height={20} className={`cursor-pointer ${location.pathname==="/teach"? "filter-blue" : "filter-gray"}`} /></Link>
          {collapse && <Link to={"/teach"} className={` ${location.pathname==="/teach"?"text-blue-500":"text-gray-500"} font-semibold ml-4 `} >Teach</Link>}
         </div>

         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2 " >
         <Link to={"/take-class"} ><img src="/assets/class.svg" alt="not found" width={20} height={20} className={`cursor-pointer ${location.pathname==="/take-class"? "filter-blue" : "filter-gray"}`} /></Link>
          {collapse && <Link to={"/take-class"} className={` ${location.pathname==="/take-class"?"text-blue-500":"text-gray-500"} font-semibold ml-4 `} >Take class</Link>}
         </div>

         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2" >
         <Link to={"/class-library"} ><img src="/assets/library.svg" alt="not found" width={20} height={20} className={`cursor-pointer ${location.pathname==="/class-library"? "filter-blue" : "filter-gray"}`} /></Link>
          {collapse && <Link to={"/class-library"} className={` ${location.pathname==="/class-library"?"text-blue-500":"text-gray-500"} font-semibold ml-4 `} >Class Library</Link>}
         </div>

         <div className="w-full h-[10%] flex justify-start items-center pl-8 py-2 " >
         <Link to={"/doubt"}><img src="/assets/doubt.svg" alt="not found" width={20} height={20} className={`cursor-pointer ${location.pathname==="/doubt"? "filter-blue" : "filter-gray"}`} /></Link>
          {collapse && <Link to={"/doubt"} className={` ${location.pathname==="/doubt"?"text-blue-500":"text-gray-500"} font-semibold ml-4 `} >Doubt</Link>}
         </div>
        </div>
      </div>
      
    </div>
    <div className="w-full lg:w-4/5 min-h-screen ">
    <Routes>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/teach" element={ <Teach/> }/>
        <Route path="/take-class" element={ <TakeClass/> }/>
        <Route path="/class-library" element={ <ClassLibrary/> }/>
        <Route path="/doubt" element={<Doubt/> }/>
      </Routes>
    </div>
  </div>
  )
}

export default Home
