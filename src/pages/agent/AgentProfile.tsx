import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, User, Building, Upload, Key, Settings } from 'lucide-react';
import HeaderNavigation from '@/components/agent/browseCases/HeaderNavigation';
import { useToast } from "@/hooks/use-toast";

const AgentProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    bio: '',
    primaryRegion: '',
    specialties: [],
    marketingPreferences: {
      allowDirectContact: false,
      shareStatistics: true,
      emailNotifications: true
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Load current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    console.log('AgentProfile - Loading user data:', currentUser);
    console.log('AgentProfile - User properties:', {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      company: currentUser.company,
      agencyName: currentUser.agencyName
    });
    
    if (currentUser && (currentUser.role === 'agent' || currentUser.type === 'agent')) {
      // Build the full name from firstName and lastName if available
      let displayName = '';
      if (currentUser.firstName && currentUser.lastName) {
        displayName = `${currentUser.firstName} ${currentUser.lastName}`.trim();
      } else if (currentUser.firstName) {
        displayName = currentUser.firstName;
      } else if (currentUser.name) {
        displayName = currentUser.name;
      } else if (currentUser.email) {
        displayName = currentUser.email.split('@')[0];
      }
      
      console.log('AgentProfile - Setting display name:', displayName);
      
      setFormData(prev => ({
        ...prev,
        name: displayName,
        email: currentUser.email || '',
        phone: currentUser.phone || currentUser.phoneNumber || '',
        company: currentUser.company || currentUser.agencyName || currentUser.agency || '',
        primaryRegion: currentUser.primaryRegion || currentUser.region || '',
        specialties: currentUser.specialties || [],
        bio: currentUser.bio || 'Erfaren ejendomsmægler med fokus på kundetilfredshed.'
      }));
      
      console.log('AgentProfile - Form data set');
    }

    // Load any saved profile changes and merge with current data
    const savedProfile = localStorage.getItem('agentProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        console.log('AgentProfile - Merging saved profile:', profile);
        setFormData(prev => ({
          ...prev,
          ...profile
        }));
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    // Save profile data
    localStorage.setItem('agentProfile', JSON.stringify(formData));
    
    // Update current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const nameParts = formData.name.split(' ');
    const updatedUser = {
      ...currentUser,
      firstName: nameParts[0] || formData.name,
      lastName: nameParts.slice(1).join(' ') || '',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      agencyName: formData.company,
      primaryRegion: formData.primaryRegion,
      specialties: formData.specialties,
      bio: formData.bio
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    console.log('AgentProfile - Updated user data:', updatedUser);
    
    toast({
      title: "Profil opdateret",
      description: "Dine profiloplysninger er blevet gemt."
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Fejl",
        description: "De nye adgangskoder matcher ikke.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Fejl",
        description: "Adgangskoden skal være mindst 8 tegn.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Adgangskode ændret",
      description: "Din adgangskode er blevet opdateret."
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/maegler/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbage til dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profiloplysninger
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Navn</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Firma</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryRegion">Primær region</Label>
                <Input
                  id="primaryRegion"
                  value={formData.primaryRegion}
                  onChange={(e) => setFormData({...formData, primaryRegion: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Beskrivelse</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Logo upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload dit firma logo</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Vælg fil
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleSaveProfile} className="w-full">
                Gem profiloplysninger
              </Button>
            </CardContent>
          </Card>

          {/* Password & Settings */}
          <div className="space-y-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Skift adgangskode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Nuværende adgangskode</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Ny adgangskode</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Bekræft ny adgangskode</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                
                <Button onClick={handlePasswordChange} className="w-full">
                  Skift adgangskode
                </Button>
              </CardContent>
            </Card>

            {/* Marketing Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Markedsføringstilvalg
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="directContact"
                    checked={formData.marketingPreferences.allowDirectContact}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData, 
                        marketingPreferences: {
                          ...formData.marketingPreferences,
                          allowDirectContact: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor="directContact">Tillad direkte kontakt fra sælgere</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shareStats"
                    checked={formData.marketingPreferences.shareStatistics}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData, 
                        marketingPreferences: {
                          ...formData.marketingPreferences,
                          shareStatistics: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor="shareStats">Del statistikker med HouseHub</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotifs"
                    checked={formData.marketingPreferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData, 
                        marketingPreferences: {
                          ...formData.marketingPreferences,
                          emailNotifications: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor="emailNotifs">Modtag email notifikationer</Label>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Vilkår og betingelser</h4>
                  <p className="text-sm text-blue-800">
                    Ved at bruge HouseHub accepterer du, at vi ikke tilbyder direkte kontakt 
                    mellem mæglere og sælgere uden for platformen, og at anonymiserede 
                    statistikker kan bruges til at forbedre tjenesten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
