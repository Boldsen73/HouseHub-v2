
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CaseMessageNotifications from '@/components/agent/CaseMessageNotifications';
import HeaderNavigation from '@/components/agent/browseCases/HeaderNavigation';

const AgentMessages = () => {
  const [searchParams] = useSearchParams();
  const selectedCaseId = searchParams.get('case');

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/maegler/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Beskeder</h1>
            <p className="text-gray-600">Kommuniker med sælgere om deres sager</p>
            {selectedCaseId && (
              <p className="text-sm text-blue-600">Viser beskeder for sag #{selectedCaseId}</p>
            )}
          </div>
        </div>

        {/* Message notifications component handles all messaging */}
        <CaseMessageNotifications />
        
        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Sådan bruger du beskeder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Alle beskeder er knyttet til specifikke sager</p>
              <p>• Når en sag lukkes, arkiveres beskederne automatisk</p>
              <p>• Du kan ikke sende beskeder til arkiverede sager</p>
              <p>• Arkiverede beskeder kan stadig ses via arkivet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentMessages;
