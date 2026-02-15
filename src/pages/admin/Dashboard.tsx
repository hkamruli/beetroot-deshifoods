import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp, Eye, BarChart3, ShoppingCart, Clock,
  CheckCircle, Truck as TruckIcon, PackageCheck, XCircle, DollarSign, Gift
} from "lucide-react";

interface Stats {
  totalRevenue: number;
  totalDiscounts: number;
  totalFreeDelivery: number;
  todayVisitors: number;
  conversionRate: number;
  totalOrders: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  quantity: number;
  status: string;
  total: number;
  created_at: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0, totalDiscounts: 0, totalFreeDelivery: 0,
    todayVisitors: 37, conversionRate: 6.5,
    totalOrders: 0, pending: 0, confirmed: 0, shipped: 0, delivered: 0, cancelled: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: orders } = await supabase.from("orders").select("*");
    if (!orders) return;

    const activeOrders = orders.filter(o => o.status !== "cancelled");
    const totalRevenue = activeOrders.reduce((s, o) => s + (o.total || 0), 0);
    const totalDiscounts = activeOrders.reduce((s, o) => s + (o.discount || 0), 0);
    const totalFreeDelivery = activeOrders.length * 80; // ৳80 saved per order
    const pending = orders.filter(o => o.status === "pending").length;
    const confirmed = orders.filter(o => o.status === "confirmed").length;
    const shipped = orders.filter(o => o.status === "shipped").length;
    const delivered = orders.filter(o => o.status === "delivered").length;
    const cancelled = orders.filter(o => o.status === "cancelled").length;

    setStats({
      totalRevenue, totalDiscounts, totalFreeDelivery,
      todayVisitors: 37, conversionRate: orders.length > 0 ? parseFloat(((orders.length / 37) * 100).toFixed(1)) : 0,
      totalOrders: orders.length, pending, confirmed, shipped, delivered, cancelled,
    });

    setRecentOrders(
      orders
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10)
    );
  };

  const formatPrice = (n: number) => "৳" + n.toLocaleString("en-IN");

  const topCards = [
    { title: "মোট রেভিনিউ", value: formatPrice(stats.totalRevenue), icon: TrendingUp, color: "bg-primary/10 text-primary", iconColor: "text-primary" },
    { title: "মোট ডিসকাউন্ট দেওয়া", value: formatPrice(stats.totalDiscounts), icon: Gift, color: "bg-accent/10 text-accent", iconColor: "text-accent" },
    { title: "মোট ফ্রি ডেলিভারি দেওয়া", value: formatPrice(stats.totalFreeDelivery), icon: DollarSign, color: "bg-trust/10 text-trust", iconColor: "text-trust" },
  ];

  const midCards = [
    { title: "আজকের ভিজিটর", value: stats.todayVisitors.toString(), icon: Eye, color: "bg-blue-50 text-blue-600" },
    { title: "কনভার্সন রেট", value: `${stats.conversionRate}%`, icon: BarChart3, color: "bg-purple-50 text-purple-600" },
  ];

  const statusCards = [
    { title: "মোট অর্ডার", value: stats.totalOrders, icon: ShoppingCart, color: "text-foreground" },
    { title: "পেন্ডিং", value: stats.pending, icon: Clock, color: "text-amber-500" },
    { title: "কনফার্মড", value: stats.confirmed, icon: CheckCircle, color: "text-trust" },
    { title: "শিপড", value: stats.shipped, icon: TruckIcon, color: "text-blue-500" },
    { title: "ডেলিভারড", value: stats.delivered, icon: PackageCheck, color: "text-trust" },
    { title: "ক্যান্সেলড", value: stats.cancelled, icon: XCircle, color: "text-destructive" },
  ];

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-100 text-amber-700",
      confirmed: "bg-trust/10 text-trust",
      shipped: "bg-blue-100 text-blue-700",
      delivered: "bg-trust/10 text-trust",
      cancelled: "bg-destructive/10 text-destructive",
    };
    const labels: Record<string, string> = {
      pending: "পেন্ডিং", confirmed: "কনফার্মড", shipped: "শিপড", delivered: "ডেলিভারড", cancelled: "ক্যান্সেলড",
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bangla font-bold ${map[status] || ""}`}>{labels[status] || status}</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bangla text-3xl font-bold text-foreground">ড্যাশবোর্ড</h2>
        <p className="font-bangla text-muted-foreground">গত ৩০ দিনের সারসংক্ষেপ</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topCards.map((card, i) => (
          <div key={i} className={`${card.color} rounded-2xl p-6 flex items-center justify-between`}>
            <div>
              <p className="font-bangla text-sm font-medium opacity-80">{card.title}</p>
              <p className="font-bangla text-3xl font-bold mt-1">{card.value}</p>
            </div>
            <card.icon className={`h-10 w-10 opacity-40`} />
          </div>
        ))}
      </div>

      {/* Mid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {midCards.map((card, i) => (
          <div key={i} className={`${card.color} rounded-2xl p-6 flex items-center justify-between`}>
            <div>
              <p className="font-bangla text-sm font-medium opacity-80">{card.title}</p>
              <p className="font-english text-3xl font-bold mt-1">{card.value}</p>
            </div>
            <card.icon className="h-10 w-10 opacity-40" />
          </div>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {statusCards.map((card, i) => (
          <div key={i} className="bg-card border border-border/50 rounded-2xl p-5 text-center">
            <p className="font-bangla text-xs text-muted-foreground mb-2">{card.title}</p>
            <p className={`font-english text-3xl font-bold ${card.color}`}>{card.value}</p>
            <card.icon className={`h-6 w-6 mx-auto mt-2 opacity-30 ${card.color}`} />
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <h3 className="font-bangla text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          📋 সাম্প্রতিক অর্ডার
        </h3>
        {recentOrders.length === 0 ? (
          <p className="font-bangla text-muted-foreground text-center py-8">কোনো অর্ডার নেই</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">অর্ডার নং</th>
                  <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">গ্রাহক</th>
                  <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">পরিমাণ</th>
                  <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">স্ট্যাটাস</th>
                  <th className="font-bangla text-right py-3 px-4 text-sm text-muted-foreground">মূল্য</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-english text-sm font-mono">{order.order_number}</td>
                    <td className="py-3 px-4 font-bangla text-sm">{order.customer_name}</td>
                    <td className="py-3 px-4 font-english text-sm">{order.quantity}</td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4 text-right font-bangla font-bold text-primary">{formatPrice(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
