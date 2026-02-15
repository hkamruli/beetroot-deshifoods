import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, X, Save, Tag } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_quantity: number | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const Offers = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", discount_type: "percentage" as string,
    discount_value: 0, min_quantity: 1, is_active: true, start_date: "", end_date: "",
  });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    setItems((data as Offer[]) || []);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", description: "", discount_type: "percentage", discount_value: 0, min_quantity: 1, is_active: true, start_date: "", end_date: "" });
    setShowForm(true);
  };

  const openEdit = (o: Offer) => {
    setEditing(o);
    setForm({
      title: o.title, description: o.description || "", discount_type: o.discount_type,
      discount_value: o.discount_value, min_quantity: o.min_quantity || 1,
      is_active: o.is_active, start_date: o.start_date?.slice(0, 10) || "", end_date: o.end_date?.slice(0, 10) || "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title, description: form.description || null, discount_type: form.discount_type,
      discount_value: form.discount_value, min_quantity: form.min_quantity,
      is_active: form.is_active,
      start_date: form.start_date || null, end_date: form.end_date || null,
    };
    if (editing) {
      await supabase.from("offers").update(payload).eq("id", editing.id);
      toast({ title: "আপডেট হয়েছে" });
    } else {
      await supabase.from("offers").insert(payload);
      toast({ title: "অফার যোগ হয়েছে" });
    }
    setShowForm(false);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("offers").delete().eq("id", id);
    setItems(prev => prev.filter(o => o.id !== id));
    toast({ title: "মুছে ফেলা হয়েছে" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bangla text-3xl font-bold text-foreground">অফার</h2>
          <p className="font-bangla text-muted-foreground">{items.length}টি অফার</p>
        </div>
        <Button onClick={openAdd} className="font-bangla"><Plus className="h-4 w-4 mr-2" /> নতুন অফার</Button>
      </div>

      {loading ? (
        <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(o => (
            <div key={o.id} className={`bg-card rounded-2xl border p-6 ${o.is_active ? "border-border/50" : "border-destructive/30 opacity-60"}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl bg-primary/10"><Tag className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-bangla font-bold">{o.title}</h3>
                  {o.description && <p className="text-xs text-muted-foreground font-bangla">{o.description}</p>}
                </div>
              </div>
              <p className="font-bangla text-2xl font-bold text-primary">
                {o.discount_value}{o.discount_type === "percentage" ? "%" : "৳"} ছাড়
              </p>
              {o.min_quantity && o.min_quantity > 1 && (
                <p className="text-xs text-muted-foreground font-bangla mt-1">ন্যূনতম {o.min_quantity}টি অর্ডারে</p>
              )}
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => openEdit(o)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                <span className={`px-2 py-1 rounded-full text-xs font-bangla ${o.is_active ? "bg-trust/10 text-trust" : "bg-destructive/10 text-destructive"}`}>
                  {o.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </span>
                <button onClick={() => deleteItem(o.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive ml-auto"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-lifted" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bangla text-xl font-bold">{editing ? "অফার সম্পাদনা" : "নতুন অফার"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div><Label className="font-bangla">শিরোনাম</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label className="font-bangla">বিবরণ</Label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full h-20 rounded-xl border border-border p-3 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-bangla">ছাড়ের ধরন</Label>
                  <select value={form.discount_type} onChange={e => setForm({ ...form, discount_type: e.target.value })} className="w-full h-10 rounded-xl border border-border px-3 text-sm">
                    <option value="percentage">শতাংশ (%)</option>
                    <option value="fixed">নির্দিষ্ট (৳)</option>
                  </select>
                </div>
                <div><Label className="font-bangla">ছাড়ের পরিমাণ</Label><Input type="number" value={form.discount_value} onChange={e => setForm({ ...form, discount_value: +e.target.value })} /></div>
              </div>
              <div><Label className="font-bangla">ন্যূনতম পরিমাণ</Label><Input type="number" value={form.min_quantity} onChange={e => setForm({ ...form, min_quantity: +e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="font-bangla">শুরুর তারিখ</Label><Input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} /></div>
                <div><Label className="font-bangla">শেষ তারিখ</Label><Input type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} /></div>
              </div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" /><span className="font-bangla text-sm">সক্রিয়</span></label>
              <Button onClick={handleSave} className="w-full font-bangla"><Save className="h-4 w-4 mr-2" /> {editing ? "আপডেট" : "যোগ করুন"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
