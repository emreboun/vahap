import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export interface GridItemProps {
  imgUrl: string;
  href: string;
  title: string;
}

const GridItem: React.FC<GridItemProps> = ({ imgUrl, href, title }) => {
  return (
    <>
      <Link href={href}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTopRadius: 1.5,
            borderBottomRadius: 1,
            overflow: "hidden",
            transition: "all 0.2s ease-in-out",
            boxShadow: 3,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgb(211,178,107, 0.4)", //"secondary.main",
            "&:hover": {
              boxShadow: 5,
              //borderWidth: "2px",
              borderColor: "rgb(211,178,107, 0.6)",
              transform: "scale(1.05)",
              "& .MuiBox-root": {
                // bgcolor: "secondary.main",
                //bgcolor: "primary.main",
              },
              "& .MuiTypography-root": {
                //color: "primary.main",
                //color: "#fff",
              },
            },
          }}
        >
          <Box sx={{ borderTopRadius: 1.5, borderBottomRadius: 1, pb: 0.5 }}>
            <Box
              sx={{
                borderTopRadius: 1.5,
                borderBottomRadius: 0, //px: 2,
                //py: 2,
              }}
            >
              <Image
                src={imgUrl}
                alt={""}
                height={192}
                width={384}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                py: 0.5,
                px: 1,

                //color: "primary.main",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </>
  );
};

export default GridItem;
