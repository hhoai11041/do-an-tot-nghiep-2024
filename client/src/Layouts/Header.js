import React, { useEffect, useState } from "react";
import NavConfig from "../Configs/NavConfig";
import Logo from "./Logo";
import InputText from "../Components/InputText";
import Button from "../Components/Button";
import SignUp from "../Pages/Customer/SignUp";
import SignIn from "../Pages/Customer/SignIn";
import Cookies from "js-cookie";
import UserAccount from "../Components/UserAccount";
import { getApi } from "../API/GetApi";
import useStore from "../Zustand/store";
import ThemeUI from "../Components/ThemeUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  const [renderUI, setRenderUI] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [clickedBar, setClickBar] = useState(false);
  const { renderApp } = useStore();
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (accessToken) getApi.getApiUser(accessToken, setDataUser);
  }, [accessToken, renderUI, renderApp]);

  return (
    <div>
      <div className="bg-white dark:bg-bgThemeUI flex items-center h-[80px] fixed top-0 z-50 w-full text-[18px] border-b-[1px] dark:border-stone-500 ">
        <div className="flex justify-between items-center screenLarge:w-[80%] desktop:w-screenWidth laptop:w-[90%] tablet:w-[95%] tablet:justify-end mobile:w-full mx-auto">
          <div className="flex items-center screenLarge:justify-start laptop:justify-start desktop:justify-start tablet:justify-start mobile:justify-center screenLarge:relative desktop:relative laptop:relative mobile:absolute gap-4 screenLarge:w-[45%] desktop:w-[40%] laptop:w-[25%] tablet:w-[90%] mobile:w-full">
            <Logo className="h-[130px] w-[130px]"></Logo>
            <InputText
              placeholder="Tìm kiếm theo địa điểm, hoạt động..."
              className="mobile:hidden"
            ></InputText>
          </div>

          <div className="screenLarge:w-[55%] desktop:w-[60%]">
            <div className="flex gap-6 items-center">
              <NavConfig
                clickedBar={clickedBar}
                setModalSignUp={setModalSignUp}
                setModalSignIn={setModalSignIn}
              ></NavConfig>
              {accessToken ? (
                <div className="flex justify-between items-center gap-4 screenLarge:relative desktop:relative laptop:relative tablet:relative mobile:fixed right-0">
                  <ThemeUI></ThemeUI>
                  <UserAccount
                    accessToken={accessToken}
                    dataUser={dataUser}
                    setRenderUI={setRenderUI}
                    renderUI={renderUI}
                  ></UserAccount>
                </div>
              ) : (
                <div className="flex justify-end gap-3 screenLarge:flex desktop:flex laptop:flex tablet:flex mobile:hidden tablet:w-[250px] screenLarge:w-full desktop:w-full laptop:w-full">
                  <ThemeUI></ThemeUI>
                  <Button
                    onClick={() => setModalSignUp(true)}
                    className="h-[40px] w-[120px] bg-slate-50 dark:text-black border text-center leading-[40px] rounded-2xl font-semibold text-[16px] hover:bg-slate-100 px-4 transition-all"
                  >
                    Đăng ký
                  </Button>
                  <Button
                    onClick={() => setModalSignIn(true)}
                    className="h-[40px] xl:w-[120px] bg-bgPrimary text-center leading-[40px] text-white rounded-2xl px-4 font-semibold text-[16px] transition-all"
                  >
                    Đăng nhập
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="screenLarge:hidden desktop:hidden laptop:hidden tablet:fixed mobile:fixed">
          {clickedBar ? (
            <div
              className="cursor-pointer screenLarge:hidden desktop:hidden laptop:hidden mr-6 flex justify-start tablet:w-4 mobile:w-[33%] pl-3"
              onClick={() => setClickBar(false)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="size-9 text-textPrimary"
              />
            </div>
          ) : (
            <div
              onClick={() => setClickBar(true)}
              className="cursor-pointer screenLarge:hidden desktop:hidden laptop:hidden mr-6 flex justify-start tablet:w-4 mobile:w-[33%] pl-3"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="size-9 text-textPrimary"
              />
            </div>
          )}
        </div>
      </div>

      <SignUp openModal={modalSignUp} setOpenModal={setModalSignUp}></SignUp>
      <SignIn openModal={modalSignIn} setOpenModal={setModalSignIn}></SignIn>
    </div>
  );
};

export default Header;
