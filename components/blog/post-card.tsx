import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full border-border bg-card transition-shadow group-hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-accent px-2 py-0.5 font-medium text-accent-foreground">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <CardTitle className="mt-2 text-lg leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.description}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
