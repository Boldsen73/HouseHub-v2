
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone } from 'lucide-react';

const SellerSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Fejl",
        description: "Du skal acceptere vilkårene for at fortsætte.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email) {
      toast({
        title: "Fejl",
        description: "Email er påkrævet.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Fejl",
        description: "Adgangskoderne matcher ikke.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Fejl",
        description: "Adgangskoden skal være mindst 6 tegn.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create user object with unique ID
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postalCode,
        city: formData.city,
        type: 'seller',
        createdAt: new Date().toISOString()
      };

      // Store user data and set as current user
      localStorage.setItem('seller_profile', JSON.stringify(newUser));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Bruger oprettet",
        description: "Din profil er blevet oprettet. Du omdirigeres til dit dashboard.",
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/saelger/dashboard');
      }, 1500);

    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved oprettelse af din bruger. Prøv igen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opret sælger-bruger
          </h1>
          <p className="text-gray-600">
            Udfyld formularen for at komme i gang med HouseHub
          </p>
        </div>

        <Card className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              Personlige oplysninger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Fulde navn *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Indtast dit fulde navn"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="din@email.dk"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+45 12 34 56 78"
                  required
                />
              </div>

              {/* Address Information (kept for contact purposes) */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Kontaktadresse
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Vejnavn og husnummer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postnummer</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="2100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">By</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="København"
                    />
                  </div>
                </div>
              </div>

              {/* Password fields */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Adgangskode
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Adgangskode *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Mindst 6 tegn"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Bekræft adgangskode *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Gentag adgangskode"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Bemærk:</strong> Efter brugeroprettelse kan du oprette en sag og udfylde detaljer om den bolig, du ønsker at sælge.
                </p>
              </div>

              {/* Terms and Submit */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Jeg accepterer HouseHubs{' '}
                    <a href="/vilkaar" className="text-blue-600 hover:underline">
                      vilkår og betingelser
                    </a>
                    {' '}og{' '}
                    <a href="/privatlivspolitik" className="text-blue-600 hover:underline">
                      privatlivspolitik
                    </a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out hover:scale-105"
                  disabled={isSubmitting || !formData.acceptTerms}
                >
                  {isSubmitting ? 'Opretter bruger...' : 'Opret bruger'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerSignup;
