
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RotateCcw, Calendar } from 'lucide-react';

interface CaseArchiveFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPostalCode: string;
  onPostalCodeChange: (value: string) => void;
  selectedPropertyType: string;
  onPropertyTypeChange: (value: string) => void;
  onResetFilters: () => void;
  selectedSalary?: string;
  onSalaryChange?: (value: string) => void;
  selectedCaseNumber?: string;
  onCaseNumberChange?: (value: string) => void;
  selectedCreationDate?: string;
  onCreationDateChange?: (value: string) => void;
}

const CaseArchiveFilters: React.FC<CaseArchiveFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedPostalCode,
  onPostalCodeChange,
  selectedPropertyType,
  onPropertyTypeChange,
  onResetFilters,
  selectedSalary = '',
  onSalaryChange = () => {},
  selectedCaseNumber = '',
  onCaseNumberChange = () => {},
  selectedCreationDate = '',
  onCreationDateChange = () => {}
}) => {
  const postalCodes = ['all', '2900', '2200', '2500', '8000', '5000'];
  const propertyTypes = ['all', 'Villa', 'Lejlighed', 'Rækkehus', 'Andelsbolig'];
  const salaryRanges = ['all', '0-2%', '2-3%', '3-4%', '4%+'];
  const creationPeriods = ['all', 'Sidste uge', 'Sidste måned', 'Sidste 3 måneder', 'Sidste år'];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Søg og filtrer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* General Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Søg</Label>
            <Input
              id="search"
              placeholder="Adresse, type..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Case Number Search */}
          <div className="space-y-2">
            <Label htmlFor="caseNumber">Sagsnummer</Label>
            <Input
              id="caseNumber"
              placeholder="F.eks. 2024-001"
              value={selectedCaseNumber}
              onChange={(e) => onCaseNumberChange(e.target.value)}
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postnummer</Label>
            <Select value={selectedPostalCode} onValueChange={onPostalCodeChange}>
              <SelectTrigger id="postalCode">
                <SelectValue placeholder="Alle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                {postalCodes.slice(1).map((code) => (
                  <SelectItem key={code} value={code}>
                    {code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label htmlFor="propertyType">Hustype</Label>
            <Select value={selectedPropertyType} onValueChange={onPropertyTypeChange}>
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Alle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                {propertyTypes.slice(1).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label htmlFor="salary">Salær</Label>
            <Select value={selectedSalary} onValueChange={onSalaryChange}>
              <SelectTrigger id="salary">
                <SelectValue placeholder="Alle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                {salaryRanges.slice(1).map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Creation Date */}
          <div className="space-y-2">
            <Label htmlFor="creationDate">Oprettelsesdato</Label>
            <Select value={selectedCreationDate} onValueChange={onCreationDateChange}>
              <SelectTrigger id="creationDate">
                <SelectValue placeholder="Alle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                {creationPeriods.slice(1).map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Nulstil filtre
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseArchiveFilters;
