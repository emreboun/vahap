"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Collapse,
  Alert,
} from "@mui/material";
import { validateEmail, validatePassword } from "@/utils/auth";
//import { login, sendPasswordResetEmail_ } from "@/api/firebase";
//import { getUser } from "@/api/firebase/user";
import { loginApi } from "@/app/admin/giris/actions";
import { login } from "@/api/user/auth";
import { useCart } from "@/components/cart/CartProvider";

type ErrorType = "email" | "password" | "main" | "" | undefined;

interface LoginFormProps {
  email: string;
  password: string;
}

export const LoginPageClient = ({
  side = false,
  onSubmit,
}: {
  side?: boolean;
  onSubmit?: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const { dispatch } = useCart();

  const [form, setForm] = useState<LoginFormProps>({ email: "", password: "" });
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  //const [error, setError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const inputName: string = target.name;
    const inputValue = target.value;

    const result = { ...form, [inputName]: inputValue };
    setForm(result);
    setErrors((prev) => prev.filter((p) => p !== inputName));
    setDisabled(false);
  };

  const validateField = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setErrors((prev) =>
      (name === "email" && !validateEmail(value)) ||
      (name === "password" && !validatePassword(value))
        ? [...prev.filter((p) => p !== name), name]
        : prev.filter((p) => p !== name)
    );
  };

  const handleForgotPassword = async () => {
    //await sendPasswordResetEmail_(form.email);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const result: ErrorType[] = [];

    if (!validateEmail(form.email)) {
      result.push("email");
    }
    if (!validatePassword(form.password)) {
      result.push("password");
    }

    if (result.length > 0) {
      setErrors(result);
      return;
    }
    let loginResult;
    try {
      loginResult = await login(form.email, form.password);
      if (loginResult) {
        await loginApi(loginResult.user);
        dispatch({
          type: "LOGIN",
          payload: loginResult.user.purchases.map(
            (purchase: any) => purchase.productId
          ),
        });
        localStorage.setItem("user", JSON.stringify(loginResult.user));

        if (!side) {
          if (redirectTo && redirectTo.startsWith("/")) {
            router.push(redirectTo);
          } else {
            router.push("/");
          }
        } else if (!!onSubmit) {
          onSubmit();
        }
      }
    } catch (error: unknown) {
      console.error(error);
      setDisabled(true);
      return;
    }

    /*  let userResult;
    if (loginResult) {
      try {
        userResult = await getUser(loginResult.user.uid);
        //localStorage.setItem("account", JSON.stringify(loginResult));
      } catch (error: unknown) {
        console.error(error);
        setDisabled(true);
        return;
      }
    }

    if (userResult) {
      localStorage.setItem("user", JSON.stringify(userResult));
      router.push("/");
    } */
  };

  /* const handleGoogleLogin = () => {
    signInWithGoogle().catch().then();
  };

  const handleFacebookLogin = () => {
    signInWithFacebook().catch().then();
  }; */

  return (
    <>
      <Typography
        component={"h2"}
        variant={"h4"}
        sx={{ opacity: 0.94, textAlign: "center" }}
      >
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
      >
        <TextField
          name='email'
          label='E-posta Adresi'
          type='email'
          onChange={handleInputChange}
          error={submitted && errors.includes("email")}
          helperText={
            submitted && errors.includes("email")
              ? "Geçersiz e-posta adresi."
              : ""
          }
          onBlur={validateField}
        />

        <TextField
          name='password'
          label='Şifre'
          type='password'
          onChange={handleInputChange}
          error={submitted && errors.includes("password")}
          helperText={
            submitted && errors.includes("password")
              ? "Parola en az 6 karakter içermelidir."
              : ""
          }
          onBlur={validateField}
        />

        <Button
          sx={{
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

        <Collapse in={disabled}>
          <Alert severity='error'>{"Giriş bilgileri hatalı."} </Alert>
        </Collapse>

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
          {"Giriş Yap"}
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          {"Henüz üye değil misin?"}
          <Link
            style={{
              padding: "3.2px 3.2px 0px",
              color: "#0000EE",
              fontWeight: "500",
              fontSize: 13,
              textTransform: "none",
            }}
            href='/kayit'
          >
            {"Kayıt Ol"}
          </Link>
        </Box>
      </FormControl>
    </>
  );
};
