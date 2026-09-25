'use client';

import { useState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { trackPixelEvent } from '@/lib/pixel';
import {
  contactFormSchema,
  contactOrganizationOptions,
  type ContactFormValues,
} from '@/components/contact/contact-form-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CustomSelect } from '@/components/ui/select';
import { useCountry } from '@/components/providers/country-provider';
import { COUNTRIES } from '@/lib/country';

const EMPTY_VALUES: Omit<ContactFormValues, 'message'> = {
  name: '',
  email: '',
  organizationType: '',
  dataConsent: false,
};

export function ContactForm({ defaultMessage = '' }: { defaultMessage?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasFiredContact = useRef(false);
  const { country } = useCountry();
  const { privacyPath } = COUNTRIES[country].legal;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { ...EMPTY_VALUES, message: defaultMessage },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (defaultMessage) setValue('message', defaultMessage);
  }, [defaultMessage, setValue]);

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lead-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // El consentimiento se valida en el cliente; el backend aún no recibe este campo.
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          organizationType: data.organizationType,
          message: data.message,
        }),
      });

      if (!res.ok) {
        toast.error('No pudimos enviar tu mensaje. Intenta de nuevo más tarde.');
        return;
      }

      trackPixelEvent('Lead');
      toast.success('Gracias. Nuestro equipo revisará tu mensaje y te contactará pronto.');
      reset({ ...EMPTY_VALUES, message: '' });
    } catch {
      toast.error('No pudimos enviar tu mensaje. Intenta de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        {/* <CardTitle>Activa tu implementación</CardTitle> */}
        <CardDescription>Respuesta orientativa en horario laboral.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                  onFocus={() => {
                    if (!hasFiredContact.current) {
                      hasFiredContact.current = true;
                      trackPixelEvent('Contact');
                    }
                  }}
                  {...field}
                />
              )}
            />
            {errors.name?.message && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  aria-invalid={Boolean(errors.email)}
                  disabled={isSubmitting}
                  {...field}
                />
              )}
            />
            {errors.email?.message && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizationType">¿Qué tipo de organizador eres?</Label>
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
                  placeholder="Selecciona una opción"
                  aria-invalid={Boolean(errors.organizationType)}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.organizationType?.message && (
              <p className="text-xs text-destructive">{errors.organizationType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="message"
                  placeholder="Cuéntanos volumen aproximado, ciudades, objetivos, etc…"
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  disabled={isSubmitting}
                  {...field}
                />
              )}
            />
            {errors.message?.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              name="dataConsent"
              control={control}
              render={({ field }) => (
                <label htmlFor="dataConsent" className="flex items-start gap-2.5 text-sm">
                  <input
                    id="dataConsent"
                    type="checkbox"
                    ref={field.ref}
                    name={field.name}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.dataConsent)}
                    aria-describedby={errors.dataConsent ? 'dataConsent-error' : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                  />
                  <span className="text-muted-foreground">
                    Autorizo a Eventezer a tratar mis datos personales para responder a mi solicitud
                    y contactarme sobre el servicio, conforme a la{' '}
                    <a
                      href={privacyPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      Política de Privacidad
                    </a>
                    .
                  </span>
                </label>
              )}
            />
            {errors.dataConsent?.message && (
              <p id="dataConsent-error" className="text-xs text-destructive">
                {errors.dataConsent.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando…' : 'Quiero empezar ahora'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
