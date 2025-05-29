
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockEmailService, emailTemplates } from '@/services/emailService';
import EmailNotification from '../EmailNotification';

interface CaseWithdrawalProps {
  caseId: number;
  onWithdraw: () => void;
}

const CaseWithdrawal: React.FC<CaseWithdrawalProps> = ({
  caseId,
  onWithdraw
}) => {
  const { toast } = useToast();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [emailNotificationData, setEmailNotificationData] = useState<any>(null);

  const handleWithdraw = async () => {
    setIsWithdrawing(true);

    try {
      // Simulate withdrawal process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mark case as withdrawn in localStorage
      const withdrawnCases = JSON.parse(localStorage.getItem('househub_withdrawn_cases') || '[]');
      withdrawnCases.push({
        caseId,
        withdrawnAt: new Date().toISOString(),
        reason: 'seller_withdrawal'
      });
      localStorage.setItem('househub_withdrawn_cases', JSON.stringify(withdrawnCases));

      // Send confirmation email (simulated)
      const emailTemplate = emailTemplates.sellerCaseWithdrawn();
      await mockEmailService.sendEmail({
        to: 'seller@example.dk',
        subject: emailTemplate.subject,
        content: emailTemplate.content,
        type: 'seller_case_withdrawn'
      });

      // Show email notification
      setEmailNotificationData({
        to: 'seller@example.dk',
        subject: emailTemplate.subject,
        type: 'Sag annulleret'
      });
      setShowEmailNotification(true);

      toast({
        title: "Sag annulleret",
        description: "Din sag er nu annulleret og fjernet fra systemet.",
        variant: "destructive"
      });

      // Call parent callback
      onWithdraw();

    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved annullering. Prøv igen.",
        variant: "destructive"
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <>
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Annuller salg
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">
            Hvis du ikke længere ønsker at sælge din bolig gennem HouseHub, kan du annullere dit salg her.
          </p>
          
          <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Vigtigt at vide:</p>
                <ul className="text-sm text-red-700 mt-1 space-y-1">
                  <li>• Din betaling på 500 kr refunderes ikke</li>
                  <li>• Alle mæglere vil blive informeret</li>
                  <li>• Denne handling kan ikke fortrydes</li>
                </ul>
              </div>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                disabled={isWithdrawing}
                className="w-full"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {isWithdrawing ? 'Annullerer...' : 'Træk salget tilbage'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Er du sikker på, at du vil annullere dit salg?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-3">
                  <p>
                    Du mister din betaling på 500 kr, og sagen bliver fjernet fra HouseHub.
                  </p>
                  <p className="font-medium text-red-600">
                    Denne handling kan ikke fortrydes.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600">
                      Alle mæglere, der har afgivet tilbud eller vist interesse, vil automatisk blive informeret om annulleringen.
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isWithdrawing}>
                  Fortryd
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isWithdrawing ? 'Annullerer...' : 'Annuller salget'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <EmailNotification
        show={showEmailNotification}
        onClose={() => setShowEmailNotification(false)}
        emailData={emailNotificationData || {}}
      />
    </>
  );
};

export default CaseWithdrawal;
