// "use client";

// import PremiumCalculator from '../premium-calculator';
// import LeadCaptureForm from '../lead-capture-form';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { type ScoredLead } from '@/types';

// interface AdminInsuranceFormsProps {
//   onLeadScored: (lead: ScoredLead) => void;
// }

// export default function AdminInsuranceForms({ onLeadScored }: AdminInsuranceFormsProps) {
//   return (
//     <Card className="shadow-lg">
//       <CardHeader>
//         <CardTitle>إضافة وتقييم عميل محتمل جديد</CardTitle>
//         <CardDescription>
//           املأ بيانات العميل المحتمل أدناه. سيتم حفظ البيانات في Firestore وتقييم درجة اهتمامه بواسطة الذكاء الاصطناعي.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="lead" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="lead">إضافة عميل جديد</TabsTrigger>
//             <TabsTrigger value="calculator">حاسبة القسط</TabsTrigger>
//           </TabsList>
//           <TabsContent value="lead">
//             <LeadCaptureForm onLeadScored={onLeadScored} />
//           </TabsContent>
//           <TabsContent value="calculator">
//             <PremiumCalculator />
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }