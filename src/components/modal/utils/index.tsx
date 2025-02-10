import { ModalFactory } from "../types";

export const modalFactories: ModalFactory = {
  settings: <></>,
};

interface ModalPickerProps {
  modalName: keyof ModalFactory;
}

export const ModalPicker: React.FC<ModalPickerProps> = ({ modalName }) => {
  return modalFactories[modalName] ?? <></>;
};
