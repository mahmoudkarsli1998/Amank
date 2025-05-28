import type { ScoreLeadInput, ScoreLeadOutput } from "@/ai/flows/lead-scoring";

export interface LeadData extends ScoreLeadInput {
  id: string;
  name: string;
  phone: string;
  email: string;
  submissionDate: string;
}

export interface ScoredLead extends LeadData, ScoreLeadOutput {}

export type InsuranceType = {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  features: string[];
};

export type WhyChooseUsItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};
