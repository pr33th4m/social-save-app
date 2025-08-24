import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, Crown, Bell, Volume2, HelpCircle, Shield, Star } from "lucide-react";

export function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  return (
    <div className="p-6 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Premium Banner */}
      <Card className="p-6 mb-6 bg-gradient-primary text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upgrade to Premium</h3>
              <p className="text-sm text-white/90">Unlimited calls & advanced features</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          >
            Upgrade
          </Button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm">
            <span>Daily Usage</span>
            <span className="font-medium">2 of 3 free calls used</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div className="bg-white rounded-full h-2 w-2/3"></div>
          </div>
        </div>
      </Card>

      {/* App Settings */}
      <Card className="p-6 mb-6 shadow-card">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          App Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Play ringtone during fake calls</p>
              </div>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-muted-foreground flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium">Vibration</p>
                <p className="text-sm text-muted-foreground">Vibrate during incoming calls</p>
              </div>
            </div>
            <Switch
              checked={vibrationEnabled}
              onCheckedChange={setVibrationEnabled}
            />
          </div>
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="p-6 shadow-card">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Help & Support
        </h2>
        
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <span>How to Use</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <span>Privacy Policy</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <span>Terms of Service</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <span>Contact Support</span>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-primary" />
                <span>Rate Exit Strategy</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>
          </button>
        </div>
      </Card>

      {/* App Version */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">Exit Strategy v1.0.0</p>
      </div>
    </div>
  );
}