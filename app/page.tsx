import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">SendItHired</h1>
      <p className="max-w-md text-muted-foreground">
        Track every application, follow up on time, and see what&apos;s working. Send it, track it, get hired.
      </p>
      <div className="flex gap-3">
        <Link href="/sign-up" className={buttonVariants()}>Get started</Link>
        <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>Sign in</Link>
      </div>
    </main>
  );
}