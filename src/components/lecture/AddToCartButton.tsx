"use client";
import {
  AddShoppingCartRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useCart } from "../cart/CartProvider";
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
        payload: {
          ...data.mainProduct,
          duration: data.duration,
          imgUrl:
            data.files.length > 0 ? data.files[0].path : `/thumbnail_main.jpg`,
        },
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
          borderColor: "primary.main",
          "&:hover": {
            boxShadow: 8,
            color: "primary.main",
            bgcolor: "#fff",
          },
          //transform: "scale(0.97)",
        }}
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
