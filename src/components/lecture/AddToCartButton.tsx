"use client";
import {
  AddShoppingCartRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useCart } from "../cart/CartProvider";
import { LectureMainProps } from ".";
import { useSidebar } from "../app-bar/sidebars/SidebarProvider";

const AddToCartButton: React.FC<any> = ({ data }) => {
  const { dispatch, state } = useCart();
  const { onSidebar } = useSidebar();

  const disabled = state.items.some(
    (item) => item.product.id === data.mainProduct.id
  );
  const onCart = () => {
    if (!disabled) {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...data.mainProduct, duration: data.duration },
      });
    } else {
      onSidebar("cart");
    }
  };

  return (
    <>
      <Button
        variant={"contained"}
        sx={{
          borderRadius: 1,
          px: 1.6,
          py: 1.2,
          boxShadow: 1,
          gap: { xs: 0.4, sm: 0.6, md: 1 },
          minWidth: { xs: 144, sm: 148, md: 144 },
          textTransform: "none",
          transition: "all 0.24s ease-in-out",
          border: "1px solid",
          borderColor: "primary.main", // "secondary.main",
          "&:hover": {
            boxShadow: 8,
            color: "primary.main", //"secondary.main",
            bgcolor: "#fff",
          },
        }}
        //color={"secondary"}
        onClick={onCart}
      >
        {!disabled ? (
          <AddShoppingCartRounded sx={{ fontSize: { xs: 24 } }} />
        ) : (
          <ShoppingCartCheckoutRounded />
        )}
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16 },
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
          className={"limitedLine"}
        >
          {!disabled ? "Sepete Ekle" : "Hemen Al"}
        </Typography>
      </Button>
    </>
  );
};

export default AddToCartButton;
