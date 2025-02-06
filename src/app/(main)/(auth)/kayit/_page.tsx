"use client";

//import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { validateEmail, validatePassword } from "@/utils/auth";

interface SignupFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repassword: string;
  phone: string;
}
interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  validate?: (
    value: string,
    form?: Record<string, string>
  ) => string | undefined; // Validation function
  /*  helperText?:
    | string
    | ((value: string, form?: Record<string, string>) => string); // Helper text or function */
}

export default function SignupForm() {
  return (
    <>
      <SignupFormClient />
    </>
  );
}
const SignupFormClient = () => {
  const [form, setForm] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
  });

  const [disabled, setDisabled] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const { name, value } = target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) =>
      name === "password" && form.repassword === value
        ? { ...prev, [name]: undefined, repassword: undefined }
        : { ...prev, [name]: undefined }
    );
  };

  //const handleForgotPassword = () => {};
  const formFields: FormField[] = [
    { name: "firstName", label: "Ad", type: "text", required: true },
    { name: "lastName", label: "Soyad", type: "text", required: true },
    {
      name: "email",
      label: "E-posta Adresi",
      type: "email",
      required: true,
      validate: (value) => {
        if (
          !validateEmail(value)
          //!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          return "Geçersiz e-posta adresi";
        }
        return undefined;
      },
      //helperText: "Geçersiz e-posta adresi",
    },
    { name: "phone", label: "Telefon", type: "tel" },
    {
      name: "password",
      label: "Şifre",
      type: "password",
      required: true,
      validate: (value, formValues) =>
        !validatePassword(value) ? "Şifre en az 6 haneli olmalı." : "",
    },
    {
      name: "repassword",
      label: "Şifre Tekrar",
      type: "password",
      required: true,
      validate: (value, formValues) => {
        if (value !== formValues?.password) {
          return "Şifreler uyumlu olmalı.";
        }
        return undefined;
      },
      /* helperText: (value, formValues) =>
        value !== formValues?.password ? "Şifreler uyumlu olmalı." : "", */
    },
  ];

  const handleSignup = () => {
    //const { firstName, lastName, email, password, repassword, phone } = form;
    setSubmitted(true);
    const result: any = {};
    formFields
      .filter((field) => !!field.validate)
      .forEach((field) => {
        result[field.name] = field.validate!(form[field.name], form);
      });
    setErrors(result);
    /*  const valid = validate(form);
    if (!valid) {
      return;
    } */
    /* signup(email, password)
      .then((u) => {
        if (!!u) {
          dispatch(loginAct(u));
          const { uid, displayName } = u.user;
          const user: User = {
            id: uid,
            email: email,
            //firstName: firstName,
            //lastName: lastName,
            phoneNumber: phone,
            likes: [],
            notifProducts: [],
            bookmarkProducts: [],
            orders: [],
            addresses: [], //new Map<string, Address>(),
            mainAddress: undefined,
          };

          createUser(uid, email, phone)
            .then(() => {
              dispatch(currentUserAct(user));
            })
            .catch();
          router.push("/");
        } else {
          console.log("asd");
          setDisabled(true);
        }
      })
      .catch((e: unknown) => console.log(e)); */
    // Handle login logic
  };

  return (
    <>
      <Typography component={"h2"} variant={"h4"} sx={{}}>
        {"Üye Kayıt"}
      </Typography>

      <FormControl
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
          "& .MuiFormLabel-asterisk": {
            color: "error.main",
          },
        }}
      >
        {formFields.map((field, i) => (
          <TextField
            key={field.name}
            // key={i}
            name={field.name}
            label={field.label}
            type={field.type}
            variant='standard'
            onChange={handleInputChange}
            required={field.required}
            error={submitted && !!errors[field.name]} // Convert error message to boolean
            helperText={
              submitted && errors[field.name]
              /*  ? typeof field.helperText === "function"
                  ? field.helperText(form[field.name], form)
                  : field.helperText
                : undefined */
            }
            {...(field.validate && {
              onBlur: () => {
                const { name }: { name: string } = field;
                const validationError = field.validate!(form[name], form);
                setErrors((prev) => ({ ...prev, [name]: validationError }));
              },
            })}
          />
        ))}
      </FormControl>

      <Button
        variant={"contained"}
        color='primary'
        sx={{
          py: 0.8,
          width: 76 / 100,
          textTransform: "none",
        }}
        //disabled={disabled}
        onClick={handleSignup}
      >
        {"Kayıt Ol"}
      </Button>
    </>
  );
};
