import React, { useState } from "react";
import Logo from "../Logo";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faClipboardList,
  faCloudMeatball,
  faHotel,
  faHouse,
  faList,
  faLocationCrosshairs,
  faMapLocationDot,
  faMessage,
  faNewspaper,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavAdmin = () => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="screenLarge:w-[17%] desktop:w-[20%] laptop:w-[20%] bg-slate-800 dark:bg-bgThemeUI absolute top-0 bottom-0 z-50 shadow-lg">
      <div className="flex items-center justify-center mx-auto dark:border-gray-400  h-[80px] w-[100%] border-b-[1px] mb-4">
        <Logo className="h-[130px] w-[130px]"></Logo>
      </div>

      <List className="text-white">
        <div className="px-5 mb-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "text-textPrimary" : "text-white"
            }
          >
            <ListItemButton className="flex items-center gap-3">
              <FontAwesomeIcon icon={faHouse} className="size-6 mr-5" />
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </NavLink>
        </div>

        <div className="px-5 mb-3">
          <ListItemButton
            onClick={handleClick}
            className="flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faList} className="text-white size-6 mr-5" />
            <ListItemText primary="Quản lý" />
            {open ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Khách hàng  */}
              <NavLink
                to="/admin/manage/account"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faUsers} className="size-6 mr-5" />
                    <ListItemText primary="Tài khoản" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
              {/* Địa điểm  */}
              <NavLink
                to="/admin/manage/destination"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary w-full" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faLocationCrosshairs}
                      className="size-6 mr-5"
                    />
                    <ListItemText primary="Địa điểm" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
              {/* Nhà hàng */}
              <NavLink
                to="/admin/manage/restaurant"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary w-full" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="size-6 mr-5"
                    />
                    <ListItemText primary="Nhà hàng" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
              {/* Ẩm thực  */}
              <NavLink
                to="/admin/manage/cuisine"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faCloudMeatball}
                      className="size-6 mr-5"
                    />
                    <ListItemText primary="Ẩm thực" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
              {/* lộ trình  */}
              <NavLink
                to="/admin/manage/travelItinerary"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      className="size-6 mr-5"
                    />
                    <ListItemText primary="Lịch trình" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
              {/* khách sạn */}
              <NavLink
                to="/admin/manage/hotels"
                className={({ isActive }) =>
                  isActive ? "text-textPrimary" : "text-white"
                }
              >
                <ListItemButton sx={{ pl: 2 }}>
                  <ListItemButton className="flex items-center gap-3">
                    <FontAwesomeIcon className="size-6 mr-5" icon={faHotel} />
                    <ListItemText primary="Khách sạn" />
                  </ListItemButton>
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
        </div>

        {/* Tin tức  */}
        <div className="px-5 mb-3">
          <NavLink
            to="/admin/manage/news"
            className={({ isActive }) =>
              isActive ? "text-textPrimary" : "text-white"
            }
          >
            <ListItemButton className="flex gap-3 bg-slate-100">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="text-white size-6 mr-5"
              />
              <ListItemText primary="Tin tức" />
            </ListItemButton>
          </NavLink>
        </div>
      </List>
    </div>
  );
};

export default NavAdmin;
