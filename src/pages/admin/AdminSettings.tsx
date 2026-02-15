import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Settings } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*");
    const map: Record<string, string> = {};
    (data || []).forEach((s: any) => { map[s.key] = s.value; });
    setSettings(map);
    setLoading(false);
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    }
    setSaving(false);
    toast({ title: "সেটিংস সেভ হয়েছে" });
  };

  const settingsFields = [
    { key: "site_name", label: "সাইটের নাম", type: "text" },
    { key: "phone", label: "ফোন নম্বর", type: "text" },
    { key: "email", label: "ইমেইল", type: "email" },
    { key: "free_delivery", label: "ফ্রি ডেলিভারি (true/false)", type: "text" },
    { key: "stock_alert_threshold", label: "স্টক অ্যালার্ট থ্রেশহোল্ড", type: "number" },
  ];

  if (loading) {
    return <div className="py-12 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h2 className="font-bangla text-3xl font-bold text-foreground">সেটিংস</h2>
          <p className="font-bangla text-muted-foreground">সাইটের সাধারণ সেটিংস পরিবর্তন করুন</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-5">
        {settingsFields.map(field => (
          <div key={field.key} className="space-y-2">
            <Label className="font-bangla font-semibold">{field.label}</Label>
            <Input
              type={field.type}
              value={settings[field.key] || ""}
              onChange={e => updateSetting(field.key, e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
        ))}

        <Button onClick={handleSave} disabled={saving} className="font-bangla w-full h-12 rounded-xl">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          সেটিংস সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
