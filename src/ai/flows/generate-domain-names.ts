'use server';

/**
 * @fileOverview Generates domain name suggestions based on user input.
 *
 * - generateDomainNames - A function that generates domain name suggestions.
 * - GenerateDomainNamesInput - The input type for the generateDomainNames function.
 * - GenerateDomainNamesOutput - The return type for the generateDomainNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDomainNamesInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A description of the business or idea for which to generate domain names.'),
  keywords: z
    .string()
    .describe('Comma separated Keywords related to the business or idea.'),
});
export type GenerateDomainNamesInput = z.infer<typeof GenerateDomainNamesInputSchema>;

const GenerateDomainNamesOutputSchema = z.object({
  domainNames: z
    .array(z.string())
    .describe('An array of suggested domain names based on the business description.'),
});
export type GenerateDomainNamesOutput = z.infer<typeof GenerateDomainNamesOutputSchema>;

export async function generateDomainNames(input: GenerateDomainNamesInput): Promise<GenerateDomainNamesOutput> {
  return generateDomainNamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDomainNamesPrompt',
  input: {schema: GenerateDomainNamesInputSchema},
  output: {schema: GenerateDomainNamesOutputSchema},
  prompt: `You are a domain name expert. Generate 10 creative domain names for a business with the following description and keywords. Return ONLY the array of domain names.

Description: {{{businessDescription}}}
Keywords: {{{keywords}}}`,
});

const generateDomainNamesFlow = ai.defineFlow(
  {
    name: 'generateDomainNamesFlow',
    inputSchema: GenerateDomainNamesInputSchema,
    outputSchema: GenerateDomainNamesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
