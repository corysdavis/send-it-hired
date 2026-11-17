import { z } from "zod";
import { STATUSES, WORK_MODES } from "./constants";

// Empty form fields arrive as "", so treat them as "not provided"
const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

const optionalText = z.preprocess(blankToUndefined, z.string().trim().max(200).optional());
const optionalPay = z.preprocess(blankToUndefined, z.coerce.number().int().min(0).max(10_000_000).optional());

export const applicationSchema = z
  .object({
    company: z.string().trim().min(1, "Company is required").max(120),
    title: z.string().trim().min(1, "Job title is required").max(120),
    status: z.enum(STATUSES),
    appliedAt: z.preprocess(blankToUndefined, z.coerce.date().optional()),
    postingUrl: z.preprocess(
      blankToUndefined,
      z.url({ protocol: /^https?$/, message: "Enter a full link starting with https://" }).optional(),
    ),
    location: optionalText,
    workMode: z.preprocess(blankToUndefined, z.enum(WORK_MODES).optional()),
    source: optionalText,
    payMin: optionalPay,
    payMax: optionalPay,
  })
  .refine((d) => d.payMin == null || d.payMax == null || d.payMin <= d.payMax, {
    message: "Max pay should be at least the min",
    path: ["payMax"],
  });

export type FormState = {
  errors?: Partial<Record<string, string[]>>;
  message?: string;
  values?: Record<string, string>;
};