import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { STATUS_LABELS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ApplicationsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Link href="/applications/new" className={buttonVariants()}>
          Add application
        </Link>
      </div>
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <ApplicationsTable />
      </Suspense>
    </main>
  );
}

async function ApplicationsTable() {
  const user = await requireUser();

  const applications = await prisma.application.findMany({
    where: { userId: user.id, archivedAt: null },
    orderBy: [{ appliedAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
  });

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <p className="font-medium">No applications yet</p>
        <p className="text-sm text-muted-foreground">Add your first one to start tracking.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">
              {app.postingUrl ? (
                <a href={app.postingUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {app.company}
                </a>
              ) : (
                app.company
              )}
            </TableCell>
            <TableCell>{app.title}</TableCell>
            <TableCell>
              <Badge variant="secondary">{STATUS_LABELS[app.status]}</Badge>
            </TableCell>
            <TableCell>{app.appliedAt ? formatDate(app.appliedAt) : "—"}</TableCell>
            <TableCell>{app.source ?? "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// dates are stored without a time so have to display them in UTC to avoid showing the day before
function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}