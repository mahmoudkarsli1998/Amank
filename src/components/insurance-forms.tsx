// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import PremiumCalculator from './premium-calculator';
// import LeadCaptureForm from './lead-capture-form';

// export default function InsuranceForms() {
//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <Tabs defaultValue="calculator" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="calculator">حاسبة قسط التأمين</TabsTrigger>
//           <TabsTrigger value="lead">طلب عرض سعر</TabsTrigger>
//         </TabsList>
//         <TabsContent value="calculator">
//           <PremiumCalculator />
//         </TabsContent>
//         <TabsContent value="lead">
//           <LeadCaptureForm />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremiumCalculator from './premium-calculator';
import LeadCaptureForm from './lead-capture-form';

export default function InsuranceForms() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="calculator" className="w-full">
        <div className="mb-8 p-1 rounded-2xl border border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl shadow-lg">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-1 gap-2">
            <TabsTrigger 
              value="calculator" 
              className="rounded-xl border border-white/20 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-violet-400/30 data-[state=active]:text-violet-100 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm backdrop-blur-sm text-slate-100/80 font-medium flex items-center justify-center"
            >
              حاسبة قسط التأمين
            </TabsTrigger>
            <TabsTrigger 
              value="lead" 
              className="rounded-xl border border-white/20 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-violet-400/30 data-[state=active]:text-violet-100 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm backdrop-blur-sm text-slate-100/80 font-medium flex items-center justify-center"
            >
              طلب عرض سعر
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="calculator" className="mt-0">
          <PremiumCalculator />
        </TabsContent>
        <TabsContent value="lead" className="mt-0">
          <LeadCaptureForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}