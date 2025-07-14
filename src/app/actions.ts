'use server';

import { generateDomainNames, type GenerateDomainNamesInput } from '@/ai/flows/generate-domain-names';
import { checkDomainAvailability, type DomainSuggestion } from '@/lib/domain-utils';
import { z } from 'zod';

const ActionInputSchema = z.object({
    answers: z.array(z.string().min(1, { message: 'Please answer all questions.' })),
});

const getBaseName = (domain: string): string => {
  const cleanedDomain = domain.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const parts = cleanedDomain.split('.');
  const TLDs = ['.com', '.io', '.ai', '.app', '.co', '.xyz', '.net', '.org'];
  if (parts.length > 1 && TLDs.includes(`.${parts[parts.length - 1]}`)) {
    return parts.slice(0, -1).join('.');
  }
  return cleanedDomain;
};


export async function getDomainSuggestions(
  input: z.infer<typeof ActionInputSchema>
): Promise<{ success: boolean; data?: DomainSuggestion[]; error?: string }> {
  const validation = ActionInputSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.errors.map(e => e.message).join(' ') };
  }
  
  const aiInput: GenerateDomainNamesInput = {
    projectName: validation.data.answers[0] || 'N/A',
    businessType: validation.data.answers[1] || 'N/A',
    targetAudience: validation.data.answers[2] || 'N/A',
    keywords: validation.data.answers[3] || 'N/A',
  };

  try {
    const aiResult = await generateDomainNames(aiInput);
    
    if (!aiResult || !aiResult.domainNames || aiResult.domainNames.length === 0) {
      return { success: false, error: 'The AI could not generate domain names. Please try a different prompt.' };
    }
    
    const baseNames = Array.from(new Set(
      aiResult.domainNames.map(name => getBaseName(name))
    ));

    const availabilityData = await checkDomainAvailability(baseNames);

    return { success: true, data: availabilityData };
  } catch (e) {
    console.error('Error in getDomainSuggestions:', e);
    return { success: false, error: 'An unexpected error occurred while generating domains. Please try again.' };
  }
}
