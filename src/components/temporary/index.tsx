import { Box, Typography } from "@mui/material";
import { RecommendSharp as ApprovedIcon } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";

export const TemporaryMessage: React.FC<{
  message: string;
  duration?: number;
}> = ({ message, duration = 8000 }) => {
  const [visible, setVisible] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Clear previous timeout if it exists
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set new timeout
      timeoutIdRef.current = setTimeout(() => {
        setVisible(false);
        timeoutIdRef.current = null;
      }, duration);
    }

    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [message, duration]);

  return (
    <>
      {visible && (
        <Box
          sx={{
            px: 2.5,
            py: 2,
            border: "1px solid",
            borderColor: "success.main",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            boxShadow: 1,
          }}
        >
          <ApprovedIcon sx={{ color: "success.main" }} />
          <Typography letterSpacing={-0.3} color={"primary.main"}>
            {message}
          </Typography>
        </Box>
      )}
    </>
  );
};
