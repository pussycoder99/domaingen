'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getDomainSuggestions } from '@/app/actions';
import type { DomainSuggestion } from '@/lib/domain-utils';
import { generateWhmcsLink } from '@/lib/domain-utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle, Search, Sparkles, ChevronRight, ChevronLeft, HelpCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

const questions = [
  {
    id: 'projectName',
    text: 'What is your business or project name?',
    placeholder: 'e.g., Tech Solutions, My Blog, Online Store',
  },
  {
    id: 'businessType',
    text: 'What type of business is it?',
    placeholder: 'e.g., E-commerce, SaaS, Agency, Personal Brand',
  },
  {
    id: 'targetAudience',
    text: 'Who is your target audience?',
    placeholder: 'e.g., Developers, Small Business Owners, Students',
  },
  {
    id: 'keywords',
    text: 'Enter some keywords that describe your business or values.',
    placeholder: 'e.g., innovative, fast, secure, creative',
  },
];

type FinderStep = 'questionnaire' | 'loading' | 'results';

export default function DomainFinder() {
  const [step, setStep] = useState<FinderStep>('questionnaire');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [results, setResults] = useState<DomainSuggestion[]>([]);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  async function handleSubmit() {
    if (answers.some(answer => answer.trim() === '')) {
        toast({
            variant: 'destructive',
            title: 'Incomplete Form',
            description: 'Please answer all questions before submitting.',
        });
        return;
    }

    setStep('loading');
    setResults([]);
    const result = await getDomainSuggestions({ answers });
    setStep('results');

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

  const renderContent = () => {
    switch(step) {
      case 'questionnaire':
        return renderQuestionnaire();
      case 'loading':
        return renderLoading();
      case 'results':
        return renderResults();
    }
  }

  const renderQuestionnaire = () => (
    <Card className="max-w-2xl mx-auto shadow-xl ring-1 ring-black/5 dark:ring-white/10">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-sm font-semibold text-primary">{Math.round(progress)}% Complete</p>
        </div>
        <Progress value={progress} className="mb-8 h-2" />

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor={questions[currentQuestion].id} className="block text-xl font-semibold mb-4 text-foreground">
            <HelpCircle className="inline-block w-6 h-6 mr-3 text-primary" />
            {questions[currentQuestion].text}
          </label>
          <Input
            id={questions[currentQuestion].id}
            type="text"
            value={answers[currentQuestion]}
            onChange={handleAnswerChange}
            placeholder={questions[currentQuestion].placeholder}
            className="h-12 text-base"
          />
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ChevronLeft /> Previous
          </Button>
          <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {currentQuestion === questions.length - 1 ? 'Generate Domains' : 'Next'} <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoading = () => {
    return (
        <div className="text-center py-16">
            <div className="relative inline-block">
                <Search className="mx-auto h-16 w-16 text-primary animate-pulse" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-foreground">Generating your perfect domain...</h3>
            <p className="mt-2 text-muted-foreground">Our AI is working its magic. This might take a moment.</p>
        </div>
    );
  };
  
  const renderResults = () => {
    if (results.length === 0) {
      return (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-lg font-medium text-foreground">No Domains Generated</h3>
            <p className="mt-1 text-sm text-muted-foreground">
            The AI couldn&apos;t generate any domains. Please try adjusting your answers.
            </p>
             <Button onClick={() => setStep('questionnaire')} className="mt-6">
                <ChevronLeft /> Go Back
             </Button>
      </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
            <Button onClick={() => { setStep('questionnaire'); setCurrentQuestion(0); setAnswers(Array(questions.length).fill('')); }} variant="outline">
                <ChevronLeft /> Start Over
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                         disabled={!suggestion.tlds.some(t => t.available)}>
                      <a href={generateWhmcsLink(suggestion.baseName + (suggestion.tlds.find(t=>t.available)?.tld || ''))} target="_blank" rel="noopener noreferrer">
                        Register Now <ArrowRight className="ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };
  
  return (
    <section className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    </section>
  );
}
