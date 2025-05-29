"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremiumCalculator from './premium-calculator';
import LeadCaptureForm from './lead-capture-form';

export default function InsuranceForms() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">حاسبة قسط التأمين</TabsTrigger>
          <TabsTrigger value="lead">طلب عرض سعر</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator">
          <PremiumCalculator />
        </TabsContent>
        <TabsContent value="lead">
          <LeadCaptureForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}