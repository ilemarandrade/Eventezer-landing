"use server";

import { contactFormSchema } from "@/components/contact/contact-form-schema";

export type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(input: unknown): Promise<ContactState> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Revisa los campos del formulario.",
      fieldErrors,
    };
  }

  await new Promise((r) => setTimeout(r, 1000));

  return {
    ok: true,
    message:
      "Gracias. Nuestro equipo revisará tu mensaje y te contactará pronto.",
  };
}
