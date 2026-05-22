import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const clienteSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").trim(),
  telefone: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  foto_url: z.string().url("URL inválida").optional().nullable().or(z.literal("")),
  anotacoes: z.string().optional().nullable(),
});

export const servicoSchema = z.object({
  nome: z.string().min(2, "Nome do serviço é obrigatório").trim(),
  preco: z.coerce.number().positive("Preço deve ser positivo"),
  duracao_minutos: z.coerce.number().int().positive("Duração deve ser positiva"),
});

export const agendamentoSchema = z.object({
  cliente_id: z.string().uuid("Cliente inválido"),
  servico_id: z.string().uuid("Serviço inválido"),
  data_hora: z.string().datetime("Data/hora inválida"),
  status: z.enum(["Confirmado", "Pendente", "Concluído", "Cancelado"]).default("Pendente"),
});

export const financeiroSchema = z.object({
  tipo: z.enum(["Receita", "Despesa"]),
  valor: z.coerce.number().positive("Valor deve ser positivo"),
  descricao: z.string().min(1, "Descrição é obrigatória").trim(),
  data: z.string().min(1, "Data é obrigatória"),
  agendamento_id: z.string().uuid().optional().nullable(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ClienteInput = z.infer<typeof clienteSchema>;
export type ServicoInput = z.infer<typeof servicoSchema>;
export type AgendamentoInput = z.infer<typeof agendamentoSchema>;
export type FinanceiroInput = z.infer<typeof financeiroSchema>;
