import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    id: "faq1",
    question: "ما هو التأمين الشامل على السيارات؟",
    answer: "التأمين الشامل يوفر تغطية واسعة تشمل الأضرار التي تلحق بسيارتك نتيجة حادث، سرقة، أو حريق، بالإضافة إلى تغطية المسؤولية تجاه الغير."
  },
  {
    id: "faq2",
    question: "هل التأمين ضد الغير إجباري في مصر؟",
    answer: "نعم، التأمين ضد الغير (المسؤولية المدنية) إجباري لجميع السيارات في مصر لتغطية الأضرار التي قد تسببها للآخرين."
  },
  {
    id: "faq3",
    question: "كيف يتم تحديد سعر قسط التأمين؟",
    answer: "يعتمد سعر القسط على عدة عوامل منها نوع السيارة، سنة الصنع، قيمة السيارة، عمر السائق، تاريخ الحوادث، والمنطقة الجغرافية."
  },
  {
    id: "faq4",
    question: "ما هي المستندات المطلوبة لشراء وثيقة تأمين؟",
    answer: "عادةً ما تحتاج إلى صورة من بطاقة الرقم القومي، رخصة السيارة، ورخصة القيادة. قد تختلف المستندات قليلاً حسب نوع التأمين."
  },
  {
    id: "faq5",
    question: "كيف يمكنني تقديم مطالبة في حالة وقوع حادث؟",
    answer: "يجب إبلاغ الشركة بالحادث في أقرب وقت ممكن وتقديم المستندات المطلوبة مثل محضر الشرطة، صور الحادث، وتقدير الإصلاحات. فريقنا سيرشدك خلال العملية."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">أسئلة شائعة</h2>
          <p className="mt-4 text-lg text-foreground/80">
            نجيب هنا على بعض الأسئلة المتكررة لمساعدتك على فهم خدماتنا بشكل أفضل.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map(faq => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger className="text-lg text-right hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80 text-right">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
