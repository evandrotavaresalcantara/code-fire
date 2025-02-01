"use client";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUsersStore } from "@/hooks/store/userStore";
import { useEffect } from "react";
import { useAuth } from "@/context";

const chartConfig = {
  ativo: {
    label: "Ativos",
    color: "hsl(var(--chart-2))",
  },
  desativado: {
    label: "Desativados",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ActiveCustomersChart() {
  const { id } = useAuth();
  const { users, findUsers } = useUsersStore();

  const totalUsers = users.length - 1;
  const ativos = users
    .filter((user) => user.id !== id)
    .filter((user) => user.ativo).length;
  const inativos = totalUsers - ativos;

  const chartData = [{ ativo: ativos, desativado: inativos }];

  useEffect(() => {
    findUsers();
  }, []);

  return (
    <Card className="flex flex-col rounded-2xl shadow-2xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Usuarios Ativos</CardTitle>
        <CardDescription>Total de usuarios</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Usuários
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desativado"
              fill="var(--color-desativado)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="ativo"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-ativo)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {totalUsers === 0 ? (
            <div className="flex items-center gap-2 font-medium leading-none">
              Não há usuarios cadastrados
            </div>
        ) : (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Atualmente há <strong> {ativos}</strong> usuarios ativos
            </div>
            <div className="leading-none text-muted-foreground">
              Equivalente a {Math.round((ativos / totalUsers) * 100)}% do total
              de usuarios
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
