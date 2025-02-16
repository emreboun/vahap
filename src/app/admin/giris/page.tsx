"use client";
import { FormProps, LoginForm } from "@/components/admin/login";
import { Box, Paper } from "@mui/material";
//import { login } from "@/api/firebase";
import { useRouter } from "next/navigation";

import { loginApi } from "./actions";
import { login } from "@/api/user/auth";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (form: FormProps) => {
    try {
      const result = await login(form.email, form.password);
      if (result) {
        await loginApi(result.user);
      }

      //localStorage.setItem("token", result.user.uid);

      /* const cookieStore = await cookies();
      cookieStore.set("token", result.user.uid); */
      if (!!result) {
        router.push("/admin");
      }
    } catch (e: unknown) {
      console.error(e);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            mt: { xs: 4, sm: 6, md: 8 },
            minWidth: { xs: "90%", sm: "70%", md: 520 },
            flex: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
            boxShadow: 1,
            border: "1px solid rgb(128,128,128,0.2)",
            pt: 8,
            pb: 8,
            bgcolor: "primary.main",
          }}
          elevation={0}
        >
          <LoginForm onSubmit={handleLogin} />
        </Paper>
      </Box>
    </>
  );
}
