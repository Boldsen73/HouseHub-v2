
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import { Home, MapPin, Calendar, Zap } from 'lucide-react';

const PropertyDataExtended = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('propertyDataForm');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      address: '',
      postalCode: '',
      city: '',
      propertyType: '',
      size: '',
      rooms: '',
      buildYear: '',
      condition: '',
      hasGarden: false,
      hasBalcony: false,
      hasParking: false,
      energyLabel: '',
      notes: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('propertyDataForm', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={1} totalSteps={3} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Boligoplysninger</CardTitle>
              <p className="text-gray-600 text-lg">
                Fortæl os om din bolig, så vi kan finde de bedste mæglere til dig.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                
                {/* Address Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <Label className="text-lg font-semibold">Adresse</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="f.eks. Nørregade 12"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postnummer *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          placeholder="f.eks. 8000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">By *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="f.eks. Aarhus"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-green-600" />
                    <Label className="text-lg font-semibold">Boligdetaljer</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Boligtype *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({...formData, propertyType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vælg boligtype" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="raekkeHus">Rækkehus</SelectItem>
                          <SelectItem value="lejlighed">Lejlighed</SelectItem>
                          <SelectItem value="ejerlejlighed">Ejerlejlighed</SelectItem>
                          <SelectItem value="andre">Andet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="size">Størrelse (m²) *</Label>
                      <Input
                        id="size"
                        type="number"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        placeholder="f.eks. 120"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rooms">Antal værelser</Label>
                      <Input
                        id="rooms"
                        value={formData.rooms}
                        onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                        placeholder="f.eks. 4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="buildYear">Byggeår</Label>
                      <Input
                        id="buildYear"
                        type="number"
                        value={formData.buildYear}
                        onChange={(e) => setFormData({...formData, buildYear: e.target.value})}
                        placeholder="f.eks. 1995"
                      />
                    </div>
                  </div>
                </div>

                {/* Condition and Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <Label className="text-lg font-semibold">Stand og faciliteter</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="condition">Stand</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({...formData, condition: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vælg stand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nyistandsat">Nyistandsat</SelectItem>
                          <SelectItem value="velholdt">Velholdt</SelectItem>
                          <SelectItem value="tiltrængerRenovering">Tiltrænger renovering</SelectItem>
                          <SelectItem value="totalRenovering">Total renovering nødvendig</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="energyLabel">Energimærke</Label>
                      <Select
                        value={formData.energyLabel}
                        onValueChange={(value) => setFormData({...formData, energyLabel: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vælg energimærke" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                          <SelectItem value="G">G</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <Label className="font-medium">Have</Label>
                      <Switch
                        checked={formData.hasGarden}
                        onCheckedChange={(checked) => setFormData({...formData, hasGarden: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <Label className="font-medium">Balkon/Altan</Label>
                      <Switch
                        checked={formData.hasBalcony}
                        onCheckedChange={(checked) => setFormData({...formData, hasBalcony: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <Label className="font-medium">Parkering</Label>
                      <Switch
                        checked={formData.hasParking}
                        onCheckedChange={(checked) => setFormData({...formData, hasParking: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Yderligere bemærkninger</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Er der noget særligt ved boligen, som mæglere bør vide?"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/saelger/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Tilbage
                    </Button>
                  </Link>
                  <Link to="/saelger/salgsønsker" className="flex-1">
                    <Button 
                      className="w-full"
                      disabled={!formData.address || !formData.postalCode || !formData.city || !formData.propertyType || !formData.size}
                    >
                      Næste
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDataExtended;
