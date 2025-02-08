

export type ModalOrientation = 'left' | 'right' | 'up' | 'down' | "center";
export type ModalAnimation = "none" | "fade" | "slide";

export type ModalFactory = {
  settings: React.ReactNode;
  //messages: React.ReactNode;
}


export type ModalProps = {
  enabled: boolean;
  orientation?: ModalOrientation;
  animation?: ModalAnimation;
  children: React.ReactNode;
  onClose?: () => void;
}

export type ModalWindow = {
  name: keyof ModalFactory;
  //orientation?: ModalOrientation;
  //animation?: ModalAnimation;
}

export type ModalWrapperProps = {
  modals: any[];
  children?: React.ReactNode;
  //value: string;
  //onClose: () => void;
}

/* export const MODAL_LIST: ModalWindow[] = [
  { name: "settings", orientation: "left", animation: "slide" },
  { name: "messages", orientation: "left", animation: "slide" }
] */