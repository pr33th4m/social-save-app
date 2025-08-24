import { useState } from "react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { FakeCallScreen } from "@/components/screens/FakeCallScreen";
import { ContactsScreen } from "@/components/screens/ContactsScreen";
import { ScheduleScreen } from "@/components/screens/ScheduleScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import contactMomImage from "@/assets/contact-mom.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState('escape');
  const [showFakeCall, setShowFakeCall] = useState(false);

  const handleQuickEscape = (seconds: number) => {
    if (seconds === 0) {
      // Custom time - for now just use 30 seconds
      setTimeout(() => setShowFakeCall(true), 30000);
    } else {
      setTimeout(() => setShowFakeCall(true), seconds * 1000);
    }
  };

  const handleEndCall = () => {
    setShowFakeCall(false);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'escape':
        return <HomeScreen onQuickEscape={handleQuickEscape} />;
      case 'contacts':
        return <ContactsScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onQuickEscape={handleQuickEscape} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {showFakeCall && (
        <FakeCallScreen
          callerName="Mom"
          callerNumber="+1 (555) 123-4567"
          callerImage={contactMomImage}
          onEndCall={handleEndCall}
        />
      )}
      
      {!showFakeCall && (
        <>
          {renderScreen()}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default Index;
