import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, X, Save } from "lucide-react";

interface Product {
  id: string;
  name: string;
  variation: string;
  price: number;
  original_price: number | null;
  stock: number;
  is_active: boolean;
  badge: string | null;
  description: string | null;
}

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", variation: "", price: 0, original_price: 0, stock: 100, badge: "", description: "", is_active: true });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at");
    setProducts((data as Product[]) || []);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", variation: "", price: 0, original_price: 0, stock: 100, badge: "", description: "", is_active: true });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, variation: p.variation, price: p.price,
      original_price: p.original_price || 0, stock: p.stock,
      badge: p.badge || "", description: p.description || "", is_active: p.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name, variation: form.variation, price: form.price,
      original_price: form.original_price || null, stock: form.stock,
      badge: form.badge || null, description: form.description || null, is_active: form.is_active,
    };

    if (editing) {
      await supabase.from("products").update(payload).eq("id", editing.id);
      toast({ title: "প্রোডাক্ট আপডেট হয়েছে" });
    } else {
      await supabase.from("products").insert(payload);
      toast({ title: "প্রোডাক্ট যোগ হয়েছে" });
    }
    setShowForm(false);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: "প্রোডাক্ট মুছে ফেলা হয়েছে" });
  };

  const toggleActive = async (p: Product) => {
    await supabase.from("products").update({ is_active: !p.is_active }).eq("id", p.id);
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bangla text-3xl font-bold text-foreground">প্রোডাক্ট</h2>
          <p className="font-bangla text-muted-foreground">{products.length}টি প্রোডাক্ট</p>
        </div>
        <Button onClick={openAdd} className="font-bangla">
          <Plus className="h-4 w-4 mr-2" /> নতুন প্রোডাক্ট
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className={`bg-card rounded-2xl border p-6 transition-all ${p.is_active ? "border-border/50" : "border-destructive/30 opacity-60"}`}>
              {p.badge && (
                <span className="inline-block text-xs font-bangla font-bold px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">{p.badge}</span>
              )}
              <h3 className="font-bangla text-lg font-bold text-foreground">{p.name}</h3>
              <p className="font-bangla text-sm text-muted-foreground mb-3">{p.variation}</p>
              <p className="font-bangla text-2xl font-bold text-primary">৳{p.price.toLocaleString("en-IN")}</p>
              {p.original_price && (
                <p className="text-sm text-muted-foreground line-through">৳{p.original_price.toLocaleString("en-IN")}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2 font-bangla">স্টক: {p.stock}</p>
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => toggleActive(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bangla font-bold ${p.is_active ? "bg-trust/10 text-trust" : "bg-destructive/10 text-destructive"}`}>
                  {p.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </button>
                <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive ml-auto">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-lifted" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bangla text-xl font-bold">{editing ? "প্রোডাক্ট সম্পাদনা" : "নতুন প্রোডাক্ট"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div><Label className="font-bangla">নাম</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label className="font-bangla">ভ্যারিয়েশন</Label><Input value={form.variation} onChange={e => setForm({ ...form, variation: e.target.value })} placeholder="250g, 500g, combo" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-bangla">মূল্য (৳)</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} /></div>
                <div><Label className="font-bangla">আগের মূল্য (৳)</Label><Input type="number" value={form.original_price} onChange={e => setForm({ ...form, original_price: +e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-bangla">স্টক</Label><Input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })} /></div>
                <div><Label className="font-bangla">ব্যাজ</Label><Input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="জনপ্রিয়" /></div>
              </div>
              <div><Label className="font-bangla">বিবরণ</Label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full h-20 rounded-xl border border-border p-3 text-sm" /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 rounded" />
                <Label className="font-bangla">সক্রিয়</Label>
              </div>
              <Button onClick={handleSave} className="w-full font-bangla">
                <Save className="h-4 w-4 mr-2" /> {editing ? "আপডেট করুন" : "যোগ করুন"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
