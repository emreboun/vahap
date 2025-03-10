import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import AddToCartButton from "../lecture/AddToCartButton";
import Image from "next/image";
import {
  AccessTimeFilledRounded,
  AttachFileRounded,
  EventAvailable,
  LocationOn,
  PlayLessonOutlined,
  SignalCellularAltRounded,
  TimerOutlined,
} from "@mui/icons-material";
import { formatDuration } from "@/utils/data";
import { turkcetarih_formati } from "@/utils";
import Link from "next/link";
import LectureContent from "../lecture/LectureContent";

export const ProductMain: React.FC<any> = ({ data }) => {
  const {
    name,
    thumbnail,
    minElo,
    maxElo,
    pgnCount,
    duration,
    lecture,
    lectures,
    eventTicket,
    hasAccess,
  } = data;

  return (
    <>
      <Paper
        component='section'
        className='responsiveSmall'
        sx={{
          pt: 0,
          pb: 3,
          boxShadow: 1,
          borderRadius: { xs: 0, sm: 0.6 },
          borderLeft: { xs: 0, sm: "1px solid #e0e0e0" },
          borderRight: { xs: 0, sm: "1px solid #e0e0e0" },
          borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: { xs: 0.2, sm: 0.5 },
              pr: { xs: 3, sm: 4, md: 5, lg: 6 },
              pl: { xs: 3, md: 5 },
              pb: { xs: 0.2, sm: 0 },
            }}
          >
            <Typography
              component='h1'
              sx={{
                fontFamily:
                  "Montserrat, Playfair Display, Montserrat, Lexend, sans-serif",
                fontSize: { xs: 17, sm: 20, md: 22 },
                fontWeight: 600,
                letterSpacing: { xs: -0.5, sm: -0.4, md: -0.3 },
                pl: { xs: 0, md: 1 },
                pt: { xs: 2, sm: 2.5 },
                pb: { xs: 2, sm: 2.5 },
              }}
            >
              {name}
            </Typography>

            {!hasAccess && <AddToCartButton data={{ mainProduct: data }} />}
          </Box>

          <Divider sx={{ display: { xs: "none", sm: "block" }, mx: 4 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box sx={{ display: { xs: "flex", md: "none" }, px: 4, py: 1 }}>
              <Image
                src={"/thumbnail_main.jpg"}
                //src={thumbnail ?? "/thumbnail_main.jpg"}
                alt={"Ürün Resmi"}
                height={360}
                width={640}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                px: 4,
                py: 1,
                justifyContent: "center",
                height: { md: 377 },
                gap: 4,
              }}
            >
              <Image
                src={"/thumbnail_main.jpg"}
                //src={thumbnail ?? "/thumbnail_main.jpg"}
                alt={"Ürün Resmi"}
                height={360}
                width={640}
                style={{
                  height: "100%",
                  width: "auto",
                }}
                priority
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                pt: { xs: 1, lg: 3 },
                px: { xs: 3, sm: 6, md: 4, lg: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row-reverse", lg: "column" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 0.5,
                }}
              >
                {lectures?.length > 0 && (
                  <Chip
                    icon={
                      <PlayLessonOutlined
                        color={"info"}
                        sx={{ fontSize: 21, color: "#fff" }}
                      />
                    }
                    label={`Toplam ${lectures.length} Ders`}
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: "secondary.main",
                      height: 36,
                      px: 2,
                      borderRadius: 1,
                      boxShadow: 2,
                      mb: 1.2,
                      gap: 1,
                      "& .MuiChip-label": {
                        py: 0,
                        px: 1.2,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                        letterSpacing: -0.2,
                      },
                    }}
                  />
                )}

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                      lg: "column",
                    },
                    justifyContent: "space-between",
                    gap: { xs: 0.5, md: 2, lg: 0.5 },
                    px: { xs: 0, md: 4, lg: 0 },
                  }}
                >
                  {((lecture?.minElo && lecture.maxElo) ||
                    (minElo && maxElo)) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.4,
                        minHeight: 22,
                        opacity: 0.99,
                      }}
                    >
                      <SignalCellularAltRounded
                        sx={{ fontSize: 19, color: "primary.main" }}
                      />

                      <Typography
                        color={"textSecondary"}
                        fontSize={{ xs: 13, md: 14 }}
                        letterSpacing={{
                          xs: -0.8,
                          sm: -0.6,
                          md: -0.5,
                        }}
                        //className={"limitedLine"}
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
                        //className={"limitedLine"}
                        sx={{
                          pl: 0.1,
                          transform: "scale(0.96)",
                        }}
                      >
                        {`${minElo ?? lecture?.minElo} - ${maxElo ?? lecture?.maxElo}`}
                      </Typography>
                    </Box>
                  )}

                  {duration > 0 && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.2 }}
                    >
                      <TimerOutlined
                        sx={{ fontSize: 19, color: "primary.main" }}
                      />
                      <Typography
                        color={"textSecondary"}
                        fontSize={{ xs: 13, md: 14 }}
                        letterSpacing={{
                          xs: -0.7,
                          sm: -0.6,
                          md: -0.5,
                        }}
                        className={"limitedLine"}
                      >
                        {formatDuration(duration)}
                      </Typography>
                    </Box>
                  )}

                  {pgnCount > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.2,
                        minHeight: 22,
                      }}
                    >
                      <>
                        <AttachFileRounded
                          sx={{ fontSize: 19, color: "primary.main" }}
                        />
                        <Typography
                          color={"textSecondary"}
                          fontSize={{ xs: 13, md: 14 }}
                          letterSpacing={{
                            xs: -0.7,
                            sm: -0.6,
                            md: -0.5,
                          }}
                          className={"limitedLine"}
                        >
                          {`${pgnCount} Döküman`}
                        </Typography>
                      </>
                    </Box>
                  )}
                </Box>
              </Box>

              {eventTicket && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row-reverse", lg: "column" },
                    justifyContent: { xs: "space-between" },
                  }}
                >
                  <Chip
                    icon={
                      <EventAvailable
                        color={"info"}
                        sx={{ fontSize: 21, color: "#fff" }}
                      />
                    }
                    label={"Etkinlik Bileti"}
                    sx={{
                      bgcolor: "secondary.main",
                      height: 32,
                      p: 0,
                      borderRadius: 1,
                      boxShadow: 2,
                      mb: 1.2,
                      "& .MuiChip-label": {
                        py: 0,
                        px: 1.2,
                        color: "#fff",
                        fontWeight: 600,
                      },
                    }}
                  />

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.2,
                        minHeight: 22,
                        pl: 0.2,
                      }}
                    >
                      <AccessTimeFilledRounded
                        sx={{ fontSize: 19, color: "primary.main" }}
                      />
                      <Typography
                        color={"textSecondary"}
                        fontSize={{ xs: 13, md: 14 }}
                        letterSpacing={{
                          xs: -0.7,
                          sm: -0.6,
                          md: -0.5,
                        }}
                        className={"limitedLine"}
                        sx={{}}
                      >
                        {`${turkcetarih_formati(eventTicket.date)}`}
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
                      <LocationOn
                        sx={{ fontSize: 21, color: "primary.main" }}
                      />
                      <Typography
                        color={"textSecondary"}
                        fontSize={{ xs: 13, md: 14 }}
                        letterSpacing={{
                          xs: -0.7,
                          sm: -0.6,
                          md: -0.5,
                        }}
                        className={"limitedLine"}
                      >
                        {`${eventTicket.url ?? eventTicket.location}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              px: { xs: 3.5, sm: 4.5, md: 6, lg: 7 },
              pt: 2,
              pb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              whiteSpace: "break-spaces",
            }}
          >
            <LectureContent markdown={data.description} />
          </Box>

          <>
            {lectures?.length > 0 && (
              <>
                <Typography
                  variant={"h5"}
                  sx={{ my: { xs: 2, md: 3 }, px: { xs: 4, sm: 6, md: 10 } }}
                >
                  {"Eğitimler"}
                </Typography>

                <Box
                  sx={{
                    mt: { xs: 2, md: 3 },
                    display: "grid",
                    gridTemplateColumns: {
                      md: "repeat(2,1fr)",
                      sm: "repeat(1,1fr)",
                      xs: "repeat(1,1fr)",
                    },
                    gap: { xs: 3, sm: 3.2, md: 3.6, lg: 2.4 },
                    px: { xs: 2, sm: 4, md: 8 },
                  }}
                >
                  {lectures.map((lec: any) => (
                    <Link
                      key={lec.lecture.id}
                      href={`/egitimler/${lec.lecture.slug}`}
                    >
                      <Paper
                        sx={{
                          px: 1.5,
                          py: 2,
                          boxShadow: 1,
                          border: "1px solid rgb(128,128,128,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          "&:hover": {
                            boxShadow: 3,
                            transform: "scale(1.02)",
                            "& .lecture-title": {
                              color: "primary.main",
                            },
                          },
                        }}
                        elevation={0}
                      >
                        <Typography
                          sx={{ pl: 0.5 }}
                          className={"lecture-title"}
                        >
                          {lec.lecture.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.2,
                            }}
                          >
                            <TimerOutlined
                              sx={{ fontSize: 19, color: "primary.main" }}
                            />

                            <Typography
                              color={"textSecondary"}
                              fontSize={{ xs: 13, md: 14 }}
                              letterSpacing={{
                                xs: -0.7,
                                sm: -0.6,
                                md: -0.5,
                              }}
                              className={"limitedLine"}
                            >
                              {formatDuration(lec.lecture.duration)}
                            </Typography>
                          </Box>

                          {lec.lecture.resources.length > 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.2,
                                minHeight: 22,
                              }}
                            >
                              <>
                                <AttachFileRounded
                                  sx={{ fontSize: 19, color: "primary.main" }}
                                />
                                <Typography
                                  color={"textSecondary"}
                                  fontSize={{ xs: 13, md: 14 }}
                                  letterSpacing={{
                                    xs: -0.7,
                                    sm: -0.6,
                                    md: -0.5,
                                  }}
                                  className={"limitedLine"}
                                >
                                  {`${lec.lecture.resources.length} Döküman`}
                                </Typography>
                              </>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </Link>
                  ))}
                </Box>
              </>
            )}
          </>
        </Box>
      </Paper>
    </>
  );
};
