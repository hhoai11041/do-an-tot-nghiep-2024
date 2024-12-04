import React from "react";
import { CSSTransition } from "react-transition-group";
import ModalConfig from "./ModalConfig";
const ModalAdmin = ({
  openModal,
  setOpenModal,
  children,
  className,
  overlayOpacity,
  isIconClose,
}) => {
  return (
    <CSSTransition in={openModal} timeout={200} unmountOnExit classNames="zoom">
      <ModalConfig
        isIconClose={isIconClose}
        overlayOpacity={overlayOpacity}
        bodyModal={className}
        styleModal={{ transition: "all 0.2s linear" }}
        closeModal={() => {
          setOpenModal(false);
        }}
        clickOverlayCloseModal={() => setOpenModal(false)}
      >
        {children}
      </ModalConfig>
    </CSSTransition>
  );
};

export default ModalAdmin;
