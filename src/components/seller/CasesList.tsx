
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, MessageSquare } from 'lucide-react';

interface Case {
  id: string;
  address: string;
  size: string;
  type: string;
  price: string;
  status: string;
  sagsnummer?: string;
}

interface CasesListProps {
  cases: Case[];
}

const CasesList: React.FC<CasesListProps> = ({ cases }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mine sager</h2>
      {cases.map((case_) => (
        <Card key={case_.id} className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold">{case_.address}</h3>
                  <p className="text-sm text-gray-600">
                    Sagsnr: {case_.sagsnummer || `SAG-${case_.id}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {case_.size} • {case_.type} • Forventet: {case_.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {case_.status === 'active' ? 'Aktiv' : 'Kladde'}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Link to={`/saelger/tilbud`}>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Se tilbud
                </Button>
              </Link>
              <Link to={`/saelger/beskeder`}>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Beskeder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CasesList;
