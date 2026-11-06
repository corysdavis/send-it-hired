import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export default function BoardPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading...</p>}>
      <Board />
    </Suspense>
  );
}

async function Board() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Welcome, {session.user.name}</h1>
      <p className="text-muted-foreground">Your board is coming soon.</p>
      <SignOutButton />
    </main>
  );
}