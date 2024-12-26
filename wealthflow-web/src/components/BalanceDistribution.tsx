import { useState } from "react";
import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Balance } from "@/lib/store";

interface BalanceDistributionProps {
  balances: Balance[];
}

export function BalanceDistribution({ balances }: BalanceDistributionProps) {
  const [activeChart, setActiveChart] = useState<"pie" | "line">("pie");

  const balanceGrowthData = [
    {
      month: "Jan",
      Investment: 10000,
      Luxury: 2000,
      Learning: 1000,
      "Emergency Fund": 5000,
    },
    {
      month: "Feb",
      Investment: 11000,
      Luxury: 2200,
      Learning: 1100,
      "Emergency Fund": 5500,
    },
    {
      month: "Mar",
      Investment: 12500,
      Luxury: 2500,
      Learning: 1300,
      "Emergency Fund": 6000,
    },
    {
      month: "Apr",
      Investment: 13000,
      Luxury: 3000,
      Learning: 1500,
      "Emergency Fund": 7000,
    },
    {
      month: "May",
      Investment: 14000,
      Luxury: 3500,
      Learning: 2000,
      "Emergency Fund": 8000,
    },
    {
      month: "Jun",
      Investment: 15000,
      Luxury: 5000,
      Learning: 3000,
      "Emergency Fund": 10000,
    },
  ];

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Balance Distribution</CardTitle>
        <div className="space-x-2">
          <Button
            variant={activeChart === "pie" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("pie")}
          >
            Pie Chart
          </Button>
          <Button
            variant={activeChart === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart("line")}
          >
            Growth Chart
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === "pie" ? (
              <PieChart>
                <Pie
                  data={balances}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {balances.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <LineChart data={balanceGrowthData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {balances.map((balance) => (
                  <Line
                    key={balance.name}
                    type="monotone"
                    dataKey={balance.name}
                    stroke={balance.color}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
