"use client";

import { useToggle } from "@/hooks/useToggle";
import React, { createContext, useCallback, useContext, useState } from "react";

interface SidebarContextProps {
  sidebar: string | null;
  onSidebar: (sidebar: string) => void;
  dropdown: boolean;
  handleDropdown: (val?: boolean) => void; //Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("sidebar provider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
  //active?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  //active = false,
}) => {
  const [sidebar, setSidebar] = useState<string | null>(null);
  const [dropdown, , setDropdown] = useToggle();

  const onSidebar = useCallback(
    (val: string) => {
      setSidebar((prev) => (prev === val ? "" : val));
      setDropdown(false);
    },
    [setDropdown]
  );

  const handleDropdown = useCallback(
    (val?: boolean) => {
      setDropdown((prev) => {
        if (val === undefined) {
          setSidebar(null);

          return !prev;
        } else {
          return val;
        }
      });
    },
    [setDropdown]
  );

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        onSidebar,
        dropdown,
        handleDropdown,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
