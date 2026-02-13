import { BatteryLow, AlertTriangle, Salad } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const problems = [
  {
    icon: BatteryLow,
    titleBn: "সারাদিন ক্লান্ত লাগছে?",
    titleEn: "Feeling Tired All Day?",
    descBn: "দুপুরের পর থেকেই শক্তি শেষ? কাজে বা পরিবারের সাথে সময় দিতে পারছেন না?",
    descEn: "Drained by afternoon? Struggling to keep up with work and family responsibilities?",
  },
  {
    icon: AlertTriangle,
    titleBn: "কেমিক্যাল সাপ্লিমেন্ট নিয়ে চিন্তিত?",
    titleEn: "Worried About Chemical Supplements?",
    descBn: "এনার্জি ড্রিংকে কৃত্রিম উপাদান ও অজানা পার্শ্বপ্রতিক্রিয়ায় ক্লান্ত?",
    descEn: "Tired of artificial ingredients and unknown side effects in energy drinks and medications?",
  },
  {
    icon: Salad,
    titleBn: "পর্যাপ্ত শাকসবজি খাচ্ছেন না?",
    titleEn: "Not Getting Enough Vegetables?",
    descBn: "প্রতিদিন কাঁচা বিটরুট খাওয়া কঠিন? আমাদের কাছে আছে নিখুঁত সমাধান।",
    descEn: "Difficult to consume raw beetroot daily? We have the perfect solution for you.",
  },
];

const ProblemCard = ({
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
  <div className="group bg-card rounded-2xl p-10 md:p-8 border border-foreground/[0.06] shadow-soft hover:shadow-lifted hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 text-center">
    <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
      <Icon className="h-10 w-10 md:h-12 md:w-12 text-primary" strokeWidth={1.5} />
    </div>
    <h3 className="font-bangla text-xl md:text-[22px] lg:text-2xl font-semibold text-foreground mb-1">
      {titleBn}
    </h3>
    <p className="font-english text-xs text-muted-foreground mb-3">{titleEn}</p>
    <p className="font-bangla text-[15px] md:text-base text-muted-foreground leading-relaxed">
      {descBn}
    </p>
    <p className="font-english text-xs text-muted-foreground mt-1.5 leading-relaxed italic">
      {descEn}
    </p>
  </div>
);

const ProblemSection = () => {
  return (
    <section className="bg-card py-[60px] md:py-[100px] px-10 md:px-[60px]">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Headline */}
        <div className="text-center mb-[60px]">
          <h2 className="font-bangla text-[28px] md:text-[40px] lg:text-[48px] font-bold text-foreground mb-4">
            এই সমস্যাগুলো কি আপনারও আছে?
          </h2>
          <p className="font-english text-sm md:text-base text-muted-foreground mb-2">
            Are These Your Struggles Too?
          </p>
          <p className="font-bangla text-base md:text-lg text-muted-foreground">
            প্রতিদিন হাজারো মানুষ এই সমস্যায় ভুগছেন
          </p>
          <p className="font-english text-xs md:text-sm text-muted-foreground mt-1">
            Thousands struggle with these issues daily
          </p>
        </div>

        {/* Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {problems.map((problem, i) => (
            <ProblemCard key={i} {...problem} />
          ))}
        </div>

        {/* Transition Element */}
        <div className="text-center mt-[60px]">
          <p className="font-bangla text-xl md:text-[22px] font-medium italic text-trust">
            কিন্তু একটি প্রাকৃতিক সমাধান আছে...
          </p>
          <p className="font-english text-sm text-trust/70 mt-1 italic">
            But there's a natural solution...
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
