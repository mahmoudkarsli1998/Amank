'use server';

/**
 * @fileOverview An AI agent for scoring leads based on their likelihood of being interested in car insurance.
 *
 * - scoreLead - A function that handles the lead scoring process.
 * - ScoreLeadInput - The input type for the scoreLead function.
 * - ScoreLeadOutput - The return type for the scoreLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreLeadInputSchema = z.object({
  calculatorInteraction: z
    .boolean()
    .describe('Whether the customer interacted with the insurance calculator.'),
  websiteVisits: z.number().describe('The number of times the customer visited the website.'),
  age: z.number().describe('The age of the customer.'),
  region: z.string().describe('The geographic region of the customer.'),
  carType: z.string().describe('The type of car the customer owns.'),
});
export type ScoreLeadInput = z.infer<typeof ScoreLeadInputSchema>;

const ScoreLeadOutputSchema = z.object({
  leadScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the likelihood of the customer being interested in car insurance. Higher score indicates higher interest.'
    ),
  reason: z.string().describe('The reasoning behind the assigned lead score.'),
});
export type ScoreLeadOutput = z.infer<typeof ScoreLeadOutputSchema>;

export async function scoreLead(input: ScoreLeadInput): Promise<ScoreLeadOutput> {
  return scoreLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreLeadPrompt',
  input: {schema: ScoreLeadInputSchema},
  output: {schema: ScoreLeadOutputSchema},
  prompt: `You are an expert marketing analyst specializing in lead scoring for car insurance companies in Egypt.

You will use the following information to assess the likelihood of a customer being interested in car insurance and assign a lead score between 0 and 1.

Consider the following factors:

- Interaction with the insurance calculator: Customers who interacted with the calculator are more likely to be interested.
- Number of website visits: Customers who visited the website multiple times are more likely to be interested.
- Demographic data (age, region, car type): Certain demographics may be more likely to purchase car insurance.

Provide a brief explanation for the assigned lead score.

Calculator Interaction: {{#if calculatorInteraction}}Yes{{else}}No{{/if}}
Website Visits: {{{websiteVisits}}}
Age: {{{age}}}
Region: {{{region}}}
Car Type: {{{carType}}}`,
});

const scoreLeadFlow = ai.defineFlow(
  {
    name: 'scoreLeadFlow',
    inputSchema: ScoreLeadInputSchema,
    outputSchema: ScoreLeadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
