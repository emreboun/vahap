import { Suspense } from "@/components/suspense";
import { LoginPageClient } from "./LoginPageClient";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageClient />
    </Suspense>
  );
}

/* const FORM_FIELDS = [
  { name: "email", placeholder: "E-posta Adresi", type: "email" },
  { name: "password", placeholder: "Şifre", type: "password" },
];
 <TextForm
        fields={FORM_FIELDS}
        onChange={handleInputChange}
        disabled={disabled}
      ></TextForm> */
