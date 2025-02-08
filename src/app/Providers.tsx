"use client";
import { ThemeProvider } from "../common/theme/provider";
//import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
//import dynamic from 'next/dynamic'
//const NoSSR = dynamic(() => import('../providers'), { ssr: false })

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme='light'>
        <>{children} </>
      </ThemeProvider>
    </>
  );
};

export default Providers;
