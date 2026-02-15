import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, X, Save, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar_url: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", rating: 5, review: "", avatar_url: "", is_verified: true, is_active: true });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data as Testimonial[]) || []);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", location: "", rating: 5, review: "", avatar_url: "", is_verified: true, is_active: true });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      name: t.name, location: t.location, rating: t.rating, review: t.review,
      avatar_url: t.avatar_url || "", is_verified: t.is_verified, is_active: t.is_active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name, location: form.location, rating: form.rating, review: form.review,
      avatar_url: form.avatar_url || null, is_verified: form.is_verified, is_active: form.is_active,
    };
    if (editing) {
      await supabase.from("testimonials").update(payload).eq("id", editing.id);
      toast({ title: "আপডেট হয়েছে" });
    } else {
      await supabase.from("testimonials").insert(payload);
      toast({ title: "যোগ হয়েছে" });
    }
    setShowForm(false);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setItems(prev => prev.filter(t => t.id !== id));
    toast({ title: "মুছে ফেলা হয়েছে" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bangla text-3xl font-bold text-foreground">টেস্টিমোনিয়াল</h2>
          <p className="font-bangla text-muted-foreground">{items.length}টি রিভিউ</p>
        </div>
        <Button onClick={openAdd} className="font-bangla"><Plus className="h-4 w-4 mr-2" /> নতুন রিভিউ</Button>
      </div>

      {loading ? (
        <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(t => (
            <div key={t.id} className={`bg-card rounded-2xl border p-5 ${t.is_active ? "border-border/50" : "border-destructive/30 opacity-60"}`}>
              <div className="flex items-start gap-3 mb-3">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{t.name.charAt(0)}</div>
                )}
                <div className="flex-1">
                  <p className="font-bangla font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="font-bangla text-sm text-foreground leading-relaxed line-clamp-3 mb-3">"{t.review}"</p>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                <span className={`px-2 py-1 rounded-full text-xs font-bangla ${t.is_active ? "bg-trust/10 text-trust" : "bg-destructive/10 text-destructive"}`}>
                  {t.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </span>
                <button onClick={() => deleteItem(t.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive ml-auto"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-lifted" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bangla text-xl font-bold">{editing ? "রিভিউ সম্পাদনা" : "নতুন রিভিউ"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div><Label className="font-bangla">নাম</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label className="font-bangla">লোকেশন</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              <div><Label className="font-bangla">রেটিং (১-৫)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: +e.target.value })} /></div>
              <div><Label className="font-bangla">রিভিউ</Label><textarea value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} className="w-full h-24 rounded-xl border border-border p-3 text-sm font-bangla" /></div>
              <div><Label className="font-bangla">Avatar URL</Label><Input value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} /></div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_verified} onChange={e => setForm({ ...form, is_verified: e.target.checked })} className="w-4 h-4" /><span className="font-bangla text-sm">ভেরিফাইড</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" /><span className="font-bangla text-sm">সক্রিয়</span></label>
              </div>
              <Button onClick={handleSave} className="w-full font-bangla"><Save className="h-4 w-4 mr-2" /> {editing ? "আপডেট" : "যোগ করুন"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
