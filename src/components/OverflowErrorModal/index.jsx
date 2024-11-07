import React from "react";
import { Modal } from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  clearApplication,
  setErrorLine,
  setShowOverflowErrorModal,
} from "../../slices/applicationSlice";
import { toHexaPadStart } from "../../interpreter/utils";

export const OverflowErrorModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(
    (state) => state.application.execute.showOverflowErrorModal
  );
  const errorLine = useSelector((state) => state.application.execute.errorLine);
  return (
    showModal && (
      <Modal
        title={"Error"}
        msg={
          "El programa genero un error de overflow en la linea: " +
          toHexaPadStart(errorLine * 2, 2)
        }
        onClose={() => {
          dispatch(clearApplication());
          dispatch(setShowOverflowErrorModal(false));
          dispatch(setErrorLine(null));
        }}
      ></Modal>
    )
  );
};
