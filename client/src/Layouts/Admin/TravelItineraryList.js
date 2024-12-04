import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { getApi } from "../../API/GetApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdmin from "../../Configs/ModalAdmin";
import Button from "../../Components/Button";
import { deleteApi } from "../../API/DeleteApi";
import { loadingApp } from "../../Components/Loading";
import OptionsSelect from "../../Components/OptionsSelect";
import { data } from "../../Data/data";
import slugify from "react-slugify";
import ImportFileJson from "../../Configs/importFileJson";
import AddTraveItinerary from "./AddTraveItinerary";
import { TextField } from "@mui/material";
import UpdateTraveItinerary from "./updateTraveItinerary";

const TravelItineraryList = () => {
  const accessToken = Cookies.get("accessToken");
  const [dataUser, setDataUser] = useState();
  const [renderUI, setRenderUI] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
  const [regional, setRegional] = useState("");
  const [dataItinerary, setDataItinerary] = useState([]);
  const [dataItineraryUpdate, setDataItineraryUpdate] = useState();
  const [loading, setLoading] = useState(true);

  const [modalAddItinerary, setModalAddItinerary] = useState(false);
  const [modalUpdateItinerary, setModalUpdateItinerary] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  useEffect(() => {
    if (accessToken) getApi.getApiUser(accessToken, setDataUser);
  }, [accessToken]);

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
    getApi.getApiTravelItineraryByProvince(
      setDataItinerary,
      slugify(selectedProvince),
      setLoading
    );
  }, [selectedProvince, renderUI]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      accessorKey: "_id",
      header: "STT",
      size: 50,
      Cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
    },
    {
      accessorKey: "provinceName",
      header: "Tỉnh thành",
      size: 150,
      Cell: ({ row }) => <div>{selectedProvince}</div>,
    },
    {
      accessorKey: "timeTrip",
      header: "Thời gian du lịch",
      size: 200,
      Cell: ({ row }) => <div>{row.original.timeTrip}</div>,
    },
    {
      accessorKey: "content",
      header: "Nội dung",
      size: 250,
      Cell: ({ row }) => (
        <div
          className="line-clamp-1 overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: row.original.content,
          }}
        ></div>
      ),
    },
    {
      accessorKey: "userCreate",
      header: "Người tạo",
      size: 150,
      Cell: ({ row }) => <div>{row.original.userCreate}</div>,
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
                _id: row.original._id,
                timeTrip: row.original.timeTrip,
                content: row.original.content,
              };
              setDataItineraryUpdate(dataEditFood);
              setModalUpdateItinerary(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl text-red-700 cursor-pointer"
            onClick={() => {
              deleteApi.deleteApiItineraryById(
                accessToken,
                slugify(selectedProvince),
                row.original._id,
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
    data: dataItinerary?.[0]?.itineraryDetail || [],
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
          <div className="w-[50%] itineraryListProvince">
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
        <div className="w-[25%]">
          <div className="w-full">
            <Button
              onClick={() => setModalAddItinerary(true)}
              className="bg-bgPrimary h-[50px] leading-[50px] text-white font-semibold rounded-lg"
            >
              Thêm lịch trình
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        loadingApp.loadingCircle(
          "absolute top-1/2 left-[59%] translate-y-[-50%] translate-x-[-59%]"
        )
      ) : dataItinerary?.length ? (
        <MaterialReactTable table={table} />
      ) : (
        <div>Không có dữ liệu</div>
      )}

      {/* modal them lịch trình */}
      <ModalAdmin
        openModal={modalAddItinerary}
        setOpenModal={setModalAddItinerary}
        children={
          <AddTraveItinerary
            province={selectedProvince}
            regional={regional}
            userCreate={dataUser?.username}
            accessToken={accessToken}
            closeModal={setModalAddItinerary}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          ></AddTraveItinerary>
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />

      <ModalAdmin
        openModal={modalUpdateItinerary}
        setOpenModal={setModalUpdateItinerary}
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
        children={
          <UpdateTraveItinerary
            accessToken={accessToken}
            province={selectedProvince}
            regional={regional}
            setRenderUI={setRenderUI}
            renderUI={renderUI}
            closeModal={setModalUpdateItinerary}
            dataItinerary={dataItineraryUpdate}
          ></UpdateTraveItinerary>
        }
      />
    </div>
  );
};

export default TravelItineraryList;
