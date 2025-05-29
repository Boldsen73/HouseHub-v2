
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data (localStorage, sessionStorage, etc.)
    localStorage.clear();
    sessionStorage.clear();
    // Navigate to login page
    navigate('/maegler');
  };

  // Get current user from localStorage with proper fallback logic
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  console.log('HeaderNavigation - Current user:', currentUser);
  
  const getUserDisplayName = () => {
    // First try firstName (most common for new registrations)
    if (currentUser.firstName && currentUser.firstName.trim() && currentUser.firstName !== 'Demo') {
      const firstName = currentUser.firstName.split(' ')[0].trim();
      console.log('HeaderNavigation - Using firstName:', firstName);
      return firstName;
    }
    
    // Then try name field
    if (currentUser.name && currentUser.name.trim() && currentUser.name !== 'Demo Mægler') {
      const firstName = currentUser.name.split(' ')[0].trim();
      console.log('HeaderNavigation - Using name:', firstName);
      return firstName;
    }
    
    // Try email as fallback (extract name part before @)
    if (currentUser.email && currentUser.email.trim()) {
      const emailName = currentUser.email.split('@')[0].trim();
      // Don't use email if it looks like a demo email
      if (!emailName.toLowerCase().includes('demo') && !emailName.toLowerCase().includes('test') && !emailName.toLowerCase().includes('lars')) {
        console.log('HeaderNavigation - Using email name:', emailName);
        return emailName;
      }
    }
    
    console.log('HeaderNavigation - Using fallback');
    return 'Mægler';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/maegler/dashboard" className="flex items-center space-x-2">
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
                <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-600">
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

export default HeaderNavigation;
