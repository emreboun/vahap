"use client";
import useWindowSize from "@/hooks/size/useWindowSize";
import { Box, Button, ButtonBase, Collapse, Typography } from "@mui/material";
import {
  KeyboardReturnRounded,
  PlayCircleRounded,
  ReplyRounded,
  TimerOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { formatDuration } from "@/utils/data";

export const LectureMenu: React.FC<any> = ({ slug, data, hasAccess }) => {
  const searchParams = useSearchParams();
  const phase = searchParams.get("phase") || "intro";

  const { width } = useWindowSize();

  const getWidth = useCallback(() => {
    return width < 600
      ? width
      : width < 800
        ? width - 160
        : width < 1000
          ? width - 200
          : (3 * width) / 5;
  }, [width]);

  return (
    <>
      <Box
        sx={{
          width: getWidth(),
          px: { xs: 4, sm: 0 },
          mt: -0.8,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            //flexDirection: phase === "intro" ? "row" : "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              alignSelf: "stretch",
              px: 1.6,
              bgcolor: "secondary.main",
              borderRadius: 1,
              boxShadow: 2,
              //display: "flex",
              alignItems: "center",
              gap: 1,
              opacity: phase === "intro" ? 1 : 0,
              display: phase === "intro" ? "flex" : "none",
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <Typography
              sx={{}}
              variant={"body2"}
              color='white'
              fontFamily={"Montserrat, Lexend, sans-serif"}
              fontSize={15}
              fontWeight={600}
              letterSpacing={0}
              className='limitedLine'
            >
              {"Giriş Videosu"}
            </Typography>
          </Box>

          {/* <Box
            sx={{
              flex: phase === "intro" ? 1 : 0,
              transition: "all 0.2s ease-in-out",
            }}
          /> */}

          <Link
            href={`/egitimler/${slug}?phase=${phase === "intro" ? "main" : "intro"}`}
          >
            <Button
              variant={"outlined"}
              sx={{
                textTransform: "none",
                display: "flex",
                flexDirection: phase !== "intro" ? "row" : "row-reverse",
                alignItems: "center",
                gap: 1,
                boxShadow: 2,
                px: { xs: 1.5, sm: 2 },
              }}
            >
              <ReplyRounded
                sx={{
                  fontSize: 21,
                  transform: phase === "intro" ? "scale(-1,1)" : "",
                }}
              />
              {/* {phase !== "intro" ? (
                <ReplyRounded sx={{ fontSize: 21 }} />
              ) : (
                <PlayCircleRounded sx={{ fontSize: 21 }} />
              )} */}
              <Typography variant={"body2"} className='limitedLine'>
                {phase === "intro" ? "Eğitime Git" : "Girişe Dön"}
              </Typography>
            </Button>
          </Link>

          {/* <Box
            sx={{
              flex: phase === "main" ? 1 : 0,
              transition: "all 0.2s ease-in-out",
            }}
          /> */}

          <Box
            sx={{
              alignSelf: "stretch",
              px: 1.6,
              bgcolor: "secondary.main",
              borderRadius: 1,
              boxShadow: 2,
              //display: "flex",
              alignItems: "center",
              gap: 1,
              opacity: phase === "main" ? 1 : 0,
              display: phase === "main" ? "flex" : "none",
              transition:
                "opacity 0.2s ease-in-out, display 0.2s ease-in-out 0.2s",
            }}
          >
            <TimerOutlined
              sx={{
                fontSize: 22,
                color: "#fff",
              }}
            />

            <Typography
              sx={{}}
              variant={"body2"}
              color='white'
              fontFamily={"Montserrat, Lexend, sans-serif"}
              fontSize={15}
              fontWeight={600}
              letterSpacing={0}
              className='limitedLine'
            >
              {formatDuration(data.duration, { showSeconds: false })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
