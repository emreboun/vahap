import React from "react";
import Image from "next/image";
import { Box, Chip, Paper, Tooltip, Typography } from "@mui/material";
import {
  AccessTimeFilledRounded,
  AttachFileRounded,
  EventAvailable,
  LocationOn,
  SignalCellularAltRounded,
  TimerOutlined,
  Verified,
} from "@mui/icons-material";
import AddToCartButton from "../lecture/AddToCartButton";
import { formatDuration } from "@/utils/data";
import { turkcetarih_formati } from "@/utils";
import AddToCartButtonSecondary from "../lecture/AddToCartButtonSecondary";
import Link from "next/link";

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
          lg: "repeat(3,1fr)",
          md: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          xs: "repeat(1,1fr)",
        },
        gap: { xs: 3, sm: 3.2, md: 3.6, lg: 6, xl: 5 },
        px: { xs: 2, sm: 0, md: 2, lg: 0 },
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
  item: any;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const {
    slug,
    name,
    thumbnail,
    duration,
    pgnCount,
    //
    eventTicket,
    lecture,
    minElo,
    maxElo,
    hasAccess,
  } = item;

  const { length } = name;
  const multiplier = (length < 20 ? 1 : length < 40 ? 2 : 3) * 0.7;

  return (
    <Link href={`/urunler/${slug}`}>
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
            "& .MuiBox-root": {},
            "& .MuiTypography-root": {},
          },
          height: "100%",
        }}
        elevation={0}
      >
        {eventTicket && (
          <Chip
            icon={
              <EventAvailable
                color={"info"}
                sx={{ fontSize: 21, color: "#fff" }}
              />
            }
            label={"Etkinlik Bileti"}
            sx={{
              position: "absolute",
              right: 14,
              top: 12,
              zIndex: 1000,
              bgcolor: "secondary.main",
              height: 28,
              p: 0,
              borderRadius: 1,
              boxShadow: 2,
              "& .MuiChip-label": {
                py: 0,
                px: 1.2,
                color: "#fff",
                fontWeight: 600,
              },
            }}
          />
        )}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
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
            priority
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

          {((lecture?.minElo && lecture.maxElo) || (minElo && maxElo)) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.2,
                minHeight: 22,
                pl: { xs: 0.2, sm: 0.4, md: 0.6, lg: 0.8 },
                opacity: 0.99,
              }}
            >
              <SignalCellularAltRounded
                sx={{ fontSize: 19, color: "text.secondary" }}
              />

              <Typography
                color={"textSecondary"}
                fontSize={{ xs: 13, md: 14 }}
                letterSpacing={{
                  xs: -0.8,
                  sm: -0.6,
                  md: -0.5,
                }}
                className={"limitedLine"}
              >
                {`Önerilen Seviye`}
              </Typography>

              <Typography
                color={"textSecondary"}
                fontSize={{ xs: 13, md: 14 }}
                fontWeight={600}
                letterSpacing={{
                  xs: -0.8,
                  sm: -0.6,
                  md: -0.5,
                }}
                className={"limitedLine"}
                sx={{
                  pl: 0.1,
                  transform: "scale(0.96)",
                }}
              >
                {`${lecture?.minElo ?? minElo} - ${lecture?.maxElo ?? maxElo}`}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              pr: 0.6,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 0.2,
                pl: { xs: 0.6, sm: 0.7, md: 0.8, lg: 0.8 },
                pt: 0.2,
              }}
            >
              {duration > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                  <TimerOutlined
                    sx={{ fontSize: 19, color: "text.secondary" }}
                  />
                  <Typography
                    color={"textSecondary"}
                    fontSize={{ xs: 13, md: 14 }}
                    letterSpacing={{
                      xs: -0.7,
                      sm: -0.6,
                    }}
                    className={"limitedLine"}
                  >
                    {formatDuration(duration)}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.2,
                  // TODO:
                  minHeight: !eventTicket ? 22 : "",
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
                      }}
                      className={"limitedLine"}
                    >
                      {`${pgnCount} Döküman`}
                    </Typography>
                  </>
                )}
              </Box>

              {eventTicket && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.2,
                      minHeight: 22,
                      pl: 0.1,
                    }}
                  >
                    <AccessTimeFilledRounded
                      sx={{ fontSize: 19, color: "primary.main" }}
                    />
                    <Typography
                      color={"textSecondary"}
                      fontSize={{ xs: 13, md: 14 }}
                      letterSpacing={{
                        xs: -0.7,
                      }}
                      className={"limitedLine"}
                      sx={{ pl: 0.1 }}
                    >
                      {`${turkcetarih_formati(eventTicket.date)}`}
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
                    <LocationOn sx={{ fontSize: 21, color: "primary.main" }} />
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
                      {`${eventTicket.url ?? eventTicket.location}`}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {hasAccess ? (
              <Tooltip title={"Satın Alındı"}>
                <Verified color={"secondary"} sx={{ fontSize: 36, mr: 1.6 }} />
              </Tooltip>
            ) : (
              <AddToCartButtonSecondary
                data={{ mainProduct: item, duration, thumbnail }}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Link>
  );
};
