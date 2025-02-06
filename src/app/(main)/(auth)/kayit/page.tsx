"use client";

import { useState, useEffect, useMemo } from "react";
import { Button, Typography, TextField, FormControl } from "@mui/material";
import { validateEmail, validatePassword } from "@/utils/auth";

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
  { name: "phone", label: "Telefon", type: "tel" },
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
  const [formState, setFormState] = useState<
    Record<string, { value: string; error?: string }>
  >(
    Object.fromEntries(
      formFields.map((field) => [field.name, { value: "", error: undefined }])
    )
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isFormValid = useMemo(() => {
    return formFields.every((field) => {
      if (field.required && !formState[field.name].value) return false;
      return !formState[field.name].error;
    });
  }, [formState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState(
      (prev) =>
        name === "password" && prev.repassword.value === value
          ? {
              ...prev,
              [name]: { value, error: undefined },
              repassword: { value, error: undefined },
            }
          : { ...prev, [name]: { value, error: undefined } }
      /*  ({
      ...prev,
      [name]: { value, error: undefined }, // Clear error on change
    }) */
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

  const handleSignup = () => {
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

    setFormState(newFormState);

    if (!hasError) {
      // Submit the form
      console.log(
        "Form Submitted",
        Object.fromEntries(
          Object.entries(formState).map(([key, val]) => [key, val.value])
        )
      );
    }
  };

  return (
    <>
      <Typography component='h2' variant='h4'>
        Üye Kayıt
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
            value={formState[field.name].value}
            onChange={handleInputChange}
            onBlur={() => validateField(field.name)}
            required={field.required}
            error={submitted && !!formState[field.name].error}
            helperText={submitted && formState[field.name].error}
          />
        ))}
      </FormControl>

      <Button
        variant='contained'
        color='primary'
        sx={{ py: 0.8, width: "76%", textTransform: "none" }}
        disabled={!isFormValid && submitted}
        onClick={handleSignup}
      >
        Kayıt Ol
      </Button>
    </>
  );
};
