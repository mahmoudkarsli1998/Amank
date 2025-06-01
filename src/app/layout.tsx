
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import DynamicBackground from '@/components/DynamicBackground';

export const metadata: Metadata = {
  title: 'أمانك أونلاين - تأمين سيارات في مصر',
  description: 'موقع شركة أمانك أونلاين لتأمين السيارات. احسب قسطك، تعرف على أنواع التأمين، وتواصل معنا.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased relative min-h-screen overflow-x-hidden" suppressHydrationWarning={true}>
        {/* Enhanced Dynamic Background with glassmorphism support */}
        <DynamicBackground />
        
        {/* Glass overlay for better content visibility */}
        <div className="fixed inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none z-0" />
        
        {/* Main content wrapper with glassmorphism */}
        <div className="relative z-10 min-h-screen">
          {/* Glass navigation bar - you can customize this based on your nav component */}
          <nav className="glass-nav sticky top-0 z-50 px-4 py-3">
            <div className="container mx-auto">
              {/* Your navigation content will go here */}
            </div>
          </nav>
          
          {/* Main content area */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Glass footer */}
          <footer className="glass-footer mt-auto py-8 px-4">
            <div className="container mx-auto text-center">
              {/* Your footer content will go here */}
            </div>
          </footer>
        </div>
        
        {/* Enhanced Toaster with glassmorphism */}
        <Toaster />
        
        {/* Floating glass elements for enhanced aesthetics */}
        <div className="fixed top-1/4 left-10 w-32 h-32 glass-card-dark rounded-full glass-float opacity-30 pointer-events-none z-0" />
        <div className="fixed bottom-1/4 right-10 w-24 h-24 glass-card-dark rounded-full glass-float opacity-20 pointer-events-none z-0" style={{ animationDelay: '1s' }} />
        <div className="fixed top-1/2 left-1/2 w-16 h-16 glass-card-dark rounded-full glass-float opacity-25 pointer-events-none z-0" style={{ animationDelay: '2s' }} />
      </body>
    </html>
  );
}