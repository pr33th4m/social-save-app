import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Plus, X } from "lucide-react";

interface ScheduledCall {
  id: string;
  time: Date;
  caller: string;
  duration: string;
}

export function ScheduleScreen() {
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([
    {
      id: '1',
      time: new Date(Date.now() + 30000), // 30 seconds from now
      caller: 'Mom',
      duration: '2 minutes'
    }
  ]);
  
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30); // seconds
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(1);
  const [customSeconds, setCustomSeconds] = useState(0);
  const [isCustomTime, setIsCustomTime] = useState(false);

  const quickTimes = [
    { value: 30, label: '30 sec' },
    { value: 60, label: '1 min' },
    { value: 300, label: '5 min' },
    { value: 600, label: '10 min' },
    { value: -1, label: 'Custom' },
  ];

  const handleSchedule = () => {
    const timeInSeconds = isCustomTime 
      ? (customHours * 3600 + customMinutes * 60 + customSeconds)
      : selectedTime;
    
    const newCall: ScheduledCall = {
      id: Date.now().toString(),
      time: new Date(Date.now() + timeInSeconds * 1000),
      caller: 'Mom',
      duration: '2 minutes'
    };
    setScheduledCalls([...scheduledCalls, newCall]);
    setIsScheduling(false);
    setIsCustomTime(false);
  };

  const handleCancel = (id: string) => {
    setScheduledCalls(scheduledCalls.filter(call => call.id !== id));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCountdown = (date: Date) => {
    const diff = Math.max(0, Math.floor((date.getTime() - Date.now()) / 1000));
    if (diff < 60) return `${diff}s`;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Schedule Call</h1>
        <Button 
          onClick={() => setIsScheduling(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule
        </Button>
      </div>

      {isScheduling && (
        <Card className="p-6 mb-6 shadow-card">
          <h2 className="text-lg font-semibold mb-4">New Scheduled Call</h2>
          
          {/* Quick Time Options */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Quick Options</p>
            <div className="grid grid-cols-2 gap-2">
              {quickTimes.map((time) => (
                <button
                  key={time.value}
                  onClick={() => {
                    if (time.value === -1) {
                      setIsCustomTime(true);
                    } else {
                      setSelectedTime(time.value);
                      setIsCustomTime(false);
                    }
                  }}
                  className={`p-3 rounded-lg text-center transition-all duration-200 ${
                    (time.value === -1 && isCustomTime) || (time.value !== -1 && selectedTime === time.value && !isCustomTime)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Time Picker */}
          {isCustomTime && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Set Custom Time</p>
              <div className="p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <label className="block text-xs text-muted-foreground mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={customHours}
                      onChange={(e) => setCustomHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                      className="w-16 px-2 py-2 bg-background border border-border rounded-lg text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="text-2xl text-muted-foreground">:</div>
                  <div className="text-center">
                    <label className="block text-xs text-muted-foreground mb-1">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-16 px-2 py-2 bg-background border border-border rounded-lg text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="text-2xl text-muted-foreground">:</div>
                  <div className="text-center">
                    <label className="block text-xs text-muted-foreground mb-1">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={customSeconds}
                      onChange={(e) => setCustomSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-16 px-2 py-2 bg-background border border-border rounded-lg text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="text-sm text-muted-foreground">
                    Total: {customHours > 0 && `${customHours}h `}{customMinutes > 0 && `${customMinutes}m `}{customSeconds > 0 && `${customSeconds}s`}
                    {customHours === 0 && customMinutes === 0 && customSeconds === 0 && "Please set a time"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={handleSchedule} className="flex-1 bg-gradient-primary hover:opacity-90">
              Schedule Call
            </Button>
            <Button variant="outline" onClick={() => setIsScheduling(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Scheduled Calls */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Calls</h2>
        
        {scheduledCalls.length === 0 ? (
          <Card className="p-8 text-center shadow-card">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No scheduled calls</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {scheduledCalls.map((call) => (
              <Card key={call.id} className="p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{call.caller}</span>
                      <span className="text-sm text-primary">in {getCountdown(call.time)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(call.time)} • {call.duration}
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancel(call.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}