import HeroSection from '@/components/sections/HeroSection';
import InsuranceCalculatorForm from '@/components/insurance-calculator-form';
import InsuranceTypesSection from '@/components/sections/InsuranceTypesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import FAQSection from '@/components/sections/FAQSection';
import InfographicSection from '@/components/sections/InfographicSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section id="calculator-section" className="py-16 md:py-24">
        <div className="container">
          <InsuranceCalculatorForm />
        </div>
      </section>
      <InsuranceTypesSection />
      <WhyChooseUsSection />
      <InfographicSection />
      <FAQSection />
    </>
  );
}
