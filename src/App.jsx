import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from "./pages/Dashboard"
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>   
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
    </>
    
      
  )
}

export default App
