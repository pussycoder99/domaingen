import DomainGenerator from '@/components/domain-pilot/domain-generator';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
             <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
              DomainPilot
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Describe your idea, and we&apos;ll generate creative, available domain names for your next big thing.
          </p>
        </header>

        <DomainGenerator />
      </div>
      <footer className="text-center p-4 mt-16 border-t border-border">
          <p className="text-sm text-muted-foreground">
              Powered by AI. Ready for launch.
          </p>
      </footer>
    </main>
  );
}
