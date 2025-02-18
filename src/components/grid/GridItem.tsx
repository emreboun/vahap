import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export interface GridItemProps {
  //id?: string;
  imgUrl: string;
  href: string;
  title: string;
  description?: string;
}

const GridItem: React.FC<GridItemProps> = ({
  //id,
  imgUrl,
  href,
  title,
  description,
}) => {
  //console.log(imgUrl);
  //const imageUrl = imgUrl ? imgUrl : `/resources/egitimler/${id}/image-1.png`;
  return (
    <>
      <Link href={href}>
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
            "&:hover": {
              boxShadow: 5,
              borderColor: "rgb(211,178,107, 0.6)",
              transform: "scale(1.05)",
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
              //bgcolor: "rgb(128,128,128,0.4)", //"secondary.main",
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
              sx={{
                fontFamily: "Helvetica, Roboto, sans-serif",
                //fontFamily: "__Inter_e66fe9",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: -0.2,
                px: 1,
                py: 0.2,
                opacity: 0.97,
              }}
              className={"limitedLine"}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Montserrat, Lexend, sans-serif",
                fontSize: 14,
                letterSpacing: -0.2,
                color: "text.secondary",
                px: 1,
                wordBreak: "normal",
                //textAlign: "justify",
                //whiteSpace: "break-spaces",
              }}
              className='limitedLine2'
            >
              {description}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </>
  );
};

export default GridItem;
