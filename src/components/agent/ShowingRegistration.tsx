
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

interface ShowingRegistrationProps {
  caseId: string;
  showingDate: Date;
  showingTime: string;
  address: string;
  notes?: string;
  isRegistered?: boolean;
  onRegister: () => void;
}

const ShowingRegistration: React.FC<ShowingRegistrationProps> = ({
  caseId,
  showingDate,
  showingTime,
  address,
  notes,
  isRegistered = false,
  onRegister
}) => {
  const { toast } = useToast();
  const [registering, setRegistering] = useState(false);

  const handleRegister = async () => {
    setRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      onRegister();
      setRegistering(false);
      toast({
        title: "Tilmelding bekræftet",
        description: "Du er nu tilmeldt fremvisningen. Sælger er blevet notificeret.",
      });
    }, 1000);
  };

  const isShowingInPast = () => {
    const showingDateTime = new Date(showingDate);
    const [hours, minutes] = showingTime.split(':').map(Number);
    showingDateTime.setHours(hours, minutes);
    return showingDateTime < new Date();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Fremvisning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Dato:</span>
              <span>{format(showingDate, 'EEEE d. MMMM yyyy', { locale: da })}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Tidspunkt:</span>
              <span>{showingTime}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Adresse:</span>
              <span>{address}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            {isRegistered ? (
              <Badge className="bg-green-100 text-green-700 px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Tilmeldt
              </Badge>
            ) : isShowingInPast() ? (
              <Badge variant="secondary" className="px-4 py-2">
                Fremvisning afholdt
              </Badge>
            ) : (
              <Button
                onClick={handleRegister}
                disabled={registering}
                className="px-6"
              >
                <Users className="h-4 w-4 mr-2" />
                {registering ? 'Tilmelder...' : 'Tilmeld fremvisning'}
              </Button>
            )}
          </div>
        </div>

        {notes && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Noter fra sælger:</h4>
            <p className="text-sm text-gray-700">{notes}</p>
          </div>
        )}

        {isShowingInPast() && isRegistered && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <p className="text-sm text-green-700">
              Du deltog i denne fremvisning. Du kan nu afgive dit tilbud til sælgeren.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowingRegistration;
