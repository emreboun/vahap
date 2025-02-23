import React from "react";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { AttachFileRounded, TimerOutlined } from "@mui/icons-material";
import AddToCartButton from "../lecture/AddToCartButton";
import { formatDuration } from "@/utils/data";

interface ProductEntity {
  id: number;
  name: string;
  slug: string;
  description: string;
  files: { path: string }[];
  thumbnail?: string;
}

const ProductGrid: React.FC<{ items: ProductEntity[] }> = ({ items }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          md: "repeat(2,1fr)",
          sm: "repeat(1,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap: 4,
        px: { xs: 0, sm: 4, md: 0 },
      }}
    >
      {items.map((item, index) => (
        <Box key={index} sx={{}}>
          <ProductItem item={item} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;

export interface ProductItemProps {
  /* imgUrl: string;
  href: string;
  title: string; */
  //description?: string;
  item: any;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { name, thumbnail, duration, pgnCount } = item;

  const { length } = name;
  const multiplier = (length < 20 ? 1 : length < 40 ? 2 : 3) * 0.7;
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          overflow: "hidden",
          transition: "all 0.2s ease-in-out",
          boxShadow: 3,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgb(211,178,107, 0.4)",
          transform: "scale(1.04)",
          "&:hover": {
            boxShadow: 5,
            borderColor: "rgb(211,178,107, 0.6)",
            //transform: "scale(1.06)",
            "& .MuiBox-root": {},
            "& .MuiTypography-root": {},
          },
          height: "100%",
        }}
        elevation={0}
      >
        <Box
          sx={{
            flex: 0,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Image
            src={thumbnail ?? `/thumbnail_main.jpg`}
            alt={`${name} Resim - Thumbnail`}
            height={180}
            width={320}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        <Box
          sx={{
            py: 0.5,
            minHeight: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            component={"h2"}
            fontFamily={"Montserrat, Helvetica, Roboto, sans-serif"}
            fontWeight={600}
            fontSize={15}
            letterSpacing={{
              xs: -0.7,
              sm: -0.6 * multiplier,
              md: -0.5 * multiplier,
            }}
            className={"limitedLine"}
            sx={{
              px: 1,
              py: 0.2,
              opacity: 0.99,
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 0.2,
                pl: { xs: 0.2, sm: 0.4, md: 0.8, lg: 1 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                <TimerOutlined sx={{ fontSize: 19, color: "text.secondary" }} />
                <Typography
                  color={"textSecondary"}
                  fontSize={{ xs: 13, md: 14 }}
                  letterSpacing={{
                    xs: -0.7,
                    sm: -0.6,
                    md: -0.5,
                  }}
                  className={"limitedLine"}
                >
                  {formatDuration(duration)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.2,
                  minHeight: 22,
                }}
              >
                {pgnCount > 0 && (
                  <>
                    <AttachFileRounded
                      sx={{ fontSize: 19, color: "text.secondary" }}
                    />
                    <Typography
                      color={"textSecondary"}
                      fontSize={{ xs: 13, md: 14 }}
                      letterSpacing={{
                        xs: -0.7,
                        sm: -0.6,
                        md: -0.5,
                      }}
                      className={"limitedLine"}
                    >
                      {`${pgnCount} Döküman`}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                transform: {
                  xs: "scale(0.86)",
                  sm: "scale(0.88)",
                  md: "scale(0.9)",
                },
              }}
            >
              <AddToCartButton
                data={{ mainProduct: item, duration, thumbnail }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
