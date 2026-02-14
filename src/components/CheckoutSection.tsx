import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Truck, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CheckoutSection = () => {
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState("3-month");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const packs = [
  { id: "1-month", label: "১ মাস (১৫০g)", price: "৫৯৯" },
  { id: "3-month", label: "৩ মাস (৪৫০g)", price: "১,৪৯৯" },
  { id: "6-month", label: "৬ মাস (৯০০g)", price: "২,৪৯৯" }];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "সব তথ্য দিন",
        description: "অনুগ্রহ করে সকল তথ্য পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "অর্ডার সফল হয়েছে! 🎉",
      description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।"
    });
    setFormData({ name: "", phone: "", address: "" });
  };

  return (
    <section id="checkout" className="section-padding bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-foreground mb-4">
            এখনই অর্ডার করুন
          </h2>
          <p className="font-bangla text-lg text-muted-foreground">
            ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা দিন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 md:p-10 shadow-soft space-y-6">

          {/* Pack Selection */}
          <div className="space-y-3">
            <Label className="font-bangla text-base font-semibold">প্যাকেজ নির্বাচন করুন</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packs.map((pack) =>
              <button
                key={pack.id}
                type="button"
                onClick={() => setSelectedPack(pack.id)}
                className={`rounded-xl p-4 text-center transition-all duration-200 border-2 ${
                selectedPack === pack.id ?
                "border-primary bg-primary/5 shadow-soft" :
                "border-border bg-background hover:border-primary/30"}`
                }>

                  <p className="font-bangla text-sm text-foreground font-bold">{pack.label}</p>
                  <p className="font-bangla text-lg font-bold text-primary mt-1">৳{pack.price}</p>
                </button>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bangla text-base">আপনার নাম</Label>
            <Input
              id="name"
              placeholder="আপনার পুরো নাম লিখুন"
              className="h-12 rounded-xl font-bangla text-base bg-background"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-bangla text-base">মোবাইল নম্বর</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="০১XXXXXXXXX"
              className="h-12 rounded-xl font-bangla text-base bg-background"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="font-bangla text-base">ডেলিভারি ঠিকানা</Label>
            <Input
              id="address"
              placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
              className="h-12 rounded-xl font-bangla text-base bg-background"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

          </div>

          <Button variant="cta" size="cta" type="submit" className="w-full font-bangla">
            ক্যাশ অন ডেলিভারিতে অর্ডার করুন
          </Button>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              <span className="font-bangla font-bold">নিরাপদ অর্ডার</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              <span className="font-bangla font-bold">সারাদেশে ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span className="font-bangla font-bold">১০০% গ্যারান্টি</span>
            </div>
          </div>
        </form>
      </div>
    </section>);

};

export default CheckoutSection;