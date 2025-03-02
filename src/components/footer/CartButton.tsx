"use client";

import { ButtonBase } from "@mui/material";
import { useSidebar } from "../app-bar/sidebars/SidebarProvider";

interface CartButtonProps {
  title?: string;
}
export const CartButton: React.FC<CartButtonProps> = () => {
  const { onSidebar } = useSidebar();

  return (
    <>
      <ButtonBase
        sx={{
          p: 1.3,
          textAlign: "left",
          justifyContent: "flex-start",
          borderRadius: 1,
          color: "secondary.main",
          "&:hover": {
            color: "#fff",
            bgcolor: "secondary.main",
            fontWeight: 600,
            boxShadow: 2,
          },
        }}
        onClick={() => onSidebar("cart")}
      >
        {"Sepetim"}
      </ButtonBase>
    </>
  );
};
