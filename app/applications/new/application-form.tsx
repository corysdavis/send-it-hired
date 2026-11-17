"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createApplication } from "../actions";
import type { FormState } from "@/lib/validation";
import { STATUSES, STATUS_LABELS, WORK_MODES, WORK_MODE_LABELS, SOURCES } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ApplicationForm({ today }: { today: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(createApplication, {});
  const v = state.values ?? {};
  const err = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" required defaultValue={v.company} error={err.company} />
        <Field label="Job title" name="title" required defaultValue={v.title} error={err.title} />

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" defaultValue={v.status ?? "APPLIED"} className={selectClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <Field label="Date applied" name="appliedAt" type="date" defaultValue={v.appliedAt ?? today} error={err.appliedAt} />

        <div className="sm:col-span-2">
          <Field
            label="Job posting link"
            name="postingUrl"
            type="url"
            placeholder="https://..."
            defaultValue={v.postingUrl}
            error={err.postingUrl}
          />
        </div>

        <Field label="Location" name="location" placeholder="Norfolk, VA" defaultValue={v.location} error={err.location} />

        <div className="space-y-2">
          <Label htmlFor="workMode">Work setup</Label>
          <select id="workMode" name="workMode" defaultValue={v.workMode ?? ""} className={selectClass}>
            <option value="">—</option>
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>{WORK_MODE_LABELS[m]}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Where you found it</Label>
          <Input id="source" name="source" list="sources" defaultValue={v.source} placeholder="LinkedIn, Indeed..." />
          <datalist id="sources">
            {SOURCES.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Pay min ($/yr)" name="payMin" type="number" defaultValue={v.payMin} error={err.payMin} />
          <Field label="Pay max ($/yr)" name="payMax" type="number" defaultValue={v.payMax} error={err.payMax} />
        </div>
      </div>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save application"}
        </Button>
        <Link href="/applications" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  error?: string[];
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={!!error}
      />
      {error && <p className="text-sm text-red-600">{error[0]}</p>}
    </div>
  );
}