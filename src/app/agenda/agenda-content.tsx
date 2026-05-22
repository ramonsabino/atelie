"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { formatCurrency, formatTime } from "@/lib/utils";
import { NovoAgendamentoModal } from "./novo-agendamento-modal";

const HORARIOS = Array.from({ length: 10 }, (_, i) => {
  const h = i + 9;
  return `${String(h).padStart(2, "0")}:00`;
});

export function AgendaContent({
  agendamentos,
  clientes,
  servicos,
  dataInicial,
}: {
  agendamentos: any[];
  clientes: any[];
  servicos: any[];
  dataInicial: string;
}) {
  const [dataSelecionada, setDataSelecionada] = useState(dataInicial);
  const [modalOpen, setModalOpen] = useState(false);

  const diasSemana = useMemo(() => {
    const dias = [];
    const base = new Date(dataSelecionada);
    base.setDate(base.getDate() - 3);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      dias.push(d);
    }
    return dias;
  }, [dataSelecionada]);

  const agendamentosDoDia = agendamentos.filter((a) => {
    const dataAg = a.data_hora.slice(0, 10);
    return dataAg === dataSelecionada;
  });

  const getAgendamentoPorHorario = (horario: string) => {
    const [h] = horario.split(":");
    return agendamentosDoDia.find((a) => {
      const ah = new Date(a.data_hora).getHours();
      return ah === Number(h);
    });
  };

  const formatarDia = (date: Date) => ({
    dia: date.getDate(),
    mes: date.toLocaleDateString("pt-BR", { month: "short" }).slice(0, 3),
    nome: date.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3),
    full: date.toISOString().slice(0, 10),
    isHoje: date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
    isSelected: date.toISOString().slice(0, 10) === dataSelecionada,
  });

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-brown">Agenda</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="w-12 h-12 rounded-full bg-gold text-white shadow-lg shadow-gold/30 flex items-center justify-center hover:bg-gold-dark active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        <button
          onClick={() => {
            const d = new Date(dataSelecionada);
            d.setDate(d.getDate() - 1);
            setDataSelecionada(d.toISOString().slice(0, 10));
          }}
          className="p-2 hover:bg-bg-card rounded-full shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-brown" />
        </button>

        {diasSemana.map((date) => {
          const f = formatarDia(date);
          return (
            <button
              key={f.full}
              onClick={() => setDataSelecionada(f.full)}
              className={`flex flex-col items-center min-w-[52px] py-2 px-3 rounded-xl transition-all ${
                f.isSelected
                  ? "bg-gold text-white shadow-sm"
                  : f.isHoje
                  ? "bg-gold/10 text-brown"
                  : "text-muted hover:bg-bg-card"
              }`}
            >
              <span className="text-[10px] font-semibold uppercase">{f.nome}</span>
              <span className="text-lg font-bold leading-tight">{f.dia}</span>
              <span className="text-[10px] uppercase">{f.mes}</span>
            </button>
          );
        })}

        <button
          onClick={() => {
            const d = new Date(dataSelecionada);
            d.setDate(d.getDate() + 1);
            setDataSelecionada(d.toISOString().slice(0, 10));
          }}
          className="p-2 hover:bg-bg-card rounded-full shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-brown" />
        </button>
      </div>

      <div className="space-y-0">
        {HORARIOS.map((horario) => {
          const agendamento = getAgendamentoPorHorario(horario);
          return (
            <div key={horario} className="flex gap-3 min-h-[60px]">
              <div className="flex flex-col items-center w-14 shrink-0 pt-2">
                <span className="text-[11px] font-medium text-muted">{horario}</span>
              </div>
              <div className="flex-1 border-l-2 border-brown/10 pl-3 pb-0">
                {agendamento ? (
                  <Card className="py-3 px-4 border-l-4 border-l-gold">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm text-brown">
                          {(agendamento.cliente as any)?.nome}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {(agendamento.servico as any)?.nome}
                        </p>
                        <p className="text-xs font-semibold text-gold-dark mt-1">
                          {formatCurrency(Number((agendamento.servico as any)?.preco || 0))}
                        </p>
                      </div>
                      <StatusBadge status={agendamento.status} />
                    </div>
                  </Card>
                ) : (
                  <div className="h-full min-h-[40px]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <NovoAgendamentoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        clientes={clientes}
        servicos={servicos}
        dataInicial={dataSelecionada}
      />
    </div>
  );
}
