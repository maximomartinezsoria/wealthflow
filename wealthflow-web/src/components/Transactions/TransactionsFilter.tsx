import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onChange: (value: string) => void;
  id: string;
  label: string;
  placeholder: string;
  filterType: "select" | "date";
  children?: React.ReactNode;
};

export function TransactionsFilter({
  onChange,
  id,
  label,
  placeholder,
  filterType,
  children,
}: Props) {
  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    onChange(value);
    setValue(value);
  };

  return (
    <div className="flex-1 min-w-[200px]">
      <Label htmlFor={id}>{label}</Label>

      {filterType === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${!value && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                format(new Date(value), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => handleChange(date?.toISOString() ?? "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger id={id}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </div>
  );
}
