
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Phone, Mail, User, Home } from 'lucide-react';

interface WinNotificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: {
    id: string;
    address: string;
    sellerName: string;
    sellerPhone: string;
    sellerEmail: string;
    offerPrice: string;
    commission: string;
  };
}

const WinNotification: React.FC<WinNotificationProps> = ({
  open,
  onOpenChange,
  caseData
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-green-600">
            <Trophy className="h-8 w-8" />
            Tillykke! Du har vundet sagen
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Sag #{caseData.id}
            </h3>
            <p className="text-green-700">
              Sælgeren har valgt dit tilbud for {caseData.address}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sælgerens kontaktoplysninger
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-500" />
                    <span className="font-medium">Navn:</span>
                    <span>{caseData.sellerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-500" />
                    <span className="font-medium">Telefon:</span>
                    <a href={`tel:${caseData.sellerPhone}`} className="text-blue-600 hover:underline">
                      {caseData.sellerPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    <a href={`mailto:${caseData.sellerEmail}`} className="text-blue-600 hover:underline">
                      {caseData.sellerEmail}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dit vindende tilbud
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Tilbudt pris:</span>
                    <span className="text-green-600 font-bold">{caseData.offerPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Salær:</span>
                    <span>{caseData.commission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Adresse:</span>
                    <span>{caseData.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Næste skridt:</h4>
            <ul className="text-sm space-y-1">
              <li>• Kontakt sælgeren inden for 24 timer</li>
              <li>• Aftale underskrift af salgsaftale</li>
              <li>• Start markedsføringen af boligen</li>
              <li>• Følg op på status i dit dashboard</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <a href={`tel:${caseData.sellerPhone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Ring til sælger
              </a>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <a href={`mailto:${caseData.sellerEmail}`}>
                <Mail className="h-4 w-4 mr-2" />
                Send email
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinNotification;
