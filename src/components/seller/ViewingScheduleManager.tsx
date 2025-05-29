
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Edit2, Save, X } from 'lucide-react';

interface ViewingScheduleManagerProps {
  showingDate: Date;
  showingTime: string;
  isCompleted?: boolean;
  agentsRegistered: number;
  onUpdateSchedule?: (date: Date, time: string) => void;
}

const ViewingScheduleManager: React.FC<ViewingScheduleManagerProps> = ({
  showingDate,
  showingTime,
  isCompleted = false,
  agentsRegistered,
  onUpdateSchedule
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(showingDate.toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState(showingTime);

  const handleSave = () => {
    const updatedDate = new Date(newDate);
    if (onUpdateSchedule) {
      onUpdateSchedule(updatedDate, newTime);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDate(showingDate.toISOString().split('T')[0]);
    setNewTime(showingTime);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('da-DK', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const isViewingPast = new Date() > showingDate;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Fremvisning
          </div>
          {!isCompleted && !isViewingPast && !isEditing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Rediger tidspunkt
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="viewing-date">Dato</Label>
                <Input
                  id="viewing-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="viewing-time">Tidspunkt</Label>
                <Input
                  id="viewing-time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Gem ændringer
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Annuller
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {isViewingPast ? (
              <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
                <p className="text-gray-800 font-medium">
                  Fremvisning blev afholdt den {formatDate(showingDate)} kl. {showingTime}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Planlagt fremvisning
                  </span>
                </div>
                <p className="text-lg text-blue-800">
                  {formatDate(showingDate)} kl. {showingTime}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  {agentsRegistered} mæglere er tilmeldt
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewingScheduleManager;
