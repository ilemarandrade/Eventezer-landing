import { z } from "zod";

export const ORGANIZATION_TYPES = [
  "esporadico",
  "regular",
  "profesional",
  "enterprise",
] as const;

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number];

export const contactFormSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  organizationType: z
    .string()
    .min(1, "Selecciona un tipo")
    .refine(
      (v) => (ORGANIZATION_TYPES as readonly string[]).includes(v),
      { message: "Selecciona un tipo de organización" },
    ),
  message: z.string().min(10, "Cuéntanos un poco más"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactOrganizationOptions: {
  value: "" | OrganizationType;
  label: string;
}[] = [
  { value: "", label: "Selecciona…" },
  { value: "esporadico", label: "Esporádico" },
  { value: "regular", label: "Regular" },
  { value: "profesional", label: "Profesional" },
  { value: "enterprise", label: "Enterprise / agencia" },
];
