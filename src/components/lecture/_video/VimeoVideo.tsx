"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { PHASE_ORDER, VIDEO_SCREEN_RATIO } from "../constants";
import useWindowSize from "@/hooks/size/useWindowSize";
import { useCallback, useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { VideoLibraryRounded } from "@mui/icons-material";

//import Vimeo from "@u-wave/react-vimeo";

const Vimeo = dynamic(() => import("@u-wave/react-vimeo"), { ssr: false });

export const VimeoVideo: React.FC<any> = ({
  slug,
  videoId,
  phase,
  handleVideoEnd,
}) => {
  /* const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    //playerRef.current.getInternalPlayer().then((player: any) => {
    playerRef.current.on("ended", () => {
      console.log("Video ended");
      handleVideoEnd?.(); // Call your function if needed
    });

    playerRef.current.on("pause", () => console.log("Video paused"));
    playerRef.current.on("play", () => console.log("Video playing"));
    //});
  }, [handleVideoEnd]); */

  const { width } = useWindowSize();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const onError = () => {
    setError(true);
  };

  const getWidth = useCallback(() => {
    return width < 600
      ? width
      : width < 800
        ? width - 160
        : width < 1000
          ? width - 200
          : (3 * width) / 5;
  }, [width]);

  /* if (phase === "main" && !videoId) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: -2,
          bottom: 16,
          left: 8,
          right: 8,
          //py: 10,
          //width: getWidth(),
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          border: "1px solid",
          borderColor: "rgb(0,0,0,0.1)",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <VideoLibraryRounded sx={{ color: "rgb(0,0,0,0.8)", fontSize: 32 }} />

        <Typography color={"textSecondary"}>{"Video bulunamadı."}</Typography>
      </Box>
    );
  } */

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1,
          minHeight: getWidth() * VIDEO_SCREEN_RATIO,
          mb: 2,
        }}
      >
        <Vimeo
          key={`${loaded}`}
          //ref={playerRef}
          video={videoId}
          autoplay={phase !== "locked"}
          width={getWidth()}
          height={getWidth() * VIDEO_SCREEN_RATIO}
          /* onReady={(player) => {
            playerRef.current = player;
          }} */
          onEnd={handleVideoEnd}
          onPause={(e) => console.log(e)}
          onLoaded={(e) => setLoaded(true)}
          onError={onError}
          onPlay={(e) => console.log(e)}
          //dnt={true}
          //loop={false}
          //color={"#375D62"}
          showPortrait={false}
          //controls={true}
          //volume={0}
        />

        {error && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              //left: 0,
              //right: 0,
              width: getWidth(),
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              border: "1px solid",
              borderColor: "rgb(0,0,0,0.1)",
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <VideoLibraryRounded
              sx={{ color: "rgb(0,0,0,0.8)", fontSize: 32 }}
            />

            <Typography color={"textSecondary"}>
              {"Video bulunamadı."}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
