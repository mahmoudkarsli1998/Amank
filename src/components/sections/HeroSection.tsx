
// "use client";
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import type { HeroContent } from '@/types';
// import { Skeleton } from '@/components/ui/skeleton';

// const DEFAULT_HERO_CONTENT: HeroContent = {
//   title: "أمانك أونلاين: تأمين سيارتك، راحة بالك",
//   subtitle: "نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين لحماية سيارتك وتقديم تجربة عملاء استثنائية. اكتشف تغطياتنا الشاملة وأسعارنا التنافسية.",
// };

// export default function HeroSection() {
//   const [content, setContent] = useState<HeroContent | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchContent = async () => {
//       setIsLoading(true);
//       try {
//         const docRef = doc(db, "dynamicContent", "hero");
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setContent(docSnap.data() as HeroContent);
//         } else {
//           setContent(DEFAULT_HERO_CONTENT); // Fallback to default if not found
//           console.log("No hero content found in Firestore, using default.");
//         }
//       } catch (error) {
//         console.error("Error fetching hero content:", error);
//         setContent(DEFAULT_HERO_CONTENT); // Fallback on error
//       }
//       setIsLoading(false);
//     };
//     fetchContent();
//   }, []);

//   if (isLoading) {
//     return (
//       <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
//         <div className="container grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6 text-center md:text-right">
//             <Skeleton className="h-12 w-3/4 mx-auto md:mx-0" />
//             <Skeleton className="h-6 w-full mx-auto md:mx-0" />
//             <Skeleton className="h-6 w-5/6 mx-auto md:mx-0" />
//             <div className="flex gap-4 justify-center md:justify-start">
//               <Skeleton className="h-12 w-36" />
//               <Skeleton className="h-12 w-48" />
//             </div>
//           </div>
//           <div>
//             <Skeleton className="h-[400px] w-[600px] rounded-xl shadow-2xl mx-auto" />
//           </div>
//         </div>
//       </section>
//     );
//   }
  
//   const currentContent = content || DEFAULT_HERO_CONTENT;

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
//       <div className="container grid md:grid-cols-2 gap-12 items-center">
//         <div className="space-y-6 text-center md:text-right">
//           <h1 className="text-4xl font-bold leading-none tracking-[-0.035em] md:text-5xl font-bold leading-none tracking-[-0.04em] font-bold tracking-tight text-violet-400 animate-fade-in-right [animation-delay:0.2s] opacity-0">
//             {currentContent.title}
//           </h1>
//           <p className="text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-100/80 animate-fade-in-right [animation-delay:0.4s] opacity-0">
//             {currentContent.subtitle}
//           </p>
//           <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up [animation-delay:0.6s] opacity-0">
//             <Button asChild size="lg" className="bg-amber-500/20 hover:bg-amber-500/20/90 text-amber-400-foreground">
//               <Link href="#calculator">احسب قسط تأمينك</Link>
//             </Button>
//             <Button asChild size="lg" variant="outline">
//               <Link href="/insurance-types">اعرف المزيد عن خدماتنا</Link>
//             </Button>
//           </div>
//         </div>
//         <div className="animate-zoom-in [animation-delay:0.3s] opacity-0">
//           <Image
//             src="https://placehold.co/600x400.png"
//             alt="تأمين سيارات"
//             width={600}
//             height={400}
//             className="rounded-xl shadow-2xl mx-auto"
//             data-ai-hint="car insurance hero"
//             priority
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { HeroContent } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_HERO_CONTENT: HeroContent = {
  title: "أمانك أونلاين: تأمين سيارتك، راحة بالك",
  subtitle: "نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين لحماية سيارتك وتقديم تجربة عملاء استثنائية. اكتشف تغطياتنا الشاملة وأسعارنا التنافسية.",
};

// High-quality car insurance related images from Unsplash
const HERO_IMAGES = [
  {
    bgImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    alt: "سيارة حديثة على الطريق - تأمين سيارات شامل",
    title: "حماية شاملة لسيارتك الحديثة"
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    alt: "عائلة سعيدة مع سيارتهم - أمان العائلة",
    title: "أمان تام لك ولعائلتك"
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    alt: "سيارة فاخرة - تأمين للسيارات المتميزة",
    title: "تغطية متميزة للسيارات الفاخرة"
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
    alt: "طريق جميل مع سيارة - رحلة آمنة",
    title: "رحلات آمنة على جميع الطرق"
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
    alt: "مفاتيح السيارة وأوراق التأمين - خدمة احترافية",
    title: "خدمة عملاء احترافية ومتخصصة"
  }
];

export default function HeroSection() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "dynamicContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        } else {
          setContent(DEFAULT_HERO_CONTENT);
          console.log("No hero content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
        setContent(DEFAULT_HERO_CONTENT);
      }
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % HERO_IMAGES.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  const nextImage = () => {
    setIsAutoSliding(false);
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % HERO_IMAGES.length
    );
    // Resume auto-sliding after manual interaction
    setTimeout(() => setIsAutoSliding(true), 12000);
  };

  const prevImage = () => {
    setIsAutoSliding(false);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? HERO_IMAGES.length - 1 : prevIndex - 1
    );
    // Resume auto-sliding after manual interaction
    setTimeout(() => setIsAutoSliding(true), 12000);
  };

  const goToImage = (index: number) => {
    setIsAutoSliding(false);
    setCurrentImageIndex(index);
    // Resume auto-sliding after manual interaction
    setTimeout(() => setIsAutoSliding(true), 12000);
  };

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
  const currentImage = HERO_IMAGES[currentImageIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-right">
          <h1 className="text-4xl font-bold leading-none tracking-[-0.035em] md:text-5xl font-bold leading-none tracking-[-0.04em] font-bold tracking-tight text-violet-400 animate-fade-in-right [animation-delay:0.2s] opacity-0">
            {currentContent.title}
          </h1>
          <p className="text-lg font-medium leading-relaxed tracking-[-0.01em] text-slate-100/80 animate-fade-in-right [animation-delay:0.4s] opacity-0">
            {currentContent.subtitle}
          </p>
          <div className="flex gap-4 justify-center md:justify-start animate-fade-in-up [animation-delay:0.6s] opacity-0">
            <Button asChild size="lg" className="bg-amber-500/20 hover:bg-amber-500/20/90 text-amber-400-foreground">
              <Link href="#calculator">احسب قسط تأمينك</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/insurance-types">اعرف المزيد عن خدماتنا</Link>
            </Button>
          </div>
        </div>
        
        {/* Image Carousel */}
        <div className="relative animate-zoom-in [animation-delay:0.3s] opacity-0">
          <div className="relative overflow-hidden rounded-xl shadow-2xl mx-auto w-[600px] h-[400px]">
            {/* Main Image */}
            <div className="relative w-full h-full">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out transform hover:scale-105"
                style={{ backgroundImage: currentImage.bgImage }}
                role="img"
                aria-label={currentImage.alt}
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Title overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-slate-50">
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] font-bold text-right drop-shadow-lg">
                  {currentImage.title}
                </h3>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group shadow-lg hover:shadow-xl"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="h-6 w-6 text-slate-50 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group shadow-lg hover:shadow-xl"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="h-6 w-6 text-slate-50 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white scale-125 shadow-lg'
                      : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                  }`}
                  aria-label={`الذهاب للصورة ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-slide indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAutoSliding ? 'bg-green-400/20' : 'bg-orange-400'} ${isAutoSliding ? 'animate-pulse' : ''}`} />
              <span className="text-slate-50 text-xs font-medium tracking-wide bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                {isAutoSliding ? 'تلقائي' : 'يدوي'}
              </span>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-slate-50 px-3 py-1 rounded-full text-sm font-normal leading-relaxed font-medium">
            {currentImageIndex + 1} / {HERO_IMAGES.length}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-400 to-purple-600 transition-all duration-300"
              style={{ width: `${((currentImageIndex + 1) / HERO_IMAGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}