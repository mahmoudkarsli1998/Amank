// "use client";

// import { useState, useEffect } from 'react';
// import AdminInsuranceForms from '@/components/admin/admin-insurance-forms';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import type { ScoredLead } from '@/types';
// import { format } from 'date-fns';
// import { arSA } from 'date-fns/locale';
// import { Loader2 } from 'lucide-react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

// export default function AdminLeadsPage() {
//   const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
//   const [isLoadingLeads, setIsLoadingLeads] = useState(true);

//   useEffect(() => {
//     setIsLoadingLeads(true);
//     const leadsCollection = collection(db, "leads");
//     // For real-time updates:
//     const q = query(leadsCollection, orderBy("submissionDate", "desc"), limit(50)); // Get latest 50, for example
    
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const leadsData: ScoredLead[] = [];
//       querySnapshot.forEach((doc) => {
//         // Assuming 'leads' documents directly store ScoredLead structure
//         // You might need to adjust this if the structure is different, e.g., if leadScore/reason are in a sub-object
//         const data = doc.data() as any; // Use 'any' carefully, ensure data structure matches
//          leadsData.push({
//           id: doc.id, // Use Firestore document ID
//           name: data.name,
//           phone: data.phone,
//           email: data.email,
//           carCategory: data.carCategory,
//           carMake: data.carMake,
//           carModel: data.carModel,
//           yearOfManufacture: data.yearOfManufacture,
//           driverAge: data.driverAge,
//           region: data.region,
//           message: data.message || '',
//           // AI scoring fields - these might come from the form submission directly if AI call is client-side,
//           // or you might run AI on server and update the doc.
//           // For now, assuming they are part of the document written by InsuranceCalculatorForm
//           leadScore: data.leadScore !== undefined ? data.leadScore : 0, // Default if not present
//           reason: data.reason || "التقييم لم يتم بعد أو غير متوفر", // Default if not present
//           submissionDate: data.submissionDate || new Date().toISOString(), // Ensure it's a string or convert
//           // Fields from ScoreLeadInput that might not be directly in ScoredLead but are in LeadData
//           calculatorInteraction: data.calculatorInteraction !== undefined ? data.calculatorInteraction : false,
//           websiteVisits: data.websiteVisits !== undefined ? data.websiteVisits : 0,
//           // age: data.age || data.driverAge, // 'age' is used in ScoreLeadInput, 'driverAge' in form
//         });
//       });
//       setScoredLeads(leadsData);
//       setIsLoadingLeads(false);
//     }, (error) => {
//       console.error("Error fetching leads: ", error);
//       setIsLoadingLeads(false);
//       // Handle error (e.g., show a toast message)
//     });

//     return () => unsubscribe(); // Cleanup listener on component unmount

//   }, []);


//   const handleNewLeadScored = (lead: ScoredLead) => {
//     // This function is called by InsuranceCalculatorForm.
//     // Since leads are now fetched in real-time from Firestore,
//     // we don't need to manually add to state here if InsuranceCalculatorForm writes to Firestore.
//     // If InsuranceCalculatorForm doesn't write directly, you'd add the lead to Firestore here.
//     // For now, we assume InsuranceCalculatorForm handles the Firestore write.
//     // The onSnapshot listener will pick up the new lead.
//   };

//   const getLeadScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
//     if (score >= 0.8) return "default"; // Hot lead - primary color
//     if (score >= 0.5) return "secondary"; // Warm lead - secondary color
//     return "outline"; // Cold lead - outline
//   };
  
//   if (isLoadingLeads && scoredLeads.length === 0) { // Show loader only on initial load
//       return (
//         <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
//           <Card className="p-8 shadow-xl text-center">
//             <CardTitle className="text-xl font-semibold leading-tight tracking-[-0.02em] text-violet-400">جاري تحميل العملاء المحتملين...</CardTitle>
//             <Loader2 className="mx-auto mt-4 h-12 w-12 animate-spin text-violet-400" />
//           </Card>
//         </div>
//       );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-violet-400">إدارة العملاء المحتملين</h1>
//         <p className="text-slate-300-foreground">
//           أضف عملاء جدد يدويًا لتقييمهم بواسطة الذكاء الاصطناعي أو استعرض العملاء الحاليين من قاعدة البيانات.
//         </p>
//       </div>

//       <AdminInsuranceForms onLeadScored={handleNewLeadScored} />

//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle>قائمة العملاء المحتملين (من Firestore)</CardTitle>
//           <CardDescription>
//             جدول يعرض العملاء المحتملين مع درجة الاهتمام المقدرة وسبب التقييم.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {isLoadingLeads && scoredLeads.length > 0 && ( // Show subtle loader if updating
//              <div className="text-center py-4">
//                 <Loader2 className="mx-auto h-6 w-6 animate-spin text-violet-400/70" />
//                 <p className="text-sm font-normal leading-relaxed text-slate-300-foreground">تحديث القائمة...</p>
//             </div>
//           )}
//           {scoredLeads.length === 0 && !isLoadingLeads ? (
//             <p className="text-center text-slate-300-foreground py-8">لا يوجد عملاء محتملون لعرضهم حتى الآن. قم بإضافة عميل جديد.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>الاسم</TableHead>
//                     <TableHead>الهاتف</TableHead>
//                     <TableHead>البريد الإلكتروني</TableHead>
//                     <TableHead>فئة السيارة</TableHead>
//                     <TableHead>ماركة السيارة</TableHead>
//                     <TableHead>طراز السيارة</TableHead>
//                     <TableHead>درجة الاهتمام</TableHead>
//                     <TableHead className="min-w-[200px]">سبب التقييم</TableHead>
//                     <TableHead className="min-w-[150px]">الرسالة</TableHead>
//                     <TableHead>تاريخ الإرسال</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {scoredLeads.map((lead) => (
//                     <TableRow key={lead.id}>
//                       <TableCell className="font-medium">{lead.name}</TableCell>
//                       <TableCell>{lead.phone}</TableCell>
//                       <TableCell>{lead.email}</TableCell>
//                       <TableCell>{lead.carCategory}</TableCell>
//                       <TableCell>{lead.carMake}</TableCell>
//                       <TableCell>{lead.carModel}</TableCell>
//                       <TableCell>
//                         <Badge variant={getLeadScoreBadgeVariant(lead.leadScore)}>
//                           {lead.leadScore.toFixed(2)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="max-w-xs truncate" title={lead.reason}>{lead.reason}</TableCell>
//                       <TableCell className="max-w-[200px] truncate" title={lead.message}>{lead.message || '-'}</TableCell>
//                       <TableCell>
//                         {format(new Date(lead.submissionDate), "PPpp", { locale: arSA })}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
