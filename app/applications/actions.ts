"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { applicationSchema, type FormState } from "@/lib/validation";

export async function createApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser();

  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = applicationSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Please fix the highlighted fields.",
      values: raw,
    };
  }

  const data = parsed.data;

  // New cards go to the bottom of their status column
  const position = await prisma.application.count({
    where: { userId: user.id, status: data.status },
  });

  await prisma.application.create({
    data: {
      ...data,
      userId: user.id,
      position,
      statusChanges: { create: { fromStatus: null, toStatus: data.status } },
    },
  });

  revalidatePath("/applications");
  redirect("/applications");
}