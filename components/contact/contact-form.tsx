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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CustomSelect } from '@/components/ui/select';

export function ContactForm({ defaultMessage = '' }: { defaultMessage?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasFiredContact = useRef(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', organizationType: '', message: defaultMessage },
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
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error('No pudimos enviar tu mensaje. Intenta de nuevo más tarde.');
        return;
      }

      trackPixelEvent('Lead');
      toast.success('Gracias. Nuestro equipo revisará tu mensaje y te contactará pronto.');
      reset({ name: '', email: '', organizationType: '', message: '' });
    } catch {
      toast.error('No pudimos enviar tu mensaje. Intenta de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Activa tu implementación</CardTitle>
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
                  {...field}
                />
              )}
            />
            {errors.email?.message && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizationType">Tipo de organización</Label>
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
                  placeholder="Cuéntanos volumen aproximado, ciudades, integraciones…"
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando…' : 'Quiero empezar ahora'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
