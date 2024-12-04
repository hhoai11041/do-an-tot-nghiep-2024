import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPen,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import InputPassword from "./InputPassword";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { ValidateChangePass } from "../Validations/ValidateChangePass";
import { Avatar, TextField } from "@mui/material";
import { convertDateTime } from "./ConvertDateTime";
import UploadAvatarUser from "../uploads/UploadAvatarUser";
import { UpdateApi } from "../API/UpdateApi";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs-react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 3, py: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileAccount = ({ dataUser, renderUI, setRenderUI, setOpenModal }) => {
  const accessToken = Cookies.get("accessToken");
  const [value, setValue] = useState(0);
  const [editInfo, setEditInfo] = useState(false);
  const divRef = useRef(null);
  const btnSaveEditInfo = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        btnSaveEditInfo.current &&
        !btnSaveEditInfo.current.contains(event.target)
      ) {
        setEditInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // thay doi anh dai dien
  const [imageValue, setImageValue] = useState("");
  const [valueUserName, setValueUserName] = useState(dataUser?.username || "");

  const handleUpdateAccount = () => {
    const dataUpdate = {
      avatar: imageValue !== "" ? imageValue : dataUser?.avatar,
      username: valueUserName,
    };

    UpdateApi.updateAccountByUserId(
      accessToken,
      dataUser?._id,
      dataUpdate,
      setRenderUI,
      renderUI
    );

    setOpenModal(false);
  };

  // Thay đổi mật khẩu
  const [resetData, setResetData] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordnew] = useState(false);
  const [showConfirmPassNew, setShowConfirmPassNew] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ValidateChangePass),
    mode: "onChange",
  });

  const submitChangePassword = async (value) => {
    if (!isValid) return;

    const isPasswordValid = await bcrypt.compare(
      value.passwordOld,
      dataUser?.password
    );
    if (!isPasswordValid) {
      toast.error("Mật khẩu hiện tại không đúng", {
        pauseOnHover: false,
      });
    } else {
      const dataChangePassword = {
        password: value.confirmPasswordNew,
      };
      UpdateApi.updateAccountByUserId(
        accessToken,
        dataUser?._id,
        dataChangePassword,
        setRenderUI,
        renderUI
      );
      setResetData(true);
    }
  };

  useEffect(() => {
    reset({
      passwordOld: "",
      passwordNew: "",
      confirmPasswordNew: "",
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
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "60vh",
        }}
      >
        <Box
          sx={{
            width: "25%",
            boxShadow: 3,
            textAlign: "left",
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            textColor=""
            sx={{ py: 2, color: "#ff6b19" }}
          >
            <Tab
              {...a11yProps(0)}
              icon={
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
                  <h1>Thông tin cá nhân</h1>
                </div>
              }
            />
            <Tab
              icon={
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUserLock} className="text-lg" />
                  <h1>Bảo mật</h1>
                </div>
              }
              {...a11yProps(1)}
            />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <Box
          sx={{
            width: "75%",
            py: 2,
          }}
        >
          <CustomTabPanel value={value} index={0}>
            <div className="w-full flex justify-center">
              <UploadAvatarUser
                setImageValue={setImageValue}
                imageValue={dataUser?.avatar}
              ></UploadAvatarUser>
            </div>
            <div className="screenLarge:w-[55%] desktop:w-[55%] laptop:w-[55%] tablet:w-[75%] mx-auto flex flex-col gap-5 mt-6">
              <div ref={divRef} className="flex items-center relative">
                <label className="w-[50%] font-semibold">Tài khoản: </label>
                <TextField
                  color="warning"
                  value={valueUserName}
                  variant="standard"
                  className="w-full"
                  onChange={(e) => setValueUserName(e.target.value)}
                  focused={editInfo ? true : false}
                  slotProps={{
                    input: {
                      readOnly: !editInfo ? true : false,
                    },
                  }}
                />
                <FontAwesomeIcon
                  onClick={() => setEditInfo(true)}
                  icon={faPen}
                  className={`${
                    editInfo ? "text-textPrimary" : ""
                  } hover:text-textPrimary transition-all absolute bottom-1/2 translate-y-[50%] right-[-12px] text-lg cursor-pointer p-3`}
                />
              </div>
              <div className="flex items-center">
                <label className="w-[50%] font-semibold">Email: </label>
                <TextField
                  color="warning"
                  defaultValue={dataUser?.email}
                  variant="standard"
                  className="w-full"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </div>
              <div className="flex items-center">
                <label className="w-[50%] font-semibold">Vai trò: </label>
                <TextField
                  color="warning"
                  defaultValue={
                    dataUser?.role === "customer"
                      ? "Khách hàng"
                      : "Quản trị viên"
                  }
                  variant="standard"
                  className="w-full"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </div>
              <div className="flex items-center">
                <label className="w-[50%] font-semibold">Ngày tạo: </label>
                <TextField
                  color="warning"
                  defaultValue={convertDateTime(dataUser?.createdAt)}
                  variant="standard"
                  className="w-full"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </div>
              <div ref={btnSaveEditInfo}>
                {(editInfo || imageValue) && (
                  <Button
                    onClick={handleUpdateAccount}
                    className="w-full mt-5 h-[50px] bg-bgPrimary rounded-md text-center leading-[50px] text-white font-bold"
                  >
                    Lưu thông tin
                  </Button>
                )}
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-[75%] mx-auto">
              <h1 className="text-orange-600 text-center text-lg uppercase mb-5 font-semibold">
                Thay đổi mật khẩu
              </h1>
              <form onSubmit={handleSubmit(submitChangePassword)}>
                <div className="flex flex-col gap-5 change_password">
                  <InputPassword
                    className="w-full"
                    label="Mật khẩu hiện tại"
                    type={showPasswordOld ? "text" : "password"}
                    name="passwordOld"
                    color={errors.passwordOld ? "error" : "success"}
                    control={control}
                    showPassword={showPasswordOld}
                    setShowPassword={setShowPasswordOld}
                  ></InputPassword>
                  <InputPassword
                    className="w-full"
                    label="Mật khẩu mới"
                    type={showPasswordNew ? "text" : "password"}
                    name="passwordNew"
                    color={errors.passwordNew ? "error" : "success"}
                    control={control}
                    showPassword={showPasswordNew}
                    setShowPassword={setShowPasswordnew}
                  ></InputPassword>
                  <InputPassword
                    className="w-full"
                    label="Xác nhận mật khẩu mới"
                    type={showConfirmPassNew ? "text" : "password"}
                    name="confirmPasswordNew"
                    color={errors.confirmPasswordNew ? "error" : "success"}
                    control={control}
                    showPassword={showConfirmPassNew}
                    setShowPassword={setShowConfirmPassNew}
                  ></InputPassword>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-5 h-[50px] bg-bgPrimary rounded-md text-center leading-[50px] text-white font-bold"
                >
                  ĐỔI MẬT KHẨU
                </Button>
              </form>
            </div>
          </CustomTabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default ProfileAccount;
