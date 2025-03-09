"use client";
import { resetUserPassword } from "@/api/user/account";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
type ErrorType = "password" | "repassword";

const ResetPasswordForm: React.FC<any> = ({ token }) => {
  const { userId } = token;
  const [form, setForm] = useState<{ password: string; repassword: string }>({
    repassword: "",
    password: "",
  });
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
  const onSubmit = async () => {
    try {
      setSubmitted(true);
      const list: ErrorType[] = [];
      if (form.password !== form.repassword) list.push("repassword");
      if (form.password.length < 6) list.push("password");
      if (list.length > 0) {
        setErrors(list);
        return;
      }

      await resetUserPassword(userId, form.password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography
        component={"h2"}
        variant={"h4"}
        sx={{ opacity: 0.94, textAlign: "center" }}
      >
        {"Şifre Değişikliği"}
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
          //onBlur={validateField}
        />

        <TextField
          name='repassword'
          label='Şifre Tekrar'
          type='password'
          onChange={handleInputChange}
          error={submitted && errors.includes("repassword")}
          helperText={
            submitted && errors.includes("repassword")
              ? "Şifreler uyumlu olmalı."
              : ""
          }
          //onBlur={validateField}
        />

        <Button
          variant='contained'
          color='primary'
          sx={{
            mt: 1,
            py: 0.8,
            width: "76%",
            textTransform: "none",
            "&hover": { boxShadow: 4 },
          }}
          disabled={errors.length > 0 && submitted}
          onClick={onSubmit}
        >
          {"Onayla"}
        </Button>
      </FormControl>
    </>
  );
};
export default ResetPasswordForm;
