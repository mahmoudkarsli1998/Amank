import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            أمانك أونلاين: تأمين سيارتك، راحة بالك
          </h1>
          <p className="text-lg text-foreground/80">
            نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين لحماية سيارتك وتقديم تجربة عملاء استثنائية. اكتشف تغطياتنا الشاملة وأسعارنا التنافسية.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href="#calculator">احسب قسط تأمينك</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/insurance-types">اعرف المزيد عن خدماتنا</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            src="https://placehold.co/600x400.png"
            alt="تأمين سيارات"
            width={600}
            height={400}
            className="rounded-xl shadow-2xl mx-auto"
            data-ai-hint="car insurance hero"
          />
        </div>
      </div>
    </section>
  );
}
