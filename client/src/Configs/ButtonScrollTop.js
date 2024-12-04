import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {isVisible && (
        <div
          className={`fixed right-5 z-50 bottom-10 ${
            isVisible
              ? "opacity-100 hover:scale-110 transition-all"
              : "opacity-0"
          }`}
        >
          <button
            className={`w-[50px] h-[50px] rounded-full bg-bgPrimary text-white transition-all `}
            onClick={scrollToTop}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonScrollTop;
