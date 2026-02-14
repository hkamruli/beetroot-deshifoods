import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Phone, Truck, Package, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    num: "১",
    title: "Phone Confirmation",
    desc: "২৪ ঘন্টার মধ্যে আমরা আপনাকে Phone করে Order নিশ্চিত করব",
  },
  {
    icon: Truck,
    num: "২",
    title: "পণ্য পাঠানো",
    desc: "২-৩ কার্যদিবসের মধ্যে পণ্য পাঠানো হবে",
  },
  {
    icon: Package,
    num: "৩",
    title: "Delivery ও Payment",
    desc: "পণ্য হাতে পেয়ে যাচাই করে টাকা দিন",
  },
];

const ThankYou = () => {
  const [params] = useSearchParams();
  const order = params.get("order") || "ORD-XXXXXXXX-XXXX";
  const product = params.get("product") || "Organic বিটরুট পাউডার";
  const qty = params.get("qty") || "1";
  const total = params.get("total") || "0";

  const details = [
    { label: "Order নম্বর:", value: order, highlight: true, mono: true },
    { label: "পণ্য:", value: product },
    { label: "পরিমাণ:", value: `${qty}টি` },
    { label: "মোট মূল্য:", value: `৳${Number(total).toLocaleString("en-IN")}`, highlight: true },
    { label: "Payment পদ্ধতি:", value: "Cash on Delivery", icon: Wallet },
  ];

  return (
    <main className="min-h-screen bg-secondary py-16 md:py-20 px-4 md:px-10">
      <div className="max-w-[800px] mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-trust/10 rounded-full p-6 shadow-[0_8px_24px_rgba(45,80,22,0.15)] animate-scale-in">
            <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-trust" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-bangla text-3xl md:text-[42px] font-bold text-foreground text-center mb-4 leading-tight">
          Order সফলভাবে সম্পন্ন হয়েছে! 🎉
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground text-center mb-12 leading-relaxed max-w-xl mx-auto">
          আপনার Order-এর জন্য ধন্যবাদ। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।
        </p>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-7 md:p-9 shadow-lifted mb-12">
          <h2 className="font-bangla font-bold text-2xl text-foreground border-b-2 border-secondary pb-4 mb-6">
            আপনার Order বিবরণ
          </h2>
          <div className="space-y-5">
            {details.map(({ label, value, highlight, mono, icon: Icon }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="font-bangla text-[15px] text-muted-foreground">{label}</span>
                <span className={`font-bangla font-semibold flex items-center gap-2
                  ${mono ? "font-english font-mono text-[17px]" : "text-base"}
                  ${highlight ? "text-primary bg-primary/[0.05] px-3 py-1 rounded-md" : "text-foreground"}
                  ${label.includes("মোট") ? "text-xl md:text-2xl font-bold" : ""}`}>
                  {Icon && <Icon className="h-4 w-4 text-trust" />}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens Next */}
        <h2 className="font-bangla font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
          এরপর কী হবে?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map(({ icon: Icon, num, title, desc }) => (
            <div key={num} className="bg-white border border-border/50 rounded-xl p-7 text-center shadow-soft relative">
              <div className="relative inline-flex mb-4">
                <div className="bg-primary/10 rounded-full p-4">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-english font-bold text-sm border-2 border-white">
                  {num}
                </span>
              </div>
              <h3 className="font-bangla font-semibold text-lg text-foreground mb-2">{title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-trust/[0.08] border-[1.5px] border-trust rounded-xl p-6 text-center mb-10">
          <ShieldCheck className="h-8 w-8 text-trust mx-auto mb-3" />
          <p className="font-bangla font-semibold text-[17px] text-trust">
            আপনার Order সম্পূর্ণ নিরাপদ এবং সুরক্ষিত
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="cta" size="cta" className="font-bangla w-full sm:w-auto">
            <Link to="/">Home Page-এ ফিরুন</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bangla w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/[0.05]">
            <a href="tel:+8801712345678">Support-এ যোগাযোগ করুন</a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
