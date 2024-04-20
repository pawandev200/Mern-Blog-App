// import { Link, useNavigate } from "react-router-dom"
// import Footer from "../components/Footer"
// import { useContext, useState } from "react"
// import axios from "axios"
// import { URL } from "../url"
// import { UserContext } from "../context/UserContext"


// const Login = () => {
//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("")
//   const [error,setError]=useState(false)
//   const {setUser}=useContext(UserContext)
//   const navigate=useNavigate()

//   const handleLogin=async()=>{
//     try{
//       const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
//       // console.log(res.data)
//       // setUser(res.data)
//       setUser(res.data.info)
//       const token=res.data.token
//       localStorage.setItem("token",token)
//       navigate("/")

//     }
//     catch(err){
//       setError(true)
//       console.log(err)

//     }

//   }
//   return (
//     <>
//     {/* <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
//     <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog App</Link></h1>
//     <h3><Link to="/register">Register</Link></h3>
//     </div> */}

// <div className="sticky top-0 bg-black shadow-md z-50">
//  <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
//     <h1 className="text-lg md:text-xl text-white font-extrabold"><Link to="/">Blog App</Link></h1>
//     <h3><Link to="/register" className="text-white" >Register</Link></h3>
//     </div>
//   </div>

// <div className="w-full flex justify-center items-center h-[80vh] ">
//        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
//          <h1 className="text-xl font-bold text-left">Log in to your account</h1>
//          <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
//          <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
//          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
//          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
//          <div className="flex justify-center items-center space-x-3">
//           <p>New here?</p>
//           <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
//          </div>
//        </div>
//     </div>
//     <Footer/>
//     </>
    
//   )
// }

// export default Login



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

