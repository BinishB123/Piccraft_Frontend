import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {Toaster} from 'sonner'
import LoginOrSignUp from "./pages/SignUpOrLogin";
import Gallery from "./pages/mainPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)
  useEffect(()=>{
    if (!userInfo?.id) {
      navigate("/login", { replace: true })
      console.log("ookk")
      return    
  }

  },[])
  
  return <>{children}</>;
};







function App() {
  // const [count, setCount] = useState(0)




  return (
    <>
      <BrowserRouter>
      <Toaster  position='top-center' richColors/>
        <Routes>
          <Route path="/signup" element={<LoginOrSignUp value={true} />} />
          <Route path="/login" element={<LoginOrSignUp value={false} />}/>
          <Route path="/" element={<ProtectedRoute><Gallery/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
