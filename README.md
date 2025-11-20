# 🍗 Calculadora de Frango

Um aplicativo web moderno para calcular as quantidades de frango a serem preparadas, baseado na sua planilha Excel.

## 📋 Funcionalidades

- **Cálculo Automático Inteligente**: 
  - Informe a quantidade que sobrou de cada tipo de frango
  - O app calcula automaticamente as porções a fazer e o peso total em KG
  - **NOVO**: Ajusta automaticamente as quantidades baseado no dia da semana e feriados!
  
- **Detecção de Dias Especiais**:
  - 📅 **Sexta-feira e Sábado**: Quantidade especial automática
  - 🎉 **Feriados**: Detecta feriados nacionais brasileiros
  - 🎊 **Vésperas de Feriado**: Identifica vésperas automaticamente
  - 🌅 **Domingos**: Quantidade especial para domingos
  - **Dias especiais** (sexta/sábado/feriados/vésperas): 12 peito, 14 coxa, 5 asa, 40 filé, 3 chick
  - **Domingos**: 10 peito, 12 coxa, 4 asa, 32 filé, 3 chick
  - **Dias normais** (segunda a quinta): 9 peito, 11 coxa, 4 asa, 24 filé, 3 chick

- **🔧 Configuração de Quantidades Personalizada**:
  - Personalize as quantidades padrão para cada tipo de dia
  - Configure dias normais, domingos e dias especiais
  - Salve suas configurações no navegador
  - Restaure os valores padrão quando quiser

- **Gerenciamento de Feriados**:
  - Feriados nacionais pré-cadastrados
  - Adicione feriados locais/municipais personalizados
  - Gerencie sua própria lista de feriados

- **Validação**: Impede valores inválidos (negativos ou acima do total disponível)
- **Salvamento Automático**: Os dados são salvos automaticamente no navegador
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e celular
- **Impressão**: Botão para imprimir os resultados
- **Reset**: Limpar todos os campos facilmente

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** no seu navegador
2. **Selecione a data** (padrão é hoje)
   - O app detecta automaticamente se é dia especial (sexta, sábado, feriado, véspera ou domingo)
   - As quantidades da coluna "Trabalhar" são ajustadas automaticamente
3. **Digite a quantidade que sobrou** de cada tipo de frango na coluna "Final (Sobrou)"
4. **Veja os cálculos automáticos** nas colunas "Fazer Porções" e "Tirar - KG"
5. **Configure quantidades** (opcional): Clique em "🔧 Configurar Quantidades" para personalizar os valores padrão
6. **Configure feriados** (opcional): Clique em "⚙️ Configurar Feriados" para adicionar feriados locais
7. **Use os botões** para limpar tudo ou imprimir

## 📊 Configurações dos Cálculos

### Tipos de Frango e Pesos por Porção:
- **Peito**: 1.6 KG por porção
- **Coxa**: 1.6 KG por porção  
- **Asa**: 1.6 KG por porção
- **Filé**: 1.7 KG por porção
- **Chick.**: 1.6 KG por porção

### Fórmulas:
- **Fazer Porções** = Total - Final (Sobrou)
- **Tirar KG** = Fazer Porções × Peso por porção

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop, Tablet, Celular
- ✅ Windows, Mac, Linux

## 🔧 Personalização

### Valores Padrão
Você pode personalizar as quantidades padrão diretamente pela interface:
1. Clique no botão "🔧 Configurar Quantidades"
2. Edite os valores para dias normais, domingos e dias especiais
3. Clique em "💾 Salvar Configurações"
4. Use "🔄 Restaurar Padrões" para voltar aos valores originais

As configurações são salvas automaticamente no navegador e aplicadas imediatamente!

### Feriados
- **Feriados fixos nacionais**: pré-cadastrados no sistema
- **Feriados móveis**: incluídos até 2026 (Carnaval, Sexta-feira Santa, Corpus Christi)
- **Feriados locais**: adicione através do botão "⚙️ Configurar Feriados" na interface

## 📁 Arquivos

- `index.html` - Estrutura principal
- `script.js` - Lógica de cálculo
- `styles.css` - Estilos e design
- `README.md` - Este arquivo

## 💡 Dicas

- Os dados são salvos automaticamente no navegador
- Mude a data para ver as quantidades se ajustarem automaticamente
- Adicione feriados municipais para melhor precisão
- Use o botão "Limpar Tudo" para resetar todos os valores
- O aplicativo funciona offline após carregado
- Para imprimir, use o botão "Imprimir" ou Ctrl+P

## 📅 Feriados Incluídos

### Feriados Nacionais Fixos:
- Ano Novo (01/01)
- Tiradentes (21/04)
- Dia do Trabalho (01/05)
- Independência do Brasil (07/09)
- Nossa Senhora Aparecida (12/10)
- Finados (02/11)
- Proclamação da República (15/11)
- Consciência Negra (20/11)
- Natal (25/12)

### Feriados Móveis (até 2026):
- Carnaval
- Sexta-feira Santa
- Corpus Christi

### Feriados Personalizados:
- Adicione feriados locais/municipais através da interface
- Exemplos: Aniversário da cidade, Dia do padroeiro, etc.

## 🎨 Indicadores Visuais

- 🟢 **Verde**: Dia normal (Segunda a Quinta)
- 🟡 **Amarelo**: Sexta-feira ou Sábado
- 🔴 **Vermelho**: Feriado
- 🔵 **Azul**: Véspera de feriado
- ⚪ **Cinza**: Domingo

---

**Desenvolvido para facilitar o controle de estoque de frango! 🐔**
