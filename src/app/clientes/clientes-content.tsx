"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, Phone, AtSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NovoClienteModal } from "./novo-cliente-modal";

export function ClientesContent({ clientes }: { clientes: any[] }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      clientes.filter((c) =>
        c.nome.toLowerCase().includes(search.toLowerCase())
      ),
    [clientes, search]
  );

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-brown">Clientes</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="w-12 h-12 rounded-full bg-gold text-white shadow-lg shadow-gold/30 flex items-center justify-center hover:bg-gold-dark active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-brown/20 bg-white text-brown placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-muted text-center py-12">
            {search ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}
          </p>
        )}
        {filtered.map((cliente) => (
          <Link key={cliente.id} href={`/clientes/${cliente.id}`}>
            <Card className="flex items-center gap-3 py-3 hover:bg-bg-card transition-colors cursor-pointer">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-lg font-bold text-gold-dark shrink-0">
                {cliente.nome[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-brown truncate">{cliente.nome}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  {cliente.telefone && (
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {cliente.telefone}
                    </span>
                  )}
                  {cliente.instagram && (
                    <span className="text-xs text-muted flex items-center gap-1">
                      <AtSign className="w-3 h-3" />
                      {cliente.instagram}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <NovoClienteModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
