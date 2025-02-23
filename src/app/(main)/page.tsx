import { getLatestThreeLectures, getThreeLectures } from "@/api/lectures";
import styles from "./page.module.css";
import { Box, Divider, Paper, Typography } from "@mui/material";
import ResponsiveGrid from "@/components/grid";
import { getDiscountedProducts } from "@/api/products";
import ProductGrid from "@/components/grid/ProductGrid";

export default async function Home() {
  const three = await getThreeLectures();
  const latest = await getLatestThreeLectures();
  const discounts = await getDiscountedProducts();
  return (
    <>
      <Box
        sx={{
          whiteSpace: "break-spaces",
          fontFamily: "Montserrat, Lexend, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 4, md: 8 },
        }}
      >
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
                {"Öne Çıkanlar"}
              </Typography>
            </Box>

            {/* <Divider sx={{ display: { xs: "none", sm: "block" }, mx: 4 }} /> */}

            <Box sx={{ px: 4 }}>
              <ResponsiveGrid items={three} slug={"egitimler"} />
            </Box>
          </Box>
        </Paper>

        {discounts?.length > 0 && (
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
                  {"İndirimdekiler"}
                </Typography>
              </Box>

              <Box sx={{ px: { xs: 3, sm: 8, md: 3, lg: 5 } }}>
                <ProductGrid items={discounts} />
              </Box>
            </Box>
          </Paper>
        )}

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
  );
}
