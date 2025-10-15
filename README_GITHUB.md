# 🍗 Calculadora de Frango - App de Controle de Estoque

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Um aplicativo web moderno e completo para gerenciamento de estoque de frango, com cálculo automático de quantidades, detecção de dias especiais, histórico de vendas e análise de dados.

## 🚀 Demo Online

[**Ver Demonstração**](https://seu-app-frango.vercel.app) _(Após deploy)_

---

## ✨ Funcionalidades

### 📊 **Cálculo Automático Inteligente**
- ✅ Detecção automática do dia da semana
- ✅ Ajuste de quantidades por tipo de dia
- ✅ Cálculo de porções e peso em tempo real
- ✅ Validação de entrada de dados

### 📅 **Detecção de Dias Especiais**
- **Segunda a Quinta** (dias normais): 9 peito, 11 coxa, 4 asa, 24 filé, 3 chick
- **Domingos**: 10 peito, 12 coxa, 4 asa, 32 filé, 3 chick
- **Sexta/Sábado/Feriados/Vésperas**: 12 peito, 14 coxa, 5 asa, 40 filé, 3 chick

### 🎉 **Sistema de Feriados**
- ✅ Feriados nacionais brasileiros pré-cadastrados
- ✅ Feriados móveis até 2026 (Carnaval, Páscoa, Corpus Christi)
- ✅ Gerenciamento de feriados personalizados (municipais/locais)
- ✅ Detecção automática de vésperas de feriado

### 📈 **Histórico e Análise de Vendas**
- ✅ Salvamento de dados diários
- ✅ Consulta por período personalizado
- ✅ Visualização detalhada por dia
- ✅ Exportação para CSV/Excel
- ✅ Estatísticas completas:
  - Total de porções e KG
  - Médias diárias
  - Análise por tipo de frango

### 💾 **Armazenamento Local**
- ✅ Dados salvos no navegador (localStorage)
- ✅ Funciona 100% offline
- ✅ Não requer servidor ou banco de dados
- ✅ Backup via exportação CSV

### 🎨 **Interface Moderna**
- ✅ Design responsivo (mobile-first)
- ✅ Indicadores visuais coloridos
- ✅ Animações suaves
- ✅ Modo de impressão otimizado

---

## 🖼️ Screenshots

### Tela Principal
![Tela Principal](docs/screenshot-main.png)

### Consulta de Histórico
![Histórico](docs/screenshot-historico.png)

### Estatísticas
![Estatísticas](docs/screenshot-stats.png)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com gradientes e animações
- **JavaScript (Vanilla)** - Lógica de negócio pura, sem frameworks
- **LocalStorage API** - Armazenamento de dados local
- **Blob API** - Exportação de arquivos CSV

---

## 📦 Instalação e Uso

### Opção 1: Clone do Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/app-frango.git

# Entre na pasta
cd app-frango

# Abra o index.html no navegador
# Não requer instalação de dependências!
```

### Opção 2: Download Direto

1. Baixe o ZIP do projeto
2. Extraia os arquivos
3. Abra `index.html` no navegador

### Opção 3: Deploy na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/app-frango)

---

## 📖 Como Usar

### 1️⃣ **Uso Diário**

1. Abra o aplicativo
2. A data de hoje já aparece automaticamente
3. Digite as quantidades que sobraram em "Final (Sobrou)"
4. Veja automaticamente:
   - Quantas porções fazer
   - Quanto pesar em KG
5. Clique em "💾 Salvar no Histórico" para registrar

### 2️⃣ **Consultar Histórico**

1. Clique em "📊 Consultar Histórico"
2. Selecione o período desejado
3. Clique em "🔍 Consultar"
4. Veja os dados em tabela
5. Exporte para CSV se necessário

### 3️⃣ **Análise de Dados**

1. Consulte um período
2. Clique em "📊 Ver Estatísticas"
3. Analise totais e médias
4. Use para planejamento de compras

---

## 🎯 Estrutura do Projeto

```
app-frango/
├── index.html              # Página principal
├── script.js               # Lógica da aplicação
├── styles.css              # Estilos CSS
├── .gitignore             # Arquivos ignorados pelo Git
├── README.md              # Este arquivo
├── GUIA_HISTORICO.md      # Guia do sistema de histórico
├── EXEMPLO_USO.md         # Exemplos práticos de uso
└── TESTE_DATAS.md         # Testes de validação de datas
```

---

## 🔧 Configuração

### Personalizar Quantidades

Edite o arquivo `script.js`:

```javascript
// Dias normais (Segunda a Quinta)
const chickenConfigNormal = {
    peito: { pesoPorPorcao: 1.6, total: 9 },
    coxa: { pesoPorPorcao: 1.6, total: 11 },
    // ... ajuste conforme necessário
};

// Domingos
const chickenConfigDomingo = {
    peito: { pesoPorPorcao: 1.6, total: 10 },
    // ... ajuste conforme necessário
};

// Dias especiais
const chickenConfigEspecial = {
    peito: { pesoPorPorcao: 1.6, total: 12 },
    // ... ajuste conforme necessário
};
```

### Adicionar Feriados

Use a interface do aplicativo:
1. Clique em "⚙️ Configurar Feriados"
2. Adicione feriados locais/municipais
3. Os dados são salvos automaticamente

---

## 📊 Dados e Privacidade

- ✅ **100% Local**: Todos os dados ficam no seu navegador
- ✅ **Sem Servidor**: Não enviamos dados para nenhum servidor
- ✅ **Sem Rastreamento**: Não usamos analytics ou cookies de terceiros
- ✅ **Open Source**: Código totalmente aberto e auditável

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

### Futuras Funcionalidades

- [ ] Gráficos visuais de vendas
- [ ] Comparação entre períodos
- [ ] Previsão de demanda com IA
- [ ] Exportação para PDF
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem (opcional)
- [ ] Multi-usuário/lojas

---

## 🐛 Bugs Conhecidos

Nenhum bug conhecido no momento. Reporte problemas na aba [Issues](https://github.com/seu-usuario/app-frango/issues).

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

---

## 🙏 Agradecimentos

- Desenvolvido para facilitar o controle de estoque de estabelecimentos de alimentação
- Inspirado em planilhas Excel tradicionais, mas com tecnologia moderna
- Feito com ❤️ e JavaScript puro

---

## 📞 Suporte

Precisa de ajuda? 

- 📖 Leia a [Documentação Completa](docs/)
- 🐛 Reporte bugs nas [Issues](https://github.com/seu-usuario/app-frango/issues)
- 💬 Tire dúvidas nas [Discussions](https://github.com/seu-usuario/app-frango/discussions)

---

## ⭐ Gostou do Projeto?

Se este projeto te ajudou, considere dar uma ⭐ no repositório!

---

<div align="center">
  
**Desenvolvido com 🍗 e ☕**

[⬆ Voltar ao topo](#-calculadora-de-frango---app-de-controle-de-estoque)

</div>

