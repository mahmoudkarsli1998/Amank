// "use client";
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu, Shield, Car } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';

// const navLinks = [
//   { href: '/', label: 'الرئيسية' },
//   { href: '/insurance-types', label: 'أنواع التأمين' },
//   { href: '/why-us', label: 'لماذا تختارنا؟' },
//   { href: '/contact', label: 'تواصل معنا' },
//   { href: '/admin/dashboard', label: 'لوحة التحكم' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();

//   return (
//     // Apply glass-nav class here
//     <header className="sticky top-0 z-50 w-full glass-nav">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <Car className="h-7 w-7 text-violet-400" />
//           <span className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-violet-400">أمانك أونلاين</span>
//         </Link>
        
//         <nav className="hidden md:flex gap-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={cn(
//                 "text-sm font-normal leading-relaxed font-medium transition-colors hover:text-violet-300 transition-colors duration-200",
//                 pathname === link.href ? "text-violet-400" : "text-slate-100/70" // Keep text colors for now, might need adjustment based on glass effect
//               )}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               {/* Consider applying glass style to the mobile menu button if needed */}
//               <Button variant="outline" size="icon">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">فتح القائمة</span>
//               </Button>
//             </SheetTrigger>
//             {/* Apply glass style to the SheetContent */}
//             <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-card">
//               <nav className="flex flex-col gap-6 pt-8">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={cn(
//                       "text-lg font-medium leading-relaxed tracking-[-0.01em] font-medium transition-colors hover:text-violet-300 transition-colors duration-200",
//                        pathname === link.href ? "text-violet-400" : "text-slate-100/70" // Keep text colors
//                     )}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, Car, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/insurance-types', label: 'أنواع التأمين' },
  { href: '/why-us', label: 'لماذا تختارنا؟' },
  { href: '/contact', label: 'تواصل معنا' },
  { href: '/admin/dashboard', label: 'لوحة التحكم' },
];

// Advanced Theme Toggle Component
const AdvancedThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="glass-btn px-4 py-2 rounded-xl flex items-center gap-2 opacity-50">
        <div className="w-4 h-4 bg-current opacity-30 rounded-full"></div>
        <span className="text-sm opacity-30">تحميل...</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="glass-btn px-4 py-2 rounded-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 group relative overflow-hidden min-w-[120px]"
      aria-label={isDark ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع المظلم'}
    >
      {/* Animated background */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' 
          : 'bg-gradient-to-r from-yellow-400/10 to-orange-400/10'
      }`}></div>
      
      {/* Icon with smooth transition */}
      <div className="relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-110">
        {isDark ? (
          <Sun 
            className="w-4 h-4 text-yellow-400 drop-shadow-lg transition-colors duration-300" 
            strokeWidth={2}
          />
        ) : (
          <Moon 
            className="w-4 h-4 text-blue-600 drop-shadow-lg transition-colors duration-300" 
            strokeWidth={2}
          />
        )}
      </div>
      
      {/* Text label */}
      <span className="relative z-10 text-sm font-medium transition-colors duration-300">
        {isDark ? 'مضيء' : 'مظلم'}
      </span>
      
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-current/5 to-current/10"></div>
    </button>
  );
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    // Apply glass-nav class here
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-7 w-7 text-violet-400" />
          <span className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-violet-400">أمانك أونلاين</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-normal leading-relaxed font-medium transition-colors hover:text-violet-300 transition-colors duration-200",
                pathname === link.href ? "text-violet-400" : "text-slate-100/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle and Mobile Menu Container */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle - Hidden on mobile */}
          <div className="hidden md:block">
            <AdvancedThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              {/* Apply glass style to the SheetContent */}
              <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-card">
                <nav className="flex flex-col gap-6 pt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium leading-relaxed tracking-[-0.01em] font-medium transition-colors hover:text-violet-300 transition-colors duration-200",
                         pathname === link.href ? "text-violet-400" : "text-slate-100/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Theme Toggle in Mobile Menu */}
                  <div className="pt-4 border-t border-slate-100/20">
                    <AdvancedThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}