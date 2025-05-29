
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';

interface MarketingSectionProps {
  selectedMarketing: string[];
  onMarketingChange: (marketing: string[]) => void;
  strategy: string;
  onStrategyChange: (strategy: string) => void;
}

const marketingOptions = [
  { id: 'google-ads', label: 'Google Ads' },
  { id: 'facebook-ads', label: 'Facebook/Instagram Ads' },
  { id: 'lokalavis', label: 'Lokalavis' },
  { id: 'sociale-medier', label: 'Sociale medier' },
  { id: 'boligsider', label: 'Boligsider (Boliga, Bolighed)' },
  { id: 'print-annoncer', label: 'Print annoncer' },
  { id: 'skilte', label: 'Til salg skilte' },
  { id: 'netvaerk', label: 'Netværk og henvisninger' }
];

const MarketingSection: React.FC<MarketingSectionProps> = ({
  selectedMarketing,
  onMarketingChange,
  strategy,
  onStrategyChange
}) => {
  const handleMarketingToggle = (optionId: string) => {
    if (selectedMarketing.includes(optionId)) {
      onMarketingChange(selectedMarketing.filter(item => item !== optionId));
    } else {
      onMarketingChange([...selectedMarketing, optionId]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          Markedsføring og strategi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">
            Markedsføringskanaler (vælg flere)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {marketingOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedMarketing.includes(option.id)}
                  onCheckedChange={() => handleMarketingToggle(option.id)}
                />
                <Label
                  htmlFor={option.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="strategy" className="text-base font-medium">
            Salgsstrategi *
          </Label>
          <Textarea
            id="strategy"
            value={strategy}
            onChange={(e) => onStrategyChange(e.target.value)}
            placeholder="Beskriv din salgsstrategi og tilgang til markedsføring af boligen..."
            className="min-h-[120px] mt-2"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Forklar hvordan du vil markedsføre boligen og din strategi for at opnå den bedste pris.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingSection;
