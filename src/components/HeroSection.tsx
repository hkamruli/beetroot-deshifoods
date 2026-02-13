import { Button } from "@/components/ui/button";
import { Shield, Truck, Leaf } from "lucide-react";
import heroImage from "@/assets/beetroot-hero.jpg";

const HeroSection = () => {
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-card section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-trust-light px-4 py-2 text-sm font-medium text-trust">
              <Leaf className="h-4 w-4" />
              <span className="font-bangla">১০০% অর্গানিক ও প্রাকৃতিক</span>
            </div>

            <h1 className="font-bangla text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              প্রাকৃতিক উপায়ে{" "}
              <span className="text-primary">স্ট্যামিনা বাড়ান</span>,{" "}
              <span className="text-trust">রক্তচাপ নিয়ন্ত্রণ</span> করুন
            </h1>

            <p className="font-bangla text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              রাসায়নিক সাপ্লিমেন্ট ছাড়াই বিটরুট পাউডারে পান প্রাকৃতিক শক্তি। 
              সহজে খান, সুস্থ থাকুন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="cta" onClick={scrollToCheckout} className="font-bangla">
                এখনই অর্ডার করুন
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-trust" />
                <span className="font-bangla">১০০% রিস্ক ফ্রি</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-trust" />
                <span className="font-bangla">ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-5 w-5 text-trust" />
                <span className="font-bangla">BSTI অনুমোদিত</span>
              </div>
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl" />
              <img
                src={heroImage}
                alt="অর্গানিক বিটরুট পাউডার"
                className="relative w-80 md:w-96 lg:w-[28rem] rounded-2xl shadow-lifted animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
