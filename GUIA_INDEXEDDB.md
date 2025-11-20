# 🗄️ Guia do IndexedDB - Banco de Dados Local

## O que é IndexedDB?

O **IndexedDB** é um banco de dados completo que roda no navegador, muito mais poderoso que localStorage.

## 🎯 Vantagens do IndexedDB

### Comparação com localStorage:

| Característica | localStorage | IndexedDB |
|---|---|---|
| **Capacidade** | ~5-10 MB | 50 MB+ (ilimitado com permissão) |
| **Tipo de dados** | Apenas strings | Objetos complexos, arrays, blobs |
| **Consultas** | Não tem | Índices e buscas rápidas |
| **Performance** | Lenta com muitos dados | Rápida sempre |
| **Transações** | Não | Sim (ACID) |
| **Async** | Não (bloqueia) | Sim (não bloqueia) |

## 📦 O que está armazenado no IndexedDB

### 1. **Histórico de Vendas** (`historicoVendas`)
- Todos os registros diários de vendas
- Dados de quantidades, pesos e totais
- Campos indexados:
  - `data`: Data do registro
  - `tipoDia`: Tipo de dia (normal, especial, domingo, etc)
  - `diaSemana`: Dia da semana
  - `ano`: Ano do registro
  - `mes`: Mês do registro

### 2. **Configurações** (`configuracoes`)
- Quantidades personalizadas por tipo de dia
- Dias normais, domingos e dias especiais
- Configurações de filé para quinta-feira

### 3. **Feriados Personalizados** (`feriados`)
- Lista de feriados locais/municipais
- Data e descrição de cada feriado

## 🔍 Consultas Disponíveis

### Por Período:
```javascript
// Buscar vendas entre duas datas
await buscarRegistrosPorPeriodo('2024-01-01', '2024-01-31');
```

### Por Tipo de Dia:
```javascript
// Buscar apenas domingos
await buscarRegistrosPorTipoDia('domingo');
```

### Por Mês/Ano:
```javascript
// Buscar vendas de janeiro/2024
await buscarRegistrosPorMesAno(1, 2024);
```

## 💾 Backup e Restauração

### Exportar Backup:
1. Abra "Consultar Histórico"
2. Clique em "📥 Exportar Backup"
3. Arquivo JSON será baixado com todos os dados

### Importar Backup:
1. Abra "Consultar Histórico"
2. Clique em "📤 Importar Backup"
3. Selecione o arquivo JSON exportado
4. Confirme a importação

⚠️ **IMPORTANTE**: Importar um backup irá sobrescrever os dados existentes!

## 🔄 Migração Automática

Quando você abrir o aplicativo pela primeira vez após a atualização:

1. O sistema detecta dados no localStorage antigo
2. Pergunta se deseja migrar
3. Se confirmar, todos os dados são transferidos para IndexedDB
4. Um backup do localStorage é criado automaticamente

## 🛡️ Segurança dos Dados

- **Local**: Os dados ficam apenas no seu computador
- **Navegador**: Cada navegador tem seu próprio banco
- **Privado**: Outros sites não podem acessar seus dados
- **Persistente**: Dados permanecem mesmo fechando o navegador

## ⚠️ Como NÃO perder dados

### ✅ Faça Regularmente:
1. **Exportar backups** (pelo menos 1x por semana)
2. **Guardar arquivos** em local seguro (nuvem, pendrive)
3. **Testar importação** do backup para verificar

### ❌ Evite:
1. Limpar dados do navegador sem backup
2. Desinstalar o navegador sem exportar
3. Formatar o computador sem salvar backups
4. Usar "modo anônimo" (dados não são salvos)

## 📊 Estrutura do Backup JSON

```json
{
  "historicoVendas": [
    {
      "id": 1,
      "data": "2024-01-15",
      "diaSemana": "segunda-feira",
      "tipoDia": "normal",
      "dados": { ... },
      "totais": { ... },
      "ano": 2024,
      "mes": 1
    }
  ],
  "configuracoes": {
    "quantidades": {
      "normal": { "peito": 9, ... },
      "domingo": { "peito": 10, ... },
      "especial": { "peito": 12, ... }
    }
  },
  "feriados": [
    {
      "data": "2024-02-13",
      "descricao": "Carnaval"
    }
  ],
  "dataExportacao": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Ferramentas de Desenvolvedor

Para visualizar o IndexedDB diretamente:

### Chrome/Edge:
1. Pressione **F12**
2. Vá em **Application**
3. Expanda **IndexedDB** → **FrangoAppDB**

### Firefox:
1. Pressione **F12**
2. Vá em **Storage**
3. Expanda **Indexed DB** → **FrangoAppDB**

## 🆘 Solução de Problemas

### Erro: "IndexedDB não disponível"
- **Causa**: Navegador muito antigo ou modo privado
- **Solução**: Use navegador atualizado em modo normal

### Erro: "Quota excedida"
- **Causa**: Banco de dados muito grande (raro)
- **Solução**: Exporte backup e limpe dados antigos

### Dados não aparecem
1. Verifique se está no mesmo navegador
2. Verifique se não está em modo anônimo
3. Abra F12 e veja se há erros no Console

## 📞 Suporte

Se tiver problemas:
1. Exporte um backup dos seus dados
2. Abra o Console (F12) e veja mensagens de erro
3. Entre em contato com essas informações

---

**Lembre-se**: Sempre faça backups regulares! 💾

