import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface GridItemProps {
  imgUrl: string;
  href: string;
  title: string;
  description?: string;
}

const GridItem: React.FC<GridItemProps> = ({
  imgUrl,
  href,
  title,
  description,
}) => {
  return (
    <>
      <Link href={href}>
        <GridItemCore imgUrl={imgUrl} title={title} description={description} />
      </Link>
    </>
  );
};

export const GridItemCore: React.FC<Omit<GridItemProps, "href">> = ({
  imgUrl,
  title,
  description,
}) => {
  const { length } = title;
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
            flex: 0,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={`${title} Resim - Thumbnail`}
              height={180}
              width={320}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
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
            {title}
          </Typography>

          <Typography
            sx={{
              px: 1,
              wordBreak: "break-words",
              hyphens: "auto",
            }}
            fontSize={{ xs: 14 }}
            lineHeight={{ xs: 1.5, lg: 1.5 }}
            letterSpacing={{ xs: -0.4, md: -0.4 }}
            fontFamily={"sans-serif"}
            color={"textSecondary"}
            whiteSpace={"break-spaces"}
            textAlign={"left"}
            className='limitedLine2'
          >
            {description}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default GridItem;
