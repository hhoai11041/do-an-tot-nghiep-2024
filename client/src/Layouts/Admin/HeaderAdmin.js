import React, { useEffect, useState } from "react";
import UserAccount from "../../Components/UserAccount";
import { getApi } from "../../API/GetApi";
import ThemeUI from "../../Components/ThemeUI";
const HeaderAdmin = ({ title }) => {
  const [renderUI, setRenderUI] = useState(false);
  const dataUser = useStore((state) => state.dataUser);

  return (
    <div className="w-full sticky top-0 z-20 h-[80px] bg-slate-800 shadow-lg dark:bg-bgThemeUI dark:border-b-[1px] dark:border-b-gray-400 flex items-center screenLarge:pl-[18%] desktop:pl-[21%] laptop:pl-[21%] pr-6">
      <div className="flex justify-between items-center w-full">
        <div className="bg-slate-50 dark:bg-bgThemeUI dark:border dark:border-gray-400 px-10 py-3 rounded-md font-semibold shadow-lg">
          <h1>{title}</h1>
        </div>
        <div className="flex items-center">
          <ThemeUI></ThemeUI>
          <UserAccount
            dataUser={dataUser}
            setRenderUI={setRenderUI}
            renderUI={renderUI}
          ></UserAccount>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
