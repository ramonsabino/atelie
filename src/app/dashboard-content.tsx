"use client";

import Link from "next/link";
import { CalendarCheck, DollarSign, Clock, Calendar, Gift, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatTime } from "@/lib/utils";

interface DashboardContentProps {
  totalAtendimentos: number;
  faturamentoHoje: number;
  proximoAtendimento: any;
  manutencoesProximas: any[];
  aniversariantes: any[];
  totalClientes: number;
}

export function DashboardContent({
  totalAtendimentos,
  faturamentoHoje,
  proximoAtendimento,
  manutencoesProximas,
  aniversariantes,
  totalClientes,
}: DashboardContentProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-gold" />
        <h2 className="font-serif text-xl font-bold text-brown">
          Olá, Luana! ✨
        </h2>
      </div>
      <p className="text-sm text-muted -mt-3">Tenha um dia incrível!</p>

      <div className="grid grid-cols-2 gap-3">
        <Card variant="gold" className="text-center py-5">
          <CalendarCheck className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-brown">{totalAtendimentos}</p>
          <p className="text-xs text-muted">Atendimentos hoje</p>
        </Card>

        <Card variant="gold" className="text-center py-5">
          <DollarSign className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-brown">
            {formatCurrency(faturamentoHoje)}
          </p>
          <p className="text-xs text-muted">Faturamento hoje</p>
        </Card>
      </div>

      {proximoAtendimento && (
        <Card variant="highlight" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full" />
          <div className="relative z-10">
            <p className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5 inline mr-1" />
              Próximo Atendimento
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-lg font-bold text-gold-dark">
                {(proximoAtendimento.cliente as any)?.nome?.[0] || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brown truncate">
                  {(proximoAtendimento.cliente as any)?.nome}
                </p>
                <p className="text-sm text-muted">
                  {formatTime(proximoAtendimento.data_hora)} &middot;{" "}
                  {(proximoAtendimento.servico as any)?.nome}
                </p>
              </div>
              <Link
                href="/agenda"
                className="text-xs font-semibold text-gold hover:text-gold-dark whitespace-nowrap"
              >
                Ver agenda
              </Link>
            </div>
          </div>
        </Card>
      )}

      {manutencoesProximas.length > 0 && (
        <div>
          <h3 className="font-serif font-bold text-brown text-base mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            Manutenções Próximas
          </h3>
          <div className="space-y-2">
            {manutencoesProximas.slice(0, 5).map((cliente) => {
              const dias = Math.floor(
                (Date.now() - new Date(cliente.data_ultima_manutencao).getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <Card key={cliente.id} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-full bg-bg-card flex items-center justify-center text-sm font-bold text-brown">
                    {cliente.nome[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brown truncate">
                      {cliente.nome}
                    </p>
                    <p className="text-xs text-muted">{dias} dias desde a última manutenção</p>
                  </div>
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="text-xs text-gold font-semibold"
                  >
                    Ver
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {aniversariantes.length > 0 && (
        <Card variant="gold" className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-gold-dark shrink-0" />
          <div>
            <p className="text-sm font-semibold text-brown">Aniversariantes do dia</p>
            <p className="text-xs text-muted">
              {aniversariantes.map((c) => c.nome).join(", ")}
            </p>
          </div>
        </Card>
      )}

      <Link href="/clientes">
        <Card className="flex items-center gap-3 cursor-pointer hover:bg-bg-card transition-colors">
          <Users className="w-6 h-6 text-gold shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-brown">Gerenciar Clientes</p>
            <p className="text-xs text-muted">{totalClientes} clientes cadastrados</p>
          </div>
        </Card>
      </Link>
    </div>
  );
}

// Need to pass clientes length - let me fix this
