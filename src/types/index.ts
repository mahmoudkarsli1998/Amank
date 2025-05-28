
import type { ScoreLeadInput, ScoreLeadOutput } from "@/ai/flows/lead-scoring";
import type { LucideIcon } from "lucide-react";

export interface LeadData extends ScoreLeadInput {
  id: string;
  name: string;
  phone: string;
  email: string;
  submissionDate: string;
  message?: string;
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
  iconName: string; // Changed from LucideIcon to string for Firestore compatibility
};

// Data structure for Firestore content
export interface HeroContent {
  title: string;
  subtitle: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Keep original LucideIcon type for components that use it directly
export type WhyChooseUsItemWithIcon = Omit<WhyChooseUsItem, 'iconName'> & {
  icon: LucideIcon;
};
