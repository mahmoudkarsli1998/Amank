import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">تواصل معنا</h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-xl mx-auto">
          نحن هنا لمساعدتك! اختر طريقة التواصل التي تناسبك.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
              <Phone className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>عبر الهاتف</CardTitle>
            <CardDescription>اتصل بنا مباشرة للحصول على مساعدة فورية.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-foreground" dir="ltr">19XXX</p>
            <Button asChild variant="link" className="mt-2 text-primary">
              <a href="tel:19XXX">اتصل الآن</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>عبر البريد الإلكتروني</CardTitle>
            <CardDescription>أرسل لنا استفساراتك وسنرد عليك في أقرب وقت.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground">info@amankonline.com</p>
            <Button asChild variant="link" className="mt-2 text-primary">
              <a href="mailto:info@amankonline.com">أرسل بريدًا إلكترونيًا</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>عبر واتساب</CardTitle>
            <CardDescription>تحدث مع فريقنا مباشرة عبر واتساب للأعمال.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-foreground" dir="ltr">+20 1X XXXX XXXX</p>
            <Button asChild variant="link" className="mt-2 text-primary">
              {/* Replace with actual WhatsApp link */}
              <Link href="https://wa.me/201XXXXXXXXX" target="_blank">تحدث عبر واتساب</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-primary">ساعات العمل</h2>
        <p className="text-foreground/80 mt-2">
          من الأحد إلى الخميس: 9 صباحًا - 5 مساءً
        </p>
      </div>
    </div>
  );
}
