"use client";
import { useRouting } from "@/hooks/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ModalWrapper } from "../wrapper";

interface ModalContextProps {
  //modals: ModalWindow[];
  modal?: string | null;
  onModal: (modal?: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useCodeModal must be used within a CodeModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { searchParams, setSearchParams } = useRouting();
  const modalVal: any = searchParams?.get("mdl");
  useEffect(() => {
    setModal(modalVal);
  }, [modalVal]);

  const [modal, setModal] = useState<string | null>(modalVal);

  const handleModal = (modal?: string) => {
    setSearchParams("mdl", modal);
  };

  return (
    <ModalContext.Provider value={{ modal, onModal: handleModal }}>
      {children}
      <ModalWrapper modals={["settings"]} />
    </ModalContext.Provider>
  );
};
