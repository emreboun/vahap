"use client";
import { ThemeProvider } from "../common/theme/provider";
import CartProvider from "@/components/cart/CartProvider";
import { Suspense } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme='light'>
        <Suspense>
          <CartProvider>
            <>{children} </>
          </CartProvider>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default Providers;
