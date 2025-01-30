import { RiImageCircleAiFill } from "react-icons/ri";

function Header() {
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
          <h1 className="text-xl font-semibold text-green-600">Login</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
