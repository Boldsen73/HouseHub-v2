
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HelpSectionCard: React.FC = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-xl">Brug for hjælp?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Hvis du har spørgsmål til processen eller din sag, er du velkommen til at kontakte os.
        </p>
        <Link to="/kontakt">
          <Button variant="secondary">Kontakt Support</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HelpSectionCard;
