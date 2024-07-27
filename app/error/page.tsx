"use client";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-background px-4 md:px-6">
      <div className="container mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Oops!
          </h1>
          <p className="text-muted-foreground md:text-xl">
            It looks like something went wrong. We&apos;re working on it!
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Take me back home
        </Link>
      </div>
    </div>
  );
}
