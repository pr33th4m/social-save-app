import { useState, useEffect } from "react";
import { Phone, PhoneOff } from "lucide-react";
import callBackgroundImage from "@/assets/call-background.jpg";
import contactMomImage from "@/assets/contact-mom.jpg";

interface FakeCallScreenProps {
  callerName: string;
  callerNumber: string;
  callerImage: string;
  onEndCall: () => void;
}

export function FakeCallScreen({ 
  callerName = "Mom", 
  callerNumber = "+1 (555) 123-4567",
  callerImage = contactMomImage,
  onEndCall 
}: FakeCallScreenProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnswered) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnswered]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    setIsAnswered(true);
  };

  const handleDecline = () => {
    onEndCall();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${callBackgroundImage})`,
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Call Interface */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-8 text-white">
        
        {/* Call Status */}
        <div className="flex flex-col items-center mt-16">
          <p className="text-sm opacity-80 mb-2">
            {isAnswered ? formatDuration(callDuration) : "Incoming call"}
          </p>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>

        {/* Caller Info */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-2xl">
            <img 
              src={callerImage} 
              alt={callerName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-light mb-2">{callerName}</h1>
          <p className="text-lg opacity-80">{callerNumber}</p>
        </div>

        {/* Call Actions */}
        <div className="flex justify-center gap-16 mb-8">
          {!isAnswered && (
            <button
              onClick={handleAnswer}
              className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg hover:bg-success/90 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Phone className="w-8 h-8 text-white" />
            </button>
          )}
          
          <button
            onClick={handleDecline}
            className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center shadow-lg hover:bg-destructive/90 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <PhoneOff className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}