
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, XCircle, Clock } from 'lucide-react';

interface CaseStats {
  agentsContacted: number;
  offersReceived: number;
  rejections: number;
  pending: number;
  lastUpdate: string;
}

interface CaseStatusSummaryProps {
  stats: CaseStats;
}

const CaseStatusSummary: React.FC<CaseStatusSummaryProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status oversigt</CardTitle>
        <p className="text-sm text-gray-600">Senest opdateret: {stats.lastUpdate}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.agentsContacted}</div>
            <div className="text-sm text-gray-600">Mæglere kontaktet</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.offersReceived}</div>
            <div className="text-sm text-gray-600">Tilbud modtaget</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{stats.rejections}</div>
            <div className="text-sm text-gray-600">Afvisninger</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Afventer svar</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Status</h4>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Aktiv sag
            </Badge>
            <span className="text-sm text-gray-600">
              Din bolig er synlig for kvalificerede mæglere
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStatusSummary;
