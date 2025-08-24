import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Phone } from "lucide-react";

interface HomeScreenProps {
  onQuickEscape: (seconds: number) => void;
}

export function HomeScreen({ onQuickEscape }: HomeScreenProps) {
  const [selectedTime, setSelectedTime] = useState(30);
  const [customMinutes, setCustomMinutes] = useState(1);

  const timeOptions = [
    { value: 30, label: "30 seconds" },
    { value: 300, label: "5 minutes" },
    { value: 0, label: "Custom" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Exit Strategy</h1>
        <p className="text-muted-foreground">Your escape route from awkward situations</p>
      </div>

      {/* Quick Escape Button */}
      <div className="mb-8">
        <Button
          onClick={() => onQuickEscape(selectedTime === 0 ? customMinutes * 60 : selectedTime)}
          className="w-64 h-64 rounded-full bg-gradient-primary hover:bg-gradient-primary hover:opacity-90 shadow-primary text-white text-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-12 h-12" />
            <span>Quick Escape</span>
          </div>
        </Button>
      </div>

      {/* Time Options */}
      <Card className="w-full max-w-sm p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Timer Options</span>
        </div>
        
        <div className="space-y-2">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedTime(option.value)}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                selectedTime === option.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {option.label}
            </button>
            ))}
          </div>
          
          {selectedTime === 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">Custom Time</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
          )}
        </Card>

      {/* Recent Calls */}
      <div className="mt-6 w-full max-w-sm">
        <p className="text-sm text-muted-foreground text-center">
          2 of 3 free calls used today
        </p>
      </div>
    </div>
  );
}

