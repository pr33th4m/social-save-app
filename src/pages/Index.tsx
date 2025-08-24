import { useState } from "react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { FakeCallScreen } from "@/components/screens/FakeCallScreen";
import { ScheduleScreen } from "@/components/screens/ScheduleScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  image: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('escape');
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleQuickEscape = (seconds: number, contact: Contact) => {
    setSelectedContact(contact);
    if (seconds === 0) {
      // Custom time - for now just use 30 seconds
      setTimeout(() => setShowFakeCall(true), 30000);
    } else {
      setTimeout(() => setShowFakeCall(true), seconds * 1000);
    }
  };

  const handleEndCall = () => {
    setShowFakeCall(false);
    setSelectedContact(null);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'escape':
        return <HomeScreen onQuickEscape={handleQuickEscape} />;
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
      {showFakeCall && selectedContact && (
        <FakeCallScreen
          callerName={selectedContact.name}
          callerNumber={selectedContact.phone}
          callerImage={selectedContact.image}
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
