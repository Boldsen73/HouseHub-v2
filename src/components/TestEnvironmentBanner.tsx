
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, RotateCcw, Users, Shield } from 'lucide-react';
import { resetTestEnvironment } from '@/utils/testData';
import { useToast } from '@/hooks/use-toast';

const TestEnvironmentBanner: React.FC = () => {
  const { toast } = useToast();

  const handleResetEnvironment = () => {
    resetTestEnvironment();
    toast({
      title: "Testmiljø nulstillet",
      description: "Alle testdata er blevet nulstillet. Kun admin-brugeren er tilbage.",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card className="mb-6 border-amber-200 bg-amber-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <TestTube className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <Badge className="bg-amber-600 text-white mb-1">
                RESET TESTMILJØ
              </Badge>
              <p className="font-medium text-amber-800">
                HouseHub Test Environment - Klar til fuld test af salgsflow
              </p>
              <div className="flex items-center gap-4 text-sm text-amber-700 mt-1">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Admin: admin@hh.dk (kode: 12345678)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Opret sælgere og mæglere manuelt</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetEnvironment}
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Nulstil igen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestEnvironmentBanner;
