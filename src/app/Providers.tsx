"use client";
import { SidebarProvider } from "@/components/app-bar/sidebars/SidebarProvider";
import { ThemeProvider } from "../common/theme/provider";
import CartProvider from "@/components/cart/CartProvider";
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
        <SidebarProvider>
          <CartProvider>
            <>{children} </>
          </CartProvider>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
