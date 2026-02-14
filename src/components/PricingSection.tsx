import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Gift } from "lucide-react";

const packages = [
{
  name: "১ মাসের প্যাক",
  subtitle: "ট্রায়াল প্যাক",
  quantity: "১টি (১৫০ গ্রাম)",
  price: "৫৯৯",
  originalPrice: "৭৯৯",
  savings: "২০০",
  popular: false
},
{
  name: "৩ মাসের প্যাক",
  subtitle: "সবচেয়ে জনপ্রিয়",
  quantity: "৩টি (৪৫০ গ্রাম)",
  price: "১,৪৯৯",
  originalPrice: "২,৩৯৭",
  savings: "৮৯৮",
  popular: true
},
{
  name: "৬ মাসের প্যাক",
  subtitle: "সর্বোচ্চ সাশ্রয়",
  quantity: "৬টি (৯০০ গ্রাম)",
  price: "২,৪৯৯",
  originalPrice: "৪,৭৯৪",
  savings: "২,২৯৫",
  popular: false
}];


const PricingSection = () => {
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-foreground mb-4">
            আপনার জন্য সেরা প্যাকেজ বেছে নিন
          </h2>
          <p className="font-bangla text-lg text-muted-foreground">
            বেশি নিলে বেশি সাশ্রয় — ক্যাশ অন ডেলিভারি
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, i) =>
          <div
            key={i}
            className={`relative bg-background rounded-2xl p-8 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col ${
            pkg.popular ? "ring-2 ring-primary scale-[1.02]" : ""}`
            }>

              {pkg.popular &&
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-bangla text-sm font-semibold px-4 py-1 rounded-full">
                  সবচেয়ে জনপ্রিয়
                </div>
            }

              <div className="text-center mb-6">
                <h3 className="font-bangla text-xl font-bold text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="font-bangla text-sm text-muted-foreground">{pkg.quantity}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="font-bangla text-4xl font-bold text-primary">৳{pkg.price}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="font-bangla text-sm text-muted-foreground line-through">
                    ৳{pkg.originalPrice}
                  </span>
                  <span className="font-bangla text-sm font-semibold text-trust bg-trust-light px-2 py-0.5 rounded-full">
                    ৳{pkg.savings} সাশ্রয়
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="h-4 w-4 text-trust flex-shrink-0" />
                  <span className="font-bangla font-bold">১০০% অর্গানিক বিটরুট</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Truck className="h-4 w-4 text-trust flex-shrink-0" />
                  <span className="font-bangla">ফ্রি ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Gift className="h-4 w-4 text-trust flex-shrink-0" />
                  <span className="font-bangla">রেসিপি গাইড ফ্রি</span>
                </div>
              </div>

              <Button
              variant="cta"
              size="cta-sm"
              className="w-full font-bangla"
              onClick={scrollToCheckout}>

                এখনই অর্ডার করুন
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default PricingSection;