
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, CheckCircle, Clock, X } from 'lucide-react';

interface ViewingStatusCardProps {
  showingDate?: Date;
  showingTime?: string;
  agentsContacted: number;
  agentsRegistered: number;
  agentsRejected: number;
  agentsPending: number;
  isCompleted?: boolean;
}

const ViewingStatusCard: React.FC<ViewingStatusCardProps> = ({
  showingDate,
  showingTime,
  agentsContacted,
  agentsRegistered,
  agentsRejected,
  agentsPending,
  isCompleted = false
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('da-DK', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Fremvisning
          {isCompleted && (
            <Badge className="bg-green-100 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Gennemført
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Showing Date and Time */}
        {showingDate && showingTime && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">
              {isCompleted ? 'Fremvisning gennemført' : 'Planlagt fremvisning'}
            </h4>
            <p className="text-lg">
              {formatDate(showingDate)} kl. {showingTime}
            </p>
          </div>
        )}

        {/* Contact Summary */}
        <div className="bg-white p-4 rounded-lg border">
          <p className="font-medium mb-3">
            HouseHub har kontaktet {agentsContacted} ejendomsmæglere
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-700">{agentsRegistered}</span>
              <span className="text-gray-600">har tilmeldt sig fremvisningen</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <X className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-700">{agentsRejected}</span>
              <span className="text-gray-600">har afvist sagen</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-700">{agentsPending}</span>
              <span className="text-gray-600">mangler svar</span>
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                Fremvisning gennemført - mæglerne kan nu afgive deres tilbud
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewingStatusCard;
