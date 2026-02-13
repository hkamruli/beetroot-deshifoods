import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="h-5 w-5" />
          <span className="font-bangla text-lg font-semibold">অর্গানিক বিটরুট BD</span>
        </div>
        <p className="font-bangla text-sm opacity-70 mb-2">
          ১০০% প্রাকৃতিক ও অর্গানিক বিটরুট পাউডার
        </p>
        <p className="font-bangla text-xs opacity-50">
          © ২০২৬ অর্গানিক বিটরুট BD। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
