import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Users, TrendingUp, Clock, Award } from 'lucide-react';
import type { WhyChooseUsItem } from '@/types';

const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: 'speed',
    title: 'سرعة تسوية المطالبات',
    description: 'نعمل على تسوية مطالباتك بسرعة وكفاءة لضمان عودتك إلى الطريق في أقرب وقت.',
    icon: Zap,
  },
  {
    id: 'coverage',
    title: 'تغطية شاملة',
    description: 'نوفر مجموعة واسعة من التغطيات التأمينية لتلبية كافة احتياجاتك وحماية سيارتك بشكل كامل.',
    icon: ShieldCheck,
  },
  {
    id: 'prices',
    title: 'أسعار تنافسية',
    description: 'نقدم أفضل الأسعار في السوق مع الحفاظ على جودة الخدمة والتغطية الممتازة.',
    icon: TrendingUp,
  },
  {
    id: 'service',
    title: 'خدمة عملاء متميزة',
    description: 'فريقنا متخصص ومستعد دائمًا لتقديم الدعم والمشورة لك في كل خطوة.',
    icon: Users,
  },
   {
    id: 'process',
    title: 'عملية سهلة ومبسطة',
    description: 'إجراءاتنا واضحة وسهلة، بدءًا من شراء الوثيقة وحتى تقديم المطالبات.',
    icon: Clock,
  },
  {
    id: 'trust',
    title: 'خبرة وموثوقية',
    description: 'نلتزم بأعلى معايير الشفافية والمصداقية لبناء علاقة ثقة دائمة مع عملائنا.',
    icon: Award,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">لماذا تختار أمانك أونلاين؟</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            نحن نسعى لتقديم تجربة تأمين فريدة تجمع بين الحماية الموثوقة والخدمة الاستثنائية.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsData.map((item) => (
            <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <item.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/70">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
