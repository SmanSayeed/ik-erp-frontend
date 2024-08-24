import './App.css';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import LoginPage from './Components/Organism/LoginPage';

function App() {
  // const notify = () => {
  //   console.log("clicked toaster");
  //   toast("Wow so easy!");
  // };

  return (
    <>
      <div className=''>
        <LoginPage />
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
