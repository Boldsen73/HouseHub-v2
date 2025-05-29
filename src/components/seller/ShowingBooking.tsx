
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

interface ShowingBookingProps {
  onShowingBooked: (showingData: any) => void;
}

const ShowingBooking: React.FC<ShowingBookingProps> = ({ onShowingBooked }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleBookShowing = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('=== BOOK SHOWING DEBUG ===');
    console.log('handleBookShowing called', { selectedDate, selectedTime, isSubmitting });
    
    if (!selectedDate || !selectedTime) {
      console.log('Missing date or time');
      toast({
        title: "Fejl",
        description: "Vælg venligst både dato og tidspunkt for fremvisningen.",
        variant: "destructive",
      });
      return;
    }

    if (isSubmitting) {
      console.log('Already submitting, ignoring click');
      return;
    }

    console.log('Starting booking process...');
    setIsSubmitting(true);
    
    try {
      const showingData = {
        date: selectedDate,
        time: selectedTime,
        notes: notes,
        status: 'planlagt',
        bookedAt: new Date().toISOString()
      };
      
      console.log('Booking showing with data:', showingData);
      
      // Store the showing data in localStorage with multiple keys for robustness
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      console.log('Current user for booking:', currentUser);
      
      if (currentUser.id) {
        const storageKey = `showing_data_${currentUser.id}`;
        localStorage.setItem(storageKey, JSON.stringify(showingData));
        console.log('Stored showing data with key:', storageKey);
        
        // Also store in a general showing key
        localStorage.setItem('current_showing_data', JSON.stringify(showingData));
        console.log('Stored in current_showing_data as backup');
      } else {
        console.error('No user ID found for storing showing data');
      }
      
      // Call the callback function
      console.log('Calling onShowingBooked callback...');
      await onShowingBooked(showingData);
      
      toast({
        title: "Fremvisning booket",
        description: `Fremvisning er planlagt til ${format(selectedDate, 'EEEE d. MMMM yyyy', { locale: da })} kl. ${selectedTime}`,
      });
      
      console.log('Showing booked successfully');
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setNotes('');
      
    } catch (error) {
      console.error('Error booking showing:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved booking af fremvisningen. Prøv igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.log('Booking process completed');
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const canBookShowing = selectedDate && selectedTime && !isSubmitting;

  console.log('ShowingBooking render state:', { selectedDate, selectedTime, canBookShowing, isSubmitting });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Book fremvisning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Vælg dato</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
            locale={da}
            className="rounded-md border"
          />
        </div>

        {selectedDate && (
          <div>
            <Label className="text-base font-medium mb-3 block">Vælg tidspunkt</Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    console.log('Time slot selected:', time);
                    setSelectedTime(time);
                  }}
                  className="flex items-center gap-1"
                  disabled={isSubmitting}
                >
                  <Clock className="h-3 w-3" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="showing-notes">Noter til mæglere (valgfrit)</Label>
          <Textarea
            id="showing-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Særlige ønsker eller bemærkninger til fremvisningen..."
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>

        {selectedDate && selectedTime && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Fremvisning planlagt til:</h4>
            <p className="text-sm">
              <strong>Dato:</strong> {format(selectedDate, 'EEEE d. MMMM yyyy', { locale: da })}
            </p>
            <p className="text-sm">
              <strong>Tidspunkt:</strong> {selectedTime}
            </p>
            {notes && (
              <p className="text-sm mt-2">
                <strong>Noter:</strong> {notes}
              </p>
            )}
          </div>
        )}

        <Button
          onClick={handleBookShowing}
          disabled={!canBookShowing}
          className="w-full"
          type="button"
        >
          {isSubmitting ? 'Booker fremvisning...' : 'Book fremvisning'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShowingBooking;
