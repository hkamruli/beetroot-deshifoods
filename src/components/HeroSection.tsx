import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, MapPin, Leaf } from "lucide-react";
import heroImage from "@/assets/beetroot-hero.jpg";

const HeroSection = () => {
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Subtle organic texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Faint leaf pattern top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02]">
        <Leaf className="w-full h-full text-trust" />
      </div>

      <div className="relative container mx-auto max-w-[1400px] px-10 md:px-20 py-[60px] md:py-[100px] min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Mobile: Image first */}
          <div className="flex justify-center lg:hidden">
            <HeroVisual />
          </div>

          {/* Left Column: Text (55% ≈ 7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Organic badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-trust-light border border-trust/15 px-4 py-2.5 text-sm font-medium text-trust">
              <Leaf className="h-4 w-4" />
              <span className="font-bangla font-bold">১০০% অর্গানিক ও প্রাকৃতিক</span>
            </div>

            {/* Main Headline - Bangla */}
            <div className="space-y-4">
              <h1 className="font-bangla text-[36px] md:text-[48px] lg:text-[60px] font-bold leading-[1.4] text-primary">
                স্ট্যামিনা বাড়ান ও BP নিয়ন্ত্রণ করুন প্রাকৃতিকভাবে
              </h1>
              <p className="font-english text-lg md:text-2xl lg:text-[28px] font-semibold leading-[1.3] text-foreground">
                Boost Stamina &amp; Control BP Naturally
              </p>
            </div>

            {/* Sub-headline */}
            <div className="space-y-1.5">
              <p className="font-bangla text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-bold">
                ১০০% খাঁটি অর্গানিক বিটরুট পাউডার
              </p>
              <p className="font-bangla text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                কোনো কেমিকেল নয়, শুধু প্রাকৃতিক শক্তি
              </p>
              <p className="font-english text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
                Pure Organic Beetroot Powder — No Chemicals, Just Natural Energy
              </p>
            </div>

            {/* Primary CTA */}
            <div className="pt-2">
              <Button
                variant="cta"
                onClick={scrollToCheckout}
                className="font-bangla w-full sm:w-auto min-w-[280px] h-14 lg:h-[60px] px-14 text-lg rounded-xl">

                অর্ডার করুন — ১০০% ঝুঁকিমুক্ত
              </Button>
              <p className="font-english text-xs text-muted-foreground mt-2.5 tracking-wide">
                Order Now — 100% Risk Free
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              <TrustBadge icon={<CheckCircle2 className="h-[18px] w-[18px] text-trust" />} bangla="১০০% অর্গানিক" english="100% Organic" />
              <TrustBadge icon={<Truck className="h-[18px] w-[18px] text-trust" />} bangla="ক্যাশ অন ডেলিভারি" english="Cash on Delivery" />
              <TrustBadge icon={<MapPin className="h-[18px] w-[18px] text-trust" />} bangla="সারাদেশে ডেলিভারি" english="Nationwide Delivery" />
            </div>
          </div>

          {/* Right Column: Visual (45% ≈ 5 cols) - Desktop only */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>);

};

const TrustBadge = ({ icon, bangla, english }: {icon: React.ReactNode;bangla: string;english: string;}) =>
<div className="inline-flex items-center gap-2.5 rounded-full bg-trust/[0.06] border border-trust/15 px-[18px] py-2.5">
    {icon}
    <div className="flex flex-col">
      <span className="font-bangla text-sm text-foreground leading-tight font-bold">{bangla}</span>
      <span className="font-english text-[11px] text-muted-foreground leading-tight">{english}</span>
    </div>
  </div>;


const HeroVisual = () =>
<div className="relative p-10">
    {/* Glow behind image */}
    <div className="absolute inset-8 rounded-full bg-primary/[0.06] blur-3xl" />
    
    {/* Product image */}
    <img
    src={heroImage}
    alt="অর্গানিক বিটরুট পাউডার - Organic Beetroot Powder"
    className="relative w-72 md:w-80 lg:w-[26rem] rounded-2xl shadow-lifted animate-float"
    loading="eager"
    fetchPriority="high" />


    {/* Certified Organic badge overlay */}
    <div className="absolute top-6 right-6 w-[60px] h-[60px] rounded-full bg-trust text-trust-foreground flex flex-col items-center justify-center border-[3px] border-white shadow-soft text-center">
      <Leaf className="h-4 w-4 mb-0.5" />
      <span className="text-[7px] font-bold leading-none font-english">CERTIFIED</span>
      <span className="text-[7px] font-bold leading-none font-english">ORGANIC</span>
    </div>
  </div>;


export default HeroSection;