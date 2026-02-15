import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Eye, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UncompletedOrder {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  customer_address: string | null;
  product_name: string | null;
  variation: string | null;
  quantity: number | null;
  total: number | null;
  converted: boolean;
  created_at: string;
  updated_at: string;
}

const formatPrice = (n: number | null) => n ? "৳" + n.toLocaleString("en-IN") : "—";

const UncompletedOrders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<UncompletedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState<UncompletedOrder | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("uncompleted_orders")
      .select("*")
      .eq("converted", false)
      .order("updated_at", { ascending: false });
    setOrders((data as UncompletedOrder[]) || []);
    setLoading(false);
  };

  const deleteOrder = async (id: string) => {
    await supabase.from("uncompleted_orders").delete().eq("id", id);
    setOrders(prev => prev.filter(o => o.id !== id));
    toast({ title: "মুছে ফেলা হয়েছে" });
  };

  const getCompleteness = (o: UncompletedOrder) => {
    let filled = 0;
    if (o.customer_name) filled++;
    if (o.customer_phone) filled++;
    if (o.customer_email) filled++;
    if (o.customer_address) filled++;
    return Math.round((filled / 4) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bangla text-3xl font-bold text-foreground">অসম্পূর্ণ অর্ডার</h2>
        <p className="font-bangla text-muted-foreground">
          যেসব গ্রাহক তথ্য দিয়েছেন কিন্তু অর্ডার সম্পূর্ণ করেননি ({orders.length}টি)
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">গ্রাহক</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">ফোন</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">পণ্য</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">সম্পূর্ণতা</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">সময়</th>
                <th className="font-bangla text-center py-3 px-4 text-sm text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center font-bangla text-muted-foreground">কোনো অসম্পূর্ণ অর্ডার নেই</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 font-bangla text-sm">{order.customer_name || "—"}</td>
                    <td className="py-3 px-4 font-english text-sm">{order.customer_phone || "—"}</td>
                    <td className="py-3 px-4 font-bangla text-sm">{order.variation || "—"}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getCompleteness(order) >= 75 ? "bg-trust" : getCompleteness(order) >= 50 ? "bg-amber-400" : "bg-destructive"}`}
                            style={{ width: `${getCompleteness(order)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-english">{getCompleteness(order)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {new Date(order.updated_at).toLocaleString("bn-BD")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteOrder(order.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setViewOrder(null)}>
          <div className="bg-card rounded-2xl max-w-lg w-full p-6 shadow-lifted" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bangla text-xl font-bold">অসম্পূর্ণ অর্ডার বিবরণ</h3>
              <button onClick={() => setViewOrder(null)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 font-bangla text-sm">
              {[
                ["নাম", viewOrder.customer_name],
                ["ফোন", viewOrder.customer_phone],
                ["ইমেইল", viewOrder.customer_email],
                ["ঠিকানা", viewOrder.customer_address],
                ["পণ্য", viewOrder.variation],
                ["পরিমাণ", viewOrder.quantity ? `${viewOrder.quantity}টি` : null],
                ["মূল্য", viewOrder.total ? formatPrice(viewOrder.total) : null],
                ["সময়", new Date(viewOrder.updated_at).toLocaleString("bn-BD")],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">{label}:</span>
                  <span className="font-medium">{(value as string) || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UncompletedOrders;
