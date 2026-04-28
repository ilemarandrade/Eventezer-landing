# Plan: Mejoras para aprobación de Google AdSense en Eventezer Landing

## Contexto

La landing de Eventezer está bajo revisión de Google AdSense. Para obtener aprobación, Google exige:
- Contenido original y suficiente (mínimo varias páginas con texto real)
- Propósito claro del sitio y audiencia definida
- Páginas institucionales legítimas (Sobre Nosotros, Privacidad — esta ya existe)
- Navegación clara y múltiples secciones de contenido

Las tres mejoras a implementar son:
1. **Sección de perfiles de clientes** en la landing (quién usa Eventezer)
2. **Sistema de blog** con estructura para 10-15 posts estáticos (MDX)
3. **Página "Sobre Nosotros"** (`/sobre-nosotros`)

---

## Archivos críticos a modificar / crear

| Archivo | Acción |
|---------|--------|
| `app/page.tsx` | Agregar el componente `<LandingPersonas />` entre Segments y Pricing |
| `app/layout.tsx` | Añadir "Blog" y "Sobre Nosotros" a la navegación global si aplica |
| `components/landing/landing-navbar.tsx` | Agregar links "Blog" y "Sobre Nosotros" |
| `components/landing/landing-footer.tsx` | Agregar links "Blog" y "Sobre Nosotros" |
| `app/sitemap.ts` | Incluir `/blog`, `/sobre-nosotros` y cada slug de post |
| `next.config.ts` | Habilitar soporte MDX con `@next/mdx` |
| `package.json` | Agregar dependencias MDX |

**Nuevos archivos a crear:**

| Archivo | Propósito |
|---------|-----------|
| `components/landing/landing-personas.tsx` | Sección de perfiles de clientes en landing |
| `app/blog/page.tsx` | Índice del blog |
| `app/blog/[slug]/page.tsx` | Página individual de post |
| `components/blog/post-card.tsx` | Card de preview de post para el índice |
| `lib/blog.ts` | Utilidades para leer y procesar posts MDX |
| `content/blog/*.mdx` | 2-3 posts de ejemplo para establecer la estructura |
| `app/sobre-nosotros/page.tsx` | Página institucional "Sobre Nosotros" |

---

## Paso 1: Sección de Perfiles de Clientes (Landing)

**Archivo:** `components/landing/landing-personas.tsx`

Nueva sección entre `<LandingSegments />` y `<LandingPricing />` en `app/page.tsx`.

Layout: dos columnas — "Para personas naturales" y "Para organizaciones", con cards para:

**Personas naturales:**
- Reunión pequeña o cumpleaños (icono: Users)
- Boda o evento privado (icono: Heart)
- Concierto o show independiente (icono: Music)
- Clase, taller o curso (icono: GraduationCap)

**Organizaciones:**
- Empresa con eventos corporativos (icono: Building2)
- Productora o agencia de eventos (icono: Briefcase)
- Asociación o comunidad (icono: Globe)
- Festival o evento masivo (icono: Mic2)

Cada card: ícono Lucide + nombre + descripción corta (1 línea). Estilo coherente con las demás secciones de la landing (mismo patrón de `landing-segments.tsx`).

---

## Paso 2: Sistema de Blog Estático (MDX)

### 2a. Configuración MDX
Instalar: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-gfm`, `gray-matter`

Actualizar `next.config.ts` para habilitar MDX con `withMDX`.

### 2b. Estructura de contenido
Los posts viven en `content/blog/[slug].mdx` con frontmatter:
```mdx
---
title: "Título del post"
description: "Descripción corta para SEO y cards"
date: "2025-01-15"
category: "Tutorial" | "Tips" | "Noticias" | "Guías"
readingTime: "5 min"
---

Contenido del post en Markdown...
```

### 2c. Utilidades: `lib/blog.ts`
- `getAllPosts()` → lee todos los MDX, retorna metadata ordenada por fecha
- `getPostBySlug(slug)` → retorna metadata + contenido de un post

### 2d. Rutas del blog
- `app/blog/page.tsx` — lista todos los posts con `PostCard`
- `app/blog/[slug]/page.tsx` — renderiza el post completo con metadata SEO

### 2e. Posts de ejemplo (2-3 para la estructura)
Crear como contenido real (no placeholder):
1. `como-organizar-tu-primer-evento.mdx` — guía paso a paso
2. `como-calcular-el-precio-de-tus-entradas.mdx` — fórmula + consejos
3. `check-in-digital-vs-fisico.mdx` — comparativa con ventajas/desventajas

### 2f. Navegación
- Agregar link "Blog" en `landing-navbar.tsx` → `/blog`
- Agregar link "Blog" en `landing-footer.tsx`
- Actualizar `app/sitemap.ts` para incluir `/blog` y todos los slugs

---

## Paso 3: Página "Sobre Nosotros"

**Archivo:** `app/sobre-nosotros/page.tsx`

Secciones:
1. **Hero corto** — "Somos Eventezer" + tagline de misión
2. **Nuestra misión** — párrafo explicando por qué existe Eventezer
3. **Qué ofrecemos** — resumen de la plataforma (puede reutilizar copy de la landing)
4. **Contacto** — link al formulario o email de contacto

Agregar link en navbar y footer. El contenido puede ser placeholder breve que el usuario edita después.

---

## Paso 4: Prompt y temas recomendados para generar posts

### Prompt para ChatGPT / Claude:
```
Actúa como experto en organización de eventos y marketing digital.
Escribe un post de blog en español para Eventezer, una plataforma de
ticketing y gestión de eventos. El post debe tener entre 600-900 palabras,
incluir un intro, 3-5 secciones con subtítulos H2, y un cierre con CTA.
Tono: profesional pero cercano. Audiencia: organizadores de eventos
latinoamericanos, desde principiantes hasta profesionales.

Tema: [INSERTAR TEMA]
```

### 15 temas recomendados:
1. Cómo organizar tu primer evento desde cero (guía completa)
2. Cómo calcular el precio correcto para tus entradas
3. Check-in digital vs. físico: ventajas y cuándo usar cada uno
4. 5 errores comunes al organizar un concierto (y cómo evitarlos)
5. Gestión de aforo: cómo manejar la capacidad máxima de tu evento
6. Cómo armar un equipo para tu evento: roles y responsabilidades
7. Marketing digital para eventos: guía rápida para llenar tu aforo
8. Eventos corporativos: cómo gestionar invitados VIP y accesos especiales
9. Festivales musicales: logística, entradas y control de acceso
10. Bodas y eventos privados: control de lista de invitados paso a paso
11. Cómo usar analíticas para mejorar tus próximos eventos
12. Lista de verificación para el día del evento (checklist descargable)
13. Tendencias en tecnología para eventos en 2025
14. Cómo recuperarse de un evento con baja venta de entradas
15. Agencias de eventos: cómo escalar operaciones sin perder el control

---

## Verificación

1. `npm run dev` en puerto 3010
2. Navegar a `/blog` → ver índice con cards de posts
3. Navegar a `/blog/como-organizar-tu-primer-evento` → ver post completo
4. Navegar a `/sobre-nosotros` → ver página institucional
5. Verificar que la sección de perfiles aparece en la landing entre Segments y Pricing
6. Revisar `http://localhost:3010/sitemap.xml` → debe incluir todas las URLs nuevas
7. Revisar navegación en navbar y footer: links "Blog" y "Sobre Nosotros" funcionando
