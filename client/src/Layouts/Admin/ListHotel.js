import React, { useEffect, useMemo, useState } from "react";
import ModalAdmin from "../../Configs/ModalAdmin";
import { getApi } from "../../API/GetApi";
import { deleteApi } from "../../API/DeleteApi";
import slugify from "react-slugify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import OptionsSelect from "../../Components/OptionsSelect";
import { Avatar, Rating } from "@mui/material";
import { loadingApp } from "../../Components/Loading";
import Button from "../../Components/Button";
import AddHotel from "./AddHotel";
import UpdateHotel from "./UpdateHotel";

const ListHotel = () => {
  const [dataProvinceHotel, setDataProvinceHotel] = useState();
  const [data, setData] = useState();
  const [renderUI, setRenderUI] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Hà Nội");
  const [loading, setLoading] = useState(true);

  const [modalAddHotel, setModalAddHotel] = useState(false);
  const [modalUpdateHotel, setModalUpdateHotel] = useState(false);
  const [dataHotelUpdate, setDataHotelUpdate] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  useEffect(() => {
    getApi.getApiHotelsByProvinceAdmin(
      setData,
      slugify(selectedProvince),
      setLoading
    );
    getApi.getApiProvinceHotel(setDataProvinceHotel);
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
      accessorKey: "image",
      header: "Hình ảnh",
      size: 150,
      Cell: ({ row }) => (
        <Avatar
          alt="Hotel Image"
          src={row.original.image.replace("url('", "").replace("')", "")}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },

    {
      accessorKey: "name",
      header: "Tên Khách sạn",
      size: 200,
      Cell: ({ row }) => (
        <div className="line-clamp-1 overflow-hidden">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Địa chỉ",
      size: 250,
      Cell: ({ row }) => (
        <div className="line-clamp-1 overflow-hidden">
          {row.original.location.address}
        </div>
      ),
    },
    {
      accessorKey: "stars",
      header: "Đánh giá",
      size: 150,
      Cell: ({ row }) => (
        <div>
          <Rating
            name="read-only"
            size="small"
            value={row.original.stars}
            readOnly
          />{" "}
        </div>
      ),
    },
    {
      accessorKey: "reviewText",
      header: "Đánh giá",
      size: 50,
      Cell: ({ row }) => <div>{row.original.reviewText}</div>,
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
              const dataEditDestination = {
                id: row.original.id,
                name: row.original.name,
                image: row.original.imageUrls,
                facilities: row.original.facilities,
                infoHotel: row.original.infoHotel,
                listIntroduce: row.original.listIntroduce,
                urlMap: row.original.urlMap,
                location: row.original.location,
                imageDetails: row.original.imageDetails,
              };
              setDataHotelUpdate(dataEditDestination);
              setModalUpdateHotel(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl text-red-700 cursor-pointer"
            onClick={() => {
              deleteApi.apiDeleteHotel(row.original.id, renderUI, setRenderUI);
            }}
          />
        </div>
      ),
    },
  ]);

  const table = useMaterialReactTable({
    columns,
    data: data || [],
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
              data={dataProvinceHotel?.provinces || []}
              placeholder="Vui lòng chọn tỉnh thành"
            />
          </div>
        </div>
        <div className="w-[20%]">
          <div className="">
            <Button
              onClick={() => setModalAddHotel(true)}
              className="bg-bgPrimary h-[50px] leading-[50px] text-white font-semibold rounded-lg"
            >
              Thêm khách sạn mới
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        loadingApp.loadingCircle(
          "absolute top-1/2 left-[59%] translate-y-[-50%] translate-x-[-59%]"
        )
      ) : data?.length ? (
        <MaterialReactTable table={table} />
      ) : (
        <div>Không có dữ liệu</div>
      )}

      {/* modal them lịch trình */}
      <ModalAdmin
        openModal={modalAddHotel}
        setOpenModal={setModalAddHotel}
        children={
          <AddHotel
            province={selectedProvince}
            closeModal={setModalAddHotel}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          ></AddHotel>
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />

      <ModalAdmin
        openModal={modalUpdateHotel}
        setOpenModal={setModalUpdateHotel}
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
        children={
          <UpdateHotel
            province={selectedProvince}
            dataHotel={dataHotelUpdate}
            closeModal={setModalUpdateHotel}
            setRenderUI={setRenderUI}
            renderUI={renderUI}
          ></UpdateHotel>
        }
      />
    </div>
  );
};

export default ListHotel;
