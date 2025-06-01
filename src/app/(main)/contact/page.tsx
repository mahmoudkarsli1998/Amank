
'use client';
import { SetStateAction, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp, Clock, Sparkles } from 'lucide-react';

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
    <div 
      className="min-h-screen relative overflow-hidden"
      dir="rtl"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-purple-400/20/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/20/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-slate-50/80 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-none tracking-[-0.035em] md:text-6xl font-bold leading-none tracking-[-0.045em] font-bold text-slate-50 mb-4 drop-shadow-2xl">
            تواصل معنا
          </h1>
          <p className="text-lg font-medium leading-relaxed tracking-[-0.01em] md:text-xl font-semibold leading-tight tracking-[-0.02em] text-slate-50/90 max-w-xl mx-auto leading-relaxed drop-shadow-lg">
            نحن هنا لمساعدتك! اختر طريقة التواصل التي تناسبك.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Phone Card */}
          <div className="group">
            <Card className="shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 text-center border-0 overflow-hidden relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="mx-auto p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-fit mb-6 shadow-2xl transform group-hover:rotate-12 transition-transform duration-500 relative">
                  <Phone className="h-12 w-12 text-slate-50" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-50 font-bold mb-2">عبر الهاتف</CardTitle>
                <CardDescription className="text-slate-50/80 text-lg font-medium leading-relaxed tracking-[-0.01em]">اتصل بنا مباشرة للحصول على مساعدة فورية.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-slate-50 mb-4 drop-shadow-lg" dir="ltr">19XXX</p>
                <Button 
                  className="px-8 py-3 text-lg font-medium leading-relaxed tracking-[-0.01em] font-semibold text-slate-50 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.8), rgba(147, 51, 234, 0.8))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onClick={() => window.open('tel:19XXX', '_self')}
                >
                  <span className="relative z-10">اتصل الآن</span>
                  <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Email Card */}
          <div className="group">
            <Card className="shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 text-center border-0 overflow-hidden relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="mx-auto p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-full w-fit mb-6 shadow-2xl transform group-hover:rotate-12 transition-transform duration-500 relative">
                  <Mail className="h-12 w-12 text-slate-50" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-50 font-bold mb-2">عبر البريد الإلكتروني</CardTitle>
                <CardDescription className="text-slate-50/80 text-lg font-medium leading-relaxed tracking-[-0.01em]">أرسل لنا استفساراتك وسنرد عليك في أقرب وقت.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-50 mb-4 break-all drop-shadow-lg">info@amankonline.com</p>
                <Button 
                  className="px-8 py-3 text-lg font-medium leading-relaxed tracking-[-0.01em] font-semibold text-slate-50 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(20, 184, 166, 0.8))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onClick={() => window.open('mailto:info@amankonline.com', '_self')}
                >
                  <span className="relative z-10">أرسل بريدًا إلكترونيًا</span>
                  <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp Card */}
          <div className="group">
            <Card className="shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 text-center border-0 overflow-hidden relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="mx-auto p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full w-fit mb-6 shadow-2xl transform group-hover:rotate-12 transition-transform duration-500 relative">
                  <MessageSquare className="h-12 w-12 text-slate-50" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
                </div>
                <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-50 font-bold mb-2">عبر واتساب</CardTitle>
                <CardDescription className="text-slate-50/80 text-lg font-medium leading-relaxed tracking-[-0.01em]">تحدث مع فريقنا مباشرة عبر واتساب للأعمال.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-slate-50 mb-4 drop-shadow-lg" dir="ltr">+20 1X XXXX XXXX</p>
                <Button 
                  className="px-8 py-3 text-lg font-medium leading-relaxed tracking-[-0.01em] font-semibold text-slate-50 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onClick={() => window.open('https://wa.me/201XXXXXXXXX', '_blank')}
                >
                  <span className="relative z-10">تحدث عبر واتساب</span>
                  <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Working Hours */}
        <div className="text-center mb-16 max-w-md mx-auto">
          <div className="p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
               style={{
                 background: 'rgba(255, 255, 255, 0.2)',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-slate-50/90 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-slate-50 mb-4 drop-shadow-lg">ساعات العمل</h2>
              <p className="text-slate-50/90 text-xl font-semibold leading-tight tracking-[-0.02em] leading-relaxed">
                من الأحد إلى الخميس: 9 صباحًا - 5 مساءً
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold leading-none tracking-[-0.035em] md:text-5xl font-bold leading-none tracking-[-0.04em] font-bold text-slate-50 mb-6 drop-shadow-2xl">الأسئلة الشائعة</h2>
            <p className="text-xl font-semibold leading-tight tracking-[-0.02em] text-slate-50/90 leading-relaxed drop-shadow-lg">
              إجابات على أكثر الأسئلة شيوعًا حول خدماتنا
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="group">
                <Card className="shadow-2xl border-0 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}>
                  <CardHeader 
                    className="cursor-pointer transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: openFAQ === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                    }}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="absolute inset-0 bg-white/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    <div className="flex justify-between items-center relative z-10">
                      {/* <CardTitle className="text-xl font-semibold leading-tight tracking-[-0.02em] text-slate-50 text-right flex-1 font-bold leading-relaxed">
                        {item.question}
                      </CardTitle> */}
                      <CardTitle 
  className="text-xl font-semibold leading-tight tracking-[-0.02em] text-right flex-1 font-bold leading-relaxed"
  style={{ color: 'black !important' }}
>
  {item.question}
</CardTitle>
                      <div className="ml-4 transform transition-transform duration-300" 
                           style={{ transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ChevronDown className="h-6 w-6 text-slate-50/80" />
                      </div>
                    </div>
                  </CardHeader>
                  {openFAQ === index && (
                    <CardContent className="relative overflow-hidden"
                                 style={{
                                   background: 'rgba(255, 255, 255, 0.1)',
                                   backdropFilter: 'blur(10px)',
                                   WebkitBackdropFilter: 'blur(10px)',
                                 }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                      <p className="text-slate-50/90 leading-relaxed text-lg font-medium leading-relaxed tracking-[-0.01em] relative z-10 animate-fadeIn">
                        {item.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="p-10 rounded-3xl text-slate-50 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden max-w-4xl mx-auto"
               style={{
                 background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(147, 51, 234, 0.3))',
                 backdropFilter: 'blur(20px)',
                 WebkitBackdropFilter: 'blur(20px)',
                 border: '1px solid rgba(255, 255, 255, 0.3)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl font-bold leading-none tracking-[-0.035em] font-bold mb-6 drop-shadow-lg">لم تجد ما تبحث عنه؟</h3>
              <p className="text-xl font-semibold leading-tight tracking-[-0.02em] mb-8 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                فريقنا جاهز لمساعدتك في أي وقت خلال ساعات العمل
              </p>
              <Button 
                size="lg"
                className="px-12 py-4 text-xl font-semibold leading-tight tracking-[-0.02em] font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden border-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#4338ca',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                onClick={() => window.open('tel:19XXX', '_self')}
              >
                <span className="relative z-10">اتصل بنا الآن</span>
                <div className="absolute inset-0 bg-indigo-100/20 transform translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}