import { Heart, Dumbbell, Droplets, CheckCircle, ShieldCheck, Award } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "রক্তচাপ নিয়ন্ত্রণ",
    desc: "প্রাকৃতিক নাইট্রেট রক্তনালী প্রসারিত করে রক্তচাপ স্বাভাবিক রাখে।",
  },
  {
    icon: Dumbbell,
    title: "স্ট্যামিনা ও এনার্জি",
    desc: "ব্যায়ামের সময় অক্সিজেন সরবরাহ বাড়ায়, শারীরিক কর্মক্ষমতা উন্নত করে।",
  },
  {
    icon: Droplets,
    title: "রক্ত পরিশোধন",
    desc: "আয়রন ও ফলিক অ্যাসিড সমৃদ্ধ - রক্তস্বল্পতা দূর করে, হিমোগ্লোবিন বাড়ায়।",
  },
];

const certifications = [
  { icon: ShieldCheck, label: "BSTI Certified" },
  { icon: Award, label: "100% Organic" },
  { icon: CheckCircle, label: "Lab Tested" },
];

const SolutionSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-trust-light px-4 py-2 text-sm font-medium text-trust mb-6">
            <CheckCircle className="h-4 w-4" />
            <span className="font-english">100% Natural Solution</span>
          </div>
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-foreground mb-4">
            কেন <span className="text-primary">বিটরুট পাউডার</span>?
          </h2>
          <p className="font-bangla text-lg text-muted-foreground max-w-2xl mx-auto">
            গবেষণায় প্রমাণিত — বিটরুট প্রকৃতির অন্যতম শক্তিশালী সুপারফুড।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="text-center bg-background rounded-2xl p-8 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bangla text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="font-bangla text-base text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12 md:mt-16">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full bg-trust-light px-5 py-2.5 text-sm font-medium text-trust"
            >
              <cert.icon className="h-4 w-4" />
              <span className="font-english">{cert.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
