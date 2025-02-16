"use client";
//import useElementSize from "@/hooks/size/useElementSize";
import useWindowSize from "@/hooks/size/useWindowSize";
import { Box } from "@mui/material";
import Vimeo from "@u-wave/react-vimeo";
//import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PHASE_ORDER } from "./constants";
import { useRef, useState } from "react";

const SCREEN_RATIO = 562.5 / 1000;

//const Vimeo = dynamic(() => import("@u-wave/react-vimeo"), { ssr: false });

interface VimeoVideoProps {
  src: { intro: string; main: string };
}

const VimeoVideo: React.FC<VimeoVideoProps> = ({ src }) => {
  /* const handlePause = (event) => {
    this.setState({
      paused: event.target.checked,
    });
  };

  const handlePlayerPause = () => {
    this.setState({ paused: true });
  };

  const handlePlayerPlay = () => {
    this.setState = { paused: false };
  };

  const handleVolume = (event) => {
    this.setState({
      volume: parseFloat(event.target.value),
    });
  };

  const selectVideo = (index) => {
    this.setState({ videoIndex: index });
  }; */
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const phase = searchParams.get("phase") || "intro"; // Default to intro

  const [videoUrls, setVideoUrls] = useState<{ intro: string; main: string }>(
    src
  );

  const onNextPhase = () => {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      const nextPhase = PHASE_ORDER[currentIndex + 1];
      router.push(`/egitimler/${slug}/?phase=${nextPhase}`);
      /*  setTimeout(
        () => router.push(`/egitimler/${slug}/?phase=${nextPhase}`),
        500
      ); */
    }
  };

  const ref = useRef<React.ReactElement>(null);
  //const { width, height } = useElementSize(ref);

  const { width } = useWindowSize();
  const getWidth = () => {
    return width < 600
      ? width - 100
      : width < 800
        ? width - 160
        : width < 1000
          ? width - 200
          : (3 * width) / 5;
  };

  return (
    <>
      <Box
        //ref={ref}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          minHeight: getWidth() * SCREEN_RATIO,
          //minHeight: { xs: 320, sm: 400, md: 440 },
          mb: 2,
        }}
      >
        <Vimeo
          video={src[phase as keyof typeof src]}
          autoplay
          width={getWidth()}
          height={getWidth() * SCREEN_RATIO} //height={getHeight()}
          style={{}}
          onEnd={onNextPhase} //(e) => console.log(e)
          onPlay={(e) => console.log(e)}
          dnt={true}
          onTimeUpdate={(e) => console.log(e)}
        />
      </Box>
    </>
  );
};

export default VimeoVideo;
