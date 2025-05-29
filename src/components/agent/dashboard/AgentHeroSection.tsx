
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AgentHeroSection: React.FC = () => {
  // Get current user from localStorage with proper fallback logic
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  console.log('AgentHeroSection - Current user:', currentUser);
  
  const getUserDisplayName = () => {
    // First try firstName
    if (currentUser.firstName && currentUser.firstName.trim()) {
      const firstName = currentUser.firstName.split(' ')[0].trim();
      console.log('AgentHeroSection - Using firstName:', firstName);
      return firstName;
    }
    
    // Then try name field
    if (currentUser.name && currentUser.name.trim()) {
      const firstName = currentUser.name.split(' ')[0].trim();
      console.log('AgentHeroSection - Using name:', firstName);
      return firstName;
    }
    
    // Then try email as fallback
    if (currentUser.email && currentUser.email.trim()) {
      const emailName = currentUser.email.split('@')[0].trim();
      console.log('AgentHeroSection - Using email:', emailName);
      return emailName;
    }
    
    console.log('AgentHeroSection - Using fallback');
    return 'Mægler';
  };

  return (
    <section className="bg-white py-16 md:py-20 text-center border-b border-gray-200">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          Velkommen tilbage, {getUserDisplayName()}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Klar til at finde din næste sag? Se nye tilbud og administrer din portefølje.
        </p>
        <div className="mt-6">
          <Link to="/maegler/gennemse-sager">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              Se aktuelle sager
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgentHeroSection;
