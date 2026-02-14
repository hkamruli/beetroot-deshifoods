import { Star, MapPin, BadgeCheck, Leaf, Moon, Shield, Sprout, ShieldCheck, PackageCheck, Truck, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
{
  name: "ফাতিমা রহমান",
  location: "ঢাকা, বাংলাদেশ",
  rating: 5,
  review: "মাত্র এক সপ্তাহেই আমার Energy লেভেল অনেক বেড়ে গেছে! সকালের Smoothie-তে মিশিয়ে খাই, সারাদিন ভালো লাগে। পরিবারের সবাই এখন এটা খায়।",
  img: 5
},
{
  name: "মোহাম্মদ কামাল",
  location: "চট্টগ্রাম, বাংলাদেশ",
  rating: 5,
  review: "BP এর সমস্যার জন্য ডাক্তার অনেক ওষুধ দিয়েছিলেন। এই বিটরুট পাউডার খাওয়ার পর থেকে BP অনেক Control-এ আছে। প্রাকৃতিক সমাধান পেয়ে খুব খুশি।",
  img: 12
},
{
  name: "নুসরাত জাহান",
  location: "সিলেট, বাংলাদেশ",
  rating: 5,
  review: "দুর্দান্ত পণ্য! খেতে সুবিধাজনক এবং আমার পরিবার এটা পছন্দ করে। তিন মাস ধরে খাচ্ছি, ফলাফল চমৎকার। দ্বিতীয় Jar Order করলাম।",
  img: 20
},
{
  name: "রাকিব হোসেন",
  location: "রাজশাহী, বাংলাদেশ",
  rating: 4,
  review: "Gym-এ যাওয়ার আগে এক গ্লাস বিটরুট Juice খাই। Energy Boost পাই এবং Workout ভালো হয়। স্ট্যামিনা অনেক বেড়েছে। সবাইকে Recommend করি।",
  img: 33
},
{
  name: "সাবিনা আক্তার",
  location: "খুলনা, বাংলাদেশ",
  rating: 5,
  review: "আমার বয়স ৫৫, সব সময় ক্লান্ত থাকতাম। বিটরুট পাউডার খাওয়া শুরু করার পর শক্তি ফিরে পেয়েছি। ঘরের কাজ করতে এখন আর কষ্ট হয় না।",
  img: 47
},
{
  name: "তানভীর আহমেদ",
  location: "বরিশাল, বাংলাদেশ",
  rating: 5,
  review: "১০০% Organic এবং কোনো Chemical নেই, এটাই সবচেয়ে বড় কারণ আমি এটা কিনেছি। স্বাস্থ্যের জন্য দারুণ। Cash on Delivery-ও খুব সুবিধাজনক ছিল।",
  img: 8
},
{
  name: "রুমানা বেগম",
  location: "ময়মনসিংহ, বাংলাদেশ",
  rating: 5,
  review: "আমার স্বামীর Diabetes আছে, তাই চিনি ছাড়া এই পণ্য খুঁজছিলাম। বিটরুট পাউডার পেয়ে খুশি। রক্তে আয়রনের পরিমাণও বেড়েছে।",
  img: 25
},
{
  name: "শাহরিয়ার কবীর",
  location: "নারায়ণগঞ্জ, বাংলাদেশ",
  rating: 5,
  review: "Office-এ সারাদিন বসে কাজ করি, দুপুরের পর খুব ক্লান্তি আসত। এখন Lunch-এর সাথে বিটরুট Juice খাই, বিকেলেও Energy থাকে। চমৎকার Product!",
  img: 15
},
{
  name: "তাসনিম জাহান",
  location: "কুমিল্লা, বাংলাদেশ",
  rating: 4,
  review: "প্রথমে সন্দেহ ছিল কিন্তু ব্যবহার করে ভালো ফলাফল পেয়েছি। ত্বকেও উজ্জ্বলতা এসেছে। দাম একটু বেশি মনে হলেও Quality ভালো।",
  img: 38
},
{
  name: "আবুল কালাম",
  location: "রংপুর, বাংলাদেশ",
  rating: 5,
  review: "আমি ৬২ বছর বয়সী, BP এবং Cholesterol-এর সমস্যা ছিল। তিন মাস ধরে নিয়মিত খাচ্ছি, Report অনেক ভালো এসেছে। ডাক্তারও খুশি।",
  img: 42
},
{
  name: "সুমাইয়া খান",
  location: "যশোর, বাংলাদেশ",
  rating: 5,
  review: "বাচ্চাদের শাকসবজি খাওয়ানো খুব কষ্ট ছিল। এখন তাদের দুধে বিটরুট পাউডার মিশিয়ে দিই। তারা খুশি মনে খায় এবং স্বাস্থ্যকরও।",
  img: 29
},
{
  name: "মাহমুদ হাসান",
  location: "পাবনা, বাংলাদেশ",
  rating: 5,
  review: "Cricket খেলি, তাই Stamina দরকার। Coach বিটরুট খেতে বলেছিলেন কিন্তু কাঁচা খাওয়া কঠিন। এই Powder সব সমস্যার সমাধান করেছে।",
  img: 51
},
{
  name: "নাজমা বেগম",
  location: "দিনাজপুর, বাংলাদেশ",
  rating: 5,
  review: "আমার রক্তশূন্যতা ছিল, সবসময় দুর্বল লাগত। ডাক্তার বিটরুট খেতে বলেছিলেন। এই Organic পাউডার খাওয়ার পর Hemoglobin স্বাভাবিক হয়েছে।",
  img: 18
},
{
  name: "ফয়সাল আহমেদ",
  location: "গাজীপুর, বাংলাদেশ",
  rating: 5,
  review: "প্রতিদিন সকালে এক গ্লাস বিটরুট Juice খাই। হজম ভালো হয়েছে এবং শরীরে শক্তি অনুভব করি। Halal Certified হওয়ায় নিশ্চিন্তে খাচ্ছি।",
  img: 32
},
{
  name: "রাবেয়া খাতুন",
  location: "বগুড়া, বাংলাদেশ",
  rating: 5,
  review: "আমি এবং আমার মা দুজনেই খাই। মায়ের হাঁটু ব্যথা কমেছে এবং আমার ত্বক ভালো হয়েছে। প্রাকৃতিক পণ্য বলে পার্শ্বপ্রতিক্রিয়ার ভয় নেই।",
  img: 44
}];


const certifications = [
{ icon: Leaf, text: "১০০% Organic Certified" },
{ icon: Moon, text: "Halal Certified" },
{ icon: Shield, text: "BSTI অনুমোদিত" },
{ icon: Sprout, text: "১০০% Natural" }];


const guaranteeTrustItems = [
{ icon: PackageCheck, text: "সিকিউর Packaging" },
{ icon: Truck, text: "Free Delivery" },
{ icon: RotateCcw, text: "সহজ Return" }];


/* ── Testimonial Card ── */
const TestimonialCard = ({ t }: {t: (typeof testimonials)[0];}) => {
  const initials = t.name.charAt(0);

  return (
    <div className="group flex-shrink-0 w-[320px] md:w-[380px] min-h-[320px] bg-background border border-primary/10 rounded-2xl p-7 shadow-soft flex flex-col transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lifted hover:border-primary/30 hover:bg-card hover:z-10">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full border-[3px] border-primary overflow-hidden flex-shrink-0">
          <img
            src={`https://i.pravatar.cc/150?img=${t.img}`}
            alt={t.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              el.parentElement!.classList.add("bg-primary", "flex", "items-center", "justify-center");
              const span = document.createElement("span");
              span.textContent = initials;
              span.className = "text-primary-foreground font-english font-bold text-xl";
              el.parentElement!.appendChild(span);
            }} />

        </div>
        <div>
          <p className="font-bangla font-semibold text-[17px] text-foreground">{t.name}</p>
          <p className="flex items-center gap-1 text-muted-foreground text-[13px]">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-body">{t.location}</span>
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, j) =>
        <Star
          key={j}
          className={`h-[18px] w-[18px] ${j < t.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted"}`} />

        )}
      </div>

      {/* Review */}
      <p className="font-bangla text-[15px] text-foreground leading-[1.7] mb-5 flex-1 line-clamp-5">
        "{t.review}"
      </p>

      {/* Verified Badge */}
      <div className="mt-auto">
        <span className="inline-flex items-center gap-1.5 text-trust text-[13px] font-bangla font-medium px-4 py-2 rounded-full bg-gradient-to-r from-trust/[0.12] to-trust/[0.06] border border-trust/20">
          <BadgeCheck className="h-4 w-4" />
          Verified ক্রেতা
        </span>
      </div>
    </div>);

};

/* ── Main Section ── */
const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let lastTime: number | null = null;
    const speed = 40; // px per second

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        el.scrollLeft += speed * delta / 1000;
        // Reset to start when we've scrolled through the first set
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 lg:px-[60px]">
        {/* Headline */}
        <div className="text-center mb-12 md:mb-[50px]">
          <h2 className="font-bangla text-[28px] md:text-[40px] font-bold text-foreground mb-4">
            আমাদের সন্তুষ্ট গ্রাহকরা কী বলছেন
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground">
            ১৫,০০০+ খুশি গ্রাহক আমাদের বিশ্বাস করেন
          </p>
        </div>

        {/* Auto-scrolling Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          aria-label="গ্রাহকদের মতামত">

          {/* Render cards twice for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) =>
          <TestimonialCard key={i} t={t} />
          )}
        </div>

        {/* ── Trust Badges ── */}
        <div className="mt-16 md:mt-20">
          <h3 className="font-bangla text-[22px] md:text-[28px] font-bold text-foreground text-center mb-9">
            আমাদের প্রত্যয়পত্র ও স্বীকৃতি
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[900px] mx-auto">
            {certifications.map((c, i) =>
            <div
              key={i}
              className="group flex flex-col items-center text-center bg-trust/[0.06] border-[1.5px] border-trust/20 rounded-[14px] p-6 md:p-7 transition-all duration-250 hover:bg-trust/[0.12] hover:border-trust/40 hover:-translate-y-1 hover:shadow-soft">

                <div className="bg-trust/[0.12] group-hover:bg-trust/[0.18] p-3.5 rounded-full mb-4 transition-all duration-250 group-hover:scale-110 group-hover:rotate-[5deg]">
                  <c.icon className="h-8 w-8 md:h-10 md:w-10 text-trust" />
                </div>
                <span className="font-bangla text-[14px] md:text-[15px] text-trust leading-snug font-bold">
                  {c.text}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Guarantee Banner ── */}
        <div className="mt-16 md:mt-20 max-w-[1200px] mx-auto bg-gradient-to-br from-trust/10 to-trust/[0.04] border-[2.5px] border-trust rounded-[18px] p-7 md:p-9 lg:px-12 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted hover:border-trust/80">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-center">
            {/* Icon */}
            <div className="flex-shrink-0 bg-card/80 p-[18px] rounded-full shadow-soft animate-pulse">
              <ShieldCheck className="h-12 w-12 md:h-16 md:w-16 text-trust" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bangla font-bold text-[22px] md:text-[28px] text-trust leading-tight mb-4">
                পণ্য হাতে পেয়ে টাকা দিন - ১০০% ঝুঁকিমুক্ত
              </h3>
              <p className="font-body text-[15px] md:text-base text-foreground leading-relaxed max-w-[700px] mx-auto mb-5">
                আমরা Cash on Delivery সুবিধা দিচ্ছি। পণ্যটি দেখে, যাচাই করে তারপর টাকা দিন।
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {guaranteeTrustItems.map((item, i) =>
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-card/60 text-trust text-xs md:text-[13px] font-bangla font-medium px-3.5 py-2 rounded-full">

                    <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                    {item.text}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;