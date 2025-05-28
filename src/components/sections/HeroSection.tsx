
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { HeroContent } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const DEFAULT_HERO_CONTENT: HeroContent = {
  title: "أمانك أونلاين: تأمين سيارتك، راحة بالك",
  subtitle: "نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين لحماية سيارتك وتقديم تجربة عملاء استثنائية. اكتشف تغطياتنا الشاملة وأسعارنا التنافسية.",
};

export default function HeroSection() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "dynamicContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        } else {
          setContent(DEFAULT_HERO_CONTENT); // Fallback to default if not found
          console.log("No hero content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
        setContent(DEFAULT_HERO_CONTENT); // Fallback on error
      }
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-right">
            <Skeleton className="h-12 w-3/4 mx-auto md:mx-0" />
            <Skeleton className="h-6 w-full mx-auto md:mx-0" />
            <Skeleton className="h-6 w-5/6 mx-auto md:mx-0" />
            <div className="flex gap-4 justify-center md:justify-start">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
          <div>
            <Skeleton className="h-[400px] w-[600px] rounded-xl shadow-2xl mx-auto" />
          </div>
        </div>
      </section>
    );
  }
  
  const currentContent = content || DEFAULT_HERO_CONTENT;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary animate-fade-in-right [animation-delay:0.2s] opacity-0">
            {currentContent.title}
          </h1>
          <p className="text-lg text-foreground/80 animate-fade-in-right [animation-delay:0.4s] opacity-0">
            {currentContent.subtitle}
          </p>
          <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up [animation-delay:0.6s] opacity-0">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href="#calculator">احسب قسط تأمينك</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/insurance-types">اعرف المزيد عن خدماتنا</Link>
            </Button>
          </div>
        </div>
        <div className="animate-zoom-in [animation-delay:0.3s] opacity-0">
          <Image
            src="https://placehold.co/600x400.png"
            alt="تأمين سيارات"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl mx-auto"
            data-ai-hint="car insurance hero"
            priority
          />
        </div>
      </div>
    </section>
  );
}
