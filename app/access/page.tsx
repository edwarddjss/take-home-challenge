import { redirect } from "next/navigation";
import { AccessGate } from "@/components/ui/access-gate";

type AccessPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AccessPage({ searchParams }: AccessPageProps) {
  if (!process.env.ACCESS_CODE) {
    redirect("/");
  }

  const params = await searchParams;

  return (
    <main className="access-screen">
      <AccessGate nextPath={params.next || "/"} />
    </main>
  );
}
