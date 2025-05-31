// export default function Footer() {
//   const currentYear = new Date().getFullYear();
//   return (
//     <footer className="border-t py-8 bg-muted/50">
//       <div className="container text-center text-sm text-muted-foreground">
//         <p>&copy; {currentYear} أمانك أونلاين. جميع الحقوق محفوظة.</p>
//         <p className="mt-1">شركة تأمين سيارات رائدة في مصر.</p>
//       </div>
//     </footer>
//   );
// }


import Link from 'next/link';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary mb-4">
              <ShieldCheck className="h-7 w-7" />
              <span className="text-xl font-bold">تأمين مصر</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              نقدم حلول تأمين سيارات موثوقة في جميع أنحاء مصر. سلامتك هي أولويتنا.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#insurance-plans" className="hover:text-primary transition-colors">خطط التأمين</Link></li>
              <li><Link href="/#calculator" className="hover:text-primary transition-colors">حاسبة الأقساط</Link></li>
              <li><Link href="/#faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="فيسبوك" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={24} /></Link>
              <Link href="#" aria-label="تويتر" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={24} /></Link>
              <Link href="#" aria-label="انستجرام" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={24} /></Link>
              <Link href="#" aria-label="لينكدإن" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={24} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} تأمين مصر. جميع الحقوق محفوظة.</p>
          <p className="mt-1">
            صمم بعناية في مصر.
          </p>
        </div>
      </div>
    </footer>
  );
}
