
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, Clock } from 'lucide-react';

interface RegisteredRealtor {
  id: number;
  name: string;
  agency: string;
  registeredAt: string;
}

interface ShowingRegistrationsProps {
  registrations: RegisteredRealtor[];
  showingDate?: Date;
  showingTime?: string;
}

const ShowingRegistrations: React.FC<ShowingRegistrationsProps> = ({
  registrations,
  showingDate,
  showingTime
}) => {
  if (!showingDate || registrations.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Tilmeldte mæglere til fremvisning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm">
            <strong>Fremvisning:</strong> {showingDate.toLocaleDateString('da-DK')} kl. {showingTime}
          </p>
        </div>

        <div className="space-y-3">
          {registrations.map((realtor) => (
            <div key={realtor.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{realtor.agency}</p>
                  <p className="text-sm text-gray-600">v. {realtor.name}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Tilmeldt
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(realtor.registeredAt).toLocaleDateString('da-DK')}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {registrations.length} mægler{registrations.length !== 1 ? 'e' : ''} har tilmeldt sig fremvisningen
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowingRegistrations;
