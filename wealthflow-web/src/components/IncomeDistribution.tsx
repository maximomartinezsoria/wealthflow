import { Separator } from "@radix-ui/react-select";
import { Calendar, DollarSign, Edit2, Save, X } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useStore } from "@/lib/store";

export function IncomeDistribution() {
  const {
    income,
    payday,
    incomeDistribution,
    setIncome,
    setPayday,
    setIncomeDistribution,
  } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempIncome, setTempIncome] = useState(income);
  const [tempPayday, setTempPayday] = useState(payday);
  const [tempDistribution, setTempDistribution] = useState(incomeDistribution);

  const handleSave = () => {
    setIncome(tempIncome);
    setPayday(tempPayday);
    setIncomeDistribution(tempDistribution);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempIncome(income);
    setTempPayday(payday);
    setTempDistribution(incomeDistribution);
    setIsEditing(false);
  };

  const totalPercentage = Object.values(incomeDistribution).reduce(
    (sum, value) => sum + value,
    0,
  );

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Income Distribution
        </CardTitle>
        <CardDescription>Manage your monthly income allocation</CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Income
                </p>
                <p className="text-2xl font-bold">${income.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Payday
                </p>
                <p className="text-2xl font-bold">
                  {payday}
                  <sup>th</sup>
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Distribution Breakdown</h4>
              {Object.entries(incomeDistribution).map(
                ([balance, percentage]) => (
                  <div key={balance} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{balance}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} max={100} className="h-2" />
                  </div>
                ),
              )}
            </div>
            <div className="pt-4">
              <Button onClick={() => setIsEditing(true)} className="w-full">
                <Edit2 className="mr-2 h-4 w-4" /> Edit Distribution
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" /> Monthly Income
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payday" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Payday
                </Label>
                <Input
                  id="payday"
                  type="number"
                  min="1"
                  max="31"
                  value={tempPayday}
                  onChange={(e) => setTempPayday(Number(e.target.value))}
                  className="text-lg"
                />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Adjust Distribution</h4>
              {Object.entries(tempDistribution).map(([balance, percentage]) => (
                <div key={balance} className="space-y-2">
                  <Label
                    htmlFor={`distribution-${balance}`}
                    className="flex justify-between"
                  >
                    <span>{balance}</span>
                    <span
                      className={
                        percentage > 100 || totalPercentage > 100
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {percentage}%
                    </span>
                  </Label>
                  <Input
                    id={`distribution-${balance}`}
                    type="range"
                    min="0"
                    max="100"
                    value={percentage}
                    onChange={(e) =>
                      setTempDistribution({
                        ...tempDistribution,
                        [balance]: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              ))}
              {totalPercentage > 100 && (
                <p className="text-sm text-red-500">
                  Total percentage exceeds 100%. Please adjust your
                  distribution.
                </p>
              )}
            </div>
            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={totalPercentage > 100}
              >
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
