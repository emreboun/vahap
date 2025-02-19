"use client";
import { formatDuration } from "@/utils/data";
import {
  AttachFileRounded,
  ReplyRounded,
  TimerOutlined,
  VideoLibraryRounded,
} from "@mui/icons-material";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { downloadPgn } from "../actions";

const VimeoPlayer = dynamic(() => import("react-player/vimeo"), { ssr: false });

interface VideoPlayerProps {
  intro?: string;
  main?: string;
  duration: number;
  misc?: Record<string, any>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  intro,
  main,
  duration,
  misc,
}) => {
  const ref = useRef(null);
  const [phase, setPhase] = useState(intro ? "intro" : "main");
  const videoUrl = phase === "intro" ? intro : main;

  const onNextPhase = () => {
    setPhase("main");
  };

  const togglePhase = () => {
    setPhase((prev) => (prev === "intro" ? "main" : "intro"));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          px: { xs: 0, sm: 3, md: 6, lg: 11, xl: 11 },
          display: "flex",
          flexDirection: "column",
          gap: 1.6,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            //bgcolor: "rgb(0,0,0,0.1)",
          }}
        >
          {videoUrl ? (
            <VimeoPlayer
              //ref={ref}
              url={videoUrl}
              playing={true}
              controls
              width='100%'
              height='100%'
              onEnded={onNextPhase}
              //style={{ backgroundColor: "rgb(0,0,0,0.1)" }}
            />
          ) : (
            <Paper
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: { xs: 12, sm: 0 },
                right: { xs: 12, sm: 0 },
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                border: "1px solid",
                borderColor: "rgb(0,0,0,0.1)",
                borderRadius: 0.6,
                boxShadow: 1,
              }}
            >
              <VideoLibraryRounded
                sx={{ color: "rgb(0,0,0,0.8)", fontSize: 32 }}
              />

              <Typography color={"textSecondary"}>
                {"Satın alım gerekli."}
              </Typography>
            </Paper>
          )}
        </Box>

        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            px: { xs: 3, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 33,
                px: { xs: 3, sm: 0 },
              }}
            >
              <Box
                sx={{
                  alignSelf: "stretch",
                  px: 1.6,
                  bgcolor: "secondary.main",
                  borderRadius: 0.6,
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TimerOutlined
                  sx={{
                    fontSize: { xs: 20, sm: 22 },
                    color: "#fff",
                    display: phase === "main" ? "block" : "none",
                  }}
                />

                <Typography
                  sx={{}}
                  variant={"body2"}
                  color='white'
                  fontFamily={"Montserrat, Lexend, sans-serif"}
                  fontSize={{ xs: 13, sm: 14 }}
                  fontWeight={600}
                  letterSpacing={0}
                  className='limitedLine'
                >
                  {phase === "intro"
                    ? "Giriş Videosu"
                    : formatDuration(duration, { showSeconds: false })}
                </Typography>
              </Box>
            </Box>

            {phase === "main" && !!main && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    px: { xs: 3, sm: 0 },
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: "stretch",
                      px: 1.6,
                      bgcolor: "secondary.main",
                      borderRadius: 0.6,
                      boxShadow: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      height: 33,
                    }}
                  >
                    <AttachFileRounded
                      sx={{
                        fontSize: { xs: 20, sm: 21 },
                        color: "#fff",
                      }}
                    />

                    <Typography
                      sx={{}}
                      variant={"body2"}
                      color='white'
                      fontFamily={"Montserrat, Lexend, sans-serif"}
                      fontSize={{ xs: 13, sm: 14 }}
                      fontWeight={600}
                      letterSpacing={0}
                      className='limitedLine'
                    >
                      {"Dosyalar"}
                    </Typography>
                  </Box>

                  {[1, 2, 3].map((item) => (
                    <Tooltip key={item} title={"Pgn dosyasını indir"}>
                      <Button
                        //variant={"outlined"}
                        sx={{
                          textTransform: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          border: "1px solid rgba(0,0,0,0.12)",
                          px: { xs: 1.5, sm: 2 },
                          borderRadius: 0.8,
                          "&:hover": {
                            boxShadow: 1,
                          },
                        }}
                        onClick={togglePhase}
                      >
                        <Typography variant={"body2"} className='limitedLine'>
                          {`File-${item}`}
                        </Typography>
                      </Button>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Button
            variant={"outlined"}
            sx={{
              textTransform: "none",
              display: phase === "main" && !intro ? "none" : "flex",
              flexDirection: phase === "main" ? "row" : "row-reverse",
              alignItems: "center",
              gap: 1,
              boxShadow: { xs: 1, sm: 2 },
              px: { xs: 1.5, sm: 2 },
              borderRadius: 0.8,
            }}
            onClick={togglePhase}
          >
            <ReplyRounded
              sx={{
                fontSize: 21,
                transform: phase === "intro" ? "scale(-1,1)" : "",
              }}
            />

            <Typography variant={"body2"} className='limitedLine'>
              {phase === "intro" ? "Eğitime Git" : "Girişe Dön"}
            </Typography>
          </Button>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 33,
              px: { xs: 3, sm: 0 },
            }}
          >
            <Tooltip title={phase === "main" ? "Eğitim Süresi" : ""}>
              <Box
                sx={{
                  alignSelf: "stretch",
                  px: 1.6,
                  bgcolor: "secondary.main",
                  borderRadius: 0.6,
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TimerOutlined
                  sx={{
                    fontSize: { xs: 20, sm: 22 },
                    color: "#fff",
                    display: phase === "main" ? "block" : "none",
                  }}
                />

                <Typography
                  sx={{ cursor: "default" }}
                  variant={"body2"}
                  color='white'
                  fontFamily={"Montserrat, Lexend, sans-serif"}
                  fontSize={{ xs: 13, sm: 14 }}
                  fontWeight={600}
                  letterSpacing={0}
                  className='limitedLine'
                >
                  {phase === "intro"
                    ? "Giriş Videosu"
                    : formatDuration(duration, { showSeconds: false })}
                </Typography>
              </Box>
            </Tooltip>

            <Button
              variant={"outlined"}
              sx={{
                textTransform: "none",
                display: phase === "main" && !intro ? "none" : "flex",
                flexDirection: phase === "main" ? "row" : "row-reverse",
                alignItems: "center",
                gap: 1,
                boxShadow: { xs: 1, sm: 2 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 0.8,
              }}
              onClick={togglePhase}
            >
              <ReplyRounded
                sx={{
                  fontSize: 21,
                  transform: phase === "intro" ? "scale(-1,1)" : "",
                }}
              />

              <Typography variant={"body2"} className='limitedLine'>
                {phase === "intro" ? "Eğitime Git" : "Girişe Dön"}
              </Typography>
            </Button>
          </Box>

          {phase === "main" && !!main && misc?.pgns?.length > 0 && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  px: { xs: 3, sm: 0 },
                }}
              >
                <Box
                  sx={{
                    alignSelf: "stretch",
                    px: 1.6,
                    bgcolor: "secondary.main",
                    borderRadius: 0.6,
                    boxShadow: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    height: 33,
                  }}
                >
                  <AttachFileRounded
                    sx={{
                      fontSize: { xs: 20, sm: 21 },
                      color: "#fff",
                    }}
                  />

                  <Typography
                    sx={{}}
                    variant={"body2"}
                    color='white'
                    fontFamily={"Montserrat, Lexend, sans-serif"}
                    fontSize={{ xs: 13, sm: 14 }}
                    fontWeight={600}
                    letterSpacing={0}
                    className='limitedLine'
                  >
                    {"Dosyalar"}
                  </Typography>
                </Box>

                {misc?.pgns?.map((item: any, i: number) => (
                  <Tooltip key={i} title={"Pgn Dosyasını İndir"}>
                    <Button
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        border: "1px solid rgba(0,0,0,0.12)",
                        px: { xs: 1.5, sm: 2 },
                        borderRadius: 0.8,
                        "&:hover": {
                          boxShadow: 1,
                        },
                      }}
                      onClick={() => downloadPgn(item.name, item.content)}
                    >
                      <Typography variant={"body2"} className='limitedLine'>
                        {`${item.name}.pgn`}
                      </Typography>
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default VideoPlayer;
