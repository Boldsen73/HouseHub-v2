
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';

const EmptyStateCard: React.FC = () => {
  return (
    <Card className="mb-6 text-center py-12">
      <CardContent>
        <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ingen aktive sager
        </h3>
        <p className="text-gray-600 mb-4">
          Når du opretter en sag, vil du kunne se fremgang og tilbud her.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
