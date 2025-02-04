import { RiImageCircleAiFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutthunk } from "../redux/thunk/auth";
import { reset } from "../redux/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Header() {
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state)=>state.user) 
  const navigate = useNavigate()
  useEffect(()=>{
    if (!userInfo) {
      navigate('/login')
    }
  },[userInfo])

  const handleLogoutOnClick = () => {
   
    dispatch(logoutthunk()).then(() => {
     localStorage.removeItem('user')
      toast("Logout successful");
      
      dispatch(reset());
    
    });
  };

  return (
    <>
      <div className="w-[100%]  h-[60px] shadow-md shadow-green-200 flex justify-between">
        <div className="w-[50%] mt-3 h-[50px]  flex  ml-4 space-x-1  ">
          <RiImageCircleAiFill className=" text-4xl text-green-400" />
          <h1 className="pt-2 text-green-400 font-semibold text-sm font-dm letter-spacing-2 tracking-wider">
            PICCRAFT
          </h1>
        </div>
        <div className="w-[40%] mr-6 mt-3 h-[50px] flex justify-end cursor-pointer ">
          <h1 className="text-xl font-semibold text-green-600" onClick={handleLogoutOnClick}>Logout</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
