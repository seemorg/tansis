"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransliterationStyle } from "@/types/transliteration";
import { getAllStyles, getStyleLabel } from "@/lib/styles";

interface StyleDropdownProps {
  value: TransliterationStyle;
  onValueChange: (value: TransliterationStyle) => void;
}

export function StyleDropdown({ value, onValueChange }: StyleDropdownProps) {
  const [open, setOpen] = useState(false);
  const styles = getAllStyles();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-48 justify-between text-sm font-medium"
        >
          {getStyleLabel(value)}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="Search style..." />
          <CommandList>
            <CommandEmpty>No style found.</CommandEmpty>
            <CommandGroup>
              {styles.map((style) => (
                <CommandItem
                  key={style.value}
                  value={style.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue as TransliterationStyle);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === style.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {style.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}