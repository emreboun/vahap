import { Suspense } from "@/components/suspense";
import { LoginPageClient } from "./LoginPageClient";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageClient />
    </Suspense>
  );
}
