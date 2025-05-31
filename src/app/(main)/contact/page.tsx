// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Phone, Mail, MessageSquare } from 'lucide-react';
// import Link from 'next/link';

// export default function ContactPage() {
//   return (
//     <div className="container py-16 md:py-24">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-primary">تواصل معنا</h1>
//         <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
//           نحن هنا لمساعدتك! اختر طريقة التواصل التي تناسبك.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//         <Card className="shadow-lg text-center">
//           <CardHeader>
//             <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
//               <Phone className="h-10 w-10 text-primary" />
//             </div>
//             <CardTitle>عبر الهاتف</CardTitle>
//             <CardDescription>اتصل بنا مباشرة للحصول على مساعدة فورية.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-xl font-semibold text-foreground" dir="ltr">19XXX</p>
//             <Button asChild variant="link" className="mt-2 text-primary">
//               <a href="tel:19XXX">اتصل الآن</a>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card className="shadow-lg text-center">
//           <CardHeader>
//             <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
//               <Mail className="h-10 w-10 text-primary" />
//             </div>
//             <CardTitle>عبر البريد الإلكتروني</CardTitle>
//             <CardDescription>أرسل لنا استفساراتك وسنرد عليك في أقرب وقت.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-lg text-foreground">info@amankonline.com</p>
//             <Button asChild variant="link" className="mt-2 text-primary">
//               <a href="mailto:info@amankonline.com">أرسل بريدًا إلكترونيًا</a>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card className="shadow-lg text-center">
//           <CardHeader>
//             <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
//               <MessageSquare className="h-10 w-10 text-primary" />
//             </div>
//             <CardTitle>عبر واتساب</CardTitle>
//             <CardDescription>تحدث مع فريقنا مباشرة عبر واتساب للأعمال.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-xl font-semibold text-foreground" dir="ltr">+20 1X XXXX XXXX</p>
//             <Button asChild variant="link" className="mt-2 text-primary">
//               {/* Replace with actual WhatsApp link */}
//               <Link href="https://wa.me/201XXXXXXXXX" target="_blank">تحدث عبر واتساب</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//        <div className="mt-16 text-center">
//         <h2 className="text-2xl font-semibold text-primary">ساعات العمل</h2>
//         <p className="text-foreground/80 mt-2">
//           من الأحد إلى الخميس: 9 صباحًا - 5 مساءً
//         </p>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: 'ما هي المستندات التي أحتاجها للحصول على تأمين السيارة؟',
    answer: 'عادةً، ستحتاج إلى بطاقة الرقم القومي، رخصة السيارة (الرخصة)، ورخصة القيادة. قد تختلف المتطلبات المحددة قليلاً.',
  },
  {
    question: 'كيف يتم احتساب قسط التأمين الخاص بي؟',
    answer: 'يعتمد قسط التأمين الخاص بك على عوامل مثل نوع السيارة، سنة الصنع، عمر السائق، تاريخ القيادة، المنطقة الجغرافية، ومستوى التغطية المختار.',
  },
  {
    question: 'ماذا يجب أن أفعل في حال وقوع حادث؟',
    answer: 'حافظ على هدوئك. تأكد من سلامة الجميع. إذا لزم الأمر، اتصل بخدمات الطوارئ. اتصل بخط مطالباتنا الساخن فورًا للإبلاغ عن الحادث. التقط صورًا للضرر وتبادل المعلومات مع الأطراف الأخرى المعنية.',
  },
  {
    question: 'هل يمكنني تغيير خطة التأمين الخاصة بي في منتصف المدة؟',
    answer: 'هذا يعتمد على شروط البوليصة. قد تكون بعض التغييرات ممكنة عند التجديد أو بشروط معينة. يرجى الاتصال بخدمة العملاء للحصول على التفاصيل.',
  },
  {
    question: 'هل خدمة المساعدة على الطريق مشمولة في جميع الخطط؟',
    answer: 'غالبًا ما يتم تضمين المساعدة الأساسية على الطريق، مع توفر دعم أكثر شمولاً في الخطط ذات المستوى الأعلى. تحقق من تفاصيل خطتك المحددة للتغطية.',
  },
];

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">تواصل معنا</h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            نحن هنا لمساعدتك! اختر طريقة التواصل التي تناسبك.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-fit mb-4 shadow-lg">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl text-indigo-900">عبر الهاتف</CardTitle>
              <CardDescription className="text-gray-600">اتصل بنا مباشرة للحصول على مساعدة فورية.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-indigo-800 mb-3" dir="ltr">19XXX</p>
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
                onClick={() => window.open('tel:19XXX', '_self')}
              >
                اتصل الآن
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-full w-fit mb-4 shadow-lg">
                <Mail className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl text-indigo-900">عبر البريد الإلكتروني</CardTitle>
              <CardDescription className="text-gray-600">أرسل لنا استفساراتك وسنرد عليك في أقرب وقت.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-indigo-800 mb-3 break-all">info@amankonline.com</p>
              <Button 
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg"
                onClick={() => window.open('mailto:info@amankonline.com', '_self')}
              >
                أرسل بريدًا إلكترونيًا
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full w-fit mb-4 shadow-lg">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl text-indigo-900">عبر واتساب</CardTitle>
              <CardDescription className="text-gray-600">تحدث مع فريقنا مباشرة عبر واتساب للأعمال.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-indigo-800 mb-3" dir="ltr">+20 1X XXXX XXXX</p>
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg"
                onClick={() => window.open('https://wa.me/201XXXXXXXXX', '_blank')}
              >
                تحدث عبر واتساب
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Working Hours */}
        <div className="text-center mb-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-900 mb-3">ساعات العمل</h2>
          <p className="text-gray-700 text-lg">
            من الأحد إلى الخميس: 9 صباحًا - 5 مساءً
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-700">
              إجابات على أكثر الأسئلة شيوعًا حول خدماتنا
            </p>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-indigo-900 text-right flex-1">
                      {item.question}
                    </CardTitle>
                    <div className="ml-4">
                      {openFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent className="bg-indigo-50/50">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">لم تجد ما تبحث عنه؟</h3>
            <p className="text-lg opacity-90 mb-6">
              فريقنا جاهز لمساعدتك في أي وقت خلال ساعات العمل
            </p>
            <Button 
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-100 shadow-lg font-semibold px-8 py-3"
              onClick={() => window.open('tel:19XXX', '_self')}
            >
              اتصل بنا الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}