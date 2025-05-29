
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, MapPin, Calendar, DollarSign, Edit, Clock, Download, Check } from 'lucide-react';
import { useAgentCases } from '@/hooks/useAgentCases';
import HeaderNavigation from '@/components/agent/browseCases/HeaderNavigation';
import MessageThread from '@/components/agent/MessageThread';

const CaseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases, getTimeRemaining } = useAgentCases();
  
  const caseItem = cases.find(c => c.id === parseInt(id || '0'));
  
  if (!caseItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderNavigation />
        <div className="container mx-auto px-6 py-12">
          <p className="text-center text-gray-500">Sag ikke fundet</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return price.replace(/(\d)\.(\d{3})\.(\d{3})/, '$1.$2.$3');
  };

  const timeRemaining = caseItem.deadline ? getTimeRemaining(caseItem.deadline) : null;

  // Mock bid data with performance metrics - in real app this would come from the case
  const submittedBid = caseItem.agentStatus === 'offer_submitted' || caseItem.agentStatus === 'archived' ? {
    expectedPrice: "4.200.000 DKK",
    commission: "65.000 DKK",
    bindingPeriod: "6 måneder",
    marketingPackage: "Premium",
    comment: "Jeg vurderer boligen højt og har stor erfaring med salg i området. Mit omfattende netværk og digitale markedsføringsstrategi sikrer optimal eksponering.",
    houseHubScore: 87,
    bidDeviation: "+5,1%",
    submittedAt: "2024-01-13T12:45:00",
    sellerViewed: true,
    sellerViewedAt: "2024-01-13T14:20:00"
  } : null;

  const handleDownloadPDF = () => {
    console.log(`Downloading PDF for case ${id}`);
    // In real app, this would generate and download the actual PDF
  };

  const formatSubmissionTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/maegler/gennemse-sager')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbage til sagsoversigt
        </Button>

        {/* Status Alert for Submitted Bid */}
        {caseItem.agentStatus === 'offer_submitted' && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-blue-800 font-medium">
                    Du har allerede afgivet et tilbud på denne sag
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/maegler/rediger-tilbud/${id}`)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Ret tilbud
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Alert for Rejected Case */}
        {caseItem.agentStatus === 'rejected' && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-red-800 font-medium">
                  Du har afvist denne sag – du kan fortryde under Afviste sager
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Won Case Alert */}
        {caseItem.agentStatus === 'archived' && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-green-800 font-medium">
                    Tillykke! Du har vundet denne sag
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Case Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Home className="h-6 w-6 text-blue-600" />
                {caseItem.address}
              </CardTitle>
              <div className="flex flex-col gap-2 items-end">
                <Badge className="bg-green-100 text-green-800">
                  {formatPrice(caseItem.price)}
                </Badge>
                {timeRemaining && caseItem.agentStatus === 'active' && (
                  <Badge className={`${timeRemaining.bgColor} ${timeRemaining.color}`}>
                    <Clock className="h-3 w-3 mr-1" />
                    Tilbudsfrist: {timeRemaining.text}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Viewing Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Fremvisning: Mandag d. 10. juni kl. 16:30</span>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-500">Type</span>
                <p className="font-semibold">{caseItem.type}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Størrelse</span>
                <p className="font-semibold">{caseItem.size}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Værelser</span>
                <p className="font-semibold">{caseItem.rooms}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Byggeår</span>
                <p className="font-semibold">{caseItem.constructionYear}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{caseItem.municipality}</span>
              <Badge variant="outline" className="ml-2">
                Energimærke {caseItem.energyLabel}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Submitted Bid Summary with Performance Stats */}
        {submittedBid && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Dit afgivne tilbud</CardTitle>
                <div className="flex gap-4">
                  <Badge variant="outline" className="text-sm">
                    HouseHub Score: {submittedBid.houseHubScore}/100
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Budafstand: {submittedBid.bidDeviation}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Submission timestamp */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Indsendt d. {formatSubmissionTime(submittedBid.submittedAt)}
                  </span>
                  {submittedBid.sellerViewed && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Sælger har åbnet dit tilbud</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Salgspris</span>
                  <p className="text-lg font-semibold text-green-600">{submittedBid.expectedPrice}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Salær</span>
                  <p className="text-lg font-semibold">{submittedBid.commission}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Liggetid</span>
                  <p className="text-lg font-semibold">{submittedBid.bindingPeriod}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Markedsføring</span>
                  <p className="text-lg font-semibold">{submittedBid.marketingPackage}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Kommentar til sælger</span>
                <p className="text-gray-700 mt-1">{submittedBid.comment}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Message Thread */}
        {(caseItem.agentStatus === 'offer_submitted' || caseItem.agentStatus === 'archived') && (
          <MessageThread caseId={caseItem.id} sellerName="Mette Hansen" />
        )}

        {/* Property Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Beskrivelse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">{caseItem.description}</p>
            
            {caseItem.sellerComments && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Kommentarer fra sælger:</h4>
                <p className="text-gray-700">{caseItem.sellerComments}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {caseItem.agentStatus === 'active' && (
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate(`/maegler/afgiv-tilbud/${id}`)}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Afgiv tilbud
            </Button>
          )}
          
          {caseItem.agentStatus === 'offer_submitted' && (
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate(`/maegler/rediger-tilbud/${id}`)}
            >
              <Edit className="h-5 w-5 mr-2" />
              Ret tilbud
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/maegler/gennemse-sager')}
          >
            Tilbage til oversigt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;
