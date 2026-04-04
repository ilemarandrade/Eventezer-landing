"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitContact } from "@/app/actions/contact";
import {
  contactFormSchema,
  contactOrganizationOptions,
  type ContactFormValues,
} from "@/components/contact/contact-form-schema";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/ui/select";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  organizationType: "",
  message: "",
};

export function LandingContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = form;

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContact(data);

      if (result.ok) {
        toast.success(result.message);
        reset(defaultValues);
        return;
      }

      toast.error(result.message);

      if (result.fieldErrors) {
        const entries = Object.entries(result.fieldErrors) as [
          keyof ContactFormValues,
          string[] | undefined,
        ][];
        for (const [key, msgs] of entries) {
          const msg = msgs?.[0];
          if (msg) {
            setError(key, { type: "server", message: msg });
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="border-b border-border bg-muted/20 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ¿Dudas sobre el plan Business? Hablemos
          </h2>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Déjanos tus datos y un mensaje. Te responderemos con condiciones y
            siguientes pasos.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="mt-10">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
              <CardDescription>
                Respuesta orientativa en horario laboral.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="name"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        aria-invalid={Boolean(errors.name)}
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                  {errors.name?.message ? (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email corporativo</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@empresa.com"
                        aria-invalid={Boolean(errors.email)}
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                  {errors.email?.message ? (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType">
                    Tipo de organización
                  </Label>
                  <Controller
                    name="organizationType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        id="organizationType"
                        options={contactOrganizationOptions}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="¿Qué tipo de organización eres?"
                        aria-invalid={Boolean(errors.organizationType)}
                        disabled={isSubmitting}
                      />
                    )}
                  />
                  {errors.organizationType?.message ? (
                    <p className="text-xs text-destructive">
                      {errors.organizationType.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="message"
                        placeholder="Cuéntanos volumen aproximado, ciudades, integraciones…"
                        rows={4}
                        aria-invalid={Boolean(errors.message)}
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                  {errors.message?.message ? (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando…" : "Enviar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
