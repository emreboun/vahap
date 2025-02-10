"use client";
//import useElementSize from "@/hooks/size/useElementSize";
import useWindowSize from "@/hooks/size/useWindowSize";
import { Box } from "@mui/material";
//import Vimeo from "@u-wave/react-vimeo";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SCREEN_RATIO = 562.5 / 1000;

const Vimeo = dynamic(() => import("@u-wave/react-vimeo"), { ssr: false });

interface VimeoVideoProps {
  src: string;
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
        ref={ref}
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
          video={src}
          //autoplay
          width={getWidth()}
          height={getWidth() * SCREEN_RATIO} //height={getHeight()}
          style={{}}
        />
      </Box>
    </>
  );
};

export default VimeoVideo;
