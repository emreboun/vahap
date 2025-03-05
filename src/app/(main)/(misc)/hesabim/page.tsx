import { getUserWithLectures } from "@/api/lectures/access";
import { formatDuration } from "@/utils/data";
import {
  AccountCircleRounded,
  AttachFileRounded,
  Badge,
  Email,
  SignalCellularAltRounded,
  TimerOutlined,
} from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const AccountPage: React.FC = async () => {
  const account: any = await getUserWithLectures();
  if (!account) {
    return null;
  }
  const { permissions, user } = account;
  const { email, firstName, lastName } = user;

  return (
    <>
      <Paper
        sx={{
          px: 4,
          pt: 5,
          pb: 3,
          boxShadow: 2,
          minHeight: { xs: 320, md: 480 },
        }}
        elevation={0}
      >
        <Box
          sx={{ display: "flex", gap: 2, px: { xs: 0.2, sm: 4, md: 8, lg: 8 } }}
        >
          <Box
            sx={{
              bgcolor: "lightgrey",
              border: "1px solid rgb(128,128,128,0.2)",
              boxShadow: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            <AccountCircleRounded color={"primary"} sx={{ fontSize: 128 }} />
          </Box>

          <Box
            sx={{
              pt: 1.5,
              pb: 1,
              px: { xs: 0.8, sm: 1.2, md: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Email color='primary' />

              <Typography
                color={"textSecondary"}
                fontSize={{ xs: 15, sm: 16 }}
                sx={{ mt: 0.1 }}
              >
                {email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Badge color='primary' />

              <Typography
                color={"textSecondary"}
                fontSize={{ xs: 15, sm: 16 }}
                sx={{ mt: 0.1 }}
              >{`${firstName} ${lastName}`}</Typography>
            </Box>
          </Box>
        </Box>

        {permissions?.length > 0 && (
          <>
            <Typography
              variant={"h5"}
              sx={{ my: { xs: 2, md: 3 }, px: { xs: 0, sm: 4, md: 8 } }}
            >
              {"Eğitimlerim"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  md: "repeat(2,1fr)",
                  sm: "repeat(1,1fr)",
                  xs: "repeat(1,1fr)",
                },
                gap: { xs: 3, sm: 3.2, md: 3.6, lg: 2.4 },
                px: { xs: 0, sm: 4, md: 6, lg: 8 },
              }}
            >
              {permissions.map((lec: any) => (
                <Link
                  key={lec.lecture.slug}
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
                      },
                    }}
                    elevation={0}
                  >
                    <Typography
                      sx={{ pl: 0.5 }}
                      fontFamily={"Montserrat"}
                      letterSpacing={-0.3}
                      fontWeight={600}
                      color={"primary"}
                    >
                      {lec.lecture.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                          md: "column",
                          xl: "row",
                        },
                        alignItems: {
                          xs: "flex-start",
                          sm: "center",
                          md: "flex-start",
                          xl: "center",
                        },
                        gap: 0.8,
                      }}
                    >
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
                          {`${lec.lecture.minElo} - ${lec.lecture.maxElo}`}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.4,
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

                        {lec.lecture.pgnCount > 0 && (
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
                                {`${lec.lecture.pgnCount} Döküman`}
                              </Typography>
                            </>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Link>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default AccountPage;
