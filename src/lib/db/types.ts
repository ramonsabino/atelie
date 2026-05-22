export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string;
          nome: string;
          telefone: string | null;
          instagram: string | null;
          foto_url: string | null;
          data_ultima_manutencao: string | null;
          data_proxima_manutencao: string | null;
          anotacoes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          telefone?: string | null;
          instagram?: string | null;
          foto_url?: string | null;
          data_ultima_manutencao?: string | null;
          data_proxima_manutencao?: string | null;
          anotacoes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          telefone?: string | null;
          instagram?: string | null;
          foto_url?: string | null;
          data_ultima_manutencao?: string | null;
          data_proxima_manutencao?: string | null;
          anotacoes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      servicos: {
        Row: {
          id: string;
          nome: string;
          preco: number;
          duracao_minutos: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          preco: number;
          duracao_minutos: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          preco?: number;
          duracao_minutos?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      agendamentos: {
        Row: {
          id: string;
          cliente_id: string;
          servico_id: string;
          data_hora: string;
          status: "Confirmado" | "Pendente" | "Concluído" | "Cancelado";
          created_at: string;
        };
        Insert: {
          id?: string;
          cliente_id: string;
          servico_id: string;
          data_hora: string;
          status?: "Confirmado" | "Pendente" | "Concluído" | "Cancelado";
          created_at?: string;
        };
        Update: {
          id?: string;
          cliente_id?: string;
          servico_id?: string;
          data_hora?: string;
          status?: "Confirmado" | "Pendente" | "Concluído" | "Cancelado";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agendamentos_cliente_id_fkey";
            columns: ["cliente_id"];
            isOneToOne: false;
            referencedRelation: "clientes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "agendamentos_servico_id_fkey";
            columns: ["servico_id"];
            isOneToOne: false;
            referencedRelation: "servicos";
            referencedColumns: ["id"];
          }
        ];
      };
      financeiro: {
        Row: {
          id: string;
          tipo: "Receita" | "Despesa";
          valor: number;
          descricao: string;
          data: string;
          agendamento_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tipo: "Receita" | "Despesa";
          valor: number;
          descricao: string;
          data: string;
          agendamento_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tipo?: "Receita" | "Despesa";
          valor?: number;
          descricao?: string;
          data?: string;
          agendamento_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "financeiro_agendamento_id_fkey";
            columns: ["agendamento_id"];
            isOneToOne: false;
            referencedRelation: "agendamentos";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
