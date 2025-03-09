"use client";

import { useToggle } from "@/hooks/useToggle";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext } from "react";

interface SidebarContextProps {
  sidebar: string | null;
  onSidebar: (sidebar: string) => void;
  dropdown: boolean;
  handleDropdown: (val?: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar provider is missing");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sidebar = searchParams.get("menu");
  const [dropdown, , setDropdown] = useToggle();

  const updateURL = useCallback(
    (menu: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (menu) {
        params.set("menu", menu);
      } else {
        params.delete("menu");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const onSidebar = useCallback(
    (val: string) => {
      updateURL(sidebar === val ? null : val);
      setDropdown(false);
    },
    [sidebar, setDropdown, updateURL]
  );

  const handleDropdown = useCallback(
    (val?: boolean) => {
      setDropdown(val ?? !dropdown);
      if (val === undefined) updateURL(null);
    },
    [dropdown, setDropdown, updateURL]
  );

  return (
    <SidebarContext.Provider
      value={{ sidebar, onSidebar, dropdown, handleDropdown }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
