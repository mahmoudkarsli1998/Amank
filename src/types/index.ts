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

export interface ScoredLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  carCategory: string;
  carMake: string;
  carModel: string;
  yearOfManufacture: number;
  driverAge: number;
  region: string;
  message?: string;
  leadScore: number;
  reason: string;
  submissionDate: string;
  calculatorInteraction?: boolean;
  websiteVisits?: number;
}

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

export interface LeadCaptureFormProps {
  onLeadScored?: (lead: ScoredLead) => void;
}
