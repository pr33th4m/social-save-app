import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Crown, Volume2, Vibrate, HelpCircle, Info, Star } from "lucide-react";

export function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  
  const usageData = {
    used: 2,
    total: 3,
    resetTime: "Tomorrow at 12:00 AM"
  };

  return (
    <div className="p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Premium Banner */}
      <Card className="p-4 mb-6 bg-gradient-primary text-white shadow-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Upgrade to Premium</h3>
              <p className="text-sm opacity-90">Unlimited calls, custom sounds & more</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
            Upgrade
          </Button>
        </div>
      </Card>

      {/* Usage Counter */}
      <Card className="p-4 mb-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Daily Usage</h3>
          <Badge variant="outline" className="border-primary text-primary">
            {usageData.used}/{usageData.total} calls
          </Badge>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${(usageData.used / usageData.total) * 100}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          Resets {usageData.resetTime}
        </p>
      </Card>

      {/* App Settings */}
      <Card className="p-4 mb-6 shadow-card">
        <h3 className="font-semibold mb-4">App Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Ring tones and notifications</p>
              </div>
            </div>
            <Switch 
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Vibration</p>
                <p className="text-sm text-muted-foreground">Haptic feedback</p>
              </div>
            </div>
            <Switch 
              checked={vibrateEnabled}
              onCheckedChange={setVibrateEnabled}
            />
          </div>
        </div>
      </Card>

      {/* Support */}
      <Card className="p-4 shadow-card">
        <h3 className="font-semibold mb-4">Support & Info</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <div className="text-left">
              <p className="font-medium">Help Center</p>
              <p className="text-sm text-muted-foreground">FAQs and tutorials</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Star className="w-5 h-5 text-muted-foreground" />
            <div className="text-left">
              <p className="font-medium">Rate Exit Strategy</p>
              <p className="text-sm text-muted-foreground">Help us improve</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Info className="w-5 h-5 text-muted-foreground" />
            <div className="text-left">
              <p className="font-medium">About</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
}