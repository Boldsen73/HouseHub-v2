
import React from 'react';
import { Award, Globe, Newspaper, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { MarketingMethod } from '@/types/case';

interface MarketingMethodsSectionProps {
  marketingMethods: MarketingMethod[];
}

const MarketingMethodsSection: React.FC<MarketingMethodsSectionProps> = ({ marketingMethods }) => {
  const getMarketingIcon = (methodName: string) => {
    switch (methodName.toLowerCase()) {
      case 'facebook':
      case 'instagram':
        return <Globe className="h-4 w-4" />;
      case 'lokalaviser':
        return <Newspaper className="h-4 w-4" />;
      case 'fysiske skiltning':
        return <Building className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  if (!marketingMethods || marketingMethods.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <Award className="h-4 w-4" />
        Markedsføringsmetoder ({marketingMethods.filter(m => m.included).length} inkluderet)
      </h4>
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {marketingMethods.map((method, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                method.included 
                  ? "bg-blue-100 text-blue-800 border border-blue-200" 
                  : "bg-gray-100 text-gray-500 border border-gray-300"
              }`}
            >
              {getMarketingIcon(method.name)}
              {method.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingMethodsSection;
