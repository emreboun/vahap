"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme, themeCookie } from "..";

interface ThemeContextProps {
  theme: string;
  onTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("theme provider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: string;
  active?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = "light",
  active = false,
}) => {
  const [value, setTheme] = useState(theme);
  const themeVal = value === "dark" ? darkTheme : lightTheme;

  const handleTheme = useCallback((val: string) => {
    setTheme(val);
    localStorage.setItem(themeCookie, val);
  }, []);

  useEffect(() => {
    if (active) setTheme((prev) => localStorage.getItem(themeCookie) ?? prev);
  }, [active]);

  return (
    <ThemeContext.Provider value={{ theme: value, onTheme: handleTheme }}>
      <MuiThemeProvider theme={themeVal}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
