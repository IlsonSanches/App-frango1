# 📊 Guia do Sistema de Histórico

## Visão Geral

O Sistema de Histórico permite que você **salve, consulte e analise** os dados de vendas de frango por período, facilitando o planejamento e a tomada de decisões.

---

## 🚀 Como Usar

### 1. **Salvar Dados do Dia**

#### Passo a Passo:
1. Selecione a **data** desejada
2. Digite as **quantidades que sobraram** (Final/Sobrou)
3. Clique no botão **"💾 Salvar no Histórico"**
4. O sistema salva automaticamente:
   - Data
   - Dia da semana
   - Tipo do dia (normal/especial/domingo)
   - Quantidades trabalhar, final, fazer porções e tirar KG
   - Totais

#### 📝 Importante:
- **Se já existe um registro** para aquela data, você será perguntado se deseja substituir
- Os dados são salvos no **navegador local** (localStorage)
- **Não é necessário internet** para funcionar

---

### 2. **Consultar Histórico por Período**

#### Passo a Passo:
1. Clique no botão **"📊 Consultar Histórico"**
2. Selecione a **Data Início** e **Data Fim**
3. Clique em **"🔍 Consultar"**

#### O que você verá:
- **Tabela com todos os dias** do período
- **Data** em formato brasileiro (DD/MM/AAAA)
- **Dia da semana** (Segunda, Terça, etc.)
- **Tipo de dia** (normal, especial, domingo)
- **Fazer Porções** (total do dia)
- **Tirar - KG** (total do dia)
- **Botões de ação** (Ver Detalhes e Excluir)

#### 📊 Totais do Período:
- No rodapé da tabela você vê os **totais somados** de todo o período

---

### 3. **Ver Detalhes de um Dia**

#### Como acessar:
1. Na tabela de resultados, clique em **"Ver Detalhes"**

#### O que você verá:
- **Tabela completa** com todos os tipos de frango
- **Colunas**:
  - Trabalhar (quantidade inicial)
  - Final (Sobrou)
  - Fazer Porções
  - Tirar - KG
- **Totais** de cada coluna

---

### 4. **Exportar para CSV/Excel**

#### Passo a Passo:
1. Consulte um período
2. Clique em **"📥 Exportar CSV"**
3. O arquivo é **baixado automaticamente**

#### O arquivo contém:
- Data em formato brasileiro
- Dia da semana
- Tipo de dia
- **Todas as quantidades** de cada tipo de frango:
  - Trabalhar
  - Final
  - Fazer Porções
  - Tirar KG
- **Totais** do dia

#### 💡 Como abrir:
- **Excel**: Abra diretamente
- **Google Sheets**: Importe o arquivo CSV
- **LibreOffice Calc**: Abra diretamente

---

### 5. **Ver Estatísticas**

#### Passo a Passo:
1. Consulte um período
2. Clique em **"📊 Ver Estatísticas"**

#### O que você verá:

##### **Cards Resumo:**
- 📅 **Total de Dias**: Quantos dias no período
- 🍗 **Total de Porções**: Soma de todas as porções
- ⚖️ **Total de KG**: Soma de todos os quilos
- 📊 **Média Porções/Dia**: Média diária de porções
- 📈 **Média KG/Dia**: Média diária de quilos

##### **Tabela por Tipo de Frango:**
- Total de porções por tipo
- Total de KG por tipo
- Média diária por tipo

#### 📈 Use para:
- Planejar compras
- Identificar tendências
- Comparar períodos
- Tomar decisões baseadas em dados

---

## 🎯 Casos de Uso

### Caso 1: Análise Semanal

**Objetivo**: Ver quanto foi vendido na semana

```
Data Início: 13/10/2025 (Segunda)
Data Fim: 19/10/2025 (Domingo)
```

**Resultado**:
- Tabela com os 7 dias
- Total de porções da semana
- Total de KG da semana
- Média diária

---

### Caso 2: Comparação Mensal

**Objetivo**: Comparar vendas de outubro vs setembro

1. Consulte: 01/09/2025 a 30/09/2025
2. Exporte o CSV
3. Consulte: 01/10/2025 a 31/10/2025
4. Exporte o CSV
5. Compare os arquivos no Excel

---

### Caso 3: Planejamento de Compras

**Objetivo**: Saber quanto comprar para o próximo mês

1. Consulte os **últimos 30 dias**
2. Veja as **estatísticas**
3. Use a **média diária** para planejar
4. Ajuste baseado nos **feriados** do próximo mês

---

### Caso 4: Identificar Dias com Mais Sobras

**Objetivo**: Ver quais dias sobram mais

1. Consulte um período
2. Exporte para CSV
3. No Excel, ordene pela coluna "Final"
4. Identifique padrões

---

## 🔧 Funcionalidades Avançadas

### Excluir Registro

- Clique em **"Excluir"** ao lado do dia desejado
- Confirme a exclusão
- **Atenção**: Não é possível desfazer!

### Datas Padrão

- Ao abrir o histórico, o sistema automaticamente define:
  - **Data Início**: 30 dias atrás
  - **Data Fim**: Hoje

### Salvamento Automático

- Os dados ficam salvos no **navegador**
- Mesmo fechando e abrindo, os dados permanecem
- Para limpar tudo: limpe o histórico do navegador

---

## 📱 Responsividade

O sistema funciona perfeitamente em:
- 💻 **Desktop**: Visualização completa
- 📱 **Celular**: Tabelas com scroll horizontal
- 📱 **Tablet**: Layout adaptado

---

## ⚠️ Dicas Importantes

### ✅ Faça:
- **Salve todos os dias** no final do expediente
- **Exporte mensalmente** para ter backup
- **Consulte regularmente** para identificar padrões
- **Use as estatísticas** para planejamento

### ❌ Evite:
- Não limpe o histórico do navegador sem exportar antes
- Não feche a confirmação de substituição sem ler
- Não exclua registros sem ter certeza

---

## 🎨 Indicadores Visuais

Na tabela de histórico, você verá cores diferentes:

- 🟢 **Verde** (tipo-normal): Dias normais (Seg-Qui)
- 🟡 **Amarelo** (tipo-especial): Sexta/Sábado/Feriados/Vésperas
- ⚪ **Cinza** (tipo-domingo): Domingos

---

## 📤 Formato do CSV Exportado

### Colunas:
1. Data (DD/MM/AAAA)
2. Dia da Semana
3. Tipo
4-7. Peito (Trabalhar, Final, Fazer, KG)
8-11. Coxa (Trabalhar, Final, Fazer, KG)
12-15. Asa (Trabalhar, Final, Fazer, KG)
16-19. Filé (Trabalhar, Final, Fazer, KG)
20-23. Chick (Trabalhar, Final, Fazer, KG)
24. Total Fazer Porções
25. Total Tirar KG

### Exemplo de Linha:
```
20/10/2025,segunda-feira,normal,9,3,6,9.6,11,5,6,9.6,4,4,0,0,24,4,20,34.0,3,2,1,1.6,33,54.8
```

---

## 🔮 Exemplos Práticos

### Exemplo 1: Relatório Semanal

**Situação**: Precisa apresentar relatório semanal ao gerente

1. Segunda-feira: Consulte semana anterior
2. Clique em "Ver Estatísticas"
3. Anote:
   - Total de porções
   - Total de KG
   - Média diária
4. Exporte CSV para anexar ao relatório

---

### Exemplo 2: Pedido ao Fornecedor

**Situação**: Precisa fazer pedido para os próximos 15 dias

1. Consulte últimos 15 dias
2. Veja estatísticas
3. Use "Média KG/Dia" por tipo de frango
4. Multiplique por 15 dias
5. Adicione 10-15% de margem de segurança
6. Faça o pedido!

---

### Exemplo 3: Análise de Desperdício

**Situação**: Quer reduzir desperdício

1. Consulte último mês
2. Exporte CSV
3. No Excel, crie coluna: "% Sobra" = (Final/Trabalhar) × 100
4. Identifique dias com % alta
5. Veja se há padrão (dia da semana, feriado, etc.)
6. Ajuste quantidades baseado nos padrões

---

## 🆘 Solução de Problemas

### Problema: "Nenhum registro encontrado"
**Solução**: Certifique-se de ter salvado dados nesse período

### Problema: Dados desapareceram
**Solução**: Verifique se o histórico do navegador foi limpo. **Sempre exporte backup!**

### Problema: Exportação não funciona
**Solução**: Verifique se o navegador permite downloads. Alguns bloqueadores podem impedir.

### Problema: Modal não abre
**Solução**: Recarregue a página (F5)

---

## 💡 Melhores Práticas

1. **Salve diariamente** - Crie o hábito de salvar todos os dias
2. **Exporte mensalmente** - Tenha backup dos dados
3. **Analise semanalmente** - Use as estatísticas para ajustes
4. **Compare períodos** - Identifique tendências e padrões
5. **Use para planejamento** - Baseie decisões em dados reais

---

## 🎉 Pronto para Usar!

Agora você tem um sistema completo de histórico e análise. Use-o para:
- ✅ Ter controle total das vendas
- ✅ Planejar compras com precisão
- ✅ Reduzir desperdício
- ✅ Tomar decisões baseadas em dados
- ✅ Apresentar relatórios profissionais

**Boas análises! 📊🍗**
