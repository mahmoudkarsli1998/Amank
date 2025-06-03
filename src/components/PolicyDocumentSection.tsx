// src/components/sections/PolicyDocumentSection.tsx
"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem } from '@/types'; // Assuming FAQItem type is defined in '@/types'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react"; // Icon for the section

// Define a type for the items, can reuse FAQItem if structure is the same
// type PolicyPointItem = FAQItem; // Or define a new type if structure differs

const DEFAULT_POLICY_KEYPOINTS_DATA: FAQItem[] = [
  { id: "policy_kp1", question: "ما هي أهم البنود التي يجب مراجعتها في وثيقة التأمين؟", answer: "يجب مراجعة نطاق التغطية بوضوح، الاستثناءات المذكورة، قيمة التحمل (المبلغ الذي ستدفعه من جيبك عند المطالبة)، شروط تجديد وإلغاء الوثيقة، بالإضافة إلى إجراءات الإبلاغ عن الحوادث وتقديم المطالبات." },
  { id: "policy_kp2", question: "كيف يمكنني الحصول على نسخة من وثيقة التأمين الخاصة بي؟", answer: "عادةً، يتم إرسال نسخة رقمية من وثيقة التأمين عبر البريد الإلكتروني فور إتمام عملية الشراء. يمكنك أيضاً طلب نسخة مطبوعة أو الوصول إليها من خلال بوابة العملاء الإلكترونية لشركة التأمين إذا كانت متوفرة." },
  { id: "policy_kp3", question: "ماذا أفعل في حال فقدان وثيقة التأمين؟", answer: "في حال فقدان وثيقة التأمين، يجب عليك التواصل مع شركة التأمين المؤمن لديها على الفور لطلب نسخة بديلة (بدل فاقد). قد تحتاج لتقديم بعض المعلومات للتحقق من هويتك وتفاصيل وثيقتك." },
  { id: "policy_kp4", question: "هل يمكنني تعديل بياناتي في وثيقة التأمين بعد إصدارها؟", answer: "نعم، في معظم الحالات يمكنك طلب تعديل بعض البيانات في وثيقة التأمين (مثل العنوان، رقم لوحة السيارة، أو إضافة سائق جديد). يتم ذلك بالتواصل مع شركة التأمين، وقد يترتب على بعض التعديلات تغيير في قيمة القسط." }
];

export default function PolicyDocumentSection() {
  const [items, setItems] = useState<FAQItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        // Fetch from a new Firestore document path
        const docRef = doc(db, "dynamicContent", "policyKeyPoints"); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as { items: FAQItem[] };
          // Ensure items is an array and has content, otherwise use default
          setItems(Array.isArray(data.items) && data.items.length > 0 ? data.items : DEFAULT_POLICY_KEYPOINTS_DATA);
        } else {
          setItems(DEFAULT_POLICY_KEYPOINTS_DATA);
          console.log("No Policy Key Points content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching Policy Key Points content:", error);
        setItems(DEFAULT_POLICY_KEYPOINTS_DATA);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, []);
  
  // Use fetched items if available and not empty, otherwise default. Handles null state too.
  const currentItems = (items && items.length > 0) ? items : DEFAULT_POLICY_KEYPOINTS_DATA;

  if (isLoading) {
     return (
      <section className="py-16 md:py-24 relative">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Glassmorphism header skeleton */}
          <div className="text-center mb-12 bg-white/50 dark:bg-slate-800/30 backdrop-blur-md shadow-lg rounded-2xl p-8">
            <Skeleton className="h-10 w-3/5 mx-auto bg-slate-300/60 dark:bg-slate-700/60 rounded-md" />
            <Skeleton className="h-6 w-4/5 mx-auto mt-5 bg-slate-300/50 dark:bg-slate-700/50 rounded-md" />
          </div>
          {/* Glassmorphism accordion items skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full bg-white/40 dark:bg-slate-700/30 backdrop-blur-sm rounded-xl shadow-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Glassmorphism header container */}
        <div className="text-center mb-12 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md shadow-xl rounded-2xl p-8">
          <h2 className="flex items-center justify-center gap-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl text-slate-900 dark:text-slate-100">
            <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            أهم نقاط وثيقة التأمين
          </h2>
          <p className="mt-4 text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            معلومات أساسية تساعدك على فهم وثيقة تأمين سيارتك بشكل أفضل.
          </p>
        </div>

        {/* Glassmorphism accordion container */}
        <div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {currentItems.map((item) => (
              <AccordionItem 
                value={item.id} 
                key={item.id}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md shadow-lg rounded-xl border border-white/30 dark:border-slate-700/20 overflow-hidden"
              >
                <AccordionTrigger className="w-full flex items-center justify-between text-lg font-medium text-right hover:no-underline px-6 py-4 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10 transition-colors duration-200 [&[data-state=open]]:bg-emerald-500/10 dark:[&[data-state=open]]:bg-emerald-400/10 [&[data-state=open]]:text-emerald-700 dark:[&[data-state=open]]:text-emerald-300">
                  <span>{item.question}</span>
                  {/* Lucide icon for accordion typically handled by AccordionTrigger itself if customized in ui/accordion.tsx */}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-relaxed text-slate-700 dark:text-slate-300 text-right px-6 pb-5 pt-1">
                  {/* Optional: If you want a slightly different bg for answer text block: */}
                  {/* <div className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm rounded-lg p-4 mt-1"> */}
                  {item.answer}
                  {/* </div> */}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Optional: Add a subtle glassmorphism footer for this section */}
        <div className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-md shadow-md rounded-xl p-6 mt-12 text-center">
          <p className="text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            هل لديك استفسارات أخرى حول وثيقتك؟ لا تتردد في <a href="/contact" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 underline">التواصل معنا</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

// Make sure you have a type definition for FAQItem, for example in src/types/index.ts:
// export interface FAQItem {
//   id: string;
//   question: string;
//   answer: string;
// }