
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign } from 'lucide-react';
import { formatDanishCurrency } from '@/lib/utils';

interface AgentPricingInfoProps {
  expectedPrice: number;
}

const AgentPricingInfo = ({ expectedPrice }: AgentPricingInfoProps) => {
  const houseHubFee = Math.round(expectedPrice * 0.001); // 1 promille (0.1%)

  return (
    <Alert className="border-amber-200 bg-amber-50 mb-6">
      <DollarSign className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <div className="space-y-2">
          <p className="font-semibold">Bemærk:</p>
          <p>
            Hvis du vinder sagen, accepterer du at betale <strong>1 promille (0,1 %) af salgsprisen</strong> til HouseHub.
          </p>
          <p className="text-sm">
            Eksempel: Salgspris {formatDanishCurrency(expectedPrice)} → Pris: {formatDanishCurrency(houseHubFee)} (ekskl. moms)
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AgentPricingInfo;
