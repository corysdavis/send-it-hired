import { Suspense } from "react";
import { requireUser } from "@/lib/session";
import { ApplicationForm } from "./application-form";

export default function NewApplicationPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Add application</h1>
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <GuardedForm />
      </Suspense>
    </main>
  );
}

async function GuardedForm() {
  await requireUser();
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }); // YYYY-MM-DD
  return <ApplicationForm today={today} />;
}