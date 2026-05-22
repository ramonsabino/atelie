"use client";

import Link from "next/link";
import { ArrowLeft, Phone, AtSign, Calendar, Clock, StickyNote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/loading";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";

interface Props {
  cliente: any;
  historico: any[];
}

export function ClientePerfil({ cliente, historico }: Props) {
  return (
    <div className="pb-4">
      <Link
        href="/clientes"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brown mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <Card variant="gold" className="flex flex-col items-center py-6 mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-3xl font-bold text-gold-dark mb-3">
          {cliente.nome[0]}
        </div>
        <h2 className="font-serif text-xl font-bold text-brown">{cliente.nome}</h2>
        <div className="flex items-center gap-4 mt-3">
          {cliente.telefone && (
            <a
              href={`tel:${cliente.telefone}`}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-gold"
            >
              <Phone className="w-4 h-4" />
              {cliente.telefone}
            </a>
          )}
          {cliente.instagram && (
            <a
              href={`https://instagram.com/${cliente.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-gold"
            >
              <AtSign className="w-4 h-4" />
              {cliente.instagram}
            </a>
          )}
        </div>
      </Card>

      {cliente.anotacoes && (
        <Card className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote className="w-4 h-4 text-gold" />
            <h3 className="font-semibold text-sm text-brown">Anotações</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed">{cliente.anotacoes}</p>
        </Card>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-gold" />
        <h3 className="font-semibold text-sm text-brown">Histórico de Atendimentos</h3>
      </div>

      {historico.length === 0 ? (
        <EmptyState
          title="Nenhum atendimento registrado"
          description="Os atendimentos aparecerão aqui após serem concluídos."
        />
      ) : (
        <div className="space-y-2">
          {historico
            .sort((a: any, b: any) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime())
            .map((agendamento: any) => (
              <Card key={agendamento.id} className="flex items-center gap-3 py-3">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-bg-card shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-bold text-gold-dark mt-0.5">
                    {formatTime(agendamento.data_hora)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brown">
                    {(agendamento.servico as any)?.nome}
                  </p>
                  <p className="text-xs text-muted">{formatDate(agendamento.data_hora)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gold-dark">
                    {formatCurrency(Number((agendamento.servico as any)?.preco || 0))}
                  </p>
                  <StatusBadge status={agendamento.status} />
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
