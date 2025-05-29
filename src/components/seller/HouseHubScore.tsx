
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, TrendingUp, Clock, Star, Target } from 'lucide-react';

interface HouseHubScoreProps {
  score: number;
  breakdown?: {
    commission: number;
    timeline: number;
    performance: number;
    experience: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
}

const HouseHubScore: React.FC<HouseHubScoreProps> = ({ 
  score, 
  breakdown,
  size = 'md',
  showBreakdown = false 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 border-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 border-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 border-yellow-600 bg-yellow-50';
    if (score >= 60) return 'text-orange-600 border-orange-600 bg-orange-50';
    return 'text-red-600 border-red-600 bg-red-50';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12 text-sm';
      case 'lg':
        return 'w-20 h-20 text-xl';
      default:
        return 'w-16 h-16 text-lg';
    }
  };

  const scoreColor = getScoreColor(score);
  const sizeClasses = getSizeClasses();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={`${sizeClasses} ${scoreColor} rounded-full border-2 flex flex-col items-center justify-center font-bold cursor-pointer transition-all hover:scale-105`}
              onClick={() => setShowDetails(!showDetails)}
            >
              <span>{score}</span>
              <span className="text-xs font-normal">point</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-semibold">HouseHub Score: {score}/100</p>
              <p className="text-sm">
                Baseret på salær, liggetid, mæglerens historik og markedsdata.
              </p>
              {breakdown && (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Salær:</span>
                    <span>{breakdown.commission}/25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liggetid:</span>
                    <span>{breakdown.timeline}/25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span>{breakdown.performance}/25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Erfaring:</span>
                    <span>{breakdown.experience}/25</span>
                  </div>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex flex-col">
          <Badge variant="outline" className="text-xs">
            HouseHub Score
          </Badge>
          {showBreakdown && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              Se detaljer
            </button>
          )}
        </div>
      </div>

      {showDetails && breakdown && (
        <Card className="mt-4 w-full max-w-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Score Opdeling
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Salær konkurrenceevne</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(breakdown.commission / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{breakdown.commission}/25</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Forventet liggetid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(breakdown.timeline / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{breakdown.timeline}/25</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Historisk performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(breakdown.performance / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{breakdown.performance}/25</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Områdeerfaring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(breakdown.experience / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{breakdown.experience}/25</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </TooltipProvider>
  );
};

export default HouseHubScore;
