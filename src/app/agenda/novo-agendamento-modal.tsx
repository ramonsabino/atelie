"use client";

import { useActionState } from "react";
import { criarAgendamento } from "@/lib/actions/agendamentos";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Props {
  open: boolean;
  onClose: () => void;
  clientes: { id: string; nome: string }[];
  servicos: { id: string; nome: string }[];
  dataInicial: string;
}

export function NovoAgendamentoModal({ open, onClose, clientes, servicos, dataInicial }: Props) {
  const [state, action, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const result = await criarAgendamento(formData);
    if (result.success) onClose();
    return result;
  }, null);

  return (
    <Modal open={open} onClose={onClose} title="Novo Agendamento">
      <form action={action} className="space-y-4">
        <Select
          id="cliente_id"
          name="cliente_id"
          label="Cliente"
          options={clientes.map((c) => ({ value: c.id, label: c.nome }))}
          required
        />

        <Select
          id="servico_id"
          name="servico_id"
          label="Serviço"
          options={servicos.map((s) => ({ value: s.id, label: s.nome }))}
          required
        />

        <Input
          id="data_hora"
          name="data_hora"
          type="datetime-local"
          label="Data e Hora"
          defaultValue={`${dataInicial}T09:00`}
          required
        />

        {state?.error && (
          <p className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-3">{state.error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={pending} className="flex-1">
            {pending ? "Salvando..." : "Agendar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
