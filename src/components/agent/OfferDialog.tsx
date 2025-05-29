import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Case, MarketingMethod } from '@/types/case';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { formatDanishNumber, parseDanishNumberString } from '@/lib/utils';

const offerSchema = z.object({
  expectedSalesPrice: z.string()
    .min(1, { message: "Dette felt skal udfyldes" })
    .transform((val, ctx) => {
      const num = parseDanishNumberString(val);
      if (isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Forventet salgspris skal være et gyldigt positivt tal.",
        });
        return z.NEVER;
      }
      return num;
    }),
  commissionAmount: z.string()
    .min(1, { message: "Dette felt skal udfyldes" })
    .transform((val, ctx) => {
      const num = parseDanishNumberString(val);
      if (isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Salær skal være et gyldigt positivt tal.",
        });
        return z.NEVER;
      }
      return num;
    }),
  bindingPeriod: z.string().min(1, { message: "Dette felt skal udfyldes" }),
  comments: z.string().min(10, { message: "Salgsstrategi skal være mindst 10 tegn" }),
  marketingMethods: z.array(z.string()).min(1, { message: "Vælg mindst én markedsføringskanal" }),
});

export type OfferFormData = z.infer<typeof offerSchema>;

interface OfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
  onSubmitSuccess: (data: OfferFormData) => void;
}

// Updated binding period options as requested
const bindingPeriodOptions = [
  "1 måned",
  "2 måneder", 
  "3 måneder",
  "4 måneder",
  "5 måneder",
  "6 måneder",
  "9 måneder",
  "12 måneder",
  "2 år",
  "Ingen frist"
];

const defaultMarketingMethods: MarketingMethod[] = [
  { id: 'boliga', name: 'Boliga.dk', cost: 0, included: false },
  { id: 'bolignyheder', name: 'Bolignyheder.dk', cost: 0, included: false },
  { id: 'google-ads', name: 'Google Ads', cost: 0, included: false },
  { id: 'facebook-ads', name: 'Facebook/Instagram Ads', cost: 0, included: false },
  { id: 'local-papers', name: 'Lokale aviser', cost: 0, included: false },
  { id: 'national-papers', name: 'Landsdækkende aviser', cost: 0, included: false },
  { id: 'open-house', name: 'Åbent hus arrangementer', cost: 0, included: false },
  { id: 'professional-photos', name: 'Professionelle fotos', cost: 0, included: false },
  { id: 'drone-video', name: 'Drone video', cost: 0, included: false },
  { id: 'home-staging', name: 'Home staging rådgivning', cost: 0, included: false },
];

const OfferDialog: React.FC<OfferDialogProps> = ({ open, onOpenChange, caseData, onSubmitSuccess }) => {
  const { toast } = useToast();
  const form = useForm<z.input<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      expectedSalesPrice: '',
      commissionAmount: '',
      bindingPeriod: '',
      comments: '',
      marketingMethods: [],
    },
  });

  const [commissionPercentage, setCommissionPercentage] = useState<number | null>(null);
  const [showPriceDeviationWarning, setShowPriceDeviationWarning] = useState(false);
  const [deviatedPriceData, setDeviatedPriceData] = useState<OfferFormData | null>(null);
  const [selectedMarketingMethods, setSelectedMarketingMethods] = useState<string[]>([]);

  const expectedSalesPriceWatch = form.watch('expectedSalesPrice');
  const commissionAmountWatch = form.watch('commissionAmount');

  useEffect(() => {
    const priceNum = parseDanishNumberString(expectedSalesPriceWatch);
    const commissionNum = parseDanishNumberString(commissionAmountWatch);

    if (!isNaN(priceNum) && !isNaN(commissionNum) && priceNum > 0) {
      setCommissionPercentage((commissionNum / priceNum) * 100);
    } else {
      setCommissionPercentage(null);
    }
  }, [expectedSalesPriceWatch, commissionAmountWatch]);

  const handleMarketingMethodChange = (methodId: string, checked: boolean) => {
    const newMethods = checked 
      ? [...selectedMarketingMethods, methodId]
      : selectedMarketingMethods.filter(id => id !== methodId);
    setSelectedMarketingMethods(newMethods);
    form.setValue('marketingMethods', newMethods);
  };

  const handleFormSubmit = (data: OfferFormData) => {
    console.log("Data received in handleFormSubmit:", data);
    const priceDeviation = Math.abs(data.expectedSalesPrice - caseData.priceValue) / caseData.priceValue;
    if (priceDeviation > 0.15) { // 15% deviation
      setDeviatedPriceData(data);
      setShowPriceDeviationWarning(true);
    } else {
      finalizeSubmission(data);
    }
  };

  const finalizeSubmission = (data: OfferFormData) => {
    console.log("Tilbud afgivet:", data);
    onSubmitSuccess(data);
    toast({
      title: "Tilbud afgivet!",
      description: `Dit tilbud på sagen ${caseData.address} er blevet registreret.`,
      action: <CheckCircle className="text-green-500" />,
    });
    form.reset({
        expectedSalesPrice: '',
        commissionAmount: '',
        bindingPeriod: '',
        comments: '',
        marketingMethods: [],
    });
    setSelectedMarketingMethods([]);
    onOpenChange(false);
    setShowPriceDeviationWarning(false);
    setDeviatedPriceData(null);
  };

  const handlePriceDeviationConfirm = () => {
    if (deviatedPriceData) {
      finalizeSubmission(deviatedPriceData);
    }
  };

  const handlePriceDeviationCancel = () => {
    setShowPriceDeviationWarning(false);
    setDeviatedPriceData(null);
  };
  
  if (!open) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            form.reset({
                expectedSalesPrice: '',
                commissionAmount: '',
                bindingPeriod: '',
                comments: '',
                marketingMethods: [],
            });
            setSelectedMarketingMethods([]);
        }
        onOpenChange(isOpen);
      }}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Afgiv tilbud på {caseData.address}</DialogTitle>
            <DialogDescription>
              Udfyld nedenstående felter for at afgive dit tilbud på sagen. Sælgers forventede pris er {caseData.price}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(
              (formDataFromHookForm) => {
                handleFormSubmit(formDataFromHookForm as unknown as OfferFormData);
              }
            )} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="expectedSalesPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Din forventede salgspris (DKK) *</FormLabel>
                    <FormControl>
                      <Input
                        type="text" 
                        placeholder="F.eks. 4.100.000"
                        {...field}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          if (rawValue === '') {
                            field.onChange('');
                          } else {
                            const numValue = parseDanishNumberString(rawValue);
                            field.onChange(formatDanishNumber(numValue));
                          }
                        }}
                        className={form.formState.errors.expectedSalesPrice ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commissionAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dit salær (DKK) *</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="text" 
                          placeholder="F.eks. 50.000"
                          {...field}
                          onChange={(e) => {
                            const rawValue = e.target.value;
                            if (rawValue === '') {
                              field.onChange('');
                            } else {
                              const numValue = parseDanishNumberString(rawValue);
                              field.onChange(formatDanishNumber(numValue));
                            }
                          }}
                          className={`flex-grow ${form.formState.errors.commissionAmount ? "border-red-500" : ""}`}
                        />
                      </FormControl>
                      {commissionPercentage !== null && (
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          = {commissionPercentage.toFixed(2)}%
                        </span>
                      )}
                    </div>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bindingPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bindingsperiode *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={form.formState.errors.bindingPeriod ? "border-red-500" : ""}>
                          <SelectValue placeholder="Vælg bindingsperiode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bindingPeriodOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {/* Marketing Methods Section */}
              <FormField
                control={form.control}
                name="marketingMethods"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Markedsføringsmetoder (vælg mindst én) *</FormLabel>
                    <div className={`grid grid-cols-1 gap-3 max-h-48 overflow-y-auto border rounded-md p-3 ${
                      form.formState.errors.marketingMethods ? "border-red-500" : "border-gray-200"
                    }`}>
                      {defaultMarketingMethods.map((method) => (
                        <div key={method.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={method.id}
                            checked={selectedMarketingMethods.includes(method.id)}
                            onCheckedChange={(checked) => handleMarketingMethodChange(method.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <label htmlFor={method.id} className="text-sm font-medium cursor-pointer">
                              {method.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salgsstrategi *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Beskriv din salgsstrategi og tidsplan..." 
                        className={`min-h-[100px] ${form.formState.errors.comments ? "border-red-500" : ""}`}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={() => { 
                      form.reset({
                          expectedSalesPrice: '',
                          commissionAmount: '',
                          bindingPeriod: '',
                          comments: '',
                          marketingMethods: [],
                      }); 
                      setSelectedMarketingMethods([]);
                      onOpenChange(false); 
                    }}>
                    Annuller
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sender..." : "Afgiv tilbud"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Price Deviation Warning Dialog */}
      <AlertDialog open={showPriceDeviationWarning} onOpenChange={setShowPriceDeviationWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500" />
              Advarsel: Prisafvigelse
            </AlertDialogTitle>
            <AlertDialogDescription>
              Din forventede salgspris ({formatDanishNumber(deviatedPriceData?.expectedSalesPrice)}) afviger med mere end 15% fra sælgers forventede pris ({caseData.price}).
              Er du sikker på, du vil fortsætte med dette tilbud?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handlePriceDeviationCancel}>Ret pris</AlertDialogCancel>
            <AlertDialogAction onClick={handlePriceDeviationConfirm} className="bg-yellow-500 hover:bg-yellow-600">
              Fortsæt alligevel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OfferDialog;
