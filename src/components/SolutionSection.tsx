import { Leaf, Heart, Activity, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import heroImage from "@/assets/beetroot-hero.jpg";

const benefits = [
{
  icon: Leaf,
  titleBn: "১০০% অর্গানিক ও প্রাকৃতিক",
  descBn: "কোনো কৃত্রিম সংযোজন বা সংরক্ষক নেই",
},
{
  icon: Heart,
  titleBn: "সহজে হজম হয়",
  descBn: "বয়স্কদের এবং সংবেদনশীল পেটের জন্য উপযুক্ত",
},
{
  icon: Activity,
  titleBn: "নাইট্রেটে সমৃদ্ধ",
  descBn: "প্রাকৃতিকভাবে রক্তপ্রবাহ ও স্ট্যামিনা উন্নত করে",
},
{
  icon: Shield,
  titleBn: "চিনি মুক্ত",
  descBn: "শুধুমাত্র খাঁটি বিটরুটের গুণাগুণ",
}];


const BenefitItem = ({
  icon: Icon,
  titleBn,
  descBn,
}: {icon: LucideIcon; titleBn: string; descBn: string;}) =>
<div className="group flex items-start gap-5 p-5 bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:translate-x-2 hover:shadow-soft transition-all duration-250 ease-out">
    <div className="flex-shrink-0 w-[52px] h-[52px] rounded-[10px] bg-trust/10 flex items-center justify-center group-hover:bg-trust/[0.15] transition-colors duration-250">
      <Icon className="h-7 w-7 text-trust" strokeWidth={1.8} />
    </div>
    <div>
      <h3 className="font-bangla text-lg md:text-xl text-foreground mb-1.5 font-bold">
        {titleBn}
      </h3>
      <p className="font-bangla text-sm md:text-[15px] text-muted-foreground leading-relaxed">
        {descBn}
      </p>
    </div>
  </div>;


const SolutionSection = () => {
  return (
    <section className="bg-background py-[70px] md:py-[100px] px-10 md:px-[60px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Headline */}
        <div className="text-center mb-[60px]">
          <h2 className="font-bangla text-[30px] md:text-[42px] lg:text-[48px] font-bold text-primary mb-3">
            কেন অর্গানিক বিটরুট পাউডার?
          </h2>
          <p className="font-bangla text-base md:text-lg text-muted-foreground">
            প্রকৃতির সবচেয়ে শক্তিশালী সুপারফুড, সুবিধাজনক পাউডার আকারে
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
          {/* Left: Product Visual */}
          <div className="relative flex justify-center">
            <div className="relative p-5">
              <img
                src={heroImage}
                alt="অর্গানিক বিটরুট পাউডার পণ্য"
                className="w-full max-w-md rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                loading="lazy" />

              {/* Certified Organic Badge */}
              <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-trust text-trust-foreground flex flex-col items-center justify-center border-4 border-white shadow-soft">
                <Leaf className="h-5 w-5 mb-0.5" />
                <span className="text-[8px] font-bold leading-none font-bangla">অর্গানিক</span>
                <span className="text-[8px] font-bold leading-none font-bangla">সার্টিফাইড</span>
              </div>

              {/* Natural Badge */}
              <div className="absolute bottom-2 left-2 bg-card text-trust rounded-full px-5 py-2 shadow-soft border border-trust/15">
                <span className="font-bangla text-sm font-medium">১০০% প্রাকৃতিক</span>
              </div>
            </div>
          </div>

          {/* Right: Benefits List */}
          <div>
            <div className="mb-8">
              <h3 className="font-bangla text-2xl md:text-[26px] font-semibold text-foreground mb-1">
                যা পাবেন এই পণ্যে:
              </h3>
            </div>

            <div className="space-y-5">
              {benefits.map((benefit, i) =>
              <BenefitItem key={i} {...benefit} />
              )}
            </div>
          </div>
        </div>

        {/* Closing Emphasis */}
        <div className="text-center mt-[60px]">
          <p className="font-bangla text-base md:text-lg font-medium text-trust">
            প্রকৃতির শক্তি, বিজ্ঞান দ্বারা প্রমাণিত
          </p>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto mt-3 rounded-full" />
        </div>
      </div>
    </section>);

};

export default SolutionSection;
