
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Eye, MessageSquare, Plus } from 'lucide-react';

const QuickActionsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Link to="/saelger/opret-sag">
        <Card className="hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-blue-200 cursor-pointer group hover:scale-105 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Plus className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">Opret ny sag</h3>
                <p className="text-sm text-gray-600">Start processen med at finde din mægler</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/saelger/min-sag">
        <Card className="hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-green-200 cursor-pointer group hover:scale-105 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <Eye className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">Mine sager</h3>
                <p className="text-sm text-gray-600">Se status og modtagne tilbud</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link to="/kontakt">
        <Card className="hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-purple-200 cursor-pointer group hover:scale-105 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <MessageSquare className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">Hjælp & Support</h3>
                <p className="text-sm text-gray-600">Få vejledning til din sag</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default QuickActionsGrid;
