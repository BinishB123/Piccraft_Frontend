

function Login(){
    return (
        <>
          <div className="w-[60%] h-[350px]  rounded-md shadow-lg flex flex-col space-y-3 items-center border-2 border-green-200 ">
            <div className="w-[80%] h-[50px]  mt-5">
              <h1 className="text-2xl text-center text-green-400 font-bold ">
                LOGIN
              </h1>
            </div>
            
            <div className="w-[80%] h-[60px] ">
              <h2 className="text-sm text-green-700">Email</h2>
              <input
                type="text"
                className="w-full h-[40px] pl-4 border-2 rounded-sm border-green-400 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="w-[80%] h-[60px] ">
              <h2 className="text-sm text-green-700">Password</h2>
              <input
                type="text"
                className="w-full h-[40px] border-2  pl-4 rounded-sm border-green-400 outline-none"
                name=""
                id=""
              />
            </div>
            <div className="w-[80%] h-[100px]  flex flex-col space-y-2 justify-center">
              <button className="w-[100%] h-[50px] bg-green-400 text-xl text-white rounded-md font-semibold">
                SIGN IN
              </button>
              <h1 className="text-sm text-grey-500 text-center font-semibold cursor-pointer ">Sign-Up if you don't have an account ?</h1>
            </div>
          </div>
        </>
      );

}

export default Login