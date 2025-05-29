
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Filter, Download, X, Search, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FilterValues {
  postalCodeFrom?: string;
  postalCodeTo?: string;
  priceFrom?: string;
  priceTo?: string;
  dateFrom?: string;
  dateTo?: string;
  propertyType?: string;
  agencyChain?: string;
  caseStatus?: string;
}

interface AdminFiltersEnhancedProps {
  onFilterChange: (filters: FilterValues) => void;
  onResetFilters: () => void;
  onExportCSV: () => void;
  activeFiltersCount?: number;
  totalCases?: number;
  filteredCases?: number;
}

const AdminFiltersEnhanced: React.FC<AdminFiltersEnhancedProps> = ({
  onFilterChange,
  onResetFilters,
  onExportCSV,
  activeFiltersCount = 0,
  totalCases = 0,
  filteredCases = 0
}) => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterValues>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyTypes = [
    'Villa',
    'Rækkehus', 
    'Ejerlejlighed',
    'Andelsbolig',
    'Fritidshus',
    'Øvrige'
  ];

  const agencyChains = [
    'EDC',
    'Danbolig',
    'Boligmægleren',
    'Nybolig',
    'Home',
    'Øvrige'
  ];

  const caseStatuses = [
    'active',
    'offers_received',
    'broker_selected',
    'completed',
    'withdrawn'
  ];

  const statusLabels: { [key: string]: string } = {
    'active': 'Aktive',
    'offers_received': 'Tilbud modtaget',
    'broker_selected': 'Mægler valgt',
    'completed': 'Afsluttede',
    'withdrawn': 'Trukket tilbage'
  };

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    // Convert "all" back to undefined for the filter logic
    const filterValue = value === 'all' ? undefined : value;
    const newFilters = { ...filters, [key]: filterValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onResetFilters();
  };

  const handleExportWithNotification = () => {
    // Simulate CSV export with realistic data
    const csvData = generateCSVData();
    downloadCSV(csvData, 'househub-sager-export.csv');
    
    toast({
      title: "Eksport gennemført",
      description: `${filteredCases} sager eksporteret til CSV fil.`,
    });
  };

  const generateCSVData = () => {
    const headers = ['Sag ID', 'Adresse', 'Postnummer', 'Boligtype', 'Pris', 'Status', 'Oprettet', 'Mæglerkæde'];
    const rows = [
      headers.join(','),
      '001,Østerbrogade 123,2100,Ejerlejlighed,4200000,active,2024-01-15,EDC',
      '002,Amagerbrogade 45,2300,Villa,6500000,offers_received,2024-01-14,Danbolig',
      '003,Vesterbrogade 78,1620,Rækkehus,5200000,completed,2024-01-13,Home'
    ];
    return rows.join('\n');
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatPrice = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    return `${parseInt(numbers).toLocaleString('da-DK')} kr`;
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrering og eksport
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount} aktive filtre</Badge>
              )}
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Brug filtrene til at finde specifikke sager</p>
                  <p>Eksporter resultater til CSV for videre analyse</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Viser {filteredCases} af {totalCases} sager
              </span>
              <Button variant="outline" size="sm" onClick={handleExportWithNotification}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Eksporter CSV
              </Button>
              {Object.values(filters).some(v => v) && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <X className="w-4 h-4 mr-2" />
                  Ryd filtre
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label className="text-sm font-medium">Postnummer fra</Label>
              <Input
                placeholder="1000"
                value={filters.postalCodeFrom || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
                  handleFilterChange('postalCodeFrom', value);
                }}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Postnummer til</Label>
              <Input
                placeholder="9999"
                value={filters.postalCodeTo || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
                  handleFilterChange('postalCodeTo', value);
                }}
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Select value={filters.caseStatus || 'all'} onValueChange={(value) => handleFilterChange('caseStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle statusser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statusser</SelectItem>
                  {caseStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Boligtype</Label>
              <Select value={filters.propertyType || 'all'} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle typer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle typer</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Mæglerkæde</Label>
              <Select value={filters.agencyChain || 'all'} onValueChange={(value) => handleFilterChange('agencyChain', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Alle kæder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle kæder</SelectItem>
                  {agencyChains.map((chain) => (
                    <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {showAdvanced ? 'Mindre' : 'Flere'} filtre
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">Pris fra</Label>
                  <Input
                    placeholder="1.000.000 kr"
                    value={filters.priceFrom || ''}
                    onChange={(e) => {
                      const formatted = formatPrice(e.target.value);
                      handleFilterChange('priceFrom', formatted);
                    }}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Pris til</Label>
                  <Input
                    placeholder="10.000.000 kr"
                    value={filters.priceTo || ''}
                    onChange={(e) => {
                      const formatted = formatPrice(e.target.value);
                      handleFilterChange('priceTo', formatted);
                    }}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Dato fra</Label>
                  <Input
                    type="date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Dato til</Label>
                  <Input
                    type="date"
                    value={filters.dateTo || ''}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {Object.values(filters).some(v => v) && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Aktive filtre:</span>
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  
                  const labels: Record<string, string> = {
                    postalCodeFrom: 'Postnr. fra',
                    postalCodeTo: 'Postnr. til',
                    priceFrom: 'Pris fra',
                    priceTo: 'Pris til',
                    dateFrom: 'Fra dato',
                    dateTo: 'Til dato',
                    propertyType: 'Type',
                    agencyChain: 'Mæglerkæde',
                    caseStatus: 'Status'
                  };

                  const displayValue = key === 'caseStatus' ? statusLabels[value] || value : value;

                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      {labels[key]}: {displayValue}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" 
                        onClick={() => handleFilterChange(key as keyof FilterValues, 'all')}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AdminFiltersEnhanced;
