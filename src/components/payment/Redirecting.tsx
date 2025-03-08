import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Redirecting: React.FC = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(2);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      router.push("/egitimler");
    }
  }, [counter, router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box sx={{ position: "relative", height: 47, width: 40 }}>
        <CircularProgress />
        <Typography
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
          color={"primary"}
        >
          {counter}
        </Typography>
      </Box>
      <Typography>{"Eğitimler sayfasına yönlendiriliyor..."}</Typography>
    </Box>
  );
};
