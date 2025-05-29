
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Clock, Target, Heart, Info } from 'lucide-react';

const SalePreferences = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('salePreferencesForm');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      expectedPrice: [3000000],
      timeframe: [6],
      timeframeType: 'months', // 'asap' or 'months'
      prioritySpeed: false,
      priorityPrice: true,
      priorityService: false,
      specialRequests: '',
      flexiblePrice: true,
      marketingBudget: [0]
    };
  });

  useEffect(() => {
    localStorage.setItem('salePreferencesForm', JSON.stringify(formData));
  }, [formData]);

  const formatPrice = (price: number) => {
    return (price / 1000000).toFixed(1) + ' mio. kr';
  };

  const formatTimeframe = (months: number) => {
    if (months === 1) return '1 måned';
    if (months < 12) return `${months} måneder`;
    if (months === 12) return '1 år';
    return `${Math.floor(months / 12)} år`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={2} totalSteps={3} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Salgsønsker</CardTitle>
              <p className="text-gray-600 text-lg">
                Jo mere præcis du er, desto bedre bliver de tilbud, du modtager.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-8">
                
                {/* Expected Price */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <Label className="text-lg font-semibold">Forventet salgspris</Label>
                  </div>
                  <div className="space-y-3">
                    <Slider
                      value={formData.expectedPrice}
                      onValueChange={(value) => setFormData({...formData, expectedPrice: value})}
                      max={10000000}
                      min={500000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0,5 mio. kr</span>
                      <span className="font-semibold text-blue-600 text-lg">
                        {formatPrice(formData.expectedPrice[0])}
                      </span>
                      <span>10 mio. kr</span>
                    </div>
                  </div>
                </div>

                {/* Timeframe */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <Label className="text-lg font-semibold">Ønsket salgstid</Label>
                  </div>
                  
                  <div className="space-y-4">
                    <Select
                      value={formData.timeframeType}
                      onValueChange={(value) => setFormData({...formData, timeframeType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vælg tidsramme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">Hurtigst muligt</SelectItem>
                        <SelectItem value="months">Bestemt tidsramme</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {formData.timeframeType === 'months' && (
                      <div className="space-y-3">
                        <Slider
                          value={formData.timeframe}
                          onValueChange={(value) => setFormData({...formData, timeframe: value})}
                          max={24}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>1 måned</span>
                          <span className="font-semibold text-green-600 text-lg">
                            {formatTimeframe(formData.timeframe[0])}
                          </span>
                          <span>2 år</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Priorities */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-600" />
                    <Label className="text-lg font-semibold">Dine prioriteter</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <Label className="font-medium">Hurtig salg</Label>
                        <p className="text-sm text-gray-600">Jeg ønsker at sælge så hurtigt som muligt</p>
                      </div>
                      <Switch
                        checked={formData.prioritySpeed}
                        onCheckedChange={(checked) => setFormData({...formData, prioritySpeed: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <Label className="font-medium">Høj pris</Label>
                        <p className="text-sm text-gray-600">Jeg ønsker den bedst mulige pris</p>
                      </div>
                      <Switch
                        checked={formData.priorityPrice}
                        onCheckedChange={(checked) => setFormData({...formData, priorityPrice: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <Label className="font-medium">God service</Label>
                        <p className="text-sm text-gray-600">Jeg prioriterer god kommunikation og vejledning</p>
                      </div>
                      <Switch
                        checked={formData.priorityService}
                        onCheckedChange={(checked) => setFormData({...formData, priorityService: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Flexible Price */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-yellow-600" />
                      <div>
                        <Label className="font-medium">Fleksibel pris</Label>
                        <p className="text-sm text-gray-600">Er du åben for forhandling om prisen?</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.flexiblePrice}
                      onCheckedChange={(checked) => setFormData({...formData, flexiblePrice: checked})}
                    />
                  </div>
                </div>

                {/* Marketing Budget */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Markedsføringsbudget</Label>
                  <div className="space-y-3">
                    <Slider
                      value={formData.marketingBudget}
                      onValueChange={(value) => setFormData({...formData, marketingBudget: value})}
                      max={50000}
                      min={0}
                      step={2500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0 kr</span>
                      <span className="font-semibold text-purple-600 text-lg">
                        {formData.marketingBudget[0].toLocaleString('da-DK')} kr
                      </span>
                      <span>50.000 kr</span>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Særlige ønsker eller kommentarer</Label>
                  <Textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    placeholder="f.eks. specific mæglerfirmaer, særlige markedsføringsønsker, tidsplan..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/saelger/boligdata-ny" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Tilbage
                    </Button>
                  </Link>
                  <Link to="/saelger/prisinfo" className="flex-1">
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

export default SalePreferences;
