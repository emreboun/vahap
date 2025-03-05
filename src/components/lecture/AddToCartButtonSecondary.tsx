"use client";
import {
  AddShoppingCartRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../cart/CartProvider";
import { useSidebar } from "../app-bar/sidebars/SidebarProvider";
import { Price } from "../cart/price";

const AddToCartButtonSecondary: React.FC<any> = ({ data, long = false }) => {
  const { mainProduct } = data;
  const { discount } = mainProduct;
  const { dispatch, state } = useCart();
  const { onSidebar } = useSidebar();
  const added = state.items.some(
    (item) => item.product.id === data.mainProduct.id
  );

  const onCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!added) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          ...mainProduct,
          duration: data.duration,
          imgUrl: !!mainProduct.imgUrl
            ? mainProduct.imgUrl
            : (data.thumbnail ?? `/thumbnail_main.jpg`),
        },
      });
    } else {
      onSidebar("cart");
    }
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 0.8,
          py: 0.45,
          pr: { xs: 0.4, sm: 0.5 },
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "relative",
            pl: { xs: 1.2, sm: 1, md: 1.2, lg: 1, xl: 1.4 },
            transform: { xs: "scale(0.98)", sm: "scale()" },
          }}
        >
          {!!discount && (
            <Box
              sx={{
                position: "relative",
                opacity: 0.8,
                mb: -0.5,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: 2,
                  left: -2,
                  right: -2,
                  top: "41%",
                  bgcolor: "text.secondary",
                }}
              />

              <Price
                value={mainProduct?.price}
                fontSize={14}
                isSign={""}
                isDecimal
              />
            </Box>
          )}

          <Price
            value={mainProduct?.price - mainProduct?.discount}
            isDecimal
            fontSize={16}
            sx={{ fontWeight: 600 }}
            color={"primary.main"}
            isSign={""}
          />
        </Box>

        <Button
          variant={"contained"}
          sx={{
            minWidth: { xs: 110, md: 116 },
            borderRadius: 0.6,
            px: !long
              ? { xs: 1.2, sm: 0.7, md: 0.7, lg: 0.7, xl: 1.2 }
              : { xs: 1.4, sm: 1.2, md: 1, lg: 0.8, xl: 2.4 },
            py: 1.2,
            boxShadow: 1,
            //gap: { xs: 0.4, sm: 0.4, md: 0.5, lg: 0.4, xl: 0 },
            justifyContent: "space-evenly",
            //minWidth: { xs: 120, sm: 112, md: 112, lg: 120 },
            textTransform: "none",
            transition: "all 0.24s ease-in-out",
            border: "1px solid",
            borderColor: "primary.main",
            "&:hover": {
              boxShadow: 8,
              color: "primary.main",
              bgcolor: "#fff",
            },
          }}
          onClick={onCart}
        >
          {!added ? (
            <AddShoppingCartRounded sx={{ fontSize: 22 }} />
          ) : (
            <ShoppingCartCheckoutRounded sx={{ fontSize: 22 }} />
          )}
          <Typography
            //fontFamily={"Montserrat"}
            letterSpacing={{ xs: -0.6, sm: -0.5, md: -0.4, lg: -0.6, xl: -0.4 }}
            fontWeight={500}
            fontSize={{ xs: 14, sm: 15 }}
            className={"limitedLine"}
            sx={{ transform: "scale(0.98)" }}
          >
            {!added ? "Sepete Ekle" : "Hemen Al"}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default AddToCartButtonSecondary;
