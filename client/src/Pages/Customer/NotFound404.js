import React from "react";
import page404 from "../../Assets/Images/page404.png";
import Logo from "../../Layouts/Logo";
import Button from "../../Components/Button";

const NotFound404 = () => {
  return (
    <div className="relative">
      <img className="w-full h-[100vh]" src={page404} alt="" />
      <div className="absolute top-[15%] left-[15%] text-center">
        <Logo className="w-[450px]"></Logo>
      </div>
      <div className="absolute top-[55%] left-[20%] text-center">
        <Button
          to="/"
          className="w-[300px] h-[70px] bg-slate-300 rounded-lg text-center leading-[70px] font-bold text-2xl hover:bg-orange-600 hover:text-white transition-all"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound404;
