"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { VimeoVideo } from "./VimeoVideo";
import { Box, Typography } from "@mui/material";
import { VideoLibraryRounded } from "@mui/icons-material";
import { useCallback, useState } from "react";

interface VimeoPlayer {
  slug: string;
  main?: string | null;
  intro?: string;
}

export const VimeoVideoPlayer: React.FC<VimeoPlayer> = ({
  slug,
  main,
  intro,
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const initialPhase = intro ? "intro" : main ? "main" : "locked";
  const tempPhase = searchParams.get("phase") || initialPhase;
  const phase = tempPhase === "main" || !main ? "main" : "intro";
  /* const initialPhase = intro ? "intro" : main ? "main" : "locked";
  const [phase, setPhase] = useState(initialPhase); */
  const videoUrl = phase === "intro" ? intro : main;

  const onNextPhase = useCallback(
    (e: any) => {
      console.log(e);
      if (phase === "intro") {
        router.push(`/egitimler/${slug}/?phase=main`);
      }
      /* const currentIndex = PHASE_ORDER.indexOf(phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      const nextPhase = PHASE_ORDER[currentIndex + 1];
      router.push(`/egitimler/${slug}/?phase=${nextPhase}`);
    } */
    },
    [phase, router, slug]
  );

  return (
    <>
      {videoUrl ? (
        <VimeoVideo
          //key={`${videoUrl}`}
          videoId={videoUrl}
          slug={slug}
          phase={phase}
          handleVideoEnd={onNextPhase}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
            textAlign: "center",
          }}
        >
          <VideoLibraryRounded sx={{ fontSize: 48, color: "gray" }} />
          <Typography variant='h6' color='textSecondary'>
            This content is locked.
          </Typography>
        </Box>
      )}
    </>
  );
};
/* "use client";
//import { useSearchParams, useRouter } from "next/navigation";
import { VimeoVideo } from "./VimeoVideo";
import { Box, Typography, Button } from "@mui/material";
import { VideoLibraryRounded } from "@mui/icons-material";
import { useCallback, useState } from "react";
import useWindowSize from "@/hooks/size/useWindowSize";

interface VimeoPlayer {
  slug: string;
  main?: string | null;
  intro?: string;
  //hasAccess: boolean;
}

export const VimeoVideoPlayer: React.FC<VimeoPlayer> = ({
  slug,
  main,
  intro,
  //hasAccess,
}) => {
  //const searchParams = useSearchParams();
  //const router = useRouter();
  const initialPhase = intro ? "intro" : main ? "main" : "locked";
  const [phase, setPhase] = useState(initialPhase);

  const handleVideoEnd = () => {
    if (phase === "intro" && main) {
      setPhase("main");
    }
  };

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
      {phase === "locked" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
            textAlign: "center",
          }}
        >
          <VideoLibraryRounded sx={{ fontSize: 48, color: "gray" }} />
          <Typography variant='h6' color='textSecondary'>
            This content is locked.
          </Typography>
          <Button variant='contained' color='primary' href='/purchase'>
            Purchase Access
          </Button>
        </Box>
      ) : (
        <VimeoVideo
          key={phase}
          videoId={phase === "intro" ? intro : main}
          slug={slug}
          phase={phase}
          onVideoEnd={handleVideoEnd}
        />
      )}
    </>
  );
};
 */
