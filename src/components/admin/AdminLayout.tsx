import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, ShoppingCart, AlertTriangle, Package,
  MessageSquare, Tag, Settings, LogOut, Home, ChevronLeft,
  ChevronRight, Leaf, RefreshCw
} from "lucide-react";

const menuItems = [
  { title: "ড্যাশবোর্ড", icon: LayoutDashboard, path: "/admin" },
  { title: "অর্ডার", icon: ShoppingCart, path: "/admin/orders" },
  { title: "অসম্পূর্ণ অর্ডার", icon: AlertTriangle, path: "/admin/uncompleted" },
  { title: "প্রোডাক্ট", icon: Package, path: "/admin/products" },
  { title: "টেস্টিমোনিয়াল", icon: MessageSquare, path: "/admin/testimonials" },
  { title: "অফার", icon: Tag, path: "/admin/offers" },
  { title: "সেটিংস", icon: Settings, path: "/admin/settings" },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setUser(session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-card border-r border-border/50 z-50 transition-all duration-300 flex flex-col ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-trust/10 flex items-center justify-center flex-shrink-0">
            <Leaf className="h-5 w-5 text-trust" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bangla font-bold text-sm text-foreground">দেশি ফুডস</h2>
              <p className="font-bangla text-xs text-muted-foreground">অ্যাডমিন প্যানেল</p>
            </div>
          )}
        </div>

        {/* Menu Label */}
        {!collapsed && (
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="font-bangla text-xs text-muted-foreground font-semibold uppercase tracking-wider">মেন্যু</span>
            <button onClick={() => setCollapsed(true)} className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}
        {collapsed && (
          <div className="py-3 flex justify-center">
            <button onClick={() => setCollapsed(false)} className="text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bangla font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-cta"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border/50 space-y-2">
          {!collapsed && user && (
            <div className="px-3 py-2">
              <p className="text-xs text-foreground font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground font-bangla">Admin</p>
            </div>
          )}
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bangla text-muted-foreground hover:bg-muted hover:text-foreground transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            {!collapsed && <span>সাইট দেখুন</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bangla text-destructive hover:bg-destructive/10 transition-all w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">📊</span>
            <h1 className="font-bangla font-bold text-xl text-foreground">অ্যাডমিন প্যানেল</h1>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
