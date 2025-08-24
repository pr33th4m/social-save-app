import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Phone, Plus, Edit, Trash2 } from "lucide-react";
import contactMomImage from "@/assets/contact-mom.jpg";
import contactBossImage from "@/assets/contact-boss.jpg";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  image: string;
}

interface HomeScreenProps {
  onQuickEscape: (seconds: number, contact: Contact) => void;
}

const defaultContacts: Contact[] = [
  { id: '1', name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family', image: contactMomImage },
  { id: '2', name: 'Boss', phone: '+1 (555) 987-6543', relationship: 'Work', image: contactBossImage },
];

export function HomeScreen({ onQuickEscape }: HomeScreenProps) {
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [selectedContact, setSelectedContact] = useState<Contact>(defaultContacts[0]);
  const [selectedTime, setSelectedTime] = useState(30);
  const [customMinutes, setCustomMinutes] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: 'Family',
    image: contactMomImage
  });

  const timeOptions = [
    { value: 30, label: "30 seconds" },
    { value: 300, label: "5 minutes" },
    { value: 0, label: "Custom" }
  ];

  const relationshipOptions = ['Family', 'Work', 'Friend', 'Doctor', 'Other'];

  const handleAddNew = () => {
    setFormData({ name: '', phone: '', relationship: 'Family', image: contactMomImage });
    setEditingContact(null);
    setIsEditing(true);
  };

  const handleEdit = (contact: Contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
      image: contact.image
    });
    setEditingContact(contact);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...editingContact, ...formData }
          : c
      ));
    } else {
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData
      };
      setContacts([...contacts, newContact]);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    if (selectedContact.id === id && contacts.length > 1) {
      setSelectedContact(contacts.find(c => c.id !== id) || contacts[0]);
    }
  };

  const handleQuickEscape = () => {
    const timeInSeconds = selectedTime === 0 ? customMinutes * 60 : selectedTime;
    onQuickEscape(timeInSeconds, selectedContact);
  };

  if (isEditing) {
    return (
      <div className="p-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {editingContact ? 'Edit Contact' : 'Add Contact'}
          </h1>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>

        <Card className="p-6 shadow-card">
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-secondary">
                <img 
                  src={formData.image} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium mb-2">Relationship</label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {relationshipOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90">
              {editingContact ? 'Update Contact' : 'Save Contact'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Exit Strategy</h1>
        <p className="text-muted-foreground">Choose your escape contact</p>
      </div>

      {/* Contact Selection */}
      <Card className="p-4 mb-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Contact</h2>
          <Button variant="outline" size="sm" onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedContact.id === contact.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <img 
                  src={contact.image} 
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{contact.name}</div>
                <div className="text-sm opacity-80">{contact.relationship}</div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(contact);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                {contacts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(contact.id);
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Time Options */}
      <Card className="p-4 mb-8 shadow-card">
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

      {/* Quick Escape Button */}
      <div className="text-center mb-6">
        <Button
          onClick={handleQuickEscape}
          className="w-48 h-48 rounded-full bg-gradient-primary hover:bg-gradient-primary hover:opacity-90 shadow-primary text-white text-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="flex flex-col items-center gap-2">
            <Phone className="w-12 h-12" />
            <span>Quick Escape</span>
          </div>
        </Button>
      </div>

      {/* Usage Counter */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          2 of 3 free calls used today
        </p>
      </div>
    </div>
  );
}

