
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminReturnBanner = () => {
  const { toast } = useToast();

  const handleReturnToAdmin = () => {
    // Restore admin session
    const adminSession = localStorage.getItem('admin_session_backup');
    if (adminSession) {
      localStorage.setItem('currentUser', adminSession);
      localStorage.removeItem('admin_session_backup');
      
      toast({
        title: "Vender tilbage til admin",
        description: "Logger ud af brugervisning og tilbage til admin panel",
      });

      setTimeout(() => {
        window.location.href = '/admin';
      }, 1000);
    }
  };

  return (
    <div className="bg-orange-100 border-b border-orange-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-orange-700" />
          </div>
          <div>
            <Badge className="bg-orange-600 text-white mb-1">
              Admin Session
            </Badge>
            <p className="text-sm text-orange-800">
              Du er logget ind som bruger via admin panelet
            </p>
          </div>
        </div>
        <Button
          onClick={handleReturnToAdmin}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbage til adminpanel
        </Button>
      </div>
    </div>
  );
};

export default AdminReturnBanner;
