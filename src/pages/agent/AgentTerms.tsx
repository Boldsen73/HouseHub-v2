
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useState } from 'react';

const AgentTerms = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptCommission, setAcceptCommission] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HouseHub</span>
              <span className="text-lg text-gray-500">| Mægler Portal</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Lars P. - Aktiv
              </Badge>
              <Button variant="ghost" size="sm">
                Log ud
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link to="/maegler/afgiv-tilbud" className="text-blue-600 hover:underline mb-2 inline-block">
              ← Tilbage til tilbud
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bekræft betingelser
            </h1>
            <p className="text-gray-600">
              Læs og acceptér betingelserne for dit tilbud
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Mægler betingelser</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg max-h-64 overflow-y-auto">
                  <h3 className="font-semibold mb-4">Betingelser for mæglere på HouseHub</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>Ved at afgive tilbud gennem HouseHub accepterer du følgende:</p>
                    <p>1. Dit tilbud er bindende i 14 dage fra afgivelse.</p>
                    <p>2. Du forpligter dig til at levere den service, du har beskrevet.</p>
                    <p>3. HouseHub opkræver et formidlingsgebyr på 0,25% af salgsprisen ved succesfuldt salg.</p>
                    <p>4. Du må ikke kontakte sælger direkte uden om platformen før accept.</p>
                    <p>5. Alle kommunikation skal ske gennem HouseHub indtil aftale er indgået.</p>
                    <p>6. Du skal overholde alle gældende regler for ejendomsmæglere i Danmark.</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Kommissionsmodel</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Dit salær:</strong> Det procentsats du har angivet</p>
                    <p><strong>HouseHub gebyr:</strong> 0,25% af salgsprisen</p>
                    <p><strong>Betaling:</strong> Ved handelslukke gennem advokat/bank</p>
                    <p><strong>Eksempel:</strong> Ved salg for 4.000.000 DKK og 2,5% salær:</p>
                    <p className="ml-4">• Dit salær: 100.000 DKK</p>
                    <p className="ml-4">• HouseHub gebyr: 10.000 DKK</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Jeg accepterer betingelserne for mæglere på HouseHub
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="commission" 
                      checked={acceptCommission}
                      onCheckedChange={(checked) => setAcceptCommission(checked === true)}
                    />
                    <Label htmlFor="commission" className="text-sm">
                      Jeg accepterer kommissionsmodellen og HouseHub gebyret
                    </Label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/maegler/afgiv-tilbud" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Tilbage
                    </Button>
                  </Link>
                  <Link to="/maegler/bekraeftelse" className="flex-1">
                    <Button 
                      className="w-full"
                      disabled={!acceptTerms || !acceptCommission}
                    >
                      Afgiv tilbud
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentTerms;
