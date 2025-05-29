import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';
import type { SellerQuestion } from '@/types/case';

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  existingQuestions?: SellerQuestion[];
  onSubmitQuestion: (question: string) => void;
}

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  open,
  onOpenChange,
  agentName,
  existingQuestions = [],
  onSubmitQuestion
}) => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = () => {
    if (newQuestion.trim()) {
      onSubmitQuestion(newQuestion.trim());
      setNewQuestion('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Spørgsmål til {agentName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Existing Questions */}
          {existingQuestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Tidligere spørgsmål:</h3>
              {existingQuestions.map((qa) => (
                <Card key={qa.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Dit spørgsmål:</span>
                          <span className="text-xs text-gray-500">
                            {new Date(qa.askedAt).toLocaleDateString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-800">{qa.question}</p>
                      </div>
                      
                      {qa.answer ? (
                        <div className="bg-green-50 p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Svar fra {agentName}:</span>
                            <span className="text-xs text-gray-500">
                              {qa.answeredAt && new Date(qa.answeredAt).toLocaleDateString('da-DK', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-800">{qa.answer}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm text-yellow-700">Venter på svar fra mægleren</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* New Question Form */}
          <div className="space-y-3">
            <Label htmlFor="question">Stil et nyt spørgsmål:</Label>
            <Textarea
              id="question"
              placeholder="F.eks. Hvordan vil du markedsføre min bolig? Hvor lang tid forventer du salget tager?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-sm text-gray-500">
              Mægleren vil få besked om dit spørgsmål og svare hurtigst muligt.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuller
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!newQuestion.trim()}
          >
            Send spørgsmål
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
