import VerifyEmailClient from "./verify-email-client";

export default async function VerifyEmailPage({
  searchParams,
}: PageProps<"/verify-email">) {
  const { token } = await searchParams;
  return <VerifyEmailClient token={typeof token === "string" ? token : ""} />;
}
