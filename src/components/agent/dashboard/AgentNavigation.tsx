
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { useTestAuth } from '@/hooks/useTestAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AgentNavigation: React.FC = () => {
  const { user, logout } = useTestAuth();

  // Get user name with proper fallback logic
  const getUserDisplayName = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('AgentNavigation - Current user:', currentUser);
    
    // First try firstName
    if (currentUser.firstName && currentUser.firstName.trim()) {
      const firstName = currentUser.firstName.split(' ')[0].trim();
      console.log('AgentNavigation - Using firstName:', firstName);
      return firstName;
    }
    
    // Then try name field
    if (currentUser.name && currentUser.name.trim()) {
      const firstName = currentUser.name.split(' ')[0].trim();
      console.log('AgentNavigation - Using name:', firstName);
      return firstName;
    }
    
    // Then try email as fallback
    if (currentUser.email && currentUser.email.trim()) {
      const emailName = currentUser.email.split('@')[0].trim();
      console.log('AgentNavigation - Using email:', emailName);
      return emailName;
    }
    
    // Final fallback
    console.log('AgentNavigation - Using fallback name');
    return user?.name || 'Mægler';
  };

  return (
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
              {getUserDisplayName()} - Aktiv
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Profil
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/maegler/profil" className="flex items-center cursor-pointer">
                    Min profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log ud
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AgentNavigation;
