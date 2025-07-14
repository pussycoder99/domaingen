import DomainFinder from '@/components/domain-pilot/domain-finder';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50/20 via-white to-purple-50/20 dark:from-slate-900/50 dark:via-background dark:to-purple-900/20 text-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-24">
        <header className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Domain Generation
          </Badge>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
            Let&apos;s Find Your Perfect Domain
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            Answer a few simple questions and we&apos;ll generate hundreds of domain suggestions across all popular TLDs, tailored specifically for your business.
          </p>
        </header>

        <DomainFinder />
      </div>
      <footer className="text-center p-4 mt-16">
          <p className="text-sm text-muted-foreground">
              Powered by AI. Ready for launch.
          </p>
      </footer>
    </main>
  );
}
