import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { getApi } from "../../API/GetApi";
import { Avatar, Rating, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdmin from "../../Configs/ModalAdmin";
import Button from "../../Components/Button";
import { deleteApi } from "../../API/DeleteApi";
import { loadingApp } from "../../Components/Loading";
import OptionsSelect from "../../Components/OptionsSelect";
import { data } from "../../Data/data";
import AddCuisine from "./AddCuisine";
import slugify from "react-slugify";
import ImportFileJson from "../../Configs/importFileJson";
import UpdateCuisine from "./UpdateCuisine";

const CuisineList = () => {
  const accessToken = Cookies.get("accessToken");
  const [renderUI, setRenderUI] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
  const [regional, setRegional] = useState("");
  const [modalAddCuisine, setModalAddCuisine] = useState(false);
  const [modalUpdateCuisine, setModalUpdateCuisine] = useState(false);
  const [dataCuisineByProvince, setDataCuisineByProvince] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const [dataFoodUpdate, setDataFoodUpdate] = useState();
  const dataProvince = useMemo(
    () => data.dataProvince.map((province) => province.province_name),
    []
  );

  const getRegionByProvince = (provinceName) => {
    const province = data.dataProvince.find(
      (item) => item.province_name === provinceName
    );
    setRegional(province ? province.regional : "");
  };

  useEffect(() => {
    getRegionByProvince(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    if (accessToken) {
      getApi.getApiCuisineDetail(
        setDataCuisineByProvince,
        slugify(selectedProvince),
        setLoading
      );
    }
  }, [accessToken, selectedProvince, renderUI]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      accessorKey: "_id",
      header: "STT",
      size: 50,
      Cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
    },
    {
      accessorKey: "imgFood",
      header: "Hình ảnh",
      size: 150,
      Cell: ({ row }) => (
        <Avatar
          alt="Food Image"
          src={row.original.imgFood}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      accessorKey: "foodName",
      header: "Tên món ăn",
      size: 200,
      Cell: ({ row }) => <div>{row.original.foodName}</div>,
    },
    {
      accessorKey: "provinceName",
      header: "Khu vực",
      size: 150,
      Cell: ({ row }) => <div>{selectedProvince}</div>,
    },
    {
      accessorKey: "foodDesc",
      header: "Đánh giá",
      size: 250,
      Cell: ({ row }) => (
        <div className="truncate max-w-[200px]">{row.original.foodDesc}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Thời gian tạo",
      size: 150,
      Cell: ({ row }) => <div>{convertDateTime(row.original.createdAt)}</div>,
    },
    {
      accessorKey: "action",
      header: "Hành động",
      size: 150,
      Cell: ({ row }) => (
        <div className="flex gap-4 ml-4">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-xl text-yellow-500 cursor-pointer"
            onClick={() => {
              const dataEditFood = {
                foodId: row.original.foodId,
                foodName: row.original.foodName,
                imgFood: row.original.imgFood,
                listImage: row.original.listImage,
                foodDesc: row.original.foodDesc,
              };
              setDataFoodUpdate(dataEditFood);
              setModalUpdateCuisine(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl text-red-700 cursor-pointer"
            onClick={() => {
              deleteApi.deleteApiCuisineByFoodId(
                accessToken,
                slugify(selectedProvince),
                row.original.foodId,
                renderUI,
                setRenderUI
              );
            }}
          />
        </div>
      ),
    },
  ]);

  const table = useMaterialReactTable({
    columns,
    data: dataCuisineByProvince?.[0]?.cuisineDetail || [],
    state: { pagination },
    onPaginationChange: setPagination,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      showRowsPerPage: false,
      shape: "rounded",
    },
    initialState: { density: "comfortable" },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <div className="flex w-[60%] gap-5">
          <div className="w-[50%] cuisineListProvince">
            <label className="font-semibold mb-2 block">Tỉnh thành: </label>
            <OptionsSelect
              selectedValue={selectedProvince}
              setSelectedValue={setSelectedProvince}
              data={dataProvince}
              placeholder="Vui lòng chọn tỉnh thành"
            />
          </div>

          <div className="w-[50%]">
            <label className="font-semibold mb-2 block">Khu vực: </label>
            <TextField
              color="success"
              fullWidth
              variant="outlined"
              placeholder="Khu vực"
              value={regional}
              disabled
            />
          </div>
        </div>
        <div className="w-[25%] flex gap-4">
          <div className="w-1/2">
            <Button
              onClick={() => setModalAddCuisine(true)}
              className="bg-bgPrimary h-[50px] leading-[50px] text-white font-semibold rounded-lg"
            >
              Thêm món ăn
            </Button>
          </div>
          <div className="w-[50%]">
            <ImportFileJson
              setRenderUI={setRenderUI}
              renderUI={renderUI}
            ></ImportFileJson>
          </div>
        </div>
      </div>

      {loading ? (
        loadingApp.loadingCircle(
          "absolute top-1/2 left-[59%] translate-y-[-50%] translate-x-[-59%]"
        )
      ) : dataCuisineByProvince?.length ? (
        <MaterialReactTable table={table} />
      ) : (
        <div>Không có dữ liệu</div>
      )}

      {/* Modal for adding cuisine */}
      <ModalAdmin
        openModal={modalAddCuisine}
        setOpenModal={setModalAddCuisine}
        children={
          <AddCuisine
            province={selectedProvince}
            regional={regional}
            accessToken={accessToken}
            closeModal={setModalAddCuisine}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
      {/* Modal for updating cuisine */}
      <ModalAdmin
        openModal={modalUpdateCuisine}
        setOpenModal={setModalUpdateCuisine}
        children={
          <UpdateCuisine
            province={selectedProvince}
            regional={regional}
            accessToken={accessToken}
            dataFood={dataFoodUpdate}
            closeModal={setModalUpdateCuisine}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
    </div>
  );
};

export default CuisineList;
