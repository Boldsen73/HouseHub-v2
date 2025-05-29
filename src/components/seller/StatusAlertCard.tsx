
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, Hourglass, CheckCircle, Users, LucideIcon } from 'lucide-react';
import type { CaseStatus } from '@/types/case';

interface StatusAlertCardProps {
  status: CaseStatus;
  details?: string;
  brokerName?: string;
  offersCount?: number;
}

const StatusAlertCard: React.FC<StatusAlertCardProps> = ({ status, details, brokerName, offersCount }) => {
  let IconComponent: LucideIcon = AlertTriangle;
  let title = "";
  let content = null;
  let cardClasses = "mb-8";
  let titleClasses = "";

  switch (status) {
    case 'draft':
      IconComponent = AlertTriangle;
      title = "Handling påkrævet: Udfyld manglende oplysninger";
      content = (
        <>
          <p className="text-yellow-700 mb-4">{details || "Der mangler vigtige oplysninger om din bolig."}</p>
          <Link to="/saelger/boligdata">
            <Button variant="outline">Udfyld oplysninger</Button>
          </Link>
        </>
      );
      cardClasses += " bg-yellow-50 border-yellow-300";
      titleClasses = "text-yellow-700";
      break;
    case 'active':
      IconComponent = Hourglass;
      title = "Afventer tilbud fra mæglere";
      content = (
        <p className="text-blue-700">
          Vi har sendt din sag ud til relevante ejendomsmæglere. Du vil modtage en notifikation, så snart der er tilbud klar til gennemgang.
        </p>
      );
      cardClasses += " bg-blue-50 border-blue-300";
      titleClasses = "text-blue-700";
      break;
    case 'offers_received':
      IconComponent = Users;
      title = `Du har modtaget ${offersCount || 0} tilbud`;
      content = (
        <p className="text-green-700">
          Gennemse tilbuddene nedenfor og vælg den mægler, der passer bedst til dine behov.
        </p>
      );
      cardClasses += " bg-green-50 border-green-300";
      titleClasses = "text-green-700";
      break;
    case 'broker_selected':
      IconComponent = CheckCircle;
      title = "Mægler valgt!";
      content = (
        <>
          <p className="text-green-700 mb-2">
            Du har valgt <strong>{brokerName}</strong> til at håndtere salget af din bolig.
          </p>
          <p className="text-green-700">
            Mægleren er blevet notificeret og vil kontakte dig snarest for at aftale det videre forløb.
          </p>
        </>
      );
      cardClasses += " bg-green-50 border-green-300";
      titleClasses = "text-green-700";
      break;
    case 'completed':
      IconComponent = CheckCircle;
      title = "Sag afsluttet";
      content = (
        <p className="text-green-700">
          Salget af din bolig er blevet gennemført succesfuldt.
        </p>
      );
      cardClasses += " bg-green-50 border-green-300";
      titleClasses = "text-green-700";
      break;
    case 'withdrawn':
      IconComponent = AlertTriangle;
      title = "Sag trukket tilbage";
      content = (
        <p className="text-red-700">
          Du har trukket din sag tilbage. Alle mæglere er blevet informeret.
        </p>
      );
      cardClasses += " bg-red-50 border-red-300";
      titleClasses = "text-red-700";
      break;
  }

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={`flex items-center ${titleClasses}`}>
          <IconComponent className="mr-2 h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default StatusAlertCard;
