// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Login from './Components/Pages/Login';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function App() {
  const [count, setCount] = useState(0);

  // const notify = () => {
  //   console.log("clicked toaster");
  //   toast("Wow so easy!");
  // };

  return (
    <>
      <div className=''>
        <Login />
        {/* <button onClick={notify}>Notify!</button> */}
        {/* Make sure ToastContainer is included */}
        {/* <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
        /> */}
      </div>
    </>
  );
}

export default App;
