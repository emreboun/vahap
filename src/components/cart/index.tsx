"use client";
import Image from "next/image";
import { Button, Box, Typography, darken, Divider } from "@mui/material";
import {
  CleaningServicesRounded,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

import { Price } from "./price";
import { useCart } from "./CartProvider";
import { CartList } from "./list";

export const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const { sum } = state;

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: /* sum === 0   ? "column-reverse" :*/ "column",
          bgcolor: "background.paper",
          minWidth: { xs: "380px", sm: "420px", md: "440px", lg: "460px" },
          borderTop: "1px solid",
          borderColor: "rgb(0,0,0,0.16)",
        }}
      >
        <Box
          sx={{
            "& .MuiButtonBase-root": {
              textTransform: "none",
            },
            pt: 1.2,
            pb: 0.8,
            px: { xs: 1.4, sm: 2, md: 2.4 },
          }}
        >
          <Box
            sx={{
              color: "#fff",
              bgcolor: "primary.main",
              px: 1,
              py: { xs: 0.4, sm: 0.6, md: 0.8 },
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              boxShadow: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              {"Sepet Tutarı"}
            </Typography>

            <Price
              value={sum ?? 0}
              fontSize={19}
              color={"#fff"}
              sx={{ fontWeight: 550 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mt: 0.2, bgcolor: "rgb(128,128,128,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: {
              xs: sum === 0 ? "column" : "column-reverse",
              sm: "column",
            },
          }}
        >
          {state.sum > 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& .MuiButtonBase-root": {
                  textTransform: "none",
                },
                py: 1.2,
                px: { xs: 1.4, sm: 2, md: 2.4 },
                gap: { xs: 1, sm: 1.5, md: 2 },
                boxShadow: 1,
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "rgb(0,0,0,0.32)",
              }}
            >
              <Button
                variant='contained'
                sx={{
                  height: { xs: 38, md: 40 },
                  flex: 1,
                  background: darken("#d3b26b", 0.25),
                  gap: { xs: 0.6, sm: 0.8, md: 1.2 },
                  px: 0,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darken("#d3b26b", 0.25),
                  "&:hover": {
                    background: darken("#d3b26b", 0.1),
                    boxShadow: 4,
                  },
                }}
                onClick={handleClearCart}
                disabled={state.sum === 0}
              >
                <CleaningServicesRounded sx={{ fontSize: 22 }} />
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    letterSpacing: { xs: -0.2, sm: -0.1, md: 0 },
                  }}
                >
                  {"Sepeti Temizle"}
                </Typography>
              </Button>

              <Button
                variant='contained'
                sx={{
                  height: { xs: 38, md: 40 },
                  flex: 1,
                  px: 0,
                  gap: { xs: 0.6, sm: 0.8, md: 1.2 },
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darken("#489E4C", 0.3),
                  bgcolor: darken("#489E4C", 0.2),
                  "&:hover": {
                    bgcolor: darken("#489E4C", 0.05),
                    boxShadow: 4,
                  },
                }}
                disabled={state.sum === 0}
              >
                <ThumbUpAltOutlined />
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    letterSpacing: { xs: -0.2, sm: -0.1, md: 0 },
                  }}
                >
                  {"Sepeti Onayla"}
                </Typography>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                pt: 8,
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#888'
                width={80}
                viewBox='0 0 452 257'
                aria-hidden
                focusable='false'
              >
                <path
                  className='no-rows-primary'
                  d='M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z'
                />
                <path
                  className='no-rows-primary'
                  d='M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z'
                />
                <path
                  className='no-rows-primary'
                  d='M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z'
                />
                <path
                  className='no-rows-secondary'
                  d='M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z'
                />
              </svg>

              <Typography color={"textSecondary"} fontFamily={"Lexend"}>
                {"Sepetinizde eğitim bulunmamaktadır."}
              </Typography>
            </Box>
          )}

          <CartList />
        </Box>
      </Box>
    </>
  );
};
