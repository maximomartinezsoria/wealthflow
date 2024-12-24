import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export function OnboardingFormStepOne() {
  const { setPayday, setIncome } = useStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="income">Monthly Income</Label>
        <Input
          id="income"
          name="income"
          type="number"
          placeholder="Enter your monthly income"
          onChange={(event) => setIncome(Number(event.target.value))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="payday">Payday (1-31)</Label>
        <Input
          id="payday"
          name="payday"
          type="number"
          min="1"
          max="31"
          placeholder="Enter your payday"
          onChange={(event) => setPayday(Number(event.target.value))}
          required
        />
      </div>
    </div>
  );
}
