-- ============================================================
-- SCHEMA: Luana Ingrid - Ateliê de Beleza
-- Execute this SQL in Supabase SQL Editor
-- ============================================================

-- 1. TABELAS
-- ----------------------------------------
-- CLIENTES
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT,
  instagram TEXT,
  foto_url TEXT,
  data_ultima_manutencao DATE,
  data_proxima_manutencao DATE,
  anotacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SERVICOS
CREATE TABLE servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  preco NUMERIC(10,2) NOT NULL CHECK (preco > 0),
  duracao_minutos INTEGER NOT NULL CHECK (duracao_minutos > 0),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AGENDAMENTOS
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES servicos(id) ON DELETE RESTRICT,
  data_hora TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Confirmado','Pendente','Concluído','Cancelado')),
  created_at TIMESTAMPTZ DEFAULT now(),
  -- Unique constraint for race condition prevention
  CONSTRAINT unique_data_hora UNIQUE (data_hora)
);

-- FINANCEIRO
CREATE TABLE financeiro (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL CHECK (tipo IN ('Receita','Despesa')),
  valor NUMERIC(10,2) NOT NULL CHECK (valor > 0),
  descricao TEXT NOT NULL,
  data DATE NOT NULL,
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_agendamentos_data_hora ON agendamentos(data_hora);
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_financeiro_data ON financeiro(data);
CREATE INDEX idx_clientes_nome ON clientes(nome);

-- 2. ROW LEVEL SECURITY
-- ----------------------------------------
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE financeiro ENABLE ROW LEVEL SECURITY;

-- Single-user: only the authenticated user (Luana) can access data
CREATE POLICY "Usuário autenticado pode ler clientes"
  ON clientes FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode inserir clientes"
  ON clientes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode atualizar clientes"
  ON clientes FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode deletar clientes"
  ON clientes FOR DELETE USING (auth.role() = 'authenticated');

-- Serviços
CREATE POLICY "Usuário autenticado pode ler servicos"
  ON servicos FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode inserir servicos"
  ON servicos FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode atualizar servicos"
  ON servicos FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode deletar servicos"
  ON servicos FOR DELETE USING (auth.role() = 'authenticated');

-- Agendamentos
CREATE POLICY "Usuário autenticado pode ler agendamentos"
  ON agendamentos FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode inserir agendamentos"
  ON agendamentos FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode atualizar agendamentos"
  ON agendamentos FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode deletar agendamentos"
  ON agendamentos FOR DELETE USING (auth.role() = 'authenticated');

-- Financeiro
CREATE POLICY "Usuário autenticado pode ler financeiro"
  ON financeiro FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode inserir financeiro"
  ON financeiro FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode atualizar financeiro"
  ON financeiro FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuário autenticado pode deletar financeiro"
  ON financeiro FOR DELETE USING (auth.role() = 'authenticated');

-- 3. AUTO-CREATE FINANCEIRO RECORD WHEN AGENDAMENTO IS CONCLUÍDO
-- ----------------------------------------
CREATE OR REPLACE FUNCTION criar_receita_ao_concluir()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Concluído' AND (OLD.status IS NULL OR OLD.status <> 'Concluído') THEN
    INSERT INTO financeiro (tipo, valor, descricao, data, agendamento_id)
    SELECT 'Receita', s.preco, c.nome || ' - ' || s.nome, NEW.data_hora::DATE, NEW.id
    FROM clientes c, servicos s
    WHERE c.id = NEW.cliente_id AND s.id = NEW.servico_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_criar_receita
  AFTER UPDATE OF status ON agendamentos
  FOR EACH ROW
  WHEN (NEW.status = 'Concluído')
  EXECUTE FUNCTION criar_receita_ao_concluir();
