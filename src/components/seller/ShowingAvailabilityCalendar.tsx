
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, X } from 'lucide-react';

interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
}

interface ShowingAvailabilityCalendarProps {
  selectedSlots: TimeSlot[];
  onSlotsChange: (slots: TimeSlot[]) => void;
}

const timeOptions = [
  { value: '08:00-10:00', label: '08:00 - 10:00' },
  { value: '10:00-12:00', label: '10:00 - 12:00' },
  { value: '12:00-14:00', label: '12:00 - 14:00' },
  { value: '14:00-16:00', label: '14:00 - 16:00' },
  { value: '16:00-18:00', label: '16:00 - 18:00' },
  { value: '18:00-20:00', label: '18:00 - 20:00' }
];

const ShowingAvailabilityCalendar: React.FC<ShowingAvailabilityCalendarProps> = ({
  selectedSlots,
  onSlotsChange
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('');

  const addTimeSlot = () => {
    if (!selectedDate || !selectedTimeRange) return;

    const [startTime, endTime] = selectedTimeRange.split('-');
    const newSlot: TimeSlot = {
      date: selectedDate,
      startTime,
      endTime
    };

    // Check if this slot already exists
    const exists = selectedSlots.some(slot => 
      slot.date.toDateString() === selectedDate.toDateString() &&
      slot.startTime === startTime &&
      slot.endTime === endTime
    );

    if (!exists) {
      onSlotsChange([...selectedSlots, newSlot]);
    }

    setSelectedTimeRange('');
  };

  const removeTimeSlot = (index: number) => {
    const newSlots = selectedSlots.filter((_, i) => i !== index);
    onSlotsChange(newSlots);
  };

  const formatSlotDisplay = (slot: TimeSlot) => {
    const dateStr = slot.date.toLocaleDateString('da-DK', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
    return `${dateStr} kl. ${slot.startTime}-${slot.endTime}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Tilgængelighed for fremvisning
        </CardTitle>
        <p className="text-sm text-gray-600">
          Vælg datoer og tider hvor mæglere kan fremvise din bolig
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <h4 className="font-medium mb-3">Vælg dato</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {/* Time selection */}
          <div>
            <h4 className="font-medium mb-3">Vælg tidspunkt</h4>
            <div className="space-y-2">
              {timeOptions.map((time) => (
                <Button
                  key={time.value}
                  variant={selectedTimeRange === time.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(time.value)}
                  className="w-full justify-start"
                  disabled={!selectedDate}
                >
                  {time.label}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={addTimeSlot}
              disabled={!selectedDate || !selectedTimeRange}
              className="w-full mt-4"
            >
              Tilføj tidspunkt
            </Button>
          </div>
        </div>

        {/* Selected slots */}
        {selectedSlots.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Valgte tidspunkter</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSlots.map((slot, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {formatSlotDisplay(slot)}
                  <button
                    onClick={() => removeTimeSlot(index)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowingAvailabilityCalendar;
