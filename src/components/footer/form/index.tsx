//"use client";

import { Box, Typography } from "@mui/material";
import styles from "../footer.module.css";

/* import { useState } from "react";
import { Button, FormControl, InputBase } from "@mui/material"; */
import { SocialIcon } from "react-social-icons";
import { MailOutlineRounded } from "@mui/icons-material";

export const Form: React.FC = () => {
  /* const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEmail("");
  }; */

  return (
    <>
      {/* <FormControl
        component='form'
        className={styles.formControl}
        sx={{
          width: { xs: "auto", sm: "330px" },
          minWidth: { xs: "300px", sm: "330px" },
        }}
      >
        <InputBase
          value={email}
          //onFocus={() => setSearchFocus(true)}
          //onBlur={() => setSearchFocus(false)}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"E-Posta Adresiniz"}
          className={styles.inputBase}
        />
        <Button
          variant='contained'
          className={styles.button}
          onClick={handleSubmit}
          type='submit'
        >
          {"Gönder"}
        </Button>
      </FormControl> */}

      <Box
        component={"a"}
        href={"mailto:vahapsanal@hotmail.com"}
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
          //opacity: 0.9,
        }}
      >
        <MailOutlineRounded />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 16,
          }}
        >
          {"vahapsanal@hotmail.com"}
        </Typography>
      </Box>

      <div className={styles.socialIconContainer}>
        <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.youtube.com/@vahapsanal"}
          className={styles.socialIcon}
        />

        {/* <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          //url={"https://www.facebook.com/"}
          className={styles.socialIcon}
        /> */}

        <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.instagram.com/gmvahapsanal"}
          className={styles.socialIcon}
        />

        <SocialIcon
          target='_blank'
          rel='noopener noreferrer'
          url={"https://www.linkedin.com/in/vahap-sanal-a9543734b"}
          className={styles.socialIcon}
        />
      </div>
    </>
  );
};
