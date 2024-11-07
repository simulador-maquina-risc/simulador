import React from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeError } from "../../slices/modalsSlice";
import { Button } from "../Button";

export const ErrorModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.error);
  const errorMessage = useSelector((state) => state.modals.errorMessage);

  return (
    showModal && (
      <Modal
        title={"Error"}
        msg={errorMessage}
        onClose={() => dispatch(closeError())}
      ></Modal>
    )
  );
};
