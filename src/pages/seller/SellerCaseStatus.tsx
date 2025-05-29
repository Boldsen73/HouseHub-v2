import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CasePageTitle from '../../components/seller/CasePageTitle';
import StatusAlertCard from '../../components/seller/StatusAlertCard';
import SellerOfferCard from '../../components/seller/SellerOfferCard';
import BrokerSelectionConfirmation from '../../components/seller/BrokerSelectionConfirmation';
import EnhancedOfferFilters from '../../components/seller/EnhancedOfferFilters';
import SalesStepTracker from '../../components/seller/SalesStepTracker';
import ShowingBooking from '../../components/seller/ShowingBooking';
import MessagingCard from '../../components/seller/MessagingCard';
import ShowingRegistrations from '../../components/seller/ShowingRegistrations';
import RealtorMessaging from '../../components/seller/RealtorMessaging';
import CaseStatusSummary from '../../components/seller/CaseStatusSummary';
import { generateCaseNumber } from '../../utils/caseUtils';
import { notifyRealtorWin, notifyRealtorLoss } from '../../utils/notificationUtils';
import type { CaseData, OfferWithMarketing } from '@/types/case';
import { Home, MapPin, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedOfferFilters } from '@/hooks/useEnhancedOfferFilters';

const SellerCaseStatus = () => {
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferWithMarketing | null>(null);
  const [caseStep, setCaseStep] = useState<'showing_booked' | 'showing_completed' | 'offers_received' | 'realtor_selected'>('showing_booked');
  const [showingData, setShowingData] = useState<any>(null);
  const [showingStatus, setShowingStatus] = useState<'planlagt' | 'afholdt'>('planlagt');
  const [caseNumber, setCaseNumber] = useState<string>('');
  const [showingRegistrations, setShowingRegistrations] = useState<any[]>([]);

  // Generate case number on mount
  useEffect(() => {
    console.log('=== CASE STATUS MOUNT ===');
    
    const existingCaseNumber = localStorage.getItem('current_case_number');
    if (existingCaseNumber) {
      setCaseNumber(existingCaseNumber);
      console.log('Using existing case number:', existingCaseNumber);
    } else {
      const newCaseNumber = generateCaseNumber();
      setCaseNumber(newCaseNumber);
      localStorage.setItem('current_case_number', newCaseNumber);
      console.log('Generated new case number:', newCaseNumber);
    }

    // Load existing showing data with multiple fallbacks
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Current user for loading showing data:', currentUser);
    
    if (currentUser.id) {
      // Try multiple storage keys
      let savedShowingData = localStorage.getItem(`showing_data_${currentUser.id}`);
      if (!savedShowingData) {
        savedShowingData = localStorage.getItem('current_showing_data');
        console.log('Fallback to current_showing_data');
      }
      
      if (savedShowingData) {
        try {
          const parsedShowingData = JSON.parse(savedShowingData);
          console.log('Found existing showing data:', parsedShowingData);
          setShowingData(parsedShowingData);
          setCaseStep('showing_completed'); // If showing data exists, move to next step
        } catch (error) {
          console.error('Error parsing showing data:', error);
        }
      } else {
        console.log('No existing showing data found');
      }
    }

    // Load showing registrations
    const storedRegistrations = localStorage.getItem('showing_registrations');
    if (storedRegistrations) {
      setShowingRegistrations(JSON.parse(storedRegistrations));
    }
  }, []);

  // Mock data - in real app this would come from API
  const caseData: CaseData = {
    id: caseNumber,
    address: "Østerbrogade 123, 2. th",
    status: caseStep === 'realtor_selected' ? 'broker_selected' : 'offers_received',
    sellerExpectedPrice: "4.200.000 DKK",
    sellerExpectedTimeframe: "Inden for 3 måneder",
    sellerPriorities: ["Hurtig salg", "Høj pris"]
  };

  // Enhanced offers with performance data
  const offers: OfferWithMarketing[] = [
    {
      id: 1,
      agentName: "Lars Andersen",
      agencyName: "EDC Aarhus Syd",
      expectedPrice: "4.350.000 DKK",
      priceValue: 4350000,
      commission: "65.000 DKK",
      commissionValue: 65000,
      bindingPeriod: "6 måneder",
      marketingPackage: "Premium",
      score: 92,
      salesStrategy: "Jeg vurderer din bolig højt og har erfaring med lignende ejendomme i området. Min strategi er at maksimere prisen gennem målrettet markedsføring og mine stærke netværk i Østerbro-området.",
      marketingMethods: [
        { id: "1", name: "Boliga.dk", cost: 0, included: true },
        { id: "2", name: "Estate.dk", cost: 0, included: true },
        { id: "3", name: "Facebook", cost: 0, included: true },
        { id: "4", name: "Instagram", cost: 0, included: true },
        { id: "5", name: "Fysiske skiltning", cost: 0, included: true },
        { id: "6", name: "Lokalaviser", cost: 0, included: false }
      ],
      submittedAt: "2024-01-16T09:15:00Z",
      // Performance data
      averageDiscount: "3.2%",
      typicalListingTime: "42 dage",
      localCommissionComparison: "Gennemsnit i område: 68.000 DKK"
    },
    {
      id: 2,
      agentName: "Maria Hansen",
      agencyName: "EDC Aarhus Syd",
      expectedPrice: "4.275.000 DKK",
      priceValue: 4275000,
      commission: "55.000 DKK",
      commissionValue: 55000,
      bindingPeriod: "4 måneder",
      marketingPackage: "Standard",
      score: 88,
      salesStrategy: "Med min omfattende netværk og digitale markedsføring kan jeg sikre bred eksponering til de rette købere. Jeg tilpasser strategien løbende baseret på markedets respons.",
      marketingMethods: [
        { id: "1", name: "Boliga.dk", cost: 0, included: true },
        { id: "2", name: "Estate.dk", cost: 0, included: true },
        { id: "3", name: "Facebook", cost: 0, included: true },
        { id: "4", name: "Instagram", cost: 0, included: false },
        { id: "5", name: "Fysiske skiltning", cost: 0, included: true },
        { id: "6", name: "Lokalaviser", cost: 0, included: true }
      ],
      submittedAt: "2024-01-16T11:30:00Z",
      // Performance data
      averageDiscount: "2.8%",
      typicalListingTime: "38 dage",
      localCommissionComparison: "Gennemsnit i område: 68.000 DKK"
    },
    {
      id: 3,
      agentName: "Thomas Nielsen",
      agencyName: "EDC Aarhus Syd",
      expectedPrice: "4.180.000 DKK",
      priceValue: 4180000,
      commission: "45.000 DKK",
      commissionValue: 45000,
      bindingPeriod: "3 måneder",
      marketingPackage: "Basic",
      score: 85,
      salesStrategy: "Fokus på hurtig handel med konkurrencedygtig provision. Jeg specialiserer mig i Østerbro-området og har et stort køberkartotek.",
      marketingMethods: [
        { id: "1", name: "Boliga.dk", cost: 0, included: true },
        { id: "2", name: "Estate.dk", cost: 0, included: true },
        { id: "3", name: "Facebook", cost: 0, included: false },
        { id: "4", name: "Instagram", cost: 0, included: false },
        { id: "5", name: "Fysiske skiltning", cost: 0, included: true },
        { id: "6", name: "Lokalaviser", cost: 0, included: false }
      ],
      submittedAt: "2024-01-16T14:45:00Z",
      // Performance data
      averageDiscount: "4.1%",
      typicalListingTime: "35 dage",
      localCommissionComparison: "Gennemsnit i område: 68.000 DKK"
    }
  ];

  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filters,
    setFilters,
    filteredAndSortedOffers
  } = useEnhancedOfferFilters(offers);

  // Case status summary data
  const caseStats = {
    agentsContacted: 5,
    offersReceived: offers.length,
    rejections: 2,
    pending: 0,
    lastUpdate: "I dag kl. 14:32"
  };

  const statusInfo = {
    icon: <Home className="h-5 w-5" />,
    text: caseStep === 'realtor_selected' ? 'Mægler valgt' : 'Tilbud modtaget',
    color: caseStep === 'realtor_selected' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'
  };

  const handleSelectBroker = (offer: OfferWithMarketing) => {
    setSelectedOffer(offer);
    setShowConfirmation(true);
  };

  const handleConfirmSelection = () => {
    if (selectedOffer) {
      setCaseStep('realtor_selected');
      
      // Notify winning realtor
      notifyRealtorWin(caseNumber, caseData.id, {
        name: 'Jens Hansen',
        email: 'jens.hansen@email.dk',
        phone: '+45 12 34 56 78'
      });

      // Notify losing realtors
      offers.forEach(offer => {
        if (offer.id !== selectedOffer.id) {
          notifyRealtorLoss(caseNumber, caseData.id);
        }
      });

      toast({
        title: "Mægler valgt",
        description: `Du har valgt ${selectedOffer.agencyName} v. ${selectedOffer.agentName}. Alle mæglere er blevet notificeret.`,
      });
      setShowConfirmation(false);
    }
  };

  const handleShowingBooked = (data: any) => {
    console.log('=== SHOWING BOOKED HANDLER ===');
    console.log('handleShowingBooked called with:', data);
    
    setShowingData(data);
    setCaseStep('showing_completed');
    
    // Store with multiple keys for robustness
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id) {
      localStorage.setItem(`showing_data_${currentUser.id}`, JSON.stringify(data));
      localStorage.setItem('current_showing_data', JSON.stringify(data));
      console.log('Stored showing data in multiple locations');
    }
    
    toast({
      title: "Fremvisning booket",
      description: "Mæglerne er blevet notificeret om fremvisningstidspunktet.",
    });
    
    console.log('Showing booking completed successfully');
  };

  const handleMarkShowingCompleted = () => {
    setShowingStatus('afholdt');
    setCaseStep('offers_received');
    toast({
      title: "Fremvisning markeret som afholdt",
      description: "Mæglerne kan nu afgive deres tilbud.",
    });
  };

  const handleSendMessage = (message: string, realtorId: number) => {
    toast({
      title: "Besked sendt",
      description: "Din besked er sendt til mægleren.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <CasePageTitle 
            title="Min Sag"
            subtitle={`Sag ${caseNumber} - Følg din sag gennem hele salgsprocessen`}
          />

          {/* Sales Step Tracker */}
          <SalesStepTracker 
            currentStep={caseStep}
            showingDate={showingData?.date}
            offersCount={offers.length}
            selectedRealtorName={selectedOffer?.agentName}
          />

          {/* Case Status Summary */}
          <CaseStatusSummary stats={caseStats} />

          {/* Status Alert */}
          <StatusAlertCard 
            status={caseData.status}
            offersCount={offers.length}
            brokerName={selectedOffer?.agentName}
          />

          {/* Showing Booking (only if not booked yet) */}
          {!showingData && caseStep === 'showing_booked' && (
            <ShowingBooking onShowingBooked={handleShowingBooked} />
          )}

          {/* Showing Registrations */}
          {showingData && (
            <ShowingRegistrations
              registrations={showingRegistrations}
              showingDate={showingData.date}
              showingTime={showingData.time}
            />
          )}

          {/* Showing Status (if booked) */}
          {showingData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Fremvisning
                  </div>
                  <Badge className={showingStatus === 'afholdt' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                    {showingStatus === 'afholdt' ? 'Afholdt' : 'Planlagt'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p><strong>Dato:</strong> {showingData.date.toLocaleDateString('da-DK')}</p>
                    <p><strong>Tidspunkt:</strong> {showingData.time}</p>
                    {showingData.notes && <p><strong>Noter:</strong> {showingData.notes}</p>}
                  </div>
                  {showingStatus === 'planlagt' && (
                    <Button onClick={handleMarkShowingCompleted}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marker som afholdt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Case Overview Card */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-blue-600" />
                  Sag {caseNumber} - Oversigt
                </CardTitle>
                <Badge className={`${statusInfo.color} px-3 py-1`}>
                  {statusInfo.icon}
                  <span className="ml-2">{statusInfo.text}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{caseData.address}</p>
                      <p className="text-sm text-gray-500">København K</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Type:</strong> Ejerlejlighed</p>
                    <p><strong>Størrelse:</strong> 85 m²</p>
                    <p><strong>Værelser:</strong> 3 værelser</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign className="h-4 w-4" />
                    <div>
                      <p className="font-medium text-green-600">{caseData.sellerExpectedPrice}</p>
                      <p className="text-sm text-gray-500">Forventet salgspris</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Byggeår:</strong> 1920</p>
                    <p><strong>Energimærke:</strong> C</p>
                    <p><strong>Offentlig vurdering:</strong> 3.800.000 DKK</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{caseData.sellerExpectedTimeframe}</p>
                      <p className="text-sm text-gray-500">Ønsket salg inden for</p>
                    </div>
                  </div>
                  
                  {caseData.sellerPriorities && caseData.sellerPriorities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Dine prioriteter:</p>
                      <div className="flex flex-wrap gap-1">
                        {caseData.sellerPriorities.map((priority, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {priority}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {(caseStep === 'offers_received' || caseStep === 'realtor_selected') && (
            <EnhancedOfferFilters
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              filters={filters}
              setFilters={setFilters}
              offers={offers}
              totalCount={offers.length}
              filteredCount={filteredAndSortedOffers.length}
            />
          )}

          {(caseStep === 'offers_received' || caseStep === 'realtor_selected') && (
            <div className="space-y-6">
              {filteredAndSortedOffers.map((offer) => (
                <div key={offer.id}>
                  <SellerOfferCard
                    offer={offer}
                    isSelected={selectedOffer?.id === offer.id}
                    onSelect={handleSelectBroker}
                    onAskQuestion={(offerId) => {
                      console.log('Ask question to offer:', offerId);
                    }}
                  />
                  
                  {/* Enhanced Messaging with RealtorMessaging component */}
                  {caseStep !== 'realtor_selected' && (
                    <RealtorMessaging
                      realtorName={offer.agentName}
                      realtorId={offer.id}
                      hasNewMessages={false}
                      onSendMessage={handleSendMessage}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {caseStep === 'realtor_selected' && selectedOffer && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Din valgte mægler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">{selectedOffer.agencyName}</h4>
                    <p className="text-gray-600">v. {selectedOffer.agentName}</p>
                    <p className="text-sm mt-2">
                      <strong>Tilbudt pris:</strong> {selectedOffer.expectedPrice}
                    </p>
                    <p className="text-sm">
                      <strong>Salær:</strong> {selectedOffer.commission}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Kontakt information</h4>
                    <p className="text-sm">Telefon: +45 12 34 56 78</p>
                    <p className="text-sm">Email: {selectedOffer.agentName.toLowerCase().replace(' ', '.')}@edc.dk</p>
                    <p className="text-sm text-green-600 mt-2">
                      Mægleren kontakter dig inden for 24 timer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center mt-8">
            <Link to="/saelger/dashboard">
              <Button variant="outline">
                Tilbage til dashboard
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              {caseStep === 'realtor_selected' 
                ? 'Din sag er nu i gang - mægleren kontakter dig snarest'
                : 'Følg din sag gennem hele processen'
              }
            </p>
          </div>
        </div>
      </div>

      <BrokerSelectionConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        offer={selectedOffer}
        onConfirm={handleConfirmSelection}
      />
      
      <Footer />
    </div>
  );
};

export default SellerCaseStatus;
