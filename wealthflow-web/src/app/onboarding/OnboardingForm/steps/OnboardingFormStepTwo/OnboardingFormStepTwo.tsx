import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export function OnboardingFormStepTwo() {
  const { balances, updateBalance, addBalance } = useStore();
  const [expandedBalance, setExpandedBalance] = useState("0");

  const handleAddBalance = () => {
    addBalance({
      name: "",
      amount: 0,
      usable: 0,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Set Up Your Balances</h3>
      <div className="space-y-8">
        <Accordion
          type="single"
          collapsible
          value={expandedBalance}
          onValueChange={setExpandedBalance}
        >
          {balances.map((balance, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="text-sm font-semibold">
                {balance.name || `Balance ${index + 1}`} - ${balance.amount}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-1">
                <div className="space-y-2">
                  <Label htmlFor={`balance-name-${index}`}>Balance Name</Label>
                  <Input
                    id={`balance-name-${index}`}
                    name={`balance-name-${index}`}
                    placeholder="e.g., Savings, Checking"
                    value={balance.name}
                    onChange={(e) =>
                      updateBalance(balance.name, { name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`balance-amount-${index}`}>Amount</Label>
                  <Input
                    id={`balance-amount-${index}`}
                    name={`balance-amount-${index}`}
                    type="number"
                    placeholder="Enter balance amount"
                    value={balance.amount}
                    onChange={(e) =>
                      updateBalance(balance.name, {
                        amount: Number(e.target.value),
                        usable: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddBalance}
          className="w-full"
        >
          Add Another Balance
        </Button>
      </div>
    </div>
  );
}
