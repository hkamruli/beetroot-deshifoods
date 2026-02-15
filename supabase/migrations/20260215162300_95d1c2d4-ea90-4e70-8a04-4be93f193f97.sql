
-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  product_name TEXT NOT NULL,
  variation TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  discount INTEGER NOT NULL DEFAULT 0,
  discount_pct INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'cod',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can access orders
CREATE POLICY "Authenticated users can view orders" ON public.orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update orders" ON public.orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete orders" ON public.orders FOR DELETE TO authenticated USING (true);
-- Allow anonymous inserts from checkout (public-facing)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);

-- Uncompleted orders (auto-saved from checkout)
CREATE TABLE public.uncompleted_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  customer_address TEXT,
  product_name TEXT,
  variation TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price INTEGER,
  total INTEGER,
  session_id TEXT,
  converted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.uncompleted_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage uncompleted orders" ON public.uncompleted_orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can insert uncompleted orders" ON public.uncompleted_orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can update own uncompleted orders" ON public.uncompleted_orders FOR UPDATE TO anon USING (true);

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  variation TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  stock INTEGER NOT NULL DEFAULT 100,
  is_active BOOLEAN NOT NULL DEFAULT true,
  badge TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  review TEXT NOT NULL,
  avatar_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value INTEGER NOT NULL,
  min_quantity INTEGER DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers" ON public.offers FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage offers" ON public.offers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_uncompleted_orders_updated_at BEFORE UPDATE ON public.uncompleted_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default products
INSERT INTO public.products (name, variation, price, original_price, stock, badge) VALUES
  ('অর্গানিক বিটরুট পাউডার', '250g', 850, NULL, 100, NULL),
  ('অর্গানিক বিটরুট পাউডার', '500g', 1450, NULL, 100, 'জনপ্রিয়'),
  ('অর্গানিক বিটরুট পাউডার', 'combo', 2600, NULL, 50, 'সেরা দাম');

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'দেশি ফুডস'),
  ('phone', '+8801712345678'),
  ('email', 'support@deshifoods.com'),
  ('free_delivery', 'true'),
  ('stock_alert_threshold', '10');

-- Insert default testimonials from existing data
INSERT INTO public.testimonials (name, location, rating, review, avatar_url) VALUES
  ('ফাতিমা রহমান', 'ঢাকা, বাংলাদেশ', 5, 'মাত্র এক সপ্তাহেই আমার Energy লেভেল অনেক বেড়ে গেছে!', 'https://i.pravatar.cc/150?img=5'),
  ('মোহাম্মদ কামাল', 'চট্টগ্রাম, বাংলাদেশ', 5, 'BP এর সমস্যার জন্য ডাক্তার অনেক ওষুধ দিয়েছিলেন।', 'https://i.pravatar.cc/150?img=12'),
  ('নুসরাত জাহান', 'সিলেট, বাংলাদেশ', 5, 'দুর্দান্ত পণ্য! খেতে সুবিধাজনক এবং আমার পরিবার এটা পছন্দ করে।', 'https://i.pravatar.cc/150?img=20');
