import { useState, useEffect } from "react";
import { Phone, PhoneOff, MessageSquare, Clock } from "lucide-react";
import callBackgroundImage from "@/assets/call-background.jpg";

interface FakeCallScreenProps {
  callerName: string;
  callerNumber: string;
  callerImage: string;
  onEndCall: () => void;
}

export function FakeCallScreen({ 
  callerName = "Mom", 
  callerNumber = "+1 (555) 123-4567",
  callerImage,
  onEndCall 
}: FakeCallScreenProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnswered) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnswered]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
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
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/20" />
      
      {/* iOS Status Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-4 pb-2 text-white text-sm font-medium">
        <span>{formatTime(currentTime)}</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <svg className="w-6 h-3 ml-1" viewBox="0 0 24 12" fill="none">
            <path d="M2 3H22V9H2V3Z" stroke="white" strokeWidth="1" fill="none"/>
            <path d="M23 5V7H24V5H23Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Call Interface */}
      <div className="relative z-10 flex flex-col h-full text-white">
        
        {/* Call Status and Number */}
        <div className="flex flex-col items-center mt-12 mb-8">
          <div className="text-center mb-4">
            <p className="text-lg mb-1">{callerNumber}</p>
            <p className="text-sm text-white/80 mb-2">
              {isAnswered ? formatDuration(callDuration) : "incoming call"}
            </p>
          </div>
        </div>

        {/* Caller Info */}
        <div className="flex flex-col items-center flex-1 justify-center">
          <div className="w-52 h-52 rounded-full overflow-hidden mb-8 shadow-2xl">
            <img 
              src={callerImage} 
              alt={callerName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-4xl font-light mb-4">{callerName}</h1>
        </div>

        {/* Action Buttons */}
        <div className="pb-12">
          {!isAnswered && (
            <div className="flex justify-center gap-20 mb-12">
              {/* Remind Me and Message */}
              <div className="flex flex-col items-center">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-white" />
                </button>
                <span className="text-sm text-white/80">Remind Me</span>
              </div>
              
              <div className="flex flex-col items-center">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-white" />
                </button>
                <span className="text-sm text-white/80">Message</span>
              </div>
            </div>
          )}
          
          {/* Answer/Decline Buttons */}
          <div className="flex justify-center gap-32">
            <div className="flex flex-col items-center">
              <button
                onClick={handleDecline}
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <PhoneOff className="w-8 h-8 text-white" />
              </button>
              <span className="text-sm text-white/80 mt-2">Decline</span>
            </div>
            
            {!isAnswered && (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleAnswer}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-8 h-8 text-white" />
                </button>
                <span className="text-sm text-white/80 mt-2">Accept</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}