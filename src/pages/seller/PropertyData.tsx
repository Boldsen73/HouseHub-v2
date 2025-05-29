
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import PropertyAddressSection from '../../components/seller/PropertyAddressSection';
import PropertyDetailsSection from '../../components/seller/PropertyDetailsSection';
import PropertyNotesSection from '../../components/seller/PropertyNotesSection';

const PropertyData = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('propertyForm');
    const sellerProfile = localStorage.getItem('seller_profile');
    
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    // Pre-fill address from seller profile if available
    let defaultData = {
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

    if (sellerProfile) {
      const profile = JSON.parse(sellerProfile);
      defaultData.address = profile.address || '';
      defaultData.postalCode = profile.postalCode || '';
      defaultData.city = profile.city || '';
    }

    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('propertyForm', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={1} totalSteps={6} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Boligoplysninger</CardTitle>
              <p className="text-gray-600 text-lg">
                Fortæl os om den bolig, du ønsker at sælge
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-6">
                
                <PropertyAddressSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                />

                <PropertyDetailsSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                />

                <PropertyNotesSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
                
                <div className="flex gap-4 pt-6">
                  <Link to="/saelger/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Tilbage
                    </Button>
                  </Link>
                  <Link to="/saelger/salgsønsker" className="flex-1">
                    <Button className="w-full">
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

export default PropertyData;
