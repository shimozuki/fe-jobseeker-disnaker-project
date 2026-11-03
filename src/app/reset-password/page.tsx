import ResetPasswordClient from "./reset-password-client";

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = await searchParams;
  return <ResetPasswordClient token={typeof token === "string" ? token : ""} />;
}
