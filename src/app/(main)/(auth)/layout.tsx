import { Box, Paper } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          py: { xs: 2, sm: 4, md: 8 },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            px: 1,
            py: 8,
            flexGrow: 1,
            maxWidth: 500,
            border: 1,
            borderColor: "lightgrey",
            borderRadius: 1.4,
          }}
        >
          {children}
          {/* <OrSepator />

          <SocialLogin /> */}
        </Paper>
      </Box>
    </>
  );
}

/* const OrSepator = () => (
  <Box
    component='span'
    sx={{
      display: "flex",
      alignItems: "center",
      px: 4,
      py: 3,
    }}
  >
    <Box
      component={"span"}
      sx={{
        bgcolor: "#335a20",
        flexGrow: 1,
        height: "2px",
        opacity: 0.5,
      }}
    />
    <div
      style={{
        color: "grey",
        fontWeight: "500",
        fontSize: 13,
        marginLeft: 4,
        marginRight: 4,
      }}
    >
      {"YA DA"}
    </div>
    <Box
      component={"span"}
      sx={{
        bgcolor: "#335a20",
        flexGrow: 1,
        height: "2px",
        opacity: 0.5,
      }}
    />
  </Box>
);

const SocialLogin = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", px: 6 }}>
      <Button
      //onClick={handleGoogleLogin}
      >
        <Image src='/logo/google-logo.png' alt='' height={40} width={40} />
      </Button>

      <Button
      //onClick={handleFacebookLogin}
      >
        <Image src='/logo/facebook-logo.png' alt='' height={40} width={40} />
      </Button>
    </Box>
  );
};
 */
