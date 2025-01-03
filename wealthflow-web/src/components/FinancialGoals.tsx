import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Balance, Goal } from "@/lib/store";

interface FinancialGoalsProps {
  goals: Goal[];
  balances: Balance[];
  addGoal: (goal: Goal) => void;
  removeGoal: (name: string) => void;
}

export function FinancialGoals({
  goals,
  balances,
  // addGoal,
  removeGoal,
}: FinancialGoalsProps) {
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalBalance, setNewGoalBalance] = useState("");

  const handleAddGoal = () => {
    const target = parseFloat(newGoalTarget);
    if (newGoalName && !isNaN(target) && target > 0 && newGoalBalance) {
      // addGoal({
      //   name: newGoalName,
      //   allocated: 0,
      //   target,
      //   balanceId: newGoalBalance,
      // });
      setNewGoalName("");
      setNewGoalTarget("");
      setNewGoalBalance("");
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your savings goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="New goal name"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Target amount"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
            />
            <Select value={newGoalBalance} onValueChange={setNewGoalBalance}>
              <SelectTrigger>
                <SelectValue placeholder="Select balance" />
              </SelectTrigger>
              <SelectContent>
                {balances.map((balance) => (
                  <SelectItem key={balance.name} value={balance.name}>
                    {balance.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddGoal}>Add</Button>
          </div>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>
                    {goal.name} ({goal.balanceId})
                  </span>
                  <span>
                    ${goal.allocated.toFixed(2)} / ${goal.target.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={(goal.allocated / goal.target) * 100}
                    className="flex-grow"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeGoal(goal.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove goal</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
