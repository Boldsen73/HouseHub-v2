
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MessageSquare, BarChart3 } from 'lucide-react';

const AgentQuickActions: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Hurtige handlinger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Se aktuelle sager</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Gennemse tilgængelige boligsager og afgiv tilbud
              </p>
              <Link to="/maegler/gennemse-sager">
                <Button className="w-full">
                  Gennemse sager
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Beskeder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Kommuniker med sælgere og følg op på tilbud
              </p>
              <Link to="/maegler/beskeder">
                <Button variant="outline" className="w-full">
                  Åbn beskeder
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Statistikker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Se din performance og succesrate
              </p>
              <Link to="/maegler/statistik">
                <Button variant="outline" className="w-full">
                  Se statistikker
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AgentQuickActions;
