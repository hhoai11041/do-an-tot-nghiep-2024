import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { convertDateTime } from "../../Components/ConvertDateTime";
import { getApi } from "../../API/GetApi";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalAdmin from "../../Configs/ModalAdmin";
import Button from "../../Components/Button";
import { deleteApi } from "../../API/DeleteApi";
import { loadingApp } from "../../Components/Loading";
import slugify from "react-slugify";
import AddNews from "./AddNews";
import UpdateNews from "./UpdateNews";

const NewList = ({ accessToken, categoryNews }) => {
  const [renderUI, setRenderUI] = useState(false);
  const [modalAddNews, setModalAddNews] = useState(false);
  const [modalUpdateNews, setModalUpdateNews] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const [dataNewsUpdate, setDataNewsUpdate] = useState();

  useEffect(() => {
    if (accessToken) {
      getApi.getApiNewsByCategoryNews(
        setData,
        slugify(categoryNews),
        setLoading
      );
    }
  }, [accessToken, categoryNews, renderUI]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [
    {
      accessorKey: "_id",
      header: "STT",
      size: 50,
      Cell: ({ row }) => <div className="ml-2">{row.index + 1}</div>,
    },
    {
      accessorKey: "imageNews",
      header: "Hình ảnh",
      size: 150,
      Cell: ({ row }) => (
        <Avatar
          alt="news Image"
          src={row.original.imageNews}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    {
      accessorKey: "titleNews",
      header: "Chủ đề",
      size: 200,
      Cell: ({ row }) => (
        <div className="truncate max-w-[200px]">{row.original.titleNews}</div>
      ),
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
      accessorKey: "createdAt",
      header: "Ngày đăng",
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
              const dataEdit = {
                _id: row.original._id,
                categoryNews: row.original.categoryNews,
                titleNews: row.original.titleNews,
                imageNews: row.original.imageNews,
                content: row.original.content,
              };
              setDataNewsUpdate(dataEdit);
              setModalUpdateNews(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-xl text-red-700 cursor-pointer"
            onClick={() => {
              deleteApi.deleteApiNewsById(
                accessToken,
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
      <div className="flex justify-end items-end mb-6">
        <div className="w-[20%]">
          <Button
            onClick={() => setModalAddNews(true)}
            className="bg-bgPrimary h-[50px] leading-[50px] text-white font-semibold rounded-lg"
          >
            Thêm bài viết mới
          </Button>
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

      {/* Modal for adding cuisine */}
      <ModalAdmin
        openModal={modalAddNews}
        setOpenModal={setModalAddNews}
        children={
          <AddNews
            categoryNews={categoryNews}
            accessToken={accessToken}
            closeModal={setModalAddNews}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
      {/* Modal for updating cuisine */}
      <ModalAdmin
        openModal={modalUpdateNews}
        setOpenModal={setModalUpdateNews}
        children={
          <UpdateNews
            category={categoryNews}
            dataNews={dataNewsUpdate}
            accessToken={accessToken}
            closeModal={setModalUpdateNews}
            renderUI={renderUI}
            setRenderUI={setRenderUI}
          />
        }
        className="w-[60%] bg-white px-7 py-5 rounded-sm h-[90vh] overflow-y-scroll"
      />
    </div>
  );
};

export default NewList;
