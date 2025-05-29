
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
  const navigate = useNavigate();

  const handleTestLogin = (role: string) => {
    const mockUser = {
      id: `test-${role}`,
      email: `test@${role}.dk`,
      role: role,
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    
    if (role === 'seller') {
      navigate('/saelger/dashboard');
    } else if (role === 'agent') {
      navigate('/maegler/dashboard');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Test Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => handleTestLogin('seller')} 
            className="w-full"
            variant="outline"
          >
            Log ind som Sælger
          </Button>
          <Button 
            onClick={() => handleTestLogin('agent')} 
            className="w-full"
            variant="outline"
          >
            Log ind som Mægler
          </Button>
          <Button 
            onClick={() => handleTestLogin('admin')} 
            className="w-full"
            variant="outline"
          >
            Log ind som Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestLogin;
