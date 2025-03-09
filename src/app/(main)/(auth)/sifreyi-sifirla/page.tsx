import { getPasswordResetToken } from "@/api/user/email";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

type SearchParams = Promise<{ token: string }>;

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;
  const passToken = await getPasswordResetToken(token);
  if (!passToken || passToken.expiresAt < new Date(Date.now())) {
    redirect("/");
  }
  return (
    <>
      <ResetPasswordForm token={passToken} />
    </>
  );
}
