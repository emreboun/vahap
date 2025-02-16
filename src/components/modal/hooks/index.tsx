"use client";
import { useRouting } from "@/hooks/router";
import { createContext, useContext, useEffect, useState } from "react";
import { ModalWrapper } from "../wrapper";
import { Suspense } from "@/components/suspense";

interface ModalContextProps {
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
      <Suspense>
        <ModalWrapper modals={["settings"]} />
      </Suspense>
    </ModalContext.Provider>
  );
};
