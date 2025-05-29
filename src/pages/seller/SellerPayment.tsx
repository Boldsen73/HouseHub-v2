
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ProgressIndicator from '../../components/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShieldCheck, Info, CircleDollarSign, Mail, Phone, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SellerPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });

  const currentPrice = 500;
  const formattedPrice = `${currentPrice.toLocaleString('da-DK')} kr`;

  const handlePayment = async () => {
    // Validate form
    if (!paymentData.cardNumber || !paymentData.name || !paymentData.cvv) {
      toast({
        title: "Udfyld alle felter",
        description: "Alle kortoplysninger skal udfyldes for at fortsætte.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store payment success in localStorage
      localStorage.setItem('househub_payment_completed', JSON.stringify({
        amount: currentPrice,
        completedAt: new Date().toISOString(),
        cardLastFour: paymentData.cardNumber.slice(-4)
      }));

      console.log('💳 PAYMENT PROCESSED (SIMULATED):', {
        amount: currentPrice,
        currency: 'DKK',
        cardLastFour: paymentData.cardNumber.slice(-4),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Betaling gennemført!",
        description: `Din betaling på ${formattedPrice} er modtaget. Din sag aktiveres nu.`
      });

      // Redirect to confirmation
      setTimeout(() => {
        navigate('/saelger/bekraeftelse');
      }, 1000);

    } catch (error) {
      toast({
        title: "Betalingsfejl",
        description: "Der opstod en fejl ved betalingen. Prøv igen.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={6} totalSteps={6} />
          
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Betaling</CardTitle>
              <p className="text-gray-600">Gennemfør din betaling for at aktivere din sag hos HouseHub</p>
            </CardHeader>
            <CardContent className="p-8">
              {/* Test Environment Warning */}
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Testmiljø</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Dette er en simuleret betaling. Der vil ikke blive trukket penge fra dit kort.
                </p>
              </div>

              {/* Enhanced Pricing Box */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <CircleDollarSign className="h-8 w-8 mr-3 text-blue-600" />
                    <h3 className="font-bold text-2xl text-blue-700">Pris: {formattedPrice} (inkl. moms)</h3>
                  </div>
                  <p className="text-lg font-semibold text-green-700 mb-2">
                    ✓ Dette er en engangsbetaling – ingen skjulte gebyrer
                  </p>
                  <p className="text-gray-700 font-medium">
                    Beløbet refunderes fuldt ud ved formidlingsaftale
                  </p>
                </div>
              </div>

              {/* Support Information */}
              <div className="mb-8 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <ShieldCheck className="h-6 w-6 mr-3 text-green-600" />
                  <h3 className="font-semibold text-lg text-gray-700">Sikker betaling med SSL-kryptering</h3>
                </div>
                <div className="ml-9 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Support: info@househub.dk</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Telefon: +45 XX XX XX XX</span>
                  </div>
                </div>
              </div>
              
              {/* Cancellation policy section */}
              <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Info className="h-6 w-6 mr-3 text-amber-600" />
                  <h3 className="font-semibold text-lg text-amber-700">Fortrydelsesret</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2 ml-9">
                  Du har 14 dages fortrydelsesret fra betalingsdatoen.
                </p>
                <div className="flex items-start p-3 bg-amber-100 border-l-4 border-amber-500 rounded ml-9">
                  <Info className="h-5 w-5 mr-2 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    Bemærk: Fortrydelsesretten bortfalder, hvis mæglere allerede har besigtiget din bolig og/eller afgivet formidlingstilbud baseret på din sag.
                  </p>
                </div>
              </div>
              
              {/* Payment form */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Kortnummer</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Måned</Label>
                    <Select onValueChange={(value) => setPaymentData({...paymentData, expiryMonth: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => (
                          <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                            {String(i+1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">År</Label>
                    <Select onValueChange={(value) => setPaymentData({...paymentData, expiryYear: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="ÅÅ" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => (
                          <SelectItem key={i} value={String(2024 + i)}>
                            {2024 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Navn på kort</Label>
                  <Input
                    id="name"
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                    placeholder="Dit fulde navn"
                    required
                  />
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700 border border-green-200">
                  <p className="font-medium">✓ Din betaling er sikker og krypteret. Vi gemmer ikke dine kortoplysninger.</p>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Link to="/saelger/info" className="flex-1">
                    <Button type="button" variant="outline" className="w-full" disabled={isProcessing}>
                      Tilbage
                    </Button>
                  </Link>
                  <Button 
                    onClick={handlePayment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Behandler...' : `Betal ${formattedPrice}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerPayment;
