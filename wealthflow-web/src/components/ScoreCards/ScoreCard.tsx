import clsx from "clsx";
import { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  number: string;
  note: string;
  Icon: LucideIcon;
  noteClassNames?: string;
};

export function ScoreCard({
  title,
  number,
  note,
  Icon,
  noteClassNames = "",
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${number}</div>
        <p className={clsx("text-sm font-medium", noteClassNames)}>{note}</p>
      </CardContent>
    </Card>
  );
}
