"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GridContextProps {
  value: any[];
  setValue: Dispatch<SetStateAction<any[]>>;
}

const GridContext = createContext<GridContextProps | undefined>(undefined);

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("grid provider");
  }
  return context;
};

interface GridProviderProps {
  children: React.ReactNode;
  data?: any[];
}

export const GridProvider: React.FC<GridProviderProps> = ({
  data = [],
  children,
}) => {
  const [value, setValue] = useState<any[]>(data);

  return (
    <GridContext.Provider value={{ value, setValue }}>
      {children}
    </GridContext.Provider>
  );
};
