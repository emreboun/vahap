"use client";

import { createTheme } from "@mui/material/styles";

//const original = createTheme();

export const themeCookie = "theme";

export const darkTheme = {
  name: "dark",
  ...createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#375D62",
      },
      secondary: {
        main: "#D3B26B",
      },
      text: {
        secondary: "rgba(255, 255, 255, 0.85)",
      },
      //border: "rgba(255, 255, 255, 0.06)",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        & .MuiInputBase-root {
          color-scheme: dark;
        }

        /* & .MuiFormLabel-root {
          margin-top: 10px;
          margin-left: 6px;
        } */


        /* & .MuiFormLabel-filled {
          margin-top: 8px;
        } */

        & .MuiOutlinedInput-root {
          background-color: #121212;
        }
        
        & .MuiCircularProgress-indeterminate {
          animation-duration: 0.7s !important;
        }

        & .MuiChip-root{
          padding: 0.2px;
          padding-bottom: 0.1px;
        }

        & .MuiDivider-root{
          opacity: 0.6;
          /* background-color: #121212; */
        }

        & .MuiDivider-vertical{
          opacity: 0.1;
          /* background-color: #121212; */
        }

        & .Mui-selected{
          opacity: 1 !important;
        }

        & .MuiPaper-root {
          box-shadow: none;
        }


        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          border-left: 1px solid rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        
        ::-webkit-scrollbar-track {
          background: #23211F; 
          background: rgba(255,255,255,0.02);
        }
        
        ::-webkit-scrollbar-thumb {
          border-radius: 1px;
                            
          background: black; 
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        `,
      },
    },
  }),
};

//1976d2
//#1f456b
export const lightTheme = {
  name: "light",
  ...createTheme({
    palette: {
      primary: {
        main: "#375D62",
      },
      secondary: {
        main: "#D3B26B",
      },
      text: {
        primary: "rgba(0,0,0,0.9)",
        secondary: "rgba(0, 0, 0, 0.7)",
      },
      success: {
        main: "#388E3C",
      },
      error: {
        main: "#B73232",
      },
      divider: "rgba(0, 0, 0, 0.23)",
      //border: "rgba(0, 0, 0, 0.12)",
    },
    //shadows: original.shadows.map((s, i) => (i === 2 ? original.shadows[1] : s)), //{2: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"},
    components: {
      MuiCssBaseline: {
        styleOverrides: `

        & .MuiInputBase-root {
          color-scheme: light;
        }

        & .MuiOutlinedInput-root {
          background-color: #FFFFFF;
        }

        & .MuiCircularProgress-indeterminate {
          animation-duration: 0.7s !important;
        }

        & .MuiDivider-root{
          opacity: 0.7;
        }

        & .MuiDivider-vertical{
          opacity: 0.4;
        }

        & .MuiIconButton-root{
          opacity: 1 !important;
        }
        /* & .Mui-disabled{
          color: rgba(0, 0, 0, 0.26) !important;
        } */

        /* & .Mui-selected{
          color: #1f456b !important;
          opacity: 1 !important;
        } */

        & .MuiPaper-elevation1{
          background: #F1F1F1 !important;
        }
        

        
        
        `,
      },
    },
  }),
};

export const markdownTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1f456b",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border-radius: 20px;
      }

      ::-webkit-scrollbar-track {
        background: #23211F; 
      }
      
      ::-webkit-scrollbar-thumb {
        border-radius: 20px;
                          
        background: black; 
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      
      `,
    },
  },
});
