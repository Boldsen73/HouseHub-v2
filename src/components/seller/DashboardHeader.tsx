
import React from 'react';
import { Home } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Velkommen til HouseHub
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Din genvej til det bedste mæglermatch. Vi hjælper dig hele vejen.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
