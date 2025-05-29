
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, LogOut, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getDisplayName } from '@/utils/userNameUtils';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Forside' },
    { path: '/hvordan-virker-det', label: 'Sådan virker det' },
    { path: '/om-os', label: 'Om HouseHub' },
    { path: '/kontakt', label: 'Kontakt os' },
  ];

  // Check if user is logged in and get user info
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const isLoggedIn = currentUser && currentUser.id;
  const isSellerLoggedIn = isLoggedIn && (location.pathname.includes('/saelger/') || currentUser.role === 'seller');
  const isAgentLoggedIn = isLoggedIn && (location.pathname.includes('/maegler/') || currentUser.role === 'agent');

  console.log('Navigation - Current user:', currentUser);
  console.log('Navigation - User role:', currentUser.role);
  console.log('Navigation - Is agent logged in:', isAgentLoggedIn);

  const handleLogout = () => {
    // Clear any stored data
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to home page
    window.location.href = '/';
  };

  const getHomeLinkPath = () => {
    if (isSellerLoggedIn) return '/saelger/dashboard';
    if (isAgentLoggedIn) return '/maegler/dashboard';
    return '/';
  };

  const getUserName = () => {
    console.log('Navigation getUserName - Processing user:', currentUser);
    return getDisplayName(currentUser);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to={getHomeLinkPath()}
                  className="flex items-center space-x-2 group transform transition-transform duration-200 hover:scale-105"
                >
                  <Home className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors font-sans">HouseHub</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLoggedIn ? 'Tilbage til dashboard' : 'Tilbage til forsiden'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="hidden md:flex items-center space-x-6">
            {!isLoggedIn && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-blue-600 transition-colors font-sans ${
                  location.pathname === item.path ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Show user info and logout for logged in users */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {getUserName()}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center font-sans">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log ud
                </Button>
              </div>
            ) : (
              <Link to="/saelger">
                <Button variant="outline" size="sm" className="flex items-center font-sans">
                  <Home className="mr-2 h-4 w-4" />
                  Kom i gang
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {getUserName()}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log ud</span>
                </Button>
              </div>
            ) : (
              <Link to="/saelger">
                <Button variant="ghost" size="icon">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Kom i gang</span>
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" className="font-sans">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
