"use client";

//import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//import { bindActionCreators } from "redux";
//import { connect } from "react-redux";

import { Box, Button, Typography, TextField, FormControl } from "@mui/material";
import { validateEmail, validatePassword } from "@/utils/auth";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginPage() {
  return (
    <>
      <LoginPageClient />
    </>
  );
}

const LoginPageClient = () => {
  //const authenticated = useAppSelector((state) => state.account.authenticated);
  //const uid = useAppSelector((state) => state.account.uid);

  //const user = useAppSelector((state) => state.user.current);

  //const dispatch = useAppDispatch();

  const router = useRouter();

  /* useEffect(() => {
    const check = () => {
      if (authenticated) {
        if (!user && !!id) {
          getUser(id)
            .then((u) => {
              !u || dispatch(currentUserAct(u));
            })
            .catch();
        }
        router.push("/");
      }
    };
    check();
  }, [authenticated, user, id, router, dispatch]); */

  const [form, setForm] = useState<LoginFormProps>({ email: "", password: "" });
  const [disabled, setDisabled] = useState<boolean>(true);
  //const [error, setError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const inputName: string = target.name;
    const inputValue = target.value;

    const result = { ...form, [inputName]: inputValue };
    setForm(result);
    validate(result);
  };

  const validate = (formVal: LoginFormProps) => {
    setDisabled(
      !validateEmail(formVal.email) || !validatePassword(formVal.password)
    );
  };

  const handleForgotPassword = () => {};

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    /* loginAPI(form.email, form.password)
      .then((u) => {
        if (!!u) {
          localStorage.setItem("account", JSON.stringify(u));
          dispatch(loginAct(u));

          getUser(u.user.uid)
            .then((uu) => {
              //router.push("/");
              !uu || dispatch(currentUserAct(uu));
            })
            .catch();
          router.push("/");
        } else {
          console.log("hata");
          setDisabled(true);
        }
      })
      .catch((e) => console.log(e)); */
    // Handle login logic
  };

  const handleGoogleLogin = () => {
    //signInWithGoogle().catch().then();
    // showAlert();
  };

  const handleFacebookLogin = () => {
    //signInWithFacebook().catch().then();
  };

  return (
    <>
      <Typography component={"h2"} variant={"h4"} sx={{}}>
        {"Üye Girişi"}
      </Typography>

      <FormControl
        component={"form"}
        sx={{
          pt: 4,
          pb: 2,
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          "& .MuiInputBase-input": {
            px: 1,
          },
          "& .MuiTextField-root": {
            my: 1,
            width: "66%",
          },
        }}
        /* onSubmit={() => {
          return false;
        }} */
      >
        <TextField
          name='email'
          placeholder='E-posta Adresi'
          type='email'
          variant='standard'
          onChange={handleInputChange}
        />

        <TextField
          name='password'
          placeholder='Şifre'
          type='password'
          variant='standard'
          onChange={handleInputChange}
        />

        <Button
          sx={{
            //textTransform: "none",
            mt: -0.8,
            fontSize: 11,
            fontWeight: 500,
            py: 0.4,
            color: "#9e9e9e",
          }}
          onClick={handleForgotPassword}
        >
          {"Şİfremİ Unuttum"}
        </Button>

        <Button
          variant={"contained"}
          color='primary'
          sx={{
            py: 0.8,
            mt: 2,
            width: 76 / 100,
            textTransform: "none",
          }}
          disabled={disabled}
          onClick={handleLogin}
          type='submit'
        >
          Giriş Yap
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            marginTop: -0.2,
            fontSize: 13,
          }}
        >
          {"Henüz üye değil misin?"}
          <Button
            component='a'
            sx={{
              padding: 0.4,
              color: "#0000EE",
              fontWeight: "500",
              fontSize: 14,
              textTransform: "none",
            }}
            href='/kayit'
          >
            {"Kayıt Ol"}
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

/* const FORM_FIELDS = [
  { name: "email", placeholder: "E-posta Adresi", type: "email" },
  { name: "password", placeholder: "Şifre", type: "password" },
];
 <TextForm
        fields={FORM_FIELDS}
        onChange={handleInputChange}
        disabled={disabled}
      ></TextForm> */
