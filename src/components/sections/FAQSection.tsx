
// "use client";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import type { FAQItem } from '@/types';
// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Skeleton } from "@/components/ui/skeleton";

// const DEFAULT_FAQ_DATA: FAQItem[] = [
//   { id: "faq1", question: "ما هو التأمين الشامل على السيارات؟", answer: "التأمين الشامل يوفر تغطية واسعة تشمل الأضرار التي تلحق بسيارتك نتيجة حادث، سرقة، أو حريق، بالإضافة إلى تغطية المسؤولية تجاه الغير." },
//   { id: "faq2", question: "هل التأمين ضد الغير إجباري في مصر؟", answer: "نعم، التأمين ضد الغير (المسؤولية المدنية) إجباري لجميع السيارات في مصر لتغطية الأضرار التي قد تسببها للآخرين." },
//   { id: "faq3", question: "كيف يتم تحديد سعر قسط التأمين؟", answer: "يعتمد سعر القسط على عدة عوامل منها نوع السيارة، سنة الصنع، قيمة السيارة، عمر السائق، تاريخ الحوادث، والمنطقة الجغرافية." },
// ];

// export default function FAQSection() {
//   const [items, setItems] = useState<FAQItem[] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setIsLoading(true);
//       try {
//         const docRef = doc(db, "dynamicContent", "faq");
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data() as { items: FAQItem[] };
//           setItems(data.items || DEFAULT_FAQ_DATA);
//         } else {
//           setItems(DEFAULT_FAQ_DATA);
//           console.log("No FAQ content found in Firestore, using default.");
//         }
//       } catch (error) {
//         console.error("Error fetching FAQ content:", error);
//         setItems(DEFAULT_FAQ_DATA);
//       }
//       setIsLoading(false);
//     };
//     fetchItems();
//   }, []);
  
//   const currentItems = items || DEFAULT_FAQ_DATA;

//   if (isLoading) {
//      return (
//       <section className="py-16 md:py-24 bg-slate-900/20/10">
//         <div className="container max-w-3xl mx-auto">
//           <div className="text-center mb-12">
//             <Skeleton className="h-10 w-1/2 mx-auto" />
//             <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
//           </div>
//           <div className="space-y-4">
//             {Array.from({ length: 3 }).map((_, index) => (
//               <Skeleton key={index} className="h-16 w-full" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 md:py-24 bg-slate-900/20/10">
//       <div className="container max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl font-bold leading-none tracking-[-0.035em] font-bold text-violet-400">أسئلة شائعة</h2>
//           <p className="mt-4 text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-100/80">
//             نجيب هنا على بعض الأسئلة المتكررة لمساعدتك على فهم خدماتنا بشكل أفضل.
//           </p>
//         </div>
//         <Accordion type="single" collapsible className="w-full">
//           {currentItems.map(faq => (
//             <AccordionItem value={faq.id} key={faq.id}>
//               <AccordionTrigger className="text-lg font-medium leading-relaxed tracking-[-0.01em] text-right hover:no-underline">
//                 {faq.question}
//               </AccordionTrigger>
//               <AccordionContent className="text-base font-normal leading-relaxed tracking-[0.01em] text-slate-100/80 text-right">
//                 {faq.answer}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// }

"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem } from '@/types';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_FAQ_DATA: FAQItem[] = [
  { id: "faq1", question: "ما هو التأمين الشامل على السيارات؟", answer: "التأمين الشامل يوفر تغطية واسعة تشمل الأضرار التي تلحق بسيارتك نتيجة حادث، سرقة، أو حريق، بالإضافة إلى تغطية المسؤولية تجاه الغير." },
  { id: "faq2", question: "هل التأمين ضد الغير إجباري في مصر؟", answer: "نعم، التأمين ضد الغير (المسؤولية المدنية) إجباري لجميع السيارات في مصر لتغطية الأضرار التي قد تسببها للآخرين." },
  { id: "faq3", question: "كيف يتم تحديد سعر قسط التأمين؟", answer: "يعتمد سعر القسط على عدة عوامل منها نوع السيارة، سنة الصنع، قيمة السيارة، عمر السائق، تاريخ الحوادث، والمنطقة الجغرافية." },
];

export default function FAQSection() {
  const [items, setItems] = useState<FAQItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "dynamicContent", "faq");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as { items: FAQItem[] };
          setItems(data.items || DEFAULT_FAQ_DATA);
        } else {
          setItems(DEFAULT_FAQ_DATA);
          console.log("No FAQ content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching FAQ content:", error);
        setItems(DEFAULT_FAQ_DATA);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, []);
  
  const currentItems = items || DEFAULT_FAQ_DATA;

  if (isLoading) {
     return (
      <section className="py-16 md:py-24 relative">
        <div className="container max-w-3xl mx-auto">
          {/* Glassmorphism header container */}
          <div className="text-center mb-12 glass-card p-8">
            <Skeleton className="h-10 w-1/2 mx-auto glass-shimmer" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4 glass-shimmer" />
          </div>
          {/* Glassmorphism skeleton items */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full glass-card glass-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container max-w-3xl mx-auto">
        {/* Glassmorphism header container */}
        <div className="text-center mb-12 glass-card p-8 glass-float">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl font-bold leading-none tracking-[-0.035em] font-bold text-violet-400 drop-shadow-sm">
            أسئلة شائعة
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-100/90 drop-shadow-sm">
            نجيب هنا على بعض الأسئلة المتكررة لمساعدتك على فهم خدماتنا بشكل أفضل.
          </p>
        </div>

        {/* Glassmorphism accordion container */}
        <div className="glass-accordion">
          <Accordion type="single" collapsible className="w-full">
            {currentItems.map((faq, index) => (
              <AccordionItem 
                value={faq.id} 
                key={faq.id}
                className="glass-accordion-item border-none"
              >
                <AccordionTrigger className="text-lg font-medium leading-relaxed tracking-[-0.01em] text-right hover:no-underline px-6 py-4 font-semibold text-slate-100/90 hover:text-violet-300 transition-colors duration-200 transition-colors duration-300 [&[data-state=open]]:text-violet-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base font-normal leading-relaxed tracking-[0.01em] text-slate-100/80 text-right px-6 pb-6 pt-0 leading-relaxed">
                  <div className="glass-card-dark p-4 mt-2">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Optional: Add a subtle glassmorphism footer */}
        <div className="glass-card-medium p-6 mt-8 text-center">
          <p className="text-sm font-normal leading-relaxed text-slate-100/70">
            لديك سؤال آخر؟ تواصل معنا وسنكون سعداء لمساعدتك
          </p>
        </div>
      </div>
    </section>
  );
}