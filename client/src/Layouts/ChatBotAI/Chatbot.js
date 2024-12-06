import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Cookies from "js-cookie";
import { postApi } from "../../API/PostApi";
import { getApi } from "../../API/GetApi";
import iconAI from "../../Assets/Images/iconAI.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { announce } from "../../Components/ModalAnnounce";
import { deleteApi } from "../../API/DeleteApi";
import { toast } from "react-toastify";
import { loadingApp } from "../../Components/Loading";
import AIChatBot from "../../Assets/Images/AIChatBot.png";

const listSuggest = [
  {
    id: 1,
    suggest: "Lịch trình du lịch Hà Nội",
    img: "https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/02/29145322/du-lich-ho-hoan-kiem-gan-ha-noi.jpg",
  },
  {
    id: 2,
    suggest: "Đặc sản ở Nha Trang",
    img: "https://nucuoimekong.com/wp-content/uploads/dac-san-o-nha-trang.jpg",
  },
  {
    id: 3,
    suggest: "Bảo tàng Thành phố Hồ Chí Minh có gì?",
    img: "https://ik.imagekit.io/tvlk/blog/2021/11/golocal-bao-tang-o-sai-gon-7.jpeg?tr=dpr-2,w-675",
  },
  {
    id: 4,
    suggest: "Những khu vui chơi giải trí tại Việt Nam",
    img: "https://www.tuannguyentravel.com/data/images/khu-vui-choi-giai-tri-da-nang.jpg",
  },
];

const Chatbot = () => {
  const accessToken = Cookies.get("accessToken");
  const [dataUser, setDataUser] = useState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [renderUI, setRenderUI] = useState(false);
  const [newConversation, setNewConversation] = useState(1);
  const [textInputChat, setTextInputChat] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (accessToken) getApi.getApiUser(accessToken, setDataUser);
    console.log(accessToken)
  }, [accessToken]);

  const handleSubmitChat = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Vui lòng nhập nội dung");
    } else {
      setTextInputChat(input);
      setInput("");
      setLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyB_GwNbd9XwtLw_MzCYClDaExF3uVyNiBU"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(input);
        const responseText = result.response.text();

        // Gửi tin nhắn của người dùng
        await postApi.createMessageChatAI(
          accessToken,
          dataUser?._id,
          `${newConversation}`,
          "user",
          input
        );

        // Nếu có phản hồi từ AI, gửi tin nhắn của bot
        if (responseText) {
          await postApi.createMessageChatAI(
            accessToken,
            dataUser?._id,
            `${newConversation}`,
            "bot",
            responseText
          );
        }
        setRenderUI(() => !renderUI);
      } catch (error) {
        console.error("Lỗi khi tạo lộ trình:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getApi.getApiChats(accessToken, setMessages, dataUser?._id);
  }, [accessToken, dataUser, renderUI]);

  // Cuộn đến tin nhắn mới nhất khi messages thay đổi
  useEffect(() => {
    const chatContainer = document.querySelector(".chats");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, loading]);

  const filterMessage = messages[newConversation - 1]?.messages;

  const messagesFinalUser = filterMessage
    ?.filter((item) => item.role === "user")
    .pop().message;

  useEffect(() => {
    if (!accessToken && !dataUser) {
      announce.showErrorModal(
        "Đăng nhập",
        "Vui lòng đăng nhập tài khoản để sử dụng tính năng này"
      );
    }
  }, [accessToken, dataUser]);
  if (!accessToken && !dataUser) {
    return (
      <div className="w-full screenLarge:h-[70vh] desktop:h-[80vh] laptop:h-[80vh] shadow-lg border dark:border-gray-700 dark:border rounded-lg grid screenLarge:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2  items-center justify-center gap-10 screenLarge:px-20 desktop:px-20 laptop:px-20 tablet:px-20 mobile:px-6 pb-4">
        <div className="flex justify-center items-center">
          <img src={AIChatBot} alt="" />
        </div>
        <div className="text-justify">
          <strong className="text-center screenLarge:text-3xl desktop:text-3xl laptop:text-3xl tablet:text-3xl mobile:text-2xl font-bold block mb-6 uppercase chatbotAI">
            Chatbot AI
          </strong>
          <h2 className="screenLarge:text-xl desktop:text-lg laptop:text-lg leading-10 font-semibold">
            Tính năng này cho phép người dùng truy cập vào một trải nghiệm giao
            tiếp thông minh với AI, cung cấp thông tin và hỗ trợ trực tiếp. Khi
            đăng nhập, bạn có thể:
          </h2>
          <ul className="mt-4 screenLarge:text-[18px] desktop:text-[17px] laptop:text-lg">
            <li className="screenLarge:mb-4">
              Sử dụng AI để tìm kiếm thông tin nhanh chóng và chính xác.
            </li>
            <li className="mb-4">
              Trò chuyện và đặt câu hỏi theo thời gian thực, nhận phản hồi tức
              thì.
            </li>
            <li className="mb-4">
              Lưu trữ lịch sử trò chuyện để dễ dàng tham khảo sau này.
            </li>
          </ul>
          <h2 className="mt-6 screenLarge:text-xl desktop:text-lg laptop:text-lg leading-10 font-semibold">
            Đăng nhập tài khoản để trải nghiệm đầy đủ và tối ưu hóa khả năng cá
            nhân hóa từ hệ thống!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="screenLarge:flex desktop:flex screenLarge:h-[80vh] desktop:h-[75vh] laptop:h-[75vh] tablet:h-full desktop:overflow-hidden screenLarge:overflow-hidden laptop:overflow-hidden rounded-lg">
      <div className="screenLarge:w-[25%] desktop:w-[25%] laptop:w-[25%] tablet:w-full mobile:w-full screenLarge:shadow-lg desktop:shadow-lg laptop:shadow-lg screenLarge:border desktop:border laptop:border p-4 rounded-tl-lg rounded-bl-lg dark:border-gray-700 dark:border screenLarge:mb-0 desktop:mb-0 tablet:mb-4 mobile:mb-4">
        <div
          onClick={() => setNewConversation(messages?.length + 1)}
          className="w-[200px] py-4 px-4 rounded-lg  bg-[#174085] hover:bg-[#1b3461]  transition-all flex justify-between items-center text-white cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Cuộc trò chuyện mới</span>
        </div>
        <div className="mt-4">
          <strong className="mb-4 block">Trò chuyện gần đây</strong>
          <div className="screenLarge:h-[60vh] desktop:h-[55vh] overflow-y-scroll chatsConversation">
            {messages.map((item, index) => (
              <div className="bg-[#2b76b0] hover:bg-[#1f2661] rounded-lg transition-all flex items-center mb-4 justify-between w-full h-[60px]">
                <div
                  onClick={() =>
                    setNewConversation(Number(item.conversationId))
                  }
                  key={index}
                  className="items-center text-white cursor-pointer w-[85%]"
                >
                  <div className="px-4 h-[60px] flex justify-start items-center">
                    <FontAwesomeIcon icon={faMessage} className="w-[30px]" />
                    <span>Cuộc trò chuyện {item.conversationId}</span>
                  </div>
                </div>
                <div
                  onClick={() =>
                    deleteApi.deleteApiChatAI(
                      accessToken,
                      dataUser?._id,
                      item.conversationId,
                      renderUI,
                      setRenderUI
                    )
                  }
                  className="w-[15%] h-full flex items-center justify-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-white size-[18px] cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] tablet:w-full mobile:w-full shadow-lg border dark:border-gray-700 dark:border border-l-0 p-4 relative screenLarge:dark:ml-2 desktop:dark:ml-2">
        <div className="screenLarge:w-[80%] desktop:w-[80%] laptop:w-[80%] tablet:w-full mobile:w-full mx-auto">
          {!filterMessage ? (
            <div>
              <div className="greet mt-6 screenLarge:mb-[15vh] desktop:mb-[7vh] laptop:mb-[10vh] tablet:mb-[5vh] mobile:mb-[5vh]">
                <h1 className="screenLarge:text-5xl desktop:text-4xl laptop:text-4xl tablet:text-3xl mobile:text-2xl font-bold screenLarge:h-[80px] desktop:h-[80px] laptop:h-[80px] tablet:h-[50px] mobile:h-[50px] ">
                  Xin chào, {dataUser?.username}
                </h1>
                <p className="screenLarge:text-3xl desktop:text-2xl laptop:text-2xl tablet:text-xl mobile:text-xl font-semibold text-gray-400">
                  Tôi có thể giúp gì cho bạn?
                </p>
              </div>
              <div className="grid screenLarge:grid-cols-4 desktop:grid-cols-4 laptop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-2 gap-6">
                {listSuggest.map((item, index) => (
                  <div
                    onClick={() => {
                      setInput(item.suggest);
                    }}
                    key={index}
                    className="shadow-lg h-[200px] border rounded-lg cursor-pointer overflow-hidden dark:border-gay-700"
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="h-[70%] w-full hover:scale-110 transition-all object-cover"
                    />
                    <div className="h-[30%] flex items-center justify-center px-2">
                      <h3 className="text-center font-semibold text-[14px]">
                        {item.suggest}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {loading && (
                  <>
                    <div className="absolute top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white font-bold text-lg">
                      Đang tạo cuộc trò chuyện...
                    </div>
                    {loadingApp.loadingCircle(
                      "absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    )}
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              ref={messagesEndRef}
              className="screenLarge:h-[68vh] desktop:h-[65vh] laptop:h-[65vh] tablet:h-[50vh] mobile:h-full desktop:pb-10 overflow-y-scroll w-full chats"
            >
              <div className="flex flex-col">
                {filterMessage?.map((item, index) => (
                  <div
                    className={`flex items-start ${
                      item.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    key={index}
                  >
                    {item.role === "bot" && (
                      <div className="w-[70px]">
                        <div className="rounded-full border mt-2 mr-2 w-[50px] h-[50px]">
                          <img src={iconAI} alt="" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`${
                        item.role === "user"
                          ? "bg-blue-50 p-4 mb-4 max-w-[85%] dark:text-black"
                          : "bg-[#aac7dd] p-4 mb-4 max-w-[85%] leading-9 dark:text-black"
                      } rounded-lg`}
                    >
                      <ReactMarkdown>{item.message}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {textInputChat.trim() !== "" &&
                messagesFinalUser === textInputChat ? (
                  <div></div>
                ) : (
                  <div className="w-full flex justify-end">
                    <div
                      className={`bg-blue-50 p-4 rounded-lg dark:bg-white dark:text-black ${
                        textInputChat.trim() !== "" ? "block" : "hidden"
                      }`}
                    >
                      {textInputChat}
                    </div>
                  </div>
                )}

                {loading && (
                  <div class="flex items-center justify-start">
                    <div class="w-[70px]">
                      <div class="rounded-full border mt-2 mr-2 w-[50px] h-[50px]">
                        <img src={iconAI} alt="" />
                      </div>
                    </div>
                    <div class="bg-[#aac7dd] p-4 max-w-[85%] rounded-lg">
                      <div class="flex gap-2 justify-center items-center">
                        <div class="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div class="size-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div class="size-2 bg-black rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-10 absolute screenLarge:bottom-8 desktop:bottom-4 screenLarge:w-[75%] desktop:w-[75%] laptop:w-[75%] tablet:w-full mobile:w-full mx-auto left-1/2 translate-x-[-50%]">
            <form onSubmit={handleSubmitChat}>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="block mx-4 py-4 px-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập nội dung cần tìm kiếm..."
                />
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-6 h-6 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
