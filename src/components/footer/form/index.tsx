import styles from "../footer.module.css";

import { Box, Typography } from "@mui/material";
import { SocialIcon } from "react-social-icons";
import { MailOutlineRounded } from "@mui/icons-material";

export const Form: React.FC = () => {
  return (
    <>
      <Box
        component={"a"}
        href={"mailto:gmvahap@gmail.com"}
        sx={{
          bgcolor: "primary.main",
          borderRadius: 1,
          px: 1.2,
          py: 0.4,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        <MailOutlineRounded />

        <Typography
          sx={{}}
          fontSize={{ xs: 15, sm: 16 }}
          fontFamily={"Lexend"}
          letterSpacing={-0.2}
        >
          {"gmvahap@gmail.com"}
        </Typography>
      </Box>

      <div className={styles.socialIconContainer}>
        <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.youtube.com/@vahapsanal"}
          className={styles.socialIcon}
        />

        <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.instagram.com/gmvahapsanal"}
          className={styles.socialIcon}
        />

        {/* <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.linkedin.com/in/vahap-sanal-a9543734b"}
          className={styles.socialIcon}
        /> */}
      </div>
    </>
  );
};
