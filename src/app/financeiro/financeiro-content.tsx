"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/loading";
import { formatCurrency, formatDate } from "@/lib/utils";
import { NovoLancamentoModal } from "./novo-lancamento-modal";
import { FaturamentoChart } from "./faturamento-chart";

interface Props {
  transacoes: any[];
  mes: number;
  ano: number;
}

export function FinanceiroContent({ transacoes, mes, ano }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const { receitas, despesas, lucro } = useMemo(() => {
    const r = transacoes
      .filter((t) => t.tipo === "Receita")
      .reduce((acc, t) => acc + Number(t.valor), 0);
    const d = transacoes
      .filter((t) => t.tipo === "Despesa")
      .reduce((acc, t) => acc + Number(t.valor), 0);
    return { receitas: r, despesas: d, lucro: r - d };
  }, [transacoes]);

  const nomeMes = new Date(ano, mes).toLocaleDateString("pt-BR", { month: "long" });

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-brown">Financeiro</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="w-12 h-12 rounded-full bg-gold text-white shadow-lg shadow-gold/30 flex items-center justify-center hover:bg-gold-dark active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <p className="text-sm text-muted capitalize mb-4">{nomeMes} de {ano}</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <Card variant="gold" className="text-center py-4">
          <DollarSign className="w-5 h-5 text-gold mx-auto mb-1" />
          <p className="text-lg font-bold text-brown">{formatCurrency(receitas)}</p>
          <p className="text-[11px] text-muted">Receitas</p>
        </Card>
        <Card variant="default" className="text-center py-4">
          <TrendingDown className="w-5 h-5 text-danger mx-auto mb-1" />
          <p className="text-lg font-bold text-danger">{formatCurrency(despesas)}</p>
          <p className="text-[11px] text-muted">Despesas</p>
        </Card>
      </div>

      <Card variant="gold" className="flex items-center gap-3 py-4 mb-5">
        <PiggyBank className="w-6 h-6 text-gold-dark shrink-0" />
        <div>
          <p className="text-xs text-muted">Lucro Líquido</p>
          <p className={`text-xl font-bold ${lucro >= 0 ? "text-success" : "text-danger"}`}>
            {formatCurrency(lucro)}
          </p>
        </div>
      </Card>

      <FaturamentoChart transacoes={transacoes} mes={mes} ano={ano} />

      <div className="flex items-center justify-between mb-3 mt-6">
        <h3 className="font-semibold text-sm text-brown">Transações Recentes</h3>
      </div>

      {transacoes.length === 0 ? (
        <EmptyState
          title="Nenhuma transação"
          description="As transações aparecerão aqui após os atendimentos serem concluídos."
        />
      ) : (
        <div className="space-y-2">
          {transacoes.slice(0, 20).map((t) => (
            <Card key={t.id} className="flex items-center gap-3 py-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  t.tipo === "Receita" ? "bg-success/10" : "bg-danger/10"
                }`}
              >
                {t.tipo === "Receita" ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-danger" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown truncate">{t.descricao}</p>
                <p className="text-xs text-muted">{formatDate(t.data)}</p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  t.tipo === "Receita" ? "text-success" : "text-danger"
                }`}
              >
                {t.tipo === "Receita" ? "+" : "-"}
                {formatCurrency(Number(t.valor))}
              </p>
            </Card>
          ))}
        </div>
      )}

      <NovoLancamentoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
