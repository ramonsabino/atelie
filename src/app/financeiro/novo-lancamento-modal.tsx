"use client";

import { useActionState } from "react";
import { criarLancamento } from "@/lib/actions/financeiro";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NovoLancamentoModal({ open, onClose }: Props) {
  const [state, action, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const result = await criarLancamento(formData);
    if (result.success) onClose();
    return result;
  }, null);

  return (
    <Modal open={open} onClose={onClose} title="Nova Despesa">
      <form action={action} className="space-y-4">
        <input type="hidden" name="tipo" value="Despesa" />
        <input type="hidden" name="data" defaultValue={new Date().toISOString().slice(0, 10)} />

        <Input id="descricao" name="descricao" label="Descrição" placeholder="Ex: Insumos, aluguel..." required />
        <Input
          id="valor"
          name="valor"
          type="number"
          step="0.01"
          min="0"
          label="Valor (R$)"
          placeholder="0,00"
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
            {pending ? "Salvando..." : "Lançar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
