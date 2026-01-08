// import {Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar"; // Uncomment this line if Navbar exists
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import UploadVideo from "./pages/UploadVideo";
// import VideoDetails from "./pages/VideoDetails";

// const App = () => {
//   return (
//     <>
//       <Navbar /> {/* Remove this line if Navbar does not exist */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/upload" element={<UploadVideo />} />
//         <Route path="/video/:id" element={<VideoDetails />} />
//       </Routes>
//       </>
//   );
// };

// export default App;


// import React, { useState } from 'react'

// const App = () => {
//   const [userName, setUserName]=useState('');
//   const submitHandler =(e)=>{
//     e.preventDefault()
//     console.log(userName);
//     setUserName('');
//   }
//   const handleChange =(e) =>{
//     setUserName(e.target.value);
//     //console.log(e.target.value);
//   }
//   return (
//     <div>
//       <form onSubmit={(e) => {
//         submitHandler(e);
//       }}>
//         < input
//         value={userName}
//         onChange={handleChange}
//         className='px-4 py-3 text-xl m-5 border-2' 
//         type="text" 
//         placeholder='Enter your text' />
//         <button className='px-4 py-3 text-xl m-5 font-semibold text-zinc-50 bg-slate-600 rounded'>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default App;

import React from 'react'
import Header from './components/Header'
import { Outlet } from "react-router-dom";
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App

