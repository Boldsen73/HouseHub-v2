
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, Download, RotateCcw } from 'lucide-react';

interface AdminFiltersProps {
  onExportCSV: () => void;
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
}

const AdminFilters: React.FC<AdminFiltersProps> = ({
  onExportCSV,
  onFilterChange,
  onResetFilters
}) => {
  const [filters, setFilters] = React.useState({
    boligtype: '',
    postnummerFra: '',
    postnummerTil: '',
    datoFra: '',
    datoTil: '',
    mæglernavn: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters = {
      boligtype: '',
      postnummerFra: '',
      postnummerTil: '',
      datoFra: '',
      datoTil: '',
      mæglernavn: ''
    };
    setFilters(emptyFilters);
    onResetFilters();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtre og eksport
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Nulstil
            </Button>
            <Button onClick={onExportCSV} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Download som CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Label htmlFor="boligtype">Boligtype</Label>
            <Select 
              value={filters.boligtype} 
              onValueChange={(value) => handleFilterChange('boligtype', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alle typer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle typer</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Rækkehus">Rækkehus</SelectItem>
                <SelectItem value="Lejlighed">Lejlighed</SelectItem>
                <SelectItem value="Andelsbolig">Andelsbolig</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="postnummer-fra">Postnr. fra</Label>
            <Input
              id="postnummer-fra"
              type="number"
              placeholder="8000"
              value={filters.postnummerFra}
              onChange={(e) => handleFilterChange('postnummerFra', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="postnummer-til">Postnr. til</Label>
            <Input
              id="postnummer-til"
              type="number"
              placeholder="8999"
              value={filters.postnummerTil}
              onChange={(e) => handleFilterChange('postnummerTil', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="dato-fra">Dato fra</Label>
            <Input
              id="dato-fra"
              type="date"
              value={filters.datoFra}
              onChange={(e) => handleFilterChange('datoFra', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="dato-til">Dato til</Label>
            <Input
              id="dato-til"
              type="date"
              value={filters.datoTil}
              onChange={(e) => handleFilterChange('datoTil', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="mæglernavn">Mæglernavn</Label>
            <Input
              id="mæglernavn"
              placeholder="Søg mægler..."
              value={filters.mæglernavn}
              onChange={(e) => handleFilterChange('mæglernavn', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFilters;
