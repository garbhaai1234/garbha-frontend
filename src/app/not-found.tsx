import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-radial-brand">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-6xl font-bold text-brand-600">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex gap-3">
          <Button href="/" variant="primary">
            Back home
          </Button>
          <Button href="/solutions" variant="secondary">
            View solutions
          </Button>
        </div>
      </Container>
    </section>
  );
}
