

// import Link from 'next/link';
// import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-white/5 text-slate-50 border-t">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <Link href="/" className="flex items-center gap-2 text-violet-400 mb-4">
//               <ShieldCheck className="h-7 w-7" />
//               <span className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold">تأمين مصر</span>
//             </Link>
//             <p className="text-sm font-normal leading-relaxed text-slate-300-foreground">
//               نقدم حلول تأمين سيارات موثوقة في جميع أنحاء مصر. سلامتك هي أولويتنا.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium leading-relaxed tracking-[-0.01em] font-semibold mb-4">روابط سريعة</h3>
//             <ul className="space-y-2 text-sm font-normal leading-relaxed">
//               <li><Link href="/#insurance-plans" className="hover:text-violet-300 transition-colors duration-200 transition-colors">خطط التأمين</Link></li>
//               <li><Link href="/#calculator" className="hover:text-violet-300 transition-colors duration-200 transition-colors">حاسبة الأقساط</Link></li>
//               <li><Link href="/#faq" className="hover:text-violet-300 transition-colors duration-200 transition-colors">الأسئلة الشائعة</Link></li>
//               <li><Link href="/contact" className="hover:text-violet-300 transition-colors duration-200 transition-colors">اتصل بنا</Link></li>
//               <li><Link href="/admin/dashboard" className="hover:text-violet-300 transition-colors duration-200 transition-colors">لوحة التحكم</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium leading-relaxed tracking-[-0.01em] font-semibold mb-4">تابعنا</h3>
//             <div className="flex space-x-4">
//               <Link href="#" aria-label="فيسبوك" className="text-slate-300-foreground hover:text-violet-300 transition-colors duration-200 transition-colors"><Facebook size={24} /></Link>
//               <Link href="#" aria-label="تويتر" className="text-slate-300-foreground hover:text-violet-300 transition-colors duration-200 transition-colors"><Twitter size={24} /></Link>
//               <Link href="#" aria-label="انستجرام" className="text-slate-300-foreground hover:text-violet-300 transition-colors duration-200 transition-colors"><Instagram size={24} /></Link>
//               <Link href="#" aria-label="لينكدإن" className="text-slate-300-foreground hover:text-violet-300 transition-colors duration-200 transition-colors"><Linkedin size={24} /></Link>
//             </div>
//           </div>
//         </div>
//         <div className="border-t pt-8 text-center text-sm font-normal leading-relaxed text-slate-300-foreground">
//           <p>&copy; {currentYear} تأمين مصر. جميع الحقوق محفوظة.</p>
//           <p className="mt-1">
//             صمم بعناية في مصر.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from 'next/link';
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-footer relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Brand Section */}
          <div className="glass-card p-8">
            <Link href="/" className="flex items-center gap-3 text-violet-400 mb-6 hover:scale-105 transition-transform duration-300">
              <div className="glass-avatar rounded-full p-3">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold drop-shadow-sm">تأمين مصر</span>
            </Link>
            <p className="text-base font-normal leading-relaxed tracking-[0.01em] text-slate-100/80 leading-relaxed">
              نقدم حلول تأمين سيارات موثوقة في جميع أنحاء مصر. سلامتك هي أولويتنا.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] font-semibold mb-6 text-violet-400 drop-shadow-sm">روابط سريعة</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/#insurance-plans" 
                  className="glass-btn text-base font-normal leading-relaxed tracking-[0.01em] px-4 py-3 inline-block w-full text-right hover:text-violet-300 transition-colors duration-200-foreground transition-all duration-300"
                >
                  خطط التأمين
                </Link>
              </li>
              <li>
                <Link 
                  href="/#calculator" 
                  className="glass-btn text-base font-normal leading-relaxed tracking-[0.01em] px-4 py-3 inline-block w-full text-right hover:text-violet-300 transition-colors duration-200-foreground transition-all duration-300"
                >
                  حاسبة الأقساط
                </Link>
              </li>
              <li>
                <Link 
                  href="/#faq" 
                  className="glass-btn text-base font-normal leading-relaxed tracking-[0.01em] px-4 py-3 inline-block w-full text-right hover:text-violet-300 transition-colors duration-200-foreground transition-all duration-300"
                >
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="glass-btn text-base font-normal leading-relaxed tracking-[0.01em] px-4 py-3 inline-block w-full text-right hover:text-violet-300 transition-colors duration-200-foreground transition-all duration-300"
                >
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/dashboard" 
                  className="glass-btn text-base font-normal leading-relaxed tracking-[0.01em] px-4 py-3 inline-block w-full text-right hover:text-violet-300 transition-colors duration-200-foreground transition-all duration-300"
                >
                  لوحة التحكم
                </Link>
              </li>
            </ul>
          </div>

{/* Social Media Section */}
<div className="glass-card p-8">
  <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] mb-6 text-violet-400 drop-shadow-sm">تابعنا</h3>
  <div className="flex gap-6 justify-center md:justify-start">
    <Link 
      href="#" 
      aria-label="فيسبوك" 
      className="glass-btn p-4 rounded-full hover:scale-110 transition-all duration-300 group"
    >
      <Facebook size={24} className="group-hover:text-purple-400 transition-colors duration-300" />
    </Link>
    <Link 
      href="#" 
      aria-label="تويتر" 
      className="glass-btn p-4 rounded-full hover:scale-110 transition-all duration-300 group"
    >
      <Twitter size={24} className="group-hover:text-violet-300 transition-colors duration-300" />
    </Link>
    <Link 
      href="#" 
      aria-label="انستجرام" 
      className="glass-btn p-4 rounded-full hover:scale-110 transition-all duration-300 group"
    >
      <Instagram size={24} className="group-hover:text-rose-500 transition-colors duration-300" />
    </Link>
    <Link 
      href="#" 
      aria-label="لينكدإن" 
      className="glass-btn p-4 rounded-full hover:scale-110 transition-all duration-300 group"
    >
      <Linkedin size={24} className="group-hover:text-indigo-600 transition-colors duration-300" />
    </Link>
  </div>
  
  {/* Additional Contact Info */}
  <div className="mt-8 glass-card-dark p-6 rounded-lg">
    <p className="text-sm font-normal leading-relaxed text-slate-100/70 text-center">
      📞 اتصل بنا: 19000
    </p>
    <p className="text-sm font-normal leading-relaxed text-slate-100/70 text-center mt-2">
      📧 info@taameenmisr.com
    </p>
  </div>
</div>
        </div>

        {/* Copyright Section */}
        <div className="glass-card-medium p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-base font-normal leading-relaxed tracking-[0.01em] text-slate-100/80">
              &copy; {currentYear} تأمين مصر. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-base font-normal leading-relaxed tracking-[0.01em] text-slate-100/70">صمم بعناية في مصر</span>
              <span className="text-rose-500 animate-pulse text-lg font-medium leading-relaxed tracking-[-0.01em]">❤️</span>
            </div>
          </div>
          

{/* Decorative Elements */}
<div className="mt-6 flex justify-center gap-4">
  <div className="glass-badge px-4 py-2">
    <span className="text-sm font-normal leading-relaxed font-medium">آمن</span>
  </div>
  <div className="glass-badge px-4 py-2">
    <span className="text-sm font-normal leading-relaxed font-medium">موثوق</span>
  </div>
  <div className="glass-badge px-4 py-2">
    <span className="text-sm font-normal leading-relaxed font-medium">سريع</span>
  </div>
</div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 glass-card-dark rounded-full opacity-30 glass-float"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 glass-card-dark rounded-full opacity-20 glass-pulse"></div>
      </div>
    </footer>
  );
}