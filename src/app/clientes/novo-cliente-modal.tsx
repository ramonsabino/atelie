"use client";

import { useActionState } from "react";
import { criarCliente } from "@/lib/actions/clientes";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NovoClienteModal({ open, onClose }: Props) {
  const [state, action, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const result = await criarCliente(formData);
    if (result.success) onClose();
    return result;
  }, null);

  return (
    <Modal open={open} onClose={onClose} title="Novo Cliente">
      <form action={action} className="space-y-4">
        <Input id="nome" name="nome" label="Nome" placeholder="Nome completo" required />
        <Input id="telefone" name="telefone" label="Telefone" placeholder="(11) 99999-9999" type="tel" />
        <Input id="instagram" name="instagram" label="Instagram" placeholder="@usuario" />
        <Input id="foto_url" name="foto_url" label="URL da Foto" placeholder="https://..." type="url" />
        <div className="space-y-1.5">
          <label htmlFor="anotacoes" className="block text-sm font-medium text-brown">Anotações</label>
          <textarea
            id="anotacoes"
            name="anotacoes"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-brown/20 bg-white text-brown placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all resize-none"
            placeholder="Preferências, observações..."
          />
        </div>

        {state?.error && (
          <p className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-3">{state.error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={pending} className="flex-1">
            {pending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
