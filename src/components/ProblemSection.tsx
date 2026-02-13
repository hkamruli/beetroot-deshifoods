import { Zap, AlertTriangle, Pill, Salad } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "সারাদিন ক্লান্তি?",
    desc: "অফিস বা জিমে এনার্জি পাচ্ছেন না? রাসায়নিক এনার্জি ড্রিংক শরীরের ক্ষতি করছে।",
  },
  {
    icon: AlertTriangle,
    title: "উচ্চ রক্তচাপ?",
    desc: "প্রতিদিন ওষুধ খেতে হচ্ছে? পার্শ্বপ্রতিক্রিয়া নিয়ে চিন্তিত?",
  },
  {
    icon: Pill,
    title: "রাসায়নিক সাপ্লিমেন্ট?",
    desc: "কৃত্রিম ভিটামিন ও সাপ্লিমেন্টে বিশ্বাস করেন না? প্রাকৃতিক বিকল্প খুঁজছেন?",
  },
  {
    icon: Salad,
    title: "পর্যাপ্ত সবজি খান না?",
    desc: "ব্যস্ত জীবনে প্রতিদিন তাজা বিটরুট খাওয়া কঠিন। সহজ সমাধান দরকার?",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-foreground mb-4">
            আপনিও কি এই সমস্যায় ভুগছেন?
          </h2>
          <p className="font-bangla text-lg text-muted-foreground max-w-2xl mx-auto">
            আপনি একা নন। লক্ষ লক্ষ বাঙালি প্রতিদিন এই সমস্যাগুলোর মুখোমুখি হচ্ছেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <problem.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bangla text-xl font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="font-bangla text-base text-muted-foreground leading-relaxed">
                    {problem.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <p className="font-bangla text-xl md:text-2xl font-semibold text-primary">
            একটি প্রাকৃতিক সমাধান আছে...
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
