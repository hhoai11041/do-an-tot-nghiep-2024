import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const createPortalElement = () => {
  const element = document.createElement("div");
  element.id = "portal__wrapper";
  return element;
};
const portalWrapper = createPortalElement();
const ModalConfig = ({
  isIconClose = false,
  containerClass = "",
  bodyModal = "",
  styleModal = {},
  closeModal = () => {},
  clickOverlayCloseModal = () => {},
  children,
  overlayOpacity ="bg-opacity-85",
}) => {
  useEffect(() => {
    document.body.appendChild(portalWrapper);
  }, []);

  const renderContent = (
    <div>
      <div
        className={`fixed inset-0 z-[99] flex items-center justify-center ${containerClass}`}
      >
        <div
          onClick={clickOverlayCloseModal}
          className={`overlay absolute inset-0 bg-black ${overlayOpacity} z-10`}
        ></div>
        <div
          style={styleModal}
          className={`absolute content z-[99] ${bodyModal}`}
        >
          {isIconClose && (
            <div
              onClick={closeModal}
              className="close cursor-pointer absolute flex items-center justify-center z-[999] top-[-15px] right-[-15px] bg-gray-200 size-9 rounded-full"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-700 text-2xl"
              />
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
  return createPortal(renderContent, portalWrapper);
};
export default ModalConfig;
