import DomainFinder from '@/components/domain-pilot/domain-finder';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow text-foreground container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16">
          <header className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
              Let&apos;s Find Your Perfect Domain
            </h1>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
              Answer a few simple questions and our AI will generate domain suggestions tailored for your business.
            </p>
          </header>

          <DomainFinder />
        </div>
      </main>
      <Footer />
    </div>
  );
}