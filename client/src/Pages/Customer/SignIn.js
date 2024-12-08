import React, { useEffect, useState } from "react";
import ModalConfig from "../../Configs/ModalConfig";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ValidateSignIn } from "../../Validations/ValidateSignIn";
import InputPassword from "../../Components/InputPassword";
import Logo from "../../Layouts/Logo";
import Button from "../../Components/Button";
import InputTextField from "../../Components/InputTextField";
import { useGoogleLogin } from "@react-oauth/google";
import useStore from "../../Zustand/store";
import { getApi } from "../../API/GetApi";
import { postApi } from "../../API/PostApi";
import FacebookLogin from "@greatsumini/react-facebook-login";

const SignIn = ({ openModal, setOpenModal }) => {
  const [resetData, setResetData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setRenderHeader } = useStore();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  // Đăng nhập bằng Google
  const handleSignInAccountGoogle = async (DataResponse) => {
    const { access_token } = DataResponse;
    const dataUser = await getApi.getDataGoogle(access_token);
    postApi.loginAccount(
      dataUser.email,
      dataUser.sub,
      setResetData,
      resetData,
      setOpenModal,
      setRenderHeader
    );
    navigate("/");
  };
  const signInAccountGoogle = useGoogleLogin({
    onSuccess: handleSignInAccountGoogle,
    onError: () => {
      console.log("Login Failed");
    },
  });

  //đăng nhập bằng form
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ValidateSignIn),
    mode: "onChange",
  });

  const handleSubmitSignIn = (value) => {
    if (!isValid) return;
    postApi.loginAccount(
      value.email,
      value.password,
      setResetData,
      resetData,
      setOpenModal,
      setRenderHeader,
    );
    navigate("/");
  };

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetData]);

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  return (
    <CSSTransition in={openModal} timeout={200} unmountOnExit classNames="zoom">
      <ModalConfig
        isIconClose={true}
        bodyModal="screenLarge:w-[30%] desktop:w-[35%] tablet:w-[70%] laptop:[w-40%] tablet:w-[80%] mobile:w-[90%] bg-white py-5 px-7 rounded-lg"
        styleModal={{ transition: "all 0.2s linear" }}
        closeModal={() => setOpenModal(false)}
      >
        <div className="flex justify-center">
          <Logo className="screenLarge:w-[250px] screenLarge:h-[200px] desktop:w-[150px] desktop:h-[150px] laptop:w-[200px] laptop:h-[150px] mobile:w-[200px] mobile:h-[150px] "></Logo>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleSubmitSignIn)}>
            <div className="flex flex-col gap-5 modal_SignIn">
              <InputTextField
                className="w-full"
                label="Nhập email"
                type="email"
                name="email"
                color={errors.email ? "error" : "success"}
                control={control}
              ></InputTextField>
              <InputPassword
                className="w-full"
                label="Nhập mật khẩu"
                type={showPassword ? "text" : "password"}
                name="password"
                color={errors.password ? "error" : "success"}
                control={control}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              ></InputPassword>
            </div>
            <NavLink className="text-blue-500 flex justify-end my-3 text-[14px]">
              Quên mật khẩu?
            </NavLink>
            <Button className="w-full h-[50px] bg-bgPrimary rounded-md text-center leading-[50px] text-white font-bold">
              ĐĂNG NHẬP
            </Button>
          </form>
          <div className="signUp_google-fb h-[2px] w-full bg-slate-500 relative my-6"></div>
          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={signInAccountGoogle}
              className="flex w-full h-[50px] bg-red-700 rounded-md text-white text-[12px] font-bold"
            >
              <div className="flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
                <h2>Đăng nhập với Google</h2>
              </div>
            </Button>
            <FacebookLogin
              appId="586696967148090"
              render={(renderProps) => (
                <Button
                  className="w-full h-[50px] bg-blue-800 rounded-md text-white text-[12px] font-bold items-center justify-center gap-3"
                  onClick={renderProps.onClick}
                  disabled={renderProps.isDisabled}
                >
                  <div className="flex justify-center items-center gap-2 h-[50px]">
                    <FontAwesomeIcon icon={faFacebook} className="text-3xl" />
                    <h2>Đăng nhập với Facebook</h2>
                  </div>
                </Button>
              )}
              onProfileSuccess={(response) => {
                postApi.loginAccount(
                  response.email,
                  response.id,
                  setResetData,
                  resetData,
                  setOpenModal,
                  setRenderHeader
                );
              }}
            />
          </div>
        </div>
      </ModalConfig>
    </CSSTransition>
  );
};

export default SignIn;
