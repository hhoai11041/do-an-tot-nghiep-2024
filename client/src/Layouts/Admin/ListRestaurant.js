import React, { useState, useEffect, useMemo } from "react";
import { getApi } from "../../API/GetApi";
import { Avatar, Rating, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertDateTime } from "../../Components/ConvertDateTime";
import slugify from "react-slugify";
import { deleteApi } from "../../API/DeleteApi";
import { loadingApp } from "../../Components/Loading";
import Button from "../../Components/Button";
import ModalAdmin from "../../Configs/ModalAdmin";
import AddRestaurant from "./AddRestaurant";
import UpdateRestaurant from "./UpdateRestaurant";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [renderUI, setRenderUI] = useState(false);
  const [modalAddRestaurant, setModalAddRestaurant] = useState(false);
  const [dataRestaurantUpdate, setDataUpdateRestaurant] = useState({});
  const [modalUpdateRestaurant, setModalUpdateRestaurant] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const fetchRestaurants = () => {
    getApi.apiGetRestaurants(setRestaurants, setLoading);
  };

  // useEffect(() => {
  //   console.log("dataupdate:", dataRestaurantUpdate);
  // }, [dataRestaurantUpdate]);

  // useEffect(() => {
  //   console.log("restaurants:", restaurants);
  // }, [restaurants]);

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage, renderUI]);

  const columns = useMemo(() => [
    {
      accessorKey: "_id",
      header: "STT",
      size: 50,
      Cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
    },
    {
      accessorKey: "img",
      header: "Hình ảnh",
      size: 150,
      Cell: ({ row }) => (
        <Avatar
          alt="Restauranr Image"
          src={row.original.images[0]}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Tên Nhà hàng",
      size: 200,
      Cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "location.address",
      header: "Địa chỉ",
      size: 150,
      Cell: ({ row }) => (
        <div className="line-clamp-1">{row.original.location.address}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Giới thiệu",
      size: 250,
      Cell: ({ row }) => (
        <div className="truncate max-w-[200px]">{row.original.description}</div>
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
              const dataEditRestaurant = {
                _id: row.original._id,
                name: row.original.name,
                category: row.original.category,
                imageUrls: row.original.imageUrls,
                images: row.original.images,
                description: row.original.description,
                location: row.original.location,
                opening_hours: row.original.opening_hours,
                utilities: row.original.utilities,
              };
              setDataUpdateRestaurant(dataEditRestaurant);
              setModalUpdateRestaurant(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl text-red-700 cursor-pointer"
            onClick={() => {
              deleteApi.apiDeleteRestaurant(
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
  const paginationModel = { page: 0, pageSize: 5 };

  const table = useMaterialReactTable({
    columns,
    data: restaurants || [],
    state: { pagination },
    onPaginationChange: setPagination,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      showRowsPerPage: false,
      shape: "rounded",
    },
    initialState: { density: "comfortable" },
    enableColumnFilters: true,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6">
        <div className="w-[25%] flex gap-4">
          <div className="w-1/2">
            <Button
              onClick={() => setModalAddRestaurant(true)}
              className="bg-bgPrimary h-[50px] leading-[50px] text-white font-semibold rounded-lg"
            >
              Thêm Nhà hàng
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        loadingApp.loadingCircle(
          "absolute top-1/2 left-[59%] translate-y-[-50%] translate-x-[-59%]"
        )
      ) : restaurants?.length ? (
        <MaterialReactTable table={table} />
      ) : (
        <div>Không có dữ liệu</div>
      )}

      {/* Modal for adding Restaurant */}
      <ModalAdmin
        openModal={modalAddRestaurant}
        setOpenModal={setModalAddRestaurant}
        children={
          <AddRestaurant
            closeModal={setModalAddRestaurant}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
      {/* Modal for updating cuisine */}
      <ModalAdmin
        openModal={modalUpdateRestaurant}
        setOpenModal={setModalUpdateRestaurant}
        children={
          <UpdateRestaurant
            dataRestaurant={dataRestaurantUpdate}
            closeModal={setModalUpdateRestaurant}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
    </div>
  );
};

export default ListRestaurant;
