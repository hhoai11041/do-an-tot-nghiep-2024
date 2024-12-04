import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
const FormContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const userName = form.current["user_name"].value.trim();
    const userEmailSend = form.current["user_email_send"].value.trim();
    const userEmailReceiver = form.current["user_email_receiver"].value.trim();

    const message = form.current["message"].value.trim();
    if (!userName || !userEmailSend || !userEmailReceiver || !message) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    emailjs
      .sendForm("service_9g5mlqm", "template_wyhoeun", form.current, {
        publicKey: "xOr7IdWR8jaZy7YsS",
      })
      .then(
        () => {
          toast.success("Gửi nội dung email thành công");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="w-[80%] mx-auto my-4">
      <form ref={form} onSubmit={sendEmail}>
        <div class="mb-5">
          <label
            for="username-success"
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            Tên người gửi:
          </label>
          <input
            type="text"
            name="user_name"
            id="username-success"
            class="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tên người gửi..."
          />
        </div>

        {/* email */}

        <div className="mb-5">
          <label
            for="email-address-icon"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email người gửi:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              name="user_email_send"
              id="email-address-icon"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="...name@gmail.com"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            for="email-address-icon"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email người nhận:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              name="user_email_receiver"
              id="email-address-icon"
              readOnly
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="trungduong0810@gmail.com"
              value="trungduong0810@gmail.com"
            />
          </div>
        </div>

        {/* message  */}

        <div className="mb-5">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nội dung:
          </label>
          <textarea
            id="message"
            rows="4"
            name="message"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Vui lòng nhập nội dung..."
          ></textarea>
        </div>
        <div>
          <input
            type="submit"
            className="w-full h-[50px] bg-bgPrimary rounded-lg leading-[50px] text-white font-semibold uppercase cursor-pointer hover:bg-orange-700 transition-all"
            value="Gửi nội dung"
          />
        </div>
      </form>
    </div>
  );
};

export default FormContact;
