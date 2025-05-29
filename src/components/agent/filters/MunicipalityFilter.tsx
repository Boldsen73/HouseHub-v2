import React, { useState } from 'react';
import { Check, ChevronsUpDown, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface MunicipalityFilterProps {
  allMunicipalities: string[];
  selectedMunicipalities: string[];
  onMunicipalityChange: (municipalities: string[]) => void;
}

const MunicipalityFilter: React.FC<MunicipalityFilterProps> = ({
  allMunicipalities,
  selectedMunicipalities,
  onMunicipalityChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (municipality: string) => {
    const newSelection = selectedMunicipalities.includes(municipality)
      ? selectedMunicipalities.filter((m) => m !== municipality)
      : [...selectedMunicipalities, municipality];
    onMunicipalityChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Kommune(r)</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-sm"
          >
            {selectedMunicipalities.length > 0
              ? `${selectedMunicipalities.length} valgt`
              : "Vælg kommune(r)..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Søg kommune..." />
            <CommandList>
              <CommandEmpty>Ingen kommuner fundet.</CommandEmpty>
              <ScrollArea className="h-72">
                <CommandGroup>
                  {allMunicipalities.map((municipality) => (
                    <CommandItem
                      key={municipality}
                      value={municipality}
                      onSelect={() => {
                        handleSelect(municipality);
                        // Keep popover open for multi-select
                        // setOpen(false); 
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedMunicipalities.includes(municipality) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      {municipality}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedMunicipalities.length > 0 && (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-muted-foreground">Valgte kommuner:</p>
          <div className="flex flex-wrap gap-1">
            {selectedMunicipalities.map((municipality) => (
              <Badge key={municipality} variant="secondary" className="text-xs">
                {municipality}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MunicipalityFilter;
