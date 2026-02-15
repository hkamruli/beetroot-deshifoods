import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Package } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

const bundles = [
  {
    name: "২৫০ গ্রাম Jar",
    price: "৮৫০",
    originalPrice: "",
    savings: "",
    highlighted: false,
    badge: "",
  },
  {
    name: "২x৫০০ গ্রাম Jar",
    price: "১,৬০০",
    originalPrice: "৳২,৪০০",
    savings: "৳৮০০ বাঁচান",
    highlighted: true,
    badge: "সবচেয়ে জনপ্রিয়",
  },
  {
    name: "৪x৫০০ গ্রাম Jar",
    price: "২,৯০০",
    originalPrice: "৳৪,৮০০",
    savings: "৳১,৯০০ বাঁচান",
    highlighted: false,
    badge: "সেরা দাম",
  },
];

const STOCK_LEFT = 17;

const PricingSection = () => {
  const { hours, minutes, seconds, isExpired } = useCountdown();

  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background">
      {/* Urgency Banner */}
      <div className="bg-primary rounded-b-xl md:rounded-b-2xl py-4 px-6 text-center mx-auto max-w-[1200px]">
        <p className="font-bangla text-primary-foreground text-base md:text-lg font-bold flex items-center justify-center gap-2">
          <Zap className="h-5 w-5 fill-current" />
          মাত্র ২৪ ঘন্টার মধ্যে অর্ডার করুন — Stock সীমিত!
          <Zap className="h-5 w-5 fill-current" />
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] py-16 md:py-[100px] px-6 md:px-[60px]">
        {/* Headline */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-bangla text-[30px] md:text-[44px] font-bold text-primary mb-4 leading-tight">
            বিশেষ অফার — সীমিত সময়ের জন্য
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            এখনই অর্ডার করুন এবং বাঁচান
          </p>

          {/* Countdown + Stock Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {!isExpired && (
              <div className="inline-flex items-center gap-3 bg-primary/[0.08] border border-primary/20 rounded-xl px-5 py-3">
                <Clock className="h-5 w-5 text-primary animate-pulse" />
                <span className="font-bangla font-bold text-sm text-primary">অফার শেষ হবে:</span>
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary text-primary-foreground font-english font-bold text-lg px-2.5 py-1 rounded-lg min-w-[40px] text-center">{hours}</span>
                  <span className="text-primary font-bold">:</span>
                  <span className="bg-primary text-primary-foreground font-english font-bold text-lg px-2.5 py-1 rounded-lg min-w-[40px] text-center">{minutes}</span>
                  <span className="text-primary font-bold">:</span>
                  <span className="bg-primary text-primary-foreground font-english font-bold text-lg px-2.5 py-1 rounded-lg min-w-[40px] text-center">{seconds}</span>
                </div>
              </div>
            )}

            <div className="inline-flex items-center gap-2.5 bg-destructive/[0.08] border border-destructive/20 rounded-xl px-5 py-3">
              <Package className="h-5 w-5 text-destructive" />
              <span className="font-bangla font-bold text-sm text-destructive">
                মাত্র <span className="font-english text-lg">{STOCK_LEFT}</span> টি বাকি আছে!
              </span>
            </div>
          </div>
        </div>

        {/* Bundle Section */}
        <div className="text-center mb-10">
          <h3 className="font-bangla text-[28px] md:text-[34px] font-bold text-foreground">
            বেশি কিনুন, বেশি বাঁচান
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {bundles.map((bundle, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 md:p-8 text-center flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted ${
                bundle.highlighted
                  ? "bg-card border-[3px] border-primary shadow-[0_8px_24px_rgba(169,29,58,0.2)] md:scale-105"
                  : "bg-card border border-border shadow-soft"
              }`}
            >
              {bundle.badge && (
                <div className={`absolute -top-3 right-4 text-xs font-bold px-4 py-1.5 rounded-full ${
                  bundle.badge === "সবচেয়ে জনপ্রিয়"
                    ? "bg-trust text-trust-foreground"
                    : "bg-primary text-primary-foreground"
                }`}>
                  {bundle.badge}
                </div>
              )}

              <h4 className="font-bangla text-xl md:text-2xl font-bold text-foreground mb-4 mt-1">
                {bundle.name}
              </h4>

              {bundle.originalPrice && (
                <p className="text-muted-foreground text-base line-through mb-2">
                  {bundle.originalPrice}
                </p>
              )}

              <p className="font-bangla text-[34px] md:text-[38px] font-bold text-primary mb-3 leading-none">
                ৳{bundle.price}
              </p>

              {bundle.savings && (
                <span className="inline-block bg-trust/10 text-trust font-bangla text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                  {bundle.savings}
                </span>
              )}

              <div className="mt-auto pt-4">
                <Button
                  variant="outline"
                  className="w-full font-bangla border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl h-12 text-base transition-all duration-200"
                  onClick={scrollToCheckout}
                >
                  এটি নির্বাচন করুন
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
