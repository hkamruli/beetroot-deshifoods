import { Leaf, Heart, Activity, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroImage from "@/assets/beetroot-hero.jpg";

const benefits = [
  {
    icon: Leaf,
    titleBn: "১০০% অর্গানিক ও প্রাকৃতিক",
    titleEn: "100% Organic & Natural",
    descBn: "কোনো কৃত্রিম সংযোজন বা সংরক্ষক নেই",
    descEn: "No artificial additives or preservatives",
  },
  {
    icon: Heart,
    titleBn: "সহজে হজম হয়",
    titleEn: "Easy to Digest",
    descBn: "বয়স্কদের এবং সংবেদনশীল পেটের জন্য উপযুক্ত",
    descEn: "Perfect for elderly users and sensitive stomachs",
  },
  {
    icon: Activity,
    titleBn: "নাইট্রেটে সমৃদ্ধ",
    titleEn: "Rich in Nitrates",
    descBn: "প্রাকৃতিকভাবে রক্তপ্রবাহ ও স্ট্যামিনা উন্নত করে",
    descEn: "Naturally improves blood flow and stamina",
  },
  {
    icon: Shield,
    titleBn: "চিনি মুক্ত",
    titleEn: "No Added Sugar",
    descBn: "শুধুমাত্র খাঁটি বিটরুটের গুণাগুণ",
    descEn: "Pure beetroot goodness only",
  },
];

const BenefitItem = ({
  icon: Icon,
  titleBn,
  titleEn,
  descBn,
  descEn,
}: {
  icon: LucideIcon;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
}) => (
  <div className="group flex items-start gap-5 p-5 bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:translate-x-2 hover:shadow-soft transition-all duration-250 ease-out">
    <div className="flex-shrink-0 w-[52px] h-[52px] rounded-[10px] bg-trust/10 flex items-center justify-center group-hover:bg-trust/[0.15] transition-colors duration-250">
      <Icon className="h-7 w-7 text-trust" strokeWidth={1.8} />
    </div>
    <div>
      <h3 className="font-bangla text-lg md:text-xl font-semibold text-foreground mb-0.5">
        {titleBn}
      </h3>
      <p className="font-english text-xs text-muted-foreground mb-1.5">{titleEn}</p>
      <p className="font-bangla text-sm md:text-[15px] text-muted-foreground leading-relaxed">
        {descBn}
      </p>
      <p className="font-english text-xs text-muted-foreground mt-0.5 italic">{descEn}</p>
    </div>
  </div>
);

const SolutionSection = () => {
  return (
    <section className="bg-background py-[70px] md:py-[100px] px-10 md:px-[60px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Headline */}
        <div className="text-center mb-[60px]">
          <h2 className="font-bangla text-[30px] md:text-[42px] lg:text-[48px] font-bold text-primary mb-3">
            কেন অর্গানিক বিটরুট পাউডার?
          </h2>
          <p className="font-english text-sm md:text-base text-muted-foreground mb-3">
            Why Organic Beetroot Powder?
          </p>
          <p className="font-bangla text-base md:text-lg text-muted-foreground">
            প্রকৃতির সবচেয়ে শক্তিশালী সুপারফুড, সুবিধাজনক পাউডার আকারে
          </p>
          <p className="font-english text-sm text-muted-foreground mt-1">
            Nature's most powerful superfood in convenient powder form
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left: Product Visual */}
          <div className="relative flex justify-center">
            <div className="relative p-5">
              <img
                src={heroImage}
                alt="অর্গানিক বিটরুট পাউডার পণ্য - Organic Beetroot Powder Product"
                className="w-full max-w-md rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                loading="lazy"
              />

              {/* Certified Organic Badge */}
              <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-trust text-trust-foreground flex flex-col items-center justify-center border-4 border-white shadow-soft">
                <Leaf className="h-5 w-5 mb-0.5" />
                <span className="text-[8px] font-bold leading-none font-english">CERTIFIED</span>
                <span className="text-[8px] font-bold leading-none font-english">ORGANIC</span>
              </div>

              {/* Natural Badge */}
              <div className="absolute bottom-2 left-2 bg-card text-trust rounded-full px-5 py-2 shadow-soft border border-trust/15">
                <span className="font-bangla text-sm font-medium">১০০% প্রাকৃতিক</span>
                <span className="font-english text-[10px] text-muted-foreground ml-1.5">100% Natural</span>
              </div>
            </div>
          </div>

          {/* Right: Benefits List */}
          <div>
            <div className="mb-8">
              <h3 className="font-bangla text-2xl md:text-[26px] font-semibold text-foreground mb-1">
                যা পাবেন এই পণ্যে:
              </h3>
              <p className="font-english text-sm text-muted-foreground">What You Get:</p>
            </div>

            <div className="space-y-5">
              {benefits.map((benefit, i) => (
                <BenefitItem key={i} {...benefit} />
              ))}
            </div>
          </div>
        </div>

        {/* Closing Emphasis */}
        <div className="text-center mt-[60px]">
          <p className="font-bangla text-base md:text-lg font-medium text-trust">
            প্রকৃতির শক্তি, বিজ্ঞান দ্বারা প্রমাণিত
          </p>
          <p className="font-english text-xs text-muted-foreground mt-1">
            Nature's Power, Scientifically Proven
          </p>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto mt-3 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
