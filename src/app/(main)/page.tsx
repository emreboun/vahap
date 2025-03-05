import { getAllLectures } from "@/api/lectures";
import { Box, Paper, Typography } from "@mui/material";
import ResponsiveGrid from "@/components/grid";
import { getAllTickets, getDiscountedProducts } from "@/api/products";
import ProductGrid from "@/components/grid/ProductGrid";
import { getUserAccess } from "@/api/lectures/access";

export default async function Home() {
  const lectures: any[] = await getAllLectures();
  const permissions = await getUserAccess();

  const items = lectures.map((lecture) => ({
    ...lecture,
    hasAccess: permissions?.some((perm) => perm.lectureId === lecture.id),
  }));
  return (
    <Box className='responsive'>
      <ResponsiveGrid items={items} slug={"egitimler"} />
    </Box>
  );

  /* const permissions = await getUserAccess();

  const tickets = await getAllTickets();
  const three = await getThreeLectures();
  const latest = await getLatestThreeLectures();
  const discounts = ((await getDiscountedProducts()) ?? []).filter(
    (d) =>
      !permissions?.some((perm) => d.lecture?.id === perm.lectureId) &&
      !(d.eventTicket && !tickets.some((tick) => tick.product?.id === d.id))
  );

  permissions?.forEach((perm) => {
    const th = three.find((t) => t.id === perm.lectureId);
    const la = latest.find((l) => l.id === perm.lectureId);
    if (th) {
      th.hasAccess = true;
    }
    if (la) {
      la.hasAccess = true;
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.4, sm: 4, md: 6 },
        }}
      >
        {tickets.length > 0 && (
          <Paper
            component='section'
            //className='responsiveSecondary'
            sx={{
              pt: 0,
              pb: 3,
              boxShadow: 1,
              borderRadius: { xs: 0, sm: 0.6 },
              borderLeft: { xs: 0, sm: "1px solid #e0e0e0" },
              borderRight: { xs: 0, sm: "1px solid #e0e0e0" },
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              px: { xs: 1, lg: 14, xl: 21 },
            }}
            elevation={1}
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
                    pl: 0, //{ xs: 0, md: 1 },
                    py: { xs: 2, sm: 2.5 },
                  }}
                >
                  {"Yakındaki Etkinlikler"}
                </Typography>
              </Box>

             

              <Box sx={{ px: { xs: 3, sm: 8, md: 3, lg: 5 } }}>
                <ProductGrid items={tickets.filter((ticket, i) => i < 2)} />
              </Box>
            </Box>
          </Paper>
        )}

        <Paper
          component='section'
          className='responsiveSecondary'
          sx={{
            pt: 0,
            pb: 3,
            boxShadow: 1,
            borderRadius: { xs: 0, sm: 0.6 },
            borderLeft: { xs: 0, sm: "1px solid #e0e0e0" },
            borderRight: { xs: 0, sm: "1px solid #e0e0e0" },
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
            px: { xs: 1, lg: 6, xl: 12 },
          }}
          elevation={1}
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
                  pl: 0,
                  py: { xs: 2, sm: 2.5 },
                }}
              >
                {"Öne Çıkanlar"}
              </Typography>
            </Box>


            <Box sx={{ px: { xs: 1, sm: 2 } }}>
              <ResponsiveGrid
                items={three}
                slug={"egitimler"}
                gap={{ xs: 3, sm: 3.2, md: 3.6, lg: 3.8, xl: 5 }}
              />
            </Box>
          </Box>
        </Paper>

        {discounts?.length > 0 && (
          <Paper
            component='section'
            //className='responsiveSmall'
            sx={{
              pt: 0,
              pb: 3,
              boxShadow: 1,
              borderRadius: { xs: 0, sm: 0.6 },
              borderLeft: { xs: 0, sm: "1px solid #e0e0e0" },
              borderRight: { xs: 0, sm: "1px solid #e0e0e0" },
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              px: { xs: 1, lg: 14, xl: 21 },
            }}
            elevation={1}
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
                  {"İndirimdekiler"}
                </Typography>
              </Box>

              <Box sx={{ px: { xs: 3, sm: 8, md: 3, lg: 5 } }}>
                <ProductGrid
                  items={discounts.filter((discount, i) =>
                    discounts.length > 4 ? i < 4 : i < 2
                  )}
                />
              </Box>
            </Box>
          </Paper>
        )}

        <Paper
          component='section'
          className='responsiveSecondary'
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
          elevation={1}
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
                {"Son Eklenen Eğitimler"}
              </Typography>
            </Box>

            <Box sx={{ px: 4 }}>
              <ResponsiveGrid items={latest} slug={"egitimler"} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  ); */
}
