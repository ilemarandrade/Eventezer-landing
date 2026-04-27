import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { APP_REGISTER_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Eventezer Blog`,
    description: post.description,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-background">
        <article className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al blog
          </Link>

          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground text-xs">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readingTime} de lectura</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>

          {post.coverImage && (
            <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover object-top"
                sizes="(min-width: 672px) 672px, 100vw"
                priority
              />
            </div>
          )}

          <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-lg font-semibold text-foreground">
              ¿Listo para organizar tu próximo evento?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Crea tu cuenta gratis en Eventezer y empieza a vender entradas hoy.
            </p>
            <a
              href={APP_REGISTER_URL}
              className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Crear mi evento gratis
            </a>
          </div>
        </article>
      </main>
      <LandingFooter />
    </>
  );
}
