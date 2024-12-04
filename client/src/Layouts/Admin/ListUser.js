import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { getApi } from "../../API/GetApi";
import { Avatar, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
import ModalAdmin from "../../Configs/ModalAdmin";
import Button from "../../Components/Button";
import { deleteApi } from "../../API/DeleteApi";
import { UpdateApi } from "../../API/UpdateApi";
import { loadingApp } from "../../Components/Loading";

const ListUser = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [renderListUser, setRenderListUser] = useState(false);
  const [dataAccountEdit, setDataAccountEdit] = useState();
  const [editRole, setEditRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dataUsers, setDataUsers] = useState();
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (accessToken)
      getApi.getApiAllUser(accessToken, setDataUsers, setLoading);
  }, [accessToken, renderListUser]);

  const handleChange = (event) => {
    setEditRole(event.target.value);
  };

  const renderEditAccount = () => {
    return (
      <div>
        <h1 className="text-[20px] font-semibold text-center mb-6 uppercase">
          Phân quyền
        </h1>

        <div className="flex flex-col gap-8">
          <TextField
            id="standard-helperText"
            label="Tên tài khoản"
            defaultValue={dataAccountEdit?.username}
            variant="standard"
            className="w-full"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            id="standard-helperText"
            label="Email"
            defaultValue={dataAccountEdit?.email}
            variant="standard"
            className="w-full"
            type="email"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <FormControl variant="standard" className="w-full">
            <InputLabel id="demo-simple-select-standard-label">
              Vai trò
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={editRole || dataAccountEdit?.role || ""}
              onChange={handleChange}
              label="Vai trò"
            >
              <MenuItem value="admin">Quản trị viên</MenuItem>
              <MenuItem value="customer">Khách hàng</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          onClick={authorizedAccount}
          className="w-full h-[40px] leading-[40px] bg-bgPrimary uppercase text-white font-semibold rounded-lg mt-10"
        >
          CẬP NHẬT
        </Button>
      </div>
    );
  };
  const authorizedAccount = () => {
    if (dataAccountEdit)
      UpdateApi.authorizedAccount(
        accessToken,
        dataAccountEdit?._id,
        editRole,
        setModalEdit,
        renderListUser,
        setRenderListUser
      );
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "STT",
        size: 50,

        Cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
      },
      {
        accessorKey: "avatar",
        header: "Hình ảnh",
        size: 50,
        Cell: ({ row }) => (
          <div className="">
            <Avatar
              alt="Duong"
              src={row.original.avatar}
              sx={{ width: 40, height: 40 }}
            />
          </div>
        ),
      },
      {
        accessorKey: "username",
        header: "Tên",
        size: 150,
        Cell: ({ row }) => <div className="">{row.original.username}</div>,
      },
      {
        accessorKey: "Email",
        header: "Email",
        size: 200,
        Cell: ({ row }) => <div className="">{row.original.email}</div>,
      },
      {
        accessorKey: "role",
        header: "Vai trò",
        size: 150,

        Cell: ({ row }) => (
          <div className="">
            {row.original.role === "admin" ? (
              <span className="bg-green-600 p-2 rounded-md text-white">
                Quản trị viên
              </span>
            ) : (
              <span className="bg-orange-600 p-2 rounded-md text-white">
                Khách hàng
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Thời gian tạo",
        size: 150,
        Cell: ({ row }) => (
          <div className="">{convertDateTime(row.original.createdAt)}</div>
        ),
      },
      {
        accessorKey: "action",
        header: "Hành động",
        size: 150,
        Cell: ({ row }) => (
          <div className="flex gap-4 ml-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                const dataEdit = {
                  _id: row.original._id,
                  username: row.original.username,
                  email: row.original.email,
                  role: row.original.role,
                };
                setDataAccountEdit(dataEdit);
                setModalEdit(true);
              }}
            >
              <FontAwesomeIcon
                icon={faUserPen}
                className="text-xl text-yellow-500"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                deleteApi.deleteApiUser(
                  accessToken,
                  row.original._id,
                  renderListUser,
                  setRenderListUser
                );
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-xl text-red-700"
              />
            </div>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const tableData = dataUsers ? dataUsers : "Không có dữ liệu";
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      showRowsPerPage: false,
      shape: "rounded",
    },
    initialState: { density: "comfortable" },
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <div className="">
      {loading ? (
        loadingApp.loadingCircle(
          "absolute top-1/2 left-[59%] translate-y-[-50%] translate-x-[-59%]"
        )
      ) : (
        <div>
          {dataUsers ? (
            <MaterialReactTable table={table} />
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </div>
      )}

      <ModalAdmin
        openModal={modalEdit}
        setOpenModal={setModalEdit}
        children={renderEditAccount()}
        className="w-[27%] bg-white px-7 py-5 rounded-md"
      ></ModalAdmin>
    </div>
  );
};

export default ListUser;
