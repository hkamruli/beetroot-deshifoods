import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
{
  name: "রাহুল আহমেদ",
  age: "৩২",
  location: "ঢাকা",
  text: "জিমে পারফরম্যান্স অনেক ভালো হয়েছে। আগে ৩০ মিনিট পরেই হাঁপিয়ে যেতাম, এখন ১ ঘণ্টা ওয়ার্কআউট করতে পারি!",
  rating: 5,
  tag: "স্ট্যামিনা বৃদ্ধি"
},
{
  name: "ফাতেমা বেগম",
  age: "৫৮",
  location: "চট্টগ্রাম",
  text: "ডাক্তার বলেছিলেন রক্তচাপ কমাতে প্রাকৃতিক উপায় চেষ্টা করতে। ৩ মাস ধরে খাচ্ছি, রক্তচাপ অনেক স্থিতিশীল।",
  rating: 5,
  tag: "রক্তচাপ নিয়ন্ত্রণ"
},
{
  name: "তানভীর হাসান",
  age: "২৮",
  location: "সিলেট",
  text: "অফিসে সারাদিন ক্লান্তি লাগতো। বিটরুট পাউডার খাওয়া শুরু করার পর এনার্জি লেভেল অনেক ভালো।",
  rating: 5,
  tag: "এনার্জি বুস্ট"
}];


const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-bangla text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমাদের সন্তুষ্ট গ্রাহকদের কথা
          </h2>
          <p className="font-bangla text-lg text-muted-foreground">
            শত শত বাঙালি ইতিমধ্যে উপকার পাচ্ছেন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) =>
          <div
            key={i}
            className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-lifted transition-all duration-300 flex flex-col">

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) =>
              <Star key={j} className="h-5 w-5 fill-accent text-accent" />
              )}
              </div>

              <p className="font-bangla text-base text-foreground leading-relaxed mb-6 flex-1 font-bold">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bangla text-sm font-semibold text-foreground">
                    {t.name}, {t.age}
                  </p>
                  <p className="font-bangla text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-trust font-medium bg-trust-light px-3 py-1 rounded-full">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  <span className="font-bangla">যাচাইকৃত</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <span className="inline-block font-bangla text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;