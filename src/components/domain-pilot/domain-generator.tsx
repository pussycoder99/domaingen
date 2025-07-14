'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { getDomainSuggestions } from '@/app/actions';
import type { DomainSuggestion } from '@/lib/domain-utils';
import { generateWhmcsLink } from '@/lib/domain-utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle, Search, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  businessDescription: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  keywords: z.string().min(2, {
    message: 'Please provide at least one keyword.',
  }),
});

export default function DomainGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DomainSuggestion[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults([]);
    const result = await getDomainSuggestions(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setResults(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate domains.',
      });
    }
  }

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-7 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (results.length > 0) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {results.map((suggestion, index) => (
               <motion.div
                  key={suggestion.baseName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
               >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl tracking-tight">{suggestion.baseName}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                    <ul className="space-y-3">
                      {suggestion.tlds.map(({ tld, available }) => (
                        <li key={tld} className="flex items-center justify-between text-sm">
                          <span className="font-medium text-muted-foreground">{suggestion.baseName}{tld}</span>
                          {available ? (
                            <Badge variant="secondary" className="text-green-500 border-green-500/20">
                              <CheckCircle2 className="w-4 h-4 mr-1.5" />
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-500">
                              <XCircle className="w-4 h-4 mr-1.5" />
                              Taken
                            </Badge>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <a href={generateWhmcsLink(suggestion.baseName + suggestion.tlds.find(t=>t.available)?.tld)} target="_blank" rel="noopener noreferrer"
                         disabled={!suggestion.tlds.some(t => t.available)}>
                        Buy Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      );
    }

    return (
      <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
        <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">Let&apos;s find your domain</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form above to start generating names.
        </p>
      </div>
    );
  };

  return (
    <section>
      <Card className="mb-12 shadow-lg">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="businessDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Business Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A subscription box service for eco-friendly dog toys."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., sustainable, dog, play, eco" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Search className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Domains
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? 'loading' : 'results'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderResults()}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
