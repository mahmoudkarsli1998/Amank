import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
