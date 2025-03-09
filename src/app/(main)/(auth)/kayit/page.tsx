"use client";

import { useState, useMemo } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  Box,
  Alert,
  Collapse,
  Checkbox,
  ButtonBase,
  FormHelperText,
} from "@mui/material";
import { validateEmail, validatePassword } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/api/user/auth";
import { loginApi } from "@/app/admin/giris/actions";
import { formatTurkishGsmNumber, isValidTurkishIdNumber } from "../utils";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (
    value: string,
    form?: Record<string, { value: string; error?: string }>
  ) => string | undefined;
}

const formFields: FormField[] = [
  { name: "firstName", label: "Ad", type: "text", required: true },
  { name: "lastName", label: "Soyad", type: "text", required: true },
  {
    name: "email",
    label: "E-posta Adresi",
    type: "email",
    required: true,
    validate: (value) =>
      !validateEmail(value) ? "Geçersiz e-posta adresi" : undefined,
  },
  {
    name: "idNumber",
    label: "Tc Kimlik No",
    type: "text",
    required: false,
    validate: (value) =>
      !!value && !isValidTurkishIdNumber(value)
        ? "Geçersiz kimlik numarası."
        : undefined,
  },
  {
    name: "phone",
    label: "Telefon",
    type: "tel",
    validate: (value) =>
      !!value && !formatTurkishGsmNumber(value) ? "Geçersiz gsm numarası." : "",
  },
  {
    name: "password",
    label: "Şifre",
    type: "password",
    required: true,
    validate: (value) =>
      !validatePassword(value) ? "Şifre en az 6 haneli olmalı." : undefined,
  },
  {
    name: "repassword",
    label: "Şifre Tekrar",
    type: "password",
    required: true,
    validate: (value, formValues) =>
      value !== formValues?.password.value
        ? "Şifreler uyumlu olmalı."
        : undefined,
  },
];

export default function SignupForm() {
  return <SignupFormClient />;
}

const SignupFormClient = () => {
  const router = useRouter();

  const [formState, setFormState] = useState<
    Record<string, { value: string; error?: string }>
  >(
    Object.fromEntries(
      formFields.map((field) => [field.name, { value: "", error: undefined }])
    )
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  const [error, setError] = useState<boolean>(false);
  const isFormValid = useMemo(() => {
    return formFields.every((field) => {
      if (field.required && !formState[field.name].value) return false;
      return !formState[field.name].error;
    });
  }, [formState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prev) =>
      name === "password" && prev.repassword.value === value
        ? {
            ...prev,
            [name]: { value, error: undefined },
            repassword: { value, error: undefined },
          }
        : { ...prev, [name]: { value, error: undefined } }
    );
  };

  const validateField = (name: string) => {
    const field = formFields.find((f) => f.name === name);
    if (!field) return;

    const error = field.validate
      ? field.validate(formState[name].value, formState)
      : field.required && !formState[name].value
        ? "Bu alan zorunludur."
        : undefined;
    setFormState((prev) => ({
      ...prev,
      [name]: { ...prev[name], error },
    }));
  };

  const handleChecked = (e: any) => {
    setChecked(e.target.checked);
  };
  const handleSignup = async () => {
    setSubmitted(true);

    let hasError = false;

    const newFormState = { ...formState };

    formFields.forEach((field) => {
      const error = field.validate
        ? field.validate(formState[field.name].value, formState)
        : field.required && !formState[field.name].value
          ? "Bu alan zorunludur."
          : undefined;
      if (error) hasError = true;
      newFormState[field.name].error = error;
    });
    if (!hasError) {
      // Submit the form
      let signUpResult;
      try {
        signUpResult = await signup({
          email: formState.email.value,
          password: formState.password.value,
          phone: formatTurkishGsmNumber(formState.phone.value) ?? "",
          firstName: formState.firstName.value,
          lastName: formState.lastName.value,
          idNumber: formState.idNumber.value,
        });
      } catch (e: any) {
        console.log(e);
        setError(true);
        return;
      }
      if (!signUpResult) {
        setError(true);
        return;
      } else {
        await loginApi(signUpResult);
        localStorage.setItem("user", JSON.stringify(signUpResult));
        router.push("/");
      }
    } else {
      setFormState(newFormState);
    }
  };

  return (
    <>
      <Typography component='h2' variant='h4' sx={{ opacity: 0.94 }}>
        {"Üye Kayıt"}
      </Typography>

      <FormControl
        sx={{
          pt: 4,
          pb: 2,
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          "& .MuiInputBase-input": { px: 1 },
          "& .MuiTextField-root": { my: 1, width: "66%" },
          "& .MuiFormLabel-asterisk": { color: "error.main" },
        }}
      >
        {formFields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            variant='standard'
            defaultValue={""}
            onChange={handleInputChange}
            onBlur={() => validateField(field.name)}
            required={field.required}
            error={submitted && !!formState[field.name].error}
            helperText={submitted && formState[field.name].error}
          />
        ))}

        <Box
          sx={{
            "& .MuiFormHelperText-root": {
              pt: 0,
              pl: 2,
              m: 0,
              bgcolor: "background.paper",
            },
          }}
        >
          <Box
            sx={{
              color: "#6b707f",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox name='checked' value={checked} onChange={handleChecked} />
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href={"/uyelik-sozlesmesi"} title={""} passHref>
                <ButtonBase
                  sx={{
                    color: "#007bff",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {"Üyelik Sözleşmesi"}
                </ButtonBase>
              </Link>

              <p>{"'ni kabul ediyorum."}</p>
            </span>
          </Box>
          <FormHelperText
            sx={{
              display: submitted && !checked ? "block" : "none",
              py: 0,
              mt: -0.5,
              color: "error.main",
            }}
          >
            {"Seçim zorunlu."}
          </FormHelperText>
        </Box>
      </FormControl>

      <Collapse in={error}>
        <Alert
          severity='error'
          sx={{
            py: 0.2,
            mx: "auto",
            mb: 2,
            width: "76%",
            boxShadow: 1,
            border: "1px solid rgb(128,128,128,0.05)",
          }}
        >
          {"Bu hesap zaten mevcut."}
        </Alert>
      </Collapse>

      <Button
        variant='contained'
        color='primary'
        sx={{
          py: 0.8,
          width: "76%",
          textTransform: "none",
          "&hover": { boxShadow: 4 },
        }}
        disabled={!isFormValid && submitted}
        onClick={handleSignup}
      >
        {"Kayıt Ol"}
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          fontSize: 13,
        }}
      >
        {"Zaten üye misin?"}
        <Link
          style={{
            padding: "3.2px 3.2px 0px",
            color: "#0000EE",
            fontWeight: "500",
            fontSize: 13,
            textTransform: "none",
          }}
          href={"/giris"}
        >
          {"Giriş Yap"}
        </Link>
      </Box>
    </>
  );
};
