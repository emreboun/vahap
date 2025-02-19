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

  const disabled = state.items.some(
    (item) => item.product.id === data.mainProduct.id
  );

  const onCart = () => {
    if (!disabled) {
      console.log(data.mainProduct);
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
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 0.8,
          p: 0.4,
          display: "flex",
          alignItems: "center",
          gap: 1.6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "relative",
            pr: 1,
            pl: 1.6,
          }}
        >
          {discount && (
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
                  //bgcolor: "secondary.main",
                  top: "48%",
                  bgcolor: "grey",
                }}
              />
              <Price
                value={mainProduct?.price} //isSign={""}
                fontSize={16}
                //color={"secondary.main"}
              />
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
      </Box>
    </>
  );
};

export default AddToCartButton;
