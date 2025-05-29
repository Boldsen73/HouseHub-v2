
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CasePageTitleProps {
  title?: string;
  subtitle?: string;
  propertyAddress?: string;
  caseNumber?: string;
}

const CasePageTitle: React.FC<CasePageTitleProps> = ({ 
  title = "Min Sag", 
  subtitle, 
  propertyAddress, 
  caseNumber 
}) => {
  return (
    <Card className="shadow-xl border-0 mb-12">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
        {caseNumber && <p className="text-sm text-gray-500">Sagsnr: {caseNumber}</p>}
        <CardDescription className="text-lg text-gray-600">
          {subtitle || `Status for ${propertyAddress || "din bolig"}`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CasePageTitle;
