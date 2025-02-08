"use client";

import styles from "./login.module.css";
import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { Button, TextField, FormControl } from "@mui/material";
export type FormProps = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (form: FormProps) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const inputName: string = target.name;
    const inputValue = target.value;

    const result = { ...form, [inputName]: inputValue };
    setForm(result);
  };

  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(length, length);
    }
  }, [inputRef]);

  const handleLogin = (e: MouseEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      {/* <Typography
        component={"h2"}
        variant={"h4"}
        sx={{ textAlign: "center", mb: 3 }}
      >
        {"Üye Girişi"}
      </Typography> */}

      <FormControl component={"form"} className={styles.form}>
        <TextField
          inputRef={inputRef}
          name='email'
          label={"E-posta"}
          type='text'
          variant='standard'
          onChange={handleInputChange}
          color='secondary'
        />

        <TextField
          value={form.password}
          name='password'
          label={"Şifre"}
          type='password'
          variant='standard'
          onChange={handleInputChange}
          color='secondary'
        />

        <Button
          variant={"contained"}
          className={styles.submitButton}
          onClick={handleLogin}
          type='submit'
          sx={{ color: "#fff", fontWeight: 600 }}
          color='secondary'
        >
          {"Giriş Yap"}
        </Button>
      </FormControl>
    </>
  );
};
