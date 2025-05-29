
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';
import { Case } from '@/types/case';

interface CaseCardContentProps {
  case: Case;
  formatPrice: (price: string) => string;
  getViewingText: () => string;
}

const CaseCardContent: React.FC<CaseCardContentProps> = ({
  case: caseItem,
  formatPrice,
  getViewingText
}) => {
  return (
    <CardContent className="space-y-4">
      {/* Viewing Information */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">{getViewingText()}</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-500">Type:</span>
          <p className="font-medium">{caseItem.type}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Størrelse:</span>
          <p className="font-medium">{caseItem.size}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Pris:</span>
          <p className="font-medium text-green-600">{formatPrice(caseItem.price)}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Kommune:</span>
          <p className="font-medium">{caseItem.municipality}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        <span>{caseItem.address}</span>
      </div>

      {/* Energy Label */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Energimærke:</span>
        <Badge variant="outline" className="text-xs">
          {caseItem.energyLabel}
        </Badge>
      </div>
    </CardContent>
  );
};

export default CaseCardContent;
