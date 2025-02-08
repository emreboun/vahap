import { GridSettings } from "@/components/admin/grid/settings";
import { ModalFactory } from "../types";

export const modalFactories: ModalFactory = {
  settings: <GridSettings />,
  //messages: <div />,
};

interface ModalPickerProps {
  modalName: keyof ModalFactory;
}

export const ModalPicker: React.FC<ModalPickerProps> = ({ modalName }) => {
  return modalFactories[modalName] ?? <></>;
};
