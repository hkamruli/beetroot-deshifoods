import { BatteryLow, AlertTriangle, Salad } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const problems = [
  {
    icon: BatteryLow,
    titleBn: "সারাদিন ক্লান্ত লাগছে?",
    descBn: "দুপুরের পর থেকেই শক্তি শেষ? কাজে বা পরিবারের সাথে সময় দিতে পারছেন না?",
  },
  {
    icon: AlertTriangle,
    titleBn: "কেমিক্যাল সাপ্লিমেন্ট নিয়ে চিন্তিত?",
    descBn: "এনার্জি ড্রিংকে কৃত্রিম উপাদান ও অজানা পার্শ্বপ্রতিক্রিয়ায় ক্লান্ত?",
  },
  {
    icon: Salad,
    titleBn: "পর্যাপ্ত শাকসবজি খাচ্ছেন না?",
    descBn: "প্রতিদিন কাঁচা বিটরুট খাওয়া কঠিন? আমাদের কাছে আছে নিখুঁত সমাধান।",
  },
];

const ProblemCard = ({
  icon: Icon,
  titleBn,
  descBn,
}: {
  icon: LucideIcon;
  titleBn: string;
  descBn: string;
}) => (
  <div className="group bg-card rounded-2xl p-10 md:p-8 border border-foreground/[0.06] shadow-soft hover:shadow-lifted hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 text-center">
    <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
      <Icon className="h-10 w-10 md:h-12 md:w-12 text-primary" strokeWidth={1.5} />
    </div>
    <h3 className="font-bangla text-xl md:text-[22px] lg:text-2xl font-semibold text-foreground mb-3">
      {titleBn}
    </h3>
    <p className="font-bangla text-[15px] md:text-base text-muted-foreground leading-relaxed">
      {descBn}
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
          <p className="font-bangla text-base md:text-lg text-muted-foreground">
            প্রতিদিন হাজারো মানুষ এই সমস্যায় ভুগছেন
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
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
