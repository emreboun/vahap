import { Box, Paper, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AttachFileRounded,
  SignalCellularAltRounded,
  TimerOutlined,
  Verified,
} from "@mui/icons-material";
import { formatDuration } from "@/utils/data";
import AddToCartButtonSecondary from "../lecture/AddToCartButtonSecondary";

export interface GridItemProps {
  item: any;
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const { href } = item;
  return (
    <Link href={href}>
      <GridItemCore item={item} />
    </Link>
  );
};

export const GridItemCore: React.FC<Omit<GridItemProps, "href">> = ({
  item,
}) => {
  const {
    name,
    thumbnail,
    duration,
    resources,
    mainProduct,
    minElo,
    maxElo,
    hasAccess,
  } = item;
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
            transform: "scale(1.06)",
            "& .MuiBox-root": {},
            "& .MuiTypography-root": {},
          },
          height: "100%",
        }}
        elevation={0}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src={/* thumbnail ??  */ "/thumbnail_main.jpg"}
            alt={`${name} Resim - Thumbnail`}
            height={180}
            width={320}
            style={{
              width: "100%",
              height: "auto",
              top: hasAccess ? -3 : 0,
              position: "relative",
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
            position: "relative",
            zIndex: 1,
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

          {minElo && maxElo && (
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
                sx={{
                  fontSize: 19,
                  color: "primary.main",
                }}
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
                {`${minElo} - ${maxElo}`}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              pl: { xs: 0.2, sm: 0.4, md: 0.6, lg: 0.8 },
              pr: 0.6,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 0.2,
                pt: 0.2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                <TimerOutlined
                  sx={{
                    fontSize: 19,
                    color: "primary.main",
                  }}
                />

                <Typography
                  color={"textSecondary"}
                  fontSize={{ xs: 13, md: 14 }}
                  letterSpacing={{
                    xs: -0.8,
                  }}
                  className={"limitedLine"}
                >
                  <Box
                    component={"span"}
                    sx={{
                      display: {
                        xs: "block",
                        sm: "none",
                        md: "block",
                        lg: "none",
                        xl: "block",
                      },
                    }}
                  >
                    {formatDuration(duration)}
                  </Box>
                  <Box
                    component={"span"}
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                        md: "none",
                        lg: "block",
                        xl: "none",
                      },
                    }}
                  >
                    {formatDuration(duration)
                      .replace("saat", "sa.")
                      .replace("dakika", "dk.")}
                  </Box>
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
                {resources.length > 0 && (
                  <>
                    <AttachFileRounded
                      sx={{
                        fontSize: 19,
                        color: "primary.main",
                      }}
                    />
                    <Typography
                      color={"textSecondary"}
                      fontSize={{ xs: 13, md: 14 }}
                      letterSpacing={{
                        xs: -0.8,
                      }}
                      className={"limitedLine"}
                    >
                      {`${resources.length} Döküman`}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            {hasAccess ? (
              <Box sx={{ pr: 1.6 }}>
                <Tooltip title={"Satın Alındı"}>
                  <Verified color={"secondary"} sx={{ fontSize: 36 }} />
                </Tooltip>
              </Box>
            ) : (
              <>
                <AddToCartButtonSecondary
                  data={{ mainProduct, duration, thumbnail }}
                />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default GridItem;
