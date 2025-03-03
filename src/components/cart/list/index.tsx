import Image from "next/image";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Product } from "@prisma/client";

import {
  Circle,
  Close,
  AccessTimeFilledRounded,
  OndemandVideoRounded,
  TimerOutlined,
} from "@mui/icons-material";
import { formatDuration } from "@/utils/data";
import { turkcetarih_formati } from "@/utils";
import { useCart } from "../CartProvider";

export const CartList = () => {
  const { state, dispatch } = useCart();
  const { items } = state;

  const handleRemoveItem = (product: Product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product.id });
  };

  return (
    <>
      <Box
        style={{
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
          flex: 1,
        }}
      >
        <ul
          style={{ position: "absolute", width: "100%", listStyleType: "none" }}
        >
          {items.map((item: any, i) => (
            <Box
              key={i}
              component={"li"}
              sx={{
                borderBottom: "1px solid lightgrey",
                width: "100%",
                py: "12px",
                px: { xs: "18px", sm: "24px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: 0.5, sm: 1, md: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    py: 0.5,
                    height: { xs: 120, sm: 140 },
                  }}
                >
                  {item.product.imgUrl ? (
                    <Image
                      src={item.product.imgUrl}
                      alt=''
                      width={160}
                      height={100}
                      style={{
                        height: "100%",
                        width: "auto",
                        borderRadius: 3,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 140, sm: 160 },
                        bgcolor: "#ddd",
                        borderRadius: 1,
                      }}
                    >
                      <OndemandVideoRounded color={"primary"} />
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    minWidth: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      fontWeight: 600,
                      fontSize: 24,
                      fontFamily: "Open Sans",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Tooltip title={"Sepetten Kaldır"}>
                      <IconButton
                        sx={{
                          p: 0,
                          mr: { xs: 4, sm: 4, md: 4, lg: 3, xl: 2 },
                          mb: { xs: 0.2, sm: 0.4, md: 0.6 },
                          border: "0.5px solid rgb(51,90,32, 0.3)",
                          height: "38px",
                          width: "38px",
                        }}
                        onClick={() => handleRemoveItem(item.product)}
                      >
                        <Close sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Tooltip>

                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "60%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          left: -10,
                          height: 37,
                          width: 37,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 18,
                            color: "#fff",
                            position: "absolute",
                            zIndex: 1,
                            mt: 0.4,
                          }}
                        >
                          {"₺"}
                        </Box>

                        <Circle
                          sx={{
                            position: "relative",
                            fontSize: 38,
                            pt: 0.1,
                          }}
                          color={"primary"}
                        />
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bgcolor: "primary.main",
                          height: 21,
                          width: "100%",
                          right: 0,
                          top: 9,
                          borderRadius: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 14,
                          letterSpacing: -0.2,
                          color: "#fff",
                          borderRadius: 1,
                          zIndex: 2,
                          pt: 0.2,
                        }}
                      >
                        {Number(item.product.price) - item.product.discount}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 12,
                          letterSpacing: -0.2,
                          color: "#fff",
                          borderRadius: 1,
                          zIndex: 2,
                          pt: 0.2,
                          pl: 0.1,
                        }}
                      >
                        {"TL"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "90%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          left: -10,
                          height: 37,
                          width: 37,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.duration && (
                          <TimerOutlined
                            sx={{
                              fontSize: 22,
                              color: "#fff",
                              position: "absolute",
                              zIndex: 1,
                            }}
                          />
                        )}
                        {!!item.product.eventTicket && (
                          <AccessTimeFilledRounded
                            sx={{
                              fontSize: 22,
                              color: "#fff",
                              position: "absolute",
                              zIndex: 1,
                            }}
                          />
                        )}

                        <Circle
                          sx={{
                            position: "relative",
                            fontSize: 38,
                            pt: 0.1,
                          }}
                          color={"warning"}
                        />
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          bgcolor: "warning.main",
                          top: "24%",
                          height: 21,
                          width: "100%",
                          borderRadius: 1,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          letterSpacing: -0.3,
                          color: "#fff",
                          borderRadius: 1,
                          zIndex: 2,
                          pt: 0.2,
                          position: "relative",
                          right: !!item.product.eventTicket
                            ? { xs: 4, sm: 6, md: 0 }
                            : 0,
                        }}
                      >
                        {item.duration &&
                          formatDuration(item.duration, {
                            showSeconds: false,
                          })}

                        {turkcetarih_formati(
                          new Date(item.product.eventTicket?.date),
                          { showYear: false }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: -0.3,
                  fontSize: 16,
                  fontWeight: 600,
                  pt: 1,
                  color: "text.primary",
                  opacity: 0.95,
                }}
                className={"limitedLine2"}
              >
                {item.product.name}
              </Typography>
            </Box>
          ))}
        </ul>
      </Box>
    </>
  );
};
