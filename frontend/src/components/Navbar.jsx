// import { Link, useLocation, useNavigate } from "react-router-dom"
// import {BsSearch} from 'react-icons/bs'
// import {FaBars} from 'react-icons/fa'
// import { useContext, useState } from "react"
// import Menu from "./Menu"
// import { UserContext } from "../context/UserContext"


// const Navbar = () => {
  
//   const [prompt,setPrompt]=useState("")
//   const [menu,setMenu]=useState(false)
//   const navigate=useNavigate()
//   const path=useLocation().pathname
  
//   const showMenu=()=>{
//     setMenu(!menu)
//   }
  
//  const {user}=useContext(UserContext)
    
//   return (

//   // <div className="flex items-center justify-between px-6 md:px-[200px] py-4 ">
//   //   <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
//   //   {path==="/" && <div className="flex justify-center items-center space-x-0">
//   //   <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
//   //   <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 " placeholder="Search a post" type="text"/>
    
//   //   </div>}
//   //   <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
//   //     {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
//   //     {user? <div onClick={showMenu}>
//   //       <p className="cursor-pointer relative"><FaBars/></p>
//   //       {menu && <Menu/>}
//   //     </div>:<h3><Link to="/register">Register</Link></h3>}
//   //   </div>
//   //   <div onClick={showMenu} className="md:hidden text-lg">
//   //     <p className="cursor-pointer relative"><FaBars/></p>
//   //     {menu && <Menu/>}
//   //   </div>

//   //   </div>

//   // improve code for navbar: it's sticky at top and coloured 
//   <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black sticky top-0 z-10">
//     <h1 className="text-lg md:text-xl text-white font-extrabold"><Link to="/">Blog App</Link></h1>
//     {path==="/" && <div className="flex justify-center items-center space-x-0">
//     {/* <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch/></p>
//     <input onChange={(e)=>setPrompt(e.target.value)} className="outline-none px-3 " placeholder="Search a post" type="text"/>
//      */}

// {/* making the search bar rounded and search icon inside it at right corner */}
// <div className="relative">
//         <input 
//             onChange={(e)=>setPrompt(e.target.value)} 
//             className="outline-none px-3 pr-10 bg-gray-200 text-black rounded-full py-1" 
//             placeholder="Search a post" 
//             type="text"
//         />
//         <p 
//             onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} 
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//         >
//             <BsSearch/>
//         </p>
//     </div>

//     </div>}
//     <div className="hidden md:flex items-center  text-white justify-center space-x-2 md:space-x-4">
//       {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
//       {user? <div onClick={showMenu}>
//         <p className="cursor-pointer relative text-white"><FaBars/></p>
//         {menu && <Menu/>}
//       </div>:<h3><Link to="/register">Register</Link></h3>}
//     </div>
//     <div onClick={showMenu} className="md:hidden text-lg">
//       <p className="cursor-pointer relative"><FaBars/></p>
//       {menu && <Menu/>}
//     </div>
// </div>
    
//   )
// }
// export default Navbar 


// improved code... search bar working fine 

import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    if (prompt.trim() !== "") {
      navigate(prompt ? `?search=${prompt}` : "/");
    }
  };

  useEffect(() => {
    // Clear search input when navigating to home page without search query parameter
    if (location.pathname === "/" && !location.search.includes("search=")) {
      setPrompt("");
    }
  }, [location]);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black sticky top-0 z-10">
      <h1 className="text-lg md:text-xl text-white font-extrabold">
        <Link to="/">Blog App</Link>
      </h1>
      {location.pathname === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <div className="relative">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="outline-none px-3 pr-10 bg-gray-200 text-black rounded-full py-1"
              placeholder="Search a post"
              type="text"
            />
            <p
              onClick={performSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <BsSearch />
            </p>
          </div>
        </div>
      )}
      <div className="hidden md:flex items-center  text-white justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative text-white">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
