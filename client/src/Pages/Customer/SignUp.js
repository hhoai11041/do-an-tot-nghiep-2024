import React, { useEffect, useState } from "react";
import ModalConfig from "../../Configs/ModalConfig";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ValidateSignUp } from "../../Validations/ValidateSignUp";
import { toast } from "react-toastify";
import InputPassword from "../../Components/InputPassword";
import Logo from "../../Layouts/Logo";
import Button from "../../Components/Button";
import InputTextField from "../../Components/InputTextField";
import { useGoogleLogin } from "@react-oauth/google";
import { getApi } from "../../API/GetApi";
import { postApi } from "../../API/PostApi";
import useStore from "../../Zustand/store";
import FacebookLogin from "@greatsumini/react-facebook-login";
const SignUp = ({ openModal, setOpenModal }) => {
  const { setRenderHeader } = useStore();
  const navigate = useNavigate();
  const [resetData, setResetData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  // đăng ký tài khoản bằng google
  const handleSignUpAccountGoogle = async (DataResponse) => {
    const { access_token } = DataResponse;
    const dataUser = await getApi.getDataGoogle(access_token);
    await postApi.createAccount(
      dataUser.name,
      dataUser.email,
      dataUser.sub,
      dataUser.picture,
      setResetData,
      resetData,
      setOpenModal
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await postApi.loginAccount(
      dataUser.email,
      dataUser.sub,
      setResetData,
      resetData,
      setOpenModal,
      setRenderHeader
    );
    navigate("/");
  };
  const signUpAccountGoogle = useGoogleLogin({
    onSuccess: handleSignUpAccountGoogle,
    onError: () => {
      console.log("Login Failed");
    },
  });

  // đăng ký tài khoản bằng form
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ValidateSignUp),
    mode: "onChange",
  });

  const submitFormSignUp = async (value) => {
    if (!isValid) return;
    await postApi.createAccount(
      value.username,
      value.email,
      value.confirmPassword,
      "",
      setResetData,
      resetData,
      setOpenModal
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Đăng ký tài khoản thành công sẽ tự động đăng nhập tài khoản sau 2s

    await postApi.loginAccount(
      value.email,
      value.confirmPassword,
      setResetData,
      resetData,
      setOpenModal,
      setRenderHeader
    );
    navigate("/");
  };

  useEffect(() => {
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        bodyModal="screenLarge:w-[30%] screenLarge:h-[90vh] desktop:h-[97vh] laptop:h-[90vh] tablet:h-auto desktop:w-[35%] laptop:[w-40%] tablet:w-[70%] mobile:w-[90%] mobile:h-[80vh] screenLarge:overflow-visible desktop:overflow-visible laptop:overflow-visible px-7 bg-white screenLarge:py-5 rounded-lg"
        styleModal={{ transition: "all 0.2s linear" }}
        closeModal={() => {
          setOpenModal(false);
        }}
      >
        <div className="screenLarge:h-auto desktop:h-auto laptop:h-auto tablet:h-auto mobile:h-[80vh] mobile:overflow-y-scroll signUp pb-4">
          <div className="flex justify-center">
            <Logo className="screenLarge:w-[250px] screenLarge:h-[200px] desktop:w-[150px] desktop:h-[130px] laptop:w-[200px] laptop:h-[150px] tablet:w-[150px] tablet:h-[120px] mobile:w-[200px] mobile:h-[150px] "></Logo>
          </div>
          <div>
            <form onSubmit={handleSubmit(submitFormSignUp)}>
              <div className="flex flex-col gap-3">
                <InputTextField
                  className="w-full"
                  label="Tên tài khoản"
                  type="text"
                  name="username"
                  color={errors.username ? "error" : "success"}
                  control={control}
                ></InputTextField>
                <InputTextField
                  className="w-full"
                  label="Email"
                  type="email"
                  name="email"
                  color={errors.email ? "error" : "success"}
                  control={control}
                ></InputTextField>
                <InputPassword
                  className="w-full"
                  label="Tạo mật khẩu"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  color={errors.password ? "error" : "success"}
                  control={control}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                ></InputPassword>
                <InputPassword
                  className="w-full"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  color={errors.confirmPassword ? "error" : "success"}
                  control={control}
                  showPassword={showConfirmPass}
                  setShowPassword={setShowConfirmPass}
                ></InputPassword>
              </div>
              <div className="mt-2 mb-3 flex items-center screenLarge:text-[13px] desktop:text-[13px] laptop:text-[13px] tablet:text-[13px]">
                <Checkbox checked />
                <div className="flex gap-2 mobile:hidden screenLarge:flex desktop:flex laptop:flex tablet:flex">
                  <span>Tôi đồng ý với</span>
                  <NavLink className="text-blue-500">
                    Điều Khoản Dịch vụ
                  </NavLink>
                  <span>và</span>
                  <NavLink className="text-blue-500">
                    Chính Sách Bảo Mật
                  </NavLink>
                </div>
                <p className="screenLarge:hidden desktop:hidden laptop:hidden tablet:hidden mobile:text-[12px]">
                  Tôi đồng ý với điều khoản Dịch vụ và Chính sách bảo mật
                </p>
              </div>
              <Button
                type="submit"
                className="w-full h-[50px] bg-bgPrimary rounded-md text-center leading-[50px] text-white font-bold"
              >
                ĐĂNG KÝ
              </Button>
            </form>

            <div className="signUp_google-fb h-[2px] w-full bg-slate-500 relative my-6"></div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={signUpAccountGoogle}
                className="flex w-full h-[50px] text-white text-[12px] bg-red-800 rounded-md font-bold"
              >
                <div className="flex items-center justify-center gap-3">
                  <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
                  <h2>Đăng ký với Google</h2>
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
                      <h2>Đăng ký với Facebook</h2>
                    </div>
                  </Button>
                )}
                onProfileSuccess={async (response) => {
                  await postApi.createAccount(
                    response.name,
                    response.email,
                    response.id,
                    response.picture.data.url,
                    setResetData,
                    resetData,
                    setOpenModal
                  );
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  await postApi.loginAccount(
                    response.email,
                    response.id,
                    setResetData,
                    resetData,
                    setOpenModal,
                    setRenderHeader
                  );
                  navigate("/");
                }}
              />
            </div>
          </div>
        </div>
      </ModalConfig>
    </CSSTransition>
  );
};

export default SignUp;
