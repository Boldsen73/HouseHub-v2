
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Om HouseHub
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vores Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                HouseHub revolutionerer ejendomsmarkedet ved at forbinde sælgere direkte med kvalificerede ejendomsmæglere. 
                Vi gør det nemt, transparent og effektivt at sælge din bolig.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Hvordan vi arbejder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Vores platform giver sælgere mulighed for at modtage konkurrencedygtige tilbud fra flere mæglere, 
                mens mæglere får adgang til kvalificerede leads og kan fokusere på deres kernekompetencer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vores Værdier</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Transparens i alle processer</li>
                <li>Fokus på kundetilfredshed</li>
                <li>Innovation inden for ejendomstech</li>
                <li>Sikkerhed og troværdighed</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
