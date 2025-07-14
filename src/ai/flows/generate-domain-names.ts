'use server';

/**
 * @fileOverview Generates domain name suggestions based on user answers to a questionnaire.
 *
 * - generateDomainNames - A function that generates domain name suggestions.
 * - GenerateDomainNamesInput - The input type for the generateDomainNames function.
 * - GenerateDomainNamesOutput - The return type for the generateDomainNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDomainNamesInputSchema = z.object({
  projectName: z.string().describe('The name of the business or project.'),
  businessType: z.string().describe('The type of business (e.g., e-commerce, blog, SaaS).'),
  targetAudience: z.string().describe('The target audience for the business.'),
  keywords: z.string().describe('Comma-separated keywords that describe the business or its values.'),
});
export type GenerateDomainNamesInput = z.infer<typeof GenerateDomainNamesInputSchema>;

const GenerateDomainNamesOutputSchema = z.object({
  domainNames: z
    .array(z.string())
    .describe('An array of 20 suggested domain names based on the provided answers.'),
});
export type GenerateDomainNamesOutput = z.infer<typeof GenerateDomainNamesOutputSchema>;

export async function generateDomainNames(input: GenerateDomainNamesInput): Promise<GenerateDomainNamesOutput> {
  return generateDomainNamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDomainNamesPrompt',
  input: {schema: GenerateDomainNamesInputSchema},
  output: {schema: GenerateDomainNamesOutputSchema},
  prompt: `You are a domain name expert. Your task is to generate 20 creative, brandable, and memorable domain names based on the user's answers to the following questions. Ensure the names are concise and relevant. Return ONLY the array of domain names.

Here are the user's answers:
1. Business or Project Name: {{{projectName}}}
2. Type of Business: {{{businessType}}}
3. Target Audience: {{{targetAudience}}}
4. Keywords: {{{keywords}}}
`,
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
