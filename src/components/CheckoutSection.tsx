import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Zap, Check, Minus, Plus, Info, AlertCircle, CheckCircle2,
  Lock, Wallet, ShieldCheck, Truck, RefreshCcw, ChevronDown,
  Loader2, TrendingDown, AlertTriangle, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const VARIATIONS = [
  { id: "250g", name: "২৫০ গ্রাম Jar", unitPrice: 850, badge: null, badgeColor: "" },
  { id: "500g", name: "৫০০ গ্রাম Jar", unitPrice: 1450, badge: "জনপ্রিয়", badgeColor: "trust" },
  { id: "combo", name: "২x৫০০ গ্রাম Combo", unitPrice: 2600, badge: "সেরা দাম", badgeColor: "primary" },
];

const formatPrice = (n: number) => "৳" + n.toLocaleString("en-IN");

interface FieldError {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

const CheckoutSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedVariation, setSelectedVariation] = useState("500g");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldError>({});
  const [showFormError, setShowFormError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const variation = VARIATIONS.find(v => v.id === selectedVariation)!;
  const subtotal = variation.unitPrice * quantity;
  const discountPct = quantity >= 5 ? 8 : quantity >= 3 ? 5 : 0;
  const discount = Math.round(subtotal * discountPct / 100);
  const total = subtotal - discount;

  const validate = useCallback((): FieldError => {
    const e: FieldError = {};
    if (!name.trim()) e.name = "দয়া করে আপনার নাম লিখুন";
    else if (name.trim().length < 3) e.name = "নাম কমপক্ষে ৩ অক্ষর হতে হবে";

    const cleanPhone = phone.replace(/\s/g, "");
    if (!cleanPhone) e.phone = "Phone নম্বর প্রয়োজন";
    else if (/[^0-9]/.test(cleanPhone)) e.phone = "শুধুমাত্র সংখ্যা লিখুন";
    else if (!cleanPhone.startsWith("01")) e.phone = "নম্বর ০১ দিয়ে শুরু হতে হবে";
    else if (cleanPhone.length !== 11) e.phone = "সঠিক ১১ ডিজিটের নম্বর লিখুন";

    if (email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "সঠিক Email Address লিখুন";
    }

    if (!address.trim()) e.address = "Delivery ঠিকানা প্রয়োজন";
    else if (address.trim().length < 20) e.address = "সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ২০ অক্ষর)";
    else if (!address.includes(",")) e.address = "বাসা, রাস্তা, এলাকা আলাদাভাবে লিখুন (Comma ব্যবহার করুন)";

    return e;
  }, [name, phone, email, address]);

  const fieldValid = useCallback((field: string) => {
    if (!touched[field]) return false;
    const e = validate();
    return !(field in e);
  }, [touched, validate]);

  const handleBlur = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const isFormValid = useMemo(() => {
    const e = validate();
    return Object.keys(e).length === 0;
  }, [validate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, address: true });
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setShowFormError(true);
      return;
    }

    setSubmitting(true);
    setShowFormError(false);

    // Simulate order submission
    await new Promise(r => setTimeout(r, 1800));

    const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    toast({
      title: "Order সফল হয়েছে! 🎉",
      description: `Order নম্বর: ${orderNumber}`,
    });

    navigate(`/thank-you?order=${orderNumber}&product=${encodeURIComponent(variation.name)}&qty=${quantity}&total=${total}`);
  };

  const InputWrapper = ({ field, label, required, optional, helper, children }: {
    field: string; label: string; required?: boolean; optional?: boolean; helper?: string; children: React.ReactNode;
  }) => (
    <div className="space-y-2.5">
      <Label className="font-bangla text-base font-semibold text-foreground flex items-center gap-1.5">
        {label}
        {required && <span className="text-primary">*</span>}
        {optional && <span className="text-muted-foreground text-sm font-normal">(ঐচ্ছিক)</span>}
      </Label>
      <div className="relative">
        {children}
        {touched[field] && fieldValid(field) && (
          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-trust" />
        )}
      </div>
      {touched[field] && errors[field as keyof FieldError] && (
        <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="font-bangla">{errors[field as keyof FieldError]}</span>
        </div>
      )}
      {helper && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 flex-shrink-0" /> <span className="font-bangla">{helper}</span>
        </p>
      )}
    </div>
  );

  const inputClasses = (field: string) =>
    `w-full h-14 px-5 rounded-[10px] border-2 font-bangla text-base transition-all duration-200 outline-none
    ${touched[field] && errors[field as keyof FieldError]
      ? "border-destructive bg-destructive/[0.04] shadow-[0_0_0_4px_rgba(220,38,38,0.08)]"
      : touched[field] && fieldValid(field)
        ? "border-trust bg-white"
        : "border-transparent bg-secondary hover:border-primary/20 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(169,29,58,0.1)]"
    }`;

  // Order summary component
  const OrderSummary = () => (
    <div className="space-y-5">
      {/* Product Row */}
      <div className="bg-white rounded-xl p-4 shadow-soft border border-border/50 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bangla font-semibold text-foreground text-[15px] leading-snug">{variation.name}</p>
            <span className="inline-block mt-1.5 font-bangla text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
              পরিমাণ: × {quantity}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-body">{formatPrice(variation.unitPrice)} × {quantity}</p>
            <p className="font-bangla font-bold text-xl text-primary mt-1 transition-all duration-300">{formatPrice(subtotal)}</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="border-t border-border/60 pt-5 space-y-3.5">
        <div className="flex justify-between items-center">
          <span className="font-body text-[15px] text-muted-foreground">Subtotal:</span>
          <span className="font-bangla font-semibold text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-body text-[15px] text-muted-foreground">Delivery চার্জ:</span>
          <div className="flex items-center gap-2">
            <span className="font-bangla font-bold text-trust">Free</span>
            <span className="font-body text-xs text-muted-foreground/60 line-through">৳৮০</span>
          </div>
        </div>
        {discountPct > 0 && (
          <div className="flex justify-between items-center animate-fade-in">
            <span className="font-body text-[15px] text-muted-foreground">Bulk ছাড় ({discountPct}%):</span>
            <span className="font-bangla font-bold text-trust">- {formatPrice(discount)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t-2 border-primary/30 pt-5">
        <div className="flex justify-between items-baseline">
          <span className="font-bangla font-bold text-xl text-foreground">মোট:</span>
          <span className="font-bangla font-bold text-3xl md:text-4xl text-primary transition-all duration-300">{formatPrice(total)}</span>
        </div>
        {discount > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 bg-trust/10 border border-trust/25 rounded-2xl py-3 px-4 animate-fade-in">
            <TrendingDown className="h-4 w-4 text-trust" />
            <span className="font-bangla font-bold text-sm text-trust">আপনি {formatPrice(discount)} বাঁচালেন!</span>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="bg-trust/[0.06] border border-trust/20 rounded-[10px] p-3.5 mt-4">
        <div className="flex items-center gap-2.5">
          <Wallet className="h-5 w-5 text-trust" />
          <span className="font-body font-semibold text-[15px] text-trust">Cash on Delivery</span>
        </div>
        <p className="font-body text-xs text-muted-foreground mt-1.5 pl-[30px]">Delivery-র সময় টাকা দিন</p>
      </div>
    </div>
  );

  return (
    <section id="checkout" className="py-16 md:py-24 px-4 md:px-10 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-t-2xl py-5 px-7 text-center">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-primary-foreground animate-pulse" />
            <span className="font-bangla font-bold text-lg text-primary-foreground">
              ⚡ Stock সীমিত - আজই Order করুন
            </span>
            <Zap className="h-5 w-5 text-primary-foreground animate-pulse" />
          </div>
        </div>

        {/* Main Layout */}
        <div className="bg-white rounded-b-2xl shadow-[0_12px_48px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left Column: Form (3/5) */}
            <div className="lg:col-span-3 p-8 md:p-11 order-2 lg:order-1">

              {/* Mobile Summary Accordion */}
              <div className="lg:hidden mb-8">
                <button
                  onClick={() => setSummaryOpen(!summaryOpen)}
                  className="w-full flex items-center justify-between bg-secondary border-2 border-primary/20 rounded-xl px-5 py-4 cursor-pointer"
                >
                  <span className="font-bangla font-bold text-lg">Order সারসংক্ষেপ</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bangla font-bold text-xl text-primary">{formatPrice(total)}</span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${summaryOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-out ${summaryOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-secondary border-2 border-t-0 border-primary/20 rounded-b-xl p-5 -mt-3 pt-6">
                    <OrderSummary />
                  </div>
                </div>
              </div>

              {/* Form Error Alert */}
              {showFormError && Object.keys(errors).length > 0 && (
                <div className="bg-destructive/[0.08] border-2 border-destructive rounded-xl p-4 mb-6 flex items-start gap-3 animate-[shake_300ms_ease-in-out]">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bangla font-bold text-destructive">Form-এ কিছু ভুল আছে</p>
                    <p className="font-body text-sm text-destructive">দয়া করে নিচের লাল চিহ্নিত ঘরগুলো সংশোধন করুন</p>
                  </div>
                  <button onClick={() => setShowFormError(false)} className="text-destructive hover:opacity-70">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              <h2 className="font-bangla text-2xl md:text-3xl font-bold text-foreground mb-3">
                আপনার Order সম্পূর্ণ করুন
              </h2>
              <p className="font-body text-[15px] text-muted-foreground mb-9">
                নিচের তথ্য সঠিকভাবে পূরণ করুন। পণ্য হাতে পেয়ে টাকা দিন।
              </p>

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Product Variation */}
                <div className="space-y-3.5">
                  <Label className="font-bangla text-base font-semibold text-foreground">
                    আপনার Package নির্বাচন করুন <span className="text-primary">*</span>
                  </Label>
                  {VARIATIONS.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => { setSelectedVariation(v.id); setQuantity(1); }}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
                        ${selectedVariation === v.id
                          ? "border-primary bg-white shadow-[0_4px_12px_rgba(169,29,58,0.15)]"
                          : "border-transparent bg-secondary hover:border-primary/25 hover:bg-primary/[0.04]"
                        }`}
                    >
                      {/* Radio */}
                      <div className={`flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedVariation === v.id ? "border-primary bg-primary" : "border-muted-foreground/40"}`}>
                        {selectedVariation === v.id && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {v.badge && (
                          <span className={`inline-block text-[11px] font-bangla font-semibold px-2.5 py-0.5 rounded-full mb-1.5
                            ${v.badgeColor === "trust" ? "bg-trust/10 text-trust" : "bg-primary/10 text-primary"}`}>
                            {v.badge}
                          </span>
                        )}
                        <p className="font-bangla font-semibold text-[17px] text-foreground">{v.name}</p>
                        <p className="font-bangla font-bold text-lg text-primary mt-1">{formatPrice(v.unitPrice)}/টি</p>
                      </div>
                      {/* Quantity Selector */}
                      {selectedVariation === v.id && (
                        <div className="flex items-center bg-secondary border border-border rounded-lg p-1.5 gap-1" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-9 h-9 flex items-center justify-center bg-white rounded-md border border-border/50 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-muted active:enabled:scale-95 transition-all"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[40px] text-center font-english font-bold text-[17px]">{quantity}</span>
                          <button
                            type="button"
                            disabled={quantity >= 10}
                            onClick={() => setQuantity(q => Math.min(10, q + 1))}
                            className="w-9 h-9 flex items-center justify-center bg-white rounded-md border border-border/50 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-muted active:enabled:scale-95 transition-all"
                          >
                            <Plus className="h-4 w-4 text-trust" />
                          </button>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Name */}
                <InputWrapper field="name" label="আপনার পূর্ণ নাম" required helper="শুধুমাত্র আপনার আসল নাম ব্যবহার করুন">
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="উদাহরণ: আব্দুল রহমান"
                    value={name}
                    onChange={e => { setName(e.target.value); if (touched.name) setErrors(validate()); }}
                    onBlur={() => handleBlur("name")}
                    className={inputClasses("name")}
                    maxLength={100}
                  />
                </InputWrapper>

                {/* Phone */}
                <InputWrapper field="phone" label="Phone নম্বর (১১ ডিজিট)" required helper="যেমন: 01712345678, 01812345678">
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="০১৭১২৩৪৫৬৭৮"
                    value={phone}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                      setPhone(raw);
                      if (touched.phone) setErrors(validate());
                    }}
                    onBlur={() => handleBlur("phone")}
                    className={inputClasses("phone")}
                    maxLength={11}
                  />
                </InputWrapper>

                {/* Email */}
                <InputWrapper field="email" label="Email Address" optional helper="Order Confirmation এর জন্য Email পাবেন">
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (touched.email) setErrors(validate()); }}
                    onBlur={() => handleBlur("email")}
                    className={inputClasses("email")}
                  />
                </InputWrapper>

                {/* Address */}
                <div className="space-y-2.5">
                  <Label className="font-bangla text-base font-semibold text-foreground flex items-center gap-1.5">
                    সম্পূর্ণ Delivery ঠিকানা <span className="text-primary">*</span>
                  </Label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      placeholder={"বাসা/ফ্ল্যাট নং, রাস্তা, এলাকা, জেলা\n\nউদাহরণ:\nফ্ল্যাট ৪বি, বাড়ি ১২, রোড ৭\nধানমন্ডি, ঢাকা - ১২০৯"}
                      value={address}
                      onChange={e => { setAddress(e.target.value.slice(0, 300)); if (touched.address) setErrors(validate()); }}
                      onBlur={() => handleBlur("address")}
                      maxLength={300}
                      className={`w-full min-h-[140px] max-h-[300px] px-5 py-4 rounded-[10px] border-2 font-bangla text-base leading-relaxed resize-y transition-all duration-200 outline-none
                        ${touched.address && errors.address
                          ? "border-destructive bg-destructive/[0.04]"
                          : touched.address && fieldValid("address")
                            ? "border-trust bg-white"
                            : "border-transparent bg-secondary hover:border-primary/20 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(169,29,58,0.1)]"
                        }`}
                    />
                    <span className={`absolute bottom-3 right-4 text-xs font-body px-2 py-0.5 rounded-md bg-white shadow-sm
                      ${address.length >= 20 ? "text-trust" : "text-muted-foreground"}`}>
                      {address.length}/২০ অক্ষর
                    </span>
                  </div>
                  {touched.address && errors.address && (
                    <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="font-bangla">{errors.address}</span>
                    </div>
                  )}
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="font-bangla">Courier সঠিকভাবে পৌঁছাতে বিস্তারিত ঠিকানা দিন</span>
                  </p>
                </div>

                {/* Payment Method (Locked) */}
                <div className="space-y-2.5">
                  <Label className="font-bangla text-base font-semibold text-foreground">Payment পদ্ধতি</Label>
                  <div className="flex items-center h-14 px-5 rounded-[10px] border-2 border-trust/25 bg-trust/[0.08] cursor-not-allowed">
                    <Lock className="h-5 w-5 text-trust" />
                    <span className="font-bangla font-semibold text-[17px] text-trust mx-auto">Cash on Delivery (COD)</span>
                    <CheckCircle2 className="h-5 w-5 text-trust" />
                  </div>
                  <div className="flex items-center gap-2 bg-trust/[0.04] border border-trust/15 rounded-lg p-3">
                    <ShieldCheck className="h-4 w-4 text-trust flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">পণ্য হাতে পেয়ে নিরাপদে টাকা দিন। কোনো Advance Payment লাগবে না।</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className={`w-full h-16 md:h-[64px] rounded-xl text-lg font-bangla font-bold shadow-cta transition-all duration-250
                    ${isFormValid && !submitting
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-cta-hover active:scale-[0.98]"
                      : submitting
                        ? "bg-primary text-primary-foreground cursor-wait"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-60 shadow-soft"
                    }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Order প্রক্রিয়াধীন...
                    </>
                  ) : (
                    "Order নিশ্চিত করুন - ১০০% ঝুঁকিমুক্ত"
                  )}
                </Button>

                {!isFormValid && !submitting && (
                  <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                    <Info className="h-4 w-4" />
                    <span className="font-bangla">সব ঘর সঠিকভাবে পূরণ করুন</span>
                  </p>
                )}

                {/* Trust Icons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  {[
                    { icon: ShieldCheck, text: "সুরক্ষিত" },
                    { icon: Truck, text: "Free Delivery" },
                    { icon: RefreshCcw, text: "Return Guarantee" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-trust/[0.06] border border-trust/15 rounded-full px-4 py-2.5 min-h-[44px]">
                      <Icon className="h-4 w-4 text-trust" />
                      <span className="font-body text-[13px] text-trust">{text}</span>
                    </div>
                  ))}
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-2 bg-secondary border-l border-border/40 order-1 lg:order-2">
              <div className="sticky top-24 p-8">
                <h3 className="font-bangla font-bold text-xl text-foreground border-b-2 border-border/60 pb-4 mb-5">
                  Order সারসংক্ষেপ
                </h3>
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
