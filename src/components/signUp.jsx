import { useReducer } from "react";
import signupReducer from "../reducers/signUpReducer";
import { axiosInstance } from "../api/axios";

function Signup() {
  const [signUpData,dispatch] = useReducer(signupReducer,{name:"",email:"",password:"",mobile:""})

  const submitfunction = ()=>{
    axiosInstance.post('/auth/signup',{signUpData}).then((response)=>{
      console.log(response);
      
    })
  }


  return (
    <>
      <div className="w-[60%] h-[470px]  rounded-md shadow-lg flex flex-col space-y-3 items-center border-2 border-green-200 ">
        <div className="w-[80%] h-[50px]  mt-5">
          <h1 className="text-2xl text-center text-green-400 font-bold ">
            SIGNUP
          </h1>
        </div>
        <div className="w-[80%] h-[60px] ">
          <h2 className="text-sm text-green-700">Name</h2>
          <input
            value={signUpData.name}
            onChange={(e)=>{
              dispatch({type:"name",name:e.target.value})
            }}
            type="text"
            className="w-full  pl-4 h-[40px] border-2 rounded-sm border-green-400 outline-none"
            name=""
            id=""
          />
        </div>
        <div className="w-[80%] h-[60px] ">
          <h2 className="text-sm text-green-700">Mobile</h2>
          <input
            type="text"
            className="w-full  pl-4 h-[40px] border-2 rounded-sm border-green-400 outline-none"
            name=""
            id=""
          />
        </div>
        <div className="w-[80%] h-[60px] ">
          <h2 className="text-sm text-green-700">Email</h2>
          <input
            type="text"
            className="w-full h-[40px]  pl-4 border-2 rounded-sm border-green-400 outline-none"
            name=""
            id=""
          />
        </div>
        <div className="w-[80%] h-[60px] ">
          <h2 className="text-sm text-green-700">Password</h2>
          <input
            type="text"
            className="w-full h-[40px]  pl-4 border-2 rounded-sm border-green-400 outline-none"
            name=""
            id=""
          />
        </div>
        <div className="w-[80%] h-[100px]  flex flex-col justify-center">
          <button className="w-[100%] h-[50px] bg-green-400 text-xl cursor-pointer text-white rounded-md font-semibold" onClick={submitfunction}>
            SIGN UP
          </button>
          <h1 className="text-sm text-grey-500 text-center font-semibold cursor-pointer ">Sign-In if you  have an account ?</h1>

        </div>
      </div>
    </>
  );
}

export default Signup;
