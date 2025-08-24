import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Camera, Save, Edit, Trash2 } from "lucide-react";
import contactMomImage from "@/assets/contact-mom.jpg";
import contactBossImage from "@/assets/contact-boss.jpg";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  image: string;
}

const defaultContacts: Contact[] = [
  {
    id: '1',
    name: 'Mom',
    phone: '+1 (555) 123-4567',
    relationship: 'Mom',
    image: contactMomImage
  },
  {
    id: '2',
    name: 'John Smith',
    phone: '+1 (555) 987-6543',
    relationship: 'Boss',
    image: contactBossImage
  }
];

export function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    image: ''
  });

  const relationships = ['Mom', 'Dad', 'Boss', 'Doctor', 'Friend', 'Spouse', 'Other'];

  const handleAddNew = () => {
    setFormData({ name: '', phone: '', relationship: '', image: '' });
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
      // Update existing contact
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData,
        image: formData.image || contactMomImage // Default image
      };
      setContacts([...contacts, newContact]);
    }
    setIsEditing(false);
    setEditingContact(null);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  if (isEditing) {
    return (
      <div className="p-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {editingContact ? 'Edit Contact' : 'Add Contact'}
          </h1>
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="px-4"
          >
            Cancel
          </Button>
        </div>

        <Card className="p-6 shadow-card">
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
                <img 
                  src={formData.image || contactMomImage} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select 
                  value={formData.relationship}
                  onValueChange={(value) => setFormData({...formData, relationship: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {relationships.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!formData.name || !formData.phone}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Contact
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Button 
          onClick={handleAddNew}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-4 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={contact.image} 
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
                <p className="text-xs text-primary">{contact.relationship}</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(contact)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(contact.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}