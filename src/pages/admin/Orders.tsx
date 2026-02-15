import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Download, Printer, Search, Filter, CheckSquare, Square,
  ChevronDown, FileDown, Loader2, Eye, X
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  product_name: string;
  variation: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  discount: number;
  discount_pct: number;
  total: number;
  status: string;
  payment_method: string;
  notes: string | null;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const STATUS_LABELS: Record<string, string> = {
  pending: "পেন্ডিং", confirmed: "কনফার্মড", shipped: "শিপড", delivered: "ডেলিভারড", cancelled: "ক্যান্সেলড",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-trust/10 text-trust",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-trust/10 text-trust",
  cancelled: "bg-destructive/10 text-destructive",
};

const formatPrice = (n: number) => "৳" + n.toLocaleString("en-IN");

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast({ title: "স্ট্যাটাস আপডেট হয়েছে" });
  };

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(o => o.id)));
  };

  // Helper to convert Bengali text to English for PDF (jsPDF can't render Bengali)
  const toEnglishForPDF = (text: string): string => {
    const map: Record<string, string> = {
      "অর্গানিক বিটরুট পাউডার": "Organic Beetroot Powder",
      "বিটরুট পাউডার": "Beetroot Powder",
      "৫০০ গ্রাম Jar": "500g Jar",
      "২৫০ গ্রাম Jar": "250g Jar",
      "১ কেজি Jar": "1kg Jar",
      "৫০০ গ্রাম": "500g",
      "২৫০ গ্রাম": "250g",
      "১ কেজি": "1kg",
    };
    return map[text] || text.replace(/[^\x00-\x7F]/g, "");
  };

  const generateInvoicePDF = (order: Order): jsPDF => {
    const doc = new jsPDF();
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();
    const margin = 20;
    const rightCol = w - margin;

    // --- Header Banner ---
    doc.setFillColor(169, 29, 58);
    doc.rect(0, 0, w, 48, "F");
    // Accent line
    doc.setFillColor(220, 80, 110);
    doc.rect(0, 48, w, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", margin, 30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Deshi Foods", rightCol, 18, { align: "right" });
    doc.text("Premium Organic Products", rightCol, 25, { align: "right" });
    doc.text("www.deshifoods.com", rightCol, 32, { align: "right" });
    doc.text("+880 1712 345 678", rightCol, 39, { align: "right" });

    // --- Order & Date Row ---
    let y = 62;
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.setFont("helvetica", "normal");
    doc.text("Invoice No:", margin, y);
    doc.text("Date:", rightCol - 40, y);
    y += 6;
    doc.setTextColor(30);
    doc.setFont("helvetica", "bold");
    doc.text(order.order_number, margin, y);
    doc.text(new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), rightCol - 40, y);

    // --- Bill To Section ---
    y += 14;
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(margin, y - 5, w - margin * 2, 38, 3, 3, "F");
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", margin + 8, y + 2);
    y += 9;
    doc.setTextColor(30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(order.customer_name, margin + 8, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(order.customer_phone + "  |  " + order.customer_email, margin + 8, y);
    y += 6;
    const addrLines = doc.splitTextToSize(order.customer_address, w - margin * 2 - 16);
    doc.text(addrLines, margin + 8, y);
    y += addrLines.length * 4 + 12;

    // --- Items Table ---
    // Table header
    const colItem = margin;
    const colVariation = 90;
    const colQty = 120;
    const colPrice = 145;
    const colTotal = rightCol;

    doc.setFillColor(169, 29, 58);
    doc.roundedRect(margin, y, w - margin * 2, 10, 2, 2, "F");
    doc.setTextColor(255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("PRODUCT", colItem + 6, y + 7);
    doc.text("VARIATION", colVariation, y + 7);
    doc.text("QTY", colQty, y + 7);
    doc.text("UNIT PRICE", colPrice, y + 7);
    doc.text("TOTAL", colTotal - 4, y + 7, { align: "right" });
    y += 14;

    // Table row
    doc.setTextColor(30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(toEnglishForPDF(order.product_name), colItem + 6, y);
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(toEnglishForPDF(order.variation), colVariation, y);
    doc.setTextColor(30);
    doc.text(String(order.quantity), colQty + 4, y);
    doc.text("Tk " + order.unit_price.toLocaleString("en-IN"), colPrice, y);
    doc.setFont("helvetica", "bold");
    doc.text("Tk " + order.subtotal.toLocaleString("en-IN"), colTotal - 4, y, { align: "right" });
    y += 12;

    // Separator
    doc.setDrawColor(230);
    doc.setLineWidth(0.5);
    doc.line(margin, y, rightCol, y);
    y += 10;

    // --- Totals ---
    const totalsX = 130;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text("Subtotal", totalsX, y);
    doc.setTextColor(30);
    doc.text("Tk " + order.subtotal.toLocaleString("en-IN"), rightCol - 4, y, { align: "right" });
    y += 8;

    doc.setTextColor(80);
    doc.text("Delivery", totalsX, y);
    doc.setTextColor(34, 120, 60);
    doc.setFont("helvetica", "bold");
    doc.text("FREE", rightCol - 4, y, { align: "right" });
    y += 8;

    if (order.discount > 0) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text("Discount (" + order.discount_pct + "%)", totalsX, y);
      doc.setTextColor(34, 120, 60);
      doc.text("-Tk " + order.discount.toLocaleString("en-IN"), rightCol - 4, y, { align: "right" });
      y += 8;
    }

    // Grand total
    y += 2;
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(totalsX - 5, y - 5, rightCol - totalsX + 9, 14, 2, 2, "F");
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30);
    doc.text("TOTAL", totalsX, y + 5);
    doc.setTextColor(169, 29, 58);
    doc.text("Tk " + order.total.toLocaleString("en-IN"), rightCol - 4, y + 5, { align: "right" });

    // --- Payment & Status ---
    y += 22;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text("Payment Method: Cash on Delivery", margin, y);
    y += 6;
    doc.text("Order Status: " + order.status.charAt(0).toUpperCase() + order.status.slice(1), margin, y);

    if (order.notes) {
      y += 10;
      doc.setTextColor(100);
      doc.text("Notes: " + order.notes, margin, y);
    }

    // --- Footer ---
    doc.setFillColor(248, 248, 248);
    doc.rect(0, h - 22, w, 22, "F");
    doc.setFillColor(169, 29, 58);
    doc.rect(0, h - 22, w, 1, "F");
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text("Thank you for choosing Deshi Foods! Quality you can trust.", w / 2, h - 10, { align: "center" });

    return doc;
  };

  const downloadInvoice = (order: Order) => {
    const doc = generateInvoicePDF(order);
    doc.save(`Invoice-${order.order_number}.pdf`);
  };

  const printInvoice = (order: Order) => {
    const doc = generateInvoicePDF(order);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const win = window.open(url);
    if (win) {
      win.onload = () => { win.print(); };
    }
  };

  const downloadSelectedZip = async () => {
    const selectedOrders = orders.filter(o => selected.has(o.id));
    if (selectedOrders.length === 0) return;

    setDownloading(true);
    const zip = new JSZip();

    for (const order of selectedOrders) {
      const doc = generateInvoicePDF(order);
      const blob = doc.output("blob");
      zip.file(`Invoice-${order.order_number}.pdf`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Invoices-${new Date().toISOString().slice(0, 10)}.zip`);
    setDownloading(false);
    toast({ title: `${selectedOrders.length}টি ইনভয়েস ডাউনলোড হয়েছে` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bangla text-3xl font-bold text-foreground">অর্ডার</h2>
          <p className="font-bangla text-muted-foreground">মোট {orders.length}টি অর্ডার</p>
        </div>
        {selected.size > 0 && (
          <Button
            onClick={downloadSelectedZip}
            disabled={downloading}
            className="font-bangla bg-primary text-primary-foreground"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileDown className="h-4 w-4 mr-2" />}
            {selected.size}টি ইনভয়েস ডাউনলোড (ZIP)
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="অর্ডার নং, নাম, বা ফোন দিয়ে খুঁজুন..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-card font-bangla text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="h-11 pl-10 pr-8 rounded-xl border border-border bg-card font-bangla text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">সব স্ট্যাটাস</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="py-3 px-4 text-left">
                  <button onClick={selectAll} className="text-muted-foreground hover:text-foreground">
                    {selected.size === filtered.length && filtered.length > 0
                      ? <CheckSquare className="h-5 w-5 text-primary" />
                      : <Square className="h-5 w-5" />}
                  </button>
                </th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">অর্ডার নং</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">গ্রাহক</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">পণ্য</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">পরিমাণ</th>
                <th className="font-bangla text-left py-3 px-4 text-sm text-muted-foreground">স্ট্যাটাস</th>
                <th className="font-bangla text-right py-3 px-4 text-sm text-muted-foreground">মূল্য</th>
                <th className="font-bangla text-center py-3 px-4 text-sm text-muted-foreground">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-12 text-center font-bangla text-muted-foreground">কোনো অর্ডার পাওয়া যায়নি</td></tr>
              ) : (
                filtered.map(order => (
                  <tr key={order.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <button onClick={() => toggleSelect(order.id)}>
                        {selected.has(order.id)
                          ? <CheckSquare className="h-5 w-5 text-primary" />
                          : <Square className="h-5 w-5 text-muted-foreground" />}
                      </button>
                    </td>
                    <td className="py-3 px-4 font-english text-sm font-mono">{order.order_number}</td>
                    <td className="py-3 px-4">
                      <p className="font-bangla text-sm font-medium">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                    </td>
                    <td className="py-3 px-4 font-bangla text-sm">{order.variation}</td>
                    <td className="py-3 px-4 font-english text-sm">{order.quantity}</td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bangla font-bold border-0 cursor-pointer ${STATUS_COLORS[order.status]} focus:outline-none`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right font-bangla font-bold text-primary">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" title="বিস্তারিত">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => downloadInvoice(order)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" title="ডাউনলোড">
                          <Download className="h-4 w-4" />
                        </button>
                        <button onClick={() => printInvoice(order)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground" title="প্রিন্ট">
                          <Printer className="h-4 w-4" />
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

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setViewOrder(null)}>
          <div className="bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-lifted" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bangla text-xl font-bold">অর্ডার বিবরণ</h3>
              <button onClick={() => setViewOrder(null)} className="p-2 rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 font-bangla text-sm">
              {[
                ["অর্ডার নং", viewOrder.order_number],
                ["তারিখ", new Date(viewOrder.created_at).toLocaleString("bn-BD")],
                ["গ্রাহকের নাম", viewOrder.customer_name],
                ["ফোন", viewOrder.customer_phone],
                ["ইমেইল", viewOrder.customer_email],
                ["ঠিকানা", viewOrder.customer_address],
                ["পণ্য", `${viewOrder.product_name} (${viewOrder.variation})`],
                ["পরিমাণ", `${viewOrder.quantity}টি`],
                ["একক মূল্য", formatPrice(viewOrder.unit_price)],
                ["মোট", formatPrice(viewOrder.subtotal)],
                ["ডিসকাউন্ট", viewOrder.discount > 0 ? `${formatPrice(viewOrder.discount)} (${viewOrder.discount_pct}%)` : "নেই"],
                ["সর্বমোট", formatPrice(viewOrder.total)],
                ["পেমেন্ট", "ক্যাশ অন ডেলিভারি"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">{label}:</span>
                  <span className="font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={() => downloadInvoice(viewOrder)} className="flex-1 font-bangla" variant="outline">
                <Download className="h-4 w-4 mr-2" /> ডাউনলোড
              </Button>
              <Button onClick={() => printInvoice(viewOrder)} className="flex-1 font-bangla" variant="outline">
                <Printer className="h-4 w-4 mr-2" /> প্রিন্ট
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
