
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Home, Info, FileText } from 'lucide-react';
import { fetchPublicValuation } from '@/services/publicValuationService';
import { generateSagsnummer, saveTestCase, addTestUser } from '@/utils/testData';
import { useToast } from '@/hooks/use-toast';

const PriceInfo = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [salePreferences, setSalePreferences] = useState(null);
  const [publicValuation, setPublicValuation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      // Get saved property data and sale preferences
      const savedPropertyData = localStorage.getItem('propertyForm');
      const savedSalePreferences = localStorage.getItem('salePreferencesForm');
      
      console.log('Property data:', savedPropertyData);
      console.log('Sale preferences:', savedSalePreferences);
      
      if (savedPropertyData) {
        const propertyData = JSON.parse(savedPropertyData);
        setPropertyData(propertyData);
        
        // Get public valuation
        try {
          const valuation = await fetchPublicValuation(propertyData.address, propertyData.postalCode);
          setPublicValuation(valuation);
        } catch (error) {
          console.error('Error fetching valuation:', error);
        }
      }
      
      if (savedSalePreferences) {
        setSalePreferences(JSON.parse(savedSalePreferences));
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleCreateCase = async () => {
    if (!propertyData) {
      toast({
        title: "Fejl",
        description: "Ingen boligdata fundet. Gå tilbage og udfyld formularen.",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingCase(true);

    try {
      // Create a unique user ID
      const userId = `seller-${Date.now()}`;
      
      console.log('=== CREATING USER AND CASE ===');
      console.log('Creating user with ID:', userId);
      
      // Create the user object
      const newUser = {
        id: userId,
        name: 'Demo Sælger',
        email: `seller${Date.now()}@househub.dk`,
        password: '12345678',
        phone: '+45 12 34 56 78',
        role: 'seller' as const,
        address: propertyData.address,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      
      // Add user to test users storage
      addTestUser(newUser);
      
      // Save user as current user in the exact format the dashboard expects
      const currentUser = {
        id: userId,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        address: newUser.address
      };
      
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log('Saved currentUser to localStorage:', currentUser);

      // Get expected price from sale preferences
      const expectedPrice = salePreferences?.expectedPrice?.[0] || 0;
      const formattedPrice = expectedPrice ? `${(expectedPrice / 1000000).toFixed(1)} mio. kr` : 'Ikke angivet';

      // Create new case
      const newCase = {
        id: Date.now().toString(),
        sagsnummer: generateSagsnummer(),
        sellerId: userId, // Use the new user ID
        address: propertyData.address,
        postnummer: propertyData.postalCode,
        municipality: propertyData.city,
        type: propertyData.propertyType,
        size: parseInt(propertyData.size) || 0,
        buildYear: parseInt(propertyData.buildYear) || new Date().getFullYear(),
        price: formattedPrice,
        priceValue: expectedPrice,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        offers: [],
        showingRegistrations: [],
        messages: []
      };

      console.log('Creating case:', newCase);
      console.log('Case sellerId matches userId:', newCase.sellerId === userId);

      // Save the case
      saveTestCase(newCase);

      // Verify everything was saved correctly
      const savedCases = JSON.parse(localStorage.getItem('test_cases') || '[]');
      const savedCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      
      console.log('Verification after save:');
      console.log('- Saved currentUser:', savedCurrentUser);
      console.log('- Total cases in storage:', savedCases.length);
      console.log('- Cases for this user:', savedCases.filter(c => c.sellerId === userId));

      // Clear the form data
      localStorage.removeItem('propertyForm');
      localStorage.removeItem('salePreferencesForm');

      toast({
        title: "Sag oprettet",
        description: `Din sag ${newCase.sagsnummer} er blevet oprettet.`,
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        console.log('Navigating to dashboard...');
        navigate('/saelger/dashboard');
      }, 1000);

    } catch (error) {
      console.error('Error creating case:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved oprettelse af din sag. Prøv igen.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingCase(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Indlæser prisoplysninger...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={3} totalSteps={3} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Prisoplysninger</CardTitle>
              <p className="text-gray-600 text-lg">
                Her er de aktuelle markedsoplysninger for din bolig
              </p>
            </CardHeader>
            <CardContent className="p-8">
              
              {propertyData && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Home className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{propertyData.address}</h3>
                      <p className="text-sm text-gray-600">
                        {propertyData.size} m² • {propertyData.propertyType} • Bygget {propertyData.buildYear}
                      </p>
                      {salePreferences && (
                        <p className="text-sm text-gray-600">
                          Forventet pris: {(salePreferences.expectedPrice[0] / 1000000).toFixed(1)} mio. kr
                        </p>
                      )}
                    </div>
                  </div>

                  {publicValuation && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg font-semibold">Offentlig vurdering</h3>
                      </div>
                      
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-700">
                            {formatPrice(publicValuation)}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            Seneste offentlige vurdering
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Bemærk</h4>
                        <p className="text-sm text-yellow-700">
                          Den offentlige vurdering kan afvige fra markedsprisen. 
                          Mæglerne vil give dig deres professionelle vurdering baseret på aktuelle markedsforhold.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Dokumenter</h4>
                        <p className="text-sm text-blue-700">
                          HouseHub henter automatisk relevante dokumenter for din bolig, 
                          så mæglerne får alle nødvendige oplysninger til at give dig det bedste tilbud.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 pt-8">
                <Link to="/saelger/salgsønsker" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Tilbage
                  </Button>
                </Link>
                <Button 
                  className="w-full flex-1" 
                  onClick={handleCreateCase}
                  disabled={isCreatingCase || !propertyData}
                >
                  {isCreatingCase ? 'Opretter sag...' : 'Afslut og opret sag'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PriceInfo;
