"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

interface Props {
  transacoes: any[];
  mes: number;
  ano: number;
}

export function FaturamentoChart({ transacoes }: Props) {
  const data = useMemo(() => {
    const dias = new Map<number, { dia: number; receita: number; despesa: number }>();

    transacoes.forEach((t) => {
      const dia = new Date(t.data).getDate();
      if (!dias.has(dia)) {
        dias.set(dia, { dia, receita: 0, despesa: 0 });
      }
      const entry = dias.get(dia)!;
      if (t.tipo === "Receita") entry.receita += Number(t.valor);
      else entry.despesa += Number(t.valor);
    });

    return Array.from(dias.values()).sort((a, b) => a.dia - b.dia);
  }, [transacoes]);

  if (data.length === 0) return null;

  const formatTooltip = (value: any) => {
    const num = typeof value === "string" ? parseFloat(value) : (value || 0);
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 pb-0">
        <h3 className="font-semibold text-sm text-brown">Evolução do Mês</h3>
      </div>
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAD6C2" />
            <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#9E9E9E" }} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9E9E9E" }} axisLine={false} tickFormatter={(v: any) => `R$${v || 0}`} />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #EAD6C2",
                background: "white",
                fontSize: 12,
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value: any) =>
                value === "receita" ? "Receitas" : "Despesas"
              }
            />
            <Bar
              dataKey="receita"
              fill="#2E7D32"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
              name="receita"
            />
            <Bar
              dataKey="despesa"
              fill="#D32F2F"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
              name="despesa"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
