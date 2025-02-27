"use client";
import {
  AddShoppingCartRounded,
  ShoppingCartCheckoutRounded,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../cart/CartProvider";
import { useSidebar } from "../app-bar/sidebars/SidebarProvider";
import { Price } from "../cart/price";

const AddToCartButton: React.FC<any> = ({ data }) => {
  const { mainProduct } = data;
  const { discount } = mainProduct;
  const { dispatch, state } = useCart();
  const { onSidebar } = useSidebar();
  const added = state.items.some(
    (item) => item.product.id === data.mainProduct.id
  );

  const onCart = () => {
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
          py: 0.4,
          px: { xs: 0.5, sm: 0.6 },
          display: "flex",
          alignItems: "center",
          gap: 1.6,
          position: "relative",
          right: { xs: -14, sm: -8, md: 0 },
          bottom: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "relative",
            pr: 1,
            pl: { xs: 0.8, sm: 1.2, md: 1.6 },
          }}
        >
          {!!discount && (
            <Box
              sx={{
                position: "relative",
                opacity: 0.85,
                mb: -0.4,
                mr: -0.4,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: 2,
                  left: -2,
                  right: -2,
                  top: "48%",
                  bgcolor: "grey",
                }}
              />
              <Price value={mainProduct?.price} fontSize={16} />
            </Box>
          )}

          <Price
            value={mainProduct?.price - mainProduct?.discount}
            fontSize={18}
            sx={{ fontWeight: 600 }}
            color={"primary.main"}
          />
        </Box>

        <Button
          variant={"contained"}
          sx={{
            borderRadius: 0.6,
            px: 1.6,
            py: 1.2,
            boxShadow: 1,
            gap: { xs: 0.4, sm: 0.6, md: 1 },
            minWidth: { xs: 140, sm: 148, md: 148 },
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
            <AddShoppingCartRounded sx={{ fontSize: { xs: 24 } }} />
          ) : (
            <ShoppingCartCheckoutRounded />
          )}
          <Typography
            //fontFamily={"Montserrat"}
            letterSpacing={{ xs: -0.3, sm: -0.2, md: -0.1 }}
            fontWeight={500}
            fontSize={{ xs: 15, sm: 16 }}
            className={"limitedLine"}
          >
            {!added ? "Sepete Ekle" : "Hemen Al"}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default AddToCartButton;
