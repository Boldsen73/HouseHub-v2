import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Kontakt os
            </h1>
            <p className="text-xl text-gray-600">
              Vi er her for at hjælpe dig. Send os en besked, så vender vi tilbage hurtigst muligt.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Send os en besked</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Navn</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Dit fulde navn"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="din@email.dk"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+45 12 34 56 78"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Emne</Label>
                      <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Vælg emne" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seller-support">Hjælp til boligsælger</SelectItem>
                          <SelectItem value="agent-support">Hjælp til ejendomsmægler</SelectItem>
                          <SelectItem value="technical">Teknisk support</SelectItem>
                          <SelectItem value="billing">Fakturering</SelectItem>
                          <SelectItem value="partnership">Partnerskab</SelectItem>
                          <SelectItem value="other">Andet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Besked</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Beskriv dit spørgsmål eller kommentar..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send besked
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Kontakt information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                      <a href="mailto:hello@househub.dk" className="text-gray-600 hover:text-blue-600 hover:underline">hello@househub.dk</a>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Telefon</h4>
                      <p className="text-gray-600">+45 12 34 56 78</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Åbningstider</h4>
                      <div className="text-gray-600 text-sm">
                        <p>Mandag - Fredag: 09:00 - 17:00</p>
                        <p>Weekend: Lukket</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Adresse</h4>
                      <p className="text-gray-600">København, Danmark</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Hurtig hjælp</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Boligsælgere</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        Har du spørgsmål til salgsprocessen eller dit tilbud?
                      </p>
                      <a href="mailto:support-seller@househub.dk" className="text-sm text-blue-600 hover:underline">support-seller@househub.dk</a>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Ejendomsmæglere</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        Tekniske spørgsmål eller hjælp med platformen?
                      </p>
                      <a href="mailto:support-agent@househub.dk" className="text-sm text-blue-600 hover:underline">support-agent@househub.dk</a>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Presseanmodninger</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        Journalister og medier er velkomne til at kontakte os.
                      </p>
                      <a href="mailto:press@househub.dk" className="text-sm text-blue-600 hover:underline">press@househub.dk</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
