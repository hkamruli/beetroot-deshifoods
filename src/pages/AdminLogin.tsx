import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // If user doesn't exist, try sign up
      if (authError.message.includes("Invalid login")) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }
        // Try login again after signup
        const { error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (retryError) {
          setError(retryError.message);
          setLoading(false);
          return;
        }
      } else {
        setError(authError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-trust/10 flex items-center justify-center">
              <Leaf className="h-7 w-7 text-trust" />
            </div>
            <div className="text-left">
              <h1 className="font-bangla text-xl font-bold text-foreground">দেশি ফুডস</h1>
              <p className="font-bangla text-sm text-muted-foreground">অ্যাডমিন প্যানেল</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-lifted p-8 border border-border/50">
          <h2 className="font-bangla text-2xl font-bold text-foreground mb-2">লগইন করুন</h2>
          <p className="font-bangla text-sm text-muted-foreground mb-8">আপনার অ্যাডমিন অ্যাকাউন্টে প্রবেশ করুন</p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
              <p className="font-bangla text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="font-bangla">ইমেইল</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bangla">পাসওয়ার্ড</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-bangla font-bold text-base bg-primary text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  লগইন হচ্ছে...
                </>
              ) : (
                "লগইন করুন"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 font-bangla">
          © দেশি ফুডস — অ্যাডমিন প্যানেল
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
