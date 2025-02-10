"use client";

import { ModalWrapperProps } from "../types";
import { ModalPicker } from "../utils";
import { useModalContext } from "../hooks";
import { Modal } from "..";

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ modals }) => {
  const { modal, onModal } = useModalContext();

  const handleModal = () => {
    onModal();
  };

  if (!modal) {
    return <></>;
  }

  return (
    <>
      {modals.map((item: any) => (
        <Modal key={item} enabled={modal === item} onClose={handleModal}>
          <ModalPicker modalName={item} />
        </Modal>
      ))}
    </>
  );
};
