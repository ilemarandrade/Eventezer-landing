import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata: Metadata = {
  title: "Blog · Eventezer",
  description:
    "Tutoriales, consejos y guías para organizadores de eventos. Aprende a gestionar entradas, controlar accesos y escalar tus operaciones.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Blog de Eventezer
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tutoriales, consejos y guías para organizar eventos con más
              eficiencia y menos fricción.
            </p>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Próximamente nuevos artículos.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
