
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  DollarSign,
  Calendar,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';
import HouseHubScore from './HouseHubScore';
import MessageModal from './MessageModal';
import type { OfferWithMarketing } from '@/types/case';

interface CompactOfferCardProps {
  offer: OfferWithMarketing;
  isSelected: boolean;
  onSelect: (offer: OfferWithMarketing) => void;
  onMessage: (offerId: number, message: string) => void;
}

const CompactOfferCard: React.FC<CompactOfferCardProps> = ({
  offer,
  isSelected,
  onSelect,
  onMessage
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const commissionPercentage = ((offer.commissionValue / offer.priceValue) * 100).toFixed(1);
  
  const handleSelect = () => {
    if (!isConfirmed) {
      setShowConfirmation(true);
    } else {
      onSelect(offer);
    }
  };

  const handleConfirmSelection = () => {
    setIsConfirmed(true);
    setShowConfirmation(false);
    onSelect(offer);
    
    console.log(`Confirmation email sent to ${offer.agentName}`);
    
    const agentNotification = {
      type: 'broker_selected',
      caseId: 1,
      message: `Du er blevet valgt som mægler for Østerbrogade 123, 2. th`,
      timestamp: new Date().toISOString()
    };
    
    const existingNotifications = JSON.parse(localStorage.getItem('agent_notifications') || '[]');
    existingNotifications.push(agentNotification);
    localStorage.setItem('agent_notifications', JSON.stringify(existingNotifications));
  };

  const handleSendMessage = (message: string) => {
    onMessage(offer.id, message);
    
    const messageData = {
      caseId: 1,
      offerId: offer.id,
      from: 'seller',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const existingMessages = JSON.parse(localStorage.getItem('case_messages') || '[]');
    existingMessages.push(messageData);
    localStorage.setItem('case_messages', JSON.stringify(existingMessages));
  };

  // Clean anonymization - show agency name, hide agent name until confirmed
  const displayAgentName = isConfirmed ? offer.agentName : "Anonym mægler";
  const displayAgencyName = offer.agencyName;
  
  return (
    <>
      <Card className={`transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-300' : 'hover:shadow-md'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HouseHubScore score={offer.score} size="sm" />
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="font-semibold text-lg">{displayAgencyName}</h4>
                  <p className="text-sm text-gray-600">{displayAgentName}</p>
                </div>
                <div className="flex items-center">
                  {!isConfirmed ? (
                    <div className="flex items-center gap-1 text-gray-400" title="Identitet skjult indtil bekræftelse">
                      <EyeOff className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600" title="Identitet frigivet">
                      <Eye className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!showConfirmation ? (
                <Button
                  size="sm"
                  onClick={handleSelect}
                  className={isSelected ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {isSelected ? 'Valgt' : isConfirmed ? 'Vælg denne mægler' : 'Bekræft valg af mægler'}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Annuller
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleConfirmSelection}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Bekræft valg
                  </Button>
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsMessageModalOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {showConfirmation && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Ved at bekræfte dit valg frigives mæglerens fulde kontaktoplysninger, 
                og mægleren får besked om at være blevet valgt.
              </p>
            </div>
          )}
          
          {/* Compact key metrics */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <DollarSign className="h-4 w-4" />
                <span className="font-bold text-sm">{new Intl.NumberFormat('da-DK').format(offer.priceValue)} kr</span>
              </div>
              <div className="text-xs text-gray-500">Pris</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <span className="font-bold text-sm">{commissionPercentage}%</span>
              </div>
              <div className="text-xs text-gray-500">Salær</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-600">
                <Calendar className="h-4 w-4" />
                <span className="font-bold text-sm">{offer.bindingPeriod}</span>
              </div>
              <div className="text-xs text-gray-500">Binding</div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2"
          >
            Se detaljer {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Salgsstrategi</h5>
                <p className="text-sm text-gray-700">{offer.salesStrategy}</p>
              </div>
              
              <div>
                <h5 className="font-medium mb-2 flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Markedsføring
                </h5>
                <div className="flex flex-wrap gap-2">
                  {offer.marketingMethods?.map((method, index) => (
                    <Badge 
                      key={index}
                      variant={method.included ? "default" : "outline"}
                      className="text-xs"
                    >
                      {method.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="font-bold text-green-600">94%</div>
                  <div className="text-xs text-gray-600">Succesrate</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">42 dage</div>
                  <div className="text-xs text-gray-600">Gns. liggetid</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">99%</div>
                  <div className="text-xs text-gray-600">Af udbudspris</div>
                </div>
              </div>

              {isConfirmed && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Kontaktoplysninger</h5>
                  <div className="text-sm text-green-700">
                    <p><strong>Email:</strong> {offer.agentName.toLowerCase().replace(' ', '.')}@{offer.agencyName?.toLowerCase().replace(' ', '')}.dk</p>
                    <p><strong>Telefon:</strong> +45 12 34 56 78</p>
                    <p><strong>Direkte linje:</strong> +45 87 65 43 21</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        agentName={displayAgentName}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default CompactOfferCard;
