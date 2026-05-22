"use client";

import { useState } from "react";
import { Plus, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useActionState } from "react";

function NovoEditarServicoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, action, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const { criarServico } = await import("@/lib/actions/servicos");
    const result = await (criarServico as any)(formData);
    if (result?.success) onClose();
    return result;
  }, null);

  return (
    <Modal open={open} onClose={onClose} title="Novo Serviço">
      <form action={action} className="space-y-4">
        <Input id="nome" name="nome" label="Nome do Serviço" placeholder="Ex: Alongamento de Cílios" required />
        <Input
          id="preco"
          name="preco"
          type="number"
          step="0.01"
          min="0"
          label="Preço (R$)"
          placeholder="0,00"
          required
        />
        <Input
          id="duracao_minutos"
          name="duracao_minutos"
          type="number"
          min="1"
          label="Duração (minutos)"
          placeholder="60"
          required
        />
        {state?.error && (
          <p className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-3">{state.error}</p>
        )}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">Cancelar</Button>
          <Button type="submit" disabled={pending} className="flex-1">
            {pending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function ServicosManager({ servicos }: { servicos: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted">{servicos.length} serviços cadastrados</p>
        <button
          onClick={() => setModalOpen(true)}
          className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-dark active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {servicos.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-brown/5"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-brown">{s.nome}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {s.duracao_minutos} min
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-gold-dark">
              {formatCurrency(Number(s.preco))}
            </p>
          </div>
        ))}
      </div>

      <NovoEditarServicoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
