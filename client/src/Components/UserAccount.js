import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { deepOrange } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import SignIn from "../Pages/Customer/SignIn";
import { NavLink, useNavigate } from "react-router-dom";
import { announce } from "./ModalAnnounce";
import ModalAdmin from "../Configs/ModalAdmin";
import ProfileAccount from "./ProfileAccount";
import { postApi } from "../API/PostApi";
import useStore from "../Zustand/store";

const UserAccount = ({ dataUser, setRenderUI, renderUI }) => {
  const [modalSignIn, setModalSignIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [modalInfoAccount, setModalInfoAccount] = useState(false);
  const [resetData, setResetData] = useState(false);
  const { setRenderHeader } = useStore();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    postApi.logoutAccount(setResetData, resetData);
    setRenderHeader()
    setRenderUI(() => !renderUI);
    announce.showSuccessModal(
      "Thành công",
      "Bạn đã đăng xuất tài khoản thành công"
    );
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="Duong"
              src={dataUser?.avatar}
              sx={{ width: 40, height: 40, bgcolor: deepOrange[500] }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: -0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setModalInfoAccount(true);
          }}
        >
          <Avatar /> Hồ sơ
        </MenuItem>
        <Divider />
        {dataUser?.role === "admin" && (
          <NavLink to="/admin/dashboard">
            <MenuItem>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faList} className="w-6" />
                <p>Quản lý</p>
              </div>
            </MenuItem>
            <Divider />
          </NavLink>
        )}

        <MenuItem
          onClick={() => {
            handleClose();
            setModalSignIn(true);
          }}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUserPlus} className="w-6" />
            <p>Thêm tài khoản</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faRightFromBracket} className="w-6" />
            <p>Đăng xuất</p>
          </div>
        </MenuItem>
      </Menu>
      <SignIn openModal={modalSignIn} setOpenModal={setModalSignIn}></SignIn>
      <ModalAdmin
        openModal={modalInfoAccount}
        setOpenModal={setModalInfoAccount}
        children={
          <ProfileAccount
            dataUser={dataUser}
            setRenderUI={setRenderUI}
            renderUI={renderUI}
            setOpenModal={setModalInfoAccount}
          ></ProfileAccount>
        }
        className="screenLarge:w-[60%] desktop:w-[60%] laptop:w-[60%] tablet:w-[95%] mobile:w-[95%] bg-white screenLarge:overflow-visible desktop:overflow-visible laptop:overflow-visible tablet:overflow-visible mobile:overflow-x-scroll overflow-hidden rounded-md modal_profile"
        overlayOpacity="bg-opacity-50"
      ></ModalAdmin>
    </div>
  );
};

export default UserAccount;
