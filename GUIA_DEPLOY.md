# 🚀 Guia Completo: GitHub e Deploy na Vercel

Este guia vai te ensinar passo a passo como:
1. Criar conta no GitHub
2. Subir o projeto para o GitHub
3. Fazer deploy na Vercel
4. Acessar seu app online!

---

## 📋 Pré-requisitos

- ✅ Projeto App-Frango funcionando localmente
- ✅ Conexão com internet
- ✅ Navegador (Chrome, Firefox, Edge, etc.)

---

## PARTE 1: 📦 GitHub - Criar Repositório

### Passo 1: Criar Conta no GitHub

1. Acesse: https://github.com/signup
2. Preencha:
   - Email
   - Senha
   - Nome de usuário
3. Verifique o email
4. Complete o cadastro

### Passo 2: Criar Novo Repositório

1. Faça login no GitHub
2. Clique no **+** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `app-frango` (ou outro nome)
   - **Description**: "Calculadora de Frango - Sistema de Controle de Estoque"
   - Marque: ✅ **Public** (para deploy grátis na Vercel)
   - **NÃO** marque "Add README" (já temos um)
5. Clique em **"Create repository"**

### Passo 3: Copiar URL do Repositório

Você verá uma tela com comandos. **Copie a URL** que aparece, algo como:
```
https://github.com/seu-usuario/app-frango.git
```

---

## PARTE 2: 💻 Git - Subir o Projeto

### Opção A: Via Git Bash / Terminal (Recomendado)

#### 1. Instalar Git (se não tiver)

**Windows:**
- Baixe: https://git-scm.com/download/win
- Instale com configurações padrão

**Mac:**
```bash
# Já vem instalado, ou via Homebrew:
brew install git
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
```

#### 2. Configurar Git (Primeira vez)

Abra o terminal/PowerShell e execute:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

#### 3. Inicializar Repositório Local

No terminal, navegue até a pasta do projeto:

```bash
cd C:\Users\sanch\App-Frango
```

Execute os comandos:

```bash
# 1. Inicializar Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer o primeiro commit
git commit -m "🎉 Primeiro commit - App Frango completo"

# 4. Renomear branch para main (padrão atual)
git branch -M main

# 5. Adicionar repositório remoto (use a URL que você copiou)
git remote add origin https://github.com/seu-usuario/app-frango.git

# 6. Enviar para o GitHub
git push -u origin main
```

**Pronto!** Seu código está no GitHub! 🎉

---

### Opção B: Via GitHub Desktop (Mais Fácil)

#### 1. Baixar GitHub Desktop

- Acesse: https://desktop.github.com/
- Baixe e instale

#### 2. Fazer Login

- Abra o GitHub Desktop
- Faça login com sua conta GitHub

#### 3. Adicionar Repositório Local

1. Clique em **"File"** → **"Add Local Repository"**
2. Selecione a pasta: `C:\Users\sanch\App-Frango`
3. Se perguntar, clique em **"create a repository"**

#### 4. Fazer Commit

1. Você verá todos os arquivos na lista
2. No campo **"Summary"** escreva: `🎉 Primeiro commit - App Frango completo`
3. Clique em **"Commit to main"**

#### 5. Publicar no GitHub

1. Clique em **"Publish repository"**
2. Confirme o nome: `app-frango`
3. **Desmarque** "Keep this code private" (para Vercel grátis)
4. Clique em **"Publish Repository"**

**Pronto!** Seu código está no GitHub! 🎉

---

## PARTE 3: ☁️ Vercel - Deploy Online

### Passo 1: Criar Conta na Vercel

1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize a Vercel a acessar suas repositórios
4. Complete o cadastro

### Passo 2: Importar Projeto

1. No dashboard da Vercel, clique em **"Add New..."** → **"Project"**
2. Você verá uma lista dos seus repositórios do GitHub
3. Encontre **"app-frango"**
4. Clique em **"Import"**

### Passo 3: Configurar Deploy

Na tela de configuração:

1. **Project Name**: `app-frango` (ou personalize)
2. **Framework Preset**: Selecione **"Other"** (projeto estático)
3. **Root Directory**: Deixe em **"./"**
4. **Build Command**: Deixe vazio (não precisa build)
5. **Output Directory**: Deixe vazio
6. **Install Command**: Deixe vazio

Clique em **"Deploy"**!

### Passo 4: Aguardar Deploy

- A Vercel vai processar seu projeto
- Leva cerca de 30 segundos
- Você verá: 🎉 **"Congratulations!"**

### Passo 5: Acessar seu App

Você verá uma URL como:
```
https://app-frango.vercel.app
```

**Clique** para abrir seu app online! 🚀

---

## PARTE 4: 🎨 Personalização

### Personalizar Domínio

#### Opção 1: Subdomínio Vercel (Grátis)

1. No dashboard da Vercel, vá em **"Settings"**
2. Clique em **"Domains"**
3. Adicione: `seu-nome-app.vercel.app`

#### Opção 2: Domínio Próprio (Pago)

1. Compre um domínio (ex: registro.br, GoDaddy, Namecheap)
2. No dashboard da Vercel, vá em **"Settings"** → **"Domains"**
3. Adicione seu domínio
4. Configure os DNS conforme instruções

---

## PARTE 5: 🔄 Atualizações Futuras

### Quando Fizer Mudanças no Código

#### Via Git Bash / Terminal:

```bash
# 1. Adicionar mudanças
git add .

# 2. Commit com mensagem descritiva
git commit -m "✨ Adiciona nova funcionalidade X"

# 3. Enviar para GitHub
git push
```

#### Via GitHub Desktop:

1. Faça as mudanças nos arquivos
2. Abra GitHub Desktop
3. Veja as mudanças na lista
4. Escreva mensagem do commit
5. Clique em **"Commit to main"**
6. Clique em **"Push origin"**

**A Vercel detecta automaticamente e faz novo deploy!** 🚀

---

## 📊 Monitoramento

### Ver Estatísticas na Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Veja:
   - ✅ Número de visitas
   - ✅ Performance
   - ✅ Logs de deploy
   - ✅ Status do site

---

## ❓ Solução de Problemas

### Problema: "Permission denied" no Git

**Solução**:
```bash
# Configurar autenticação
git config --global credential.helper store
```

### Problema: Deploy falhou na Vercel

**Solução**:
1. Verifique os logs de erro
2. Confirme que todos os arquivos estão no GitHub
3. Tente fazer **"Redeploy"** na Vercel

### Problema: Site não atualiza

**Solução**:
1. Limpe o cache do navegador (Ctrl + Shift + Delete)
2. Ou use modo anônimo
3. Aguarde alguns minutos (propagação DNS)

### Problema: localStorage não funciona online

**Explicação**: 
- localStorage funciona perfeitamente online
- Mas os dados ficam no navegador de cada usuário
- É local por design

---

## 🎯 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Desfazer mudanças não commitadas
git checkout -- arquivo.txt

# Ver diferenças
git diff

# Criar nova branch
git checkout -b nome-da-branch

# Voltar para main
git checkout main
```

---

## 🔒 Segurança e Boas Práticas

### ✅ Faça:

- Commits frequentes com mensagens claras
- Use .gitignore para não subir arquivos desnecessários
- Teste localmente antes de fazer push
- Faça backup dos dados (exporte histórico)

### ❌ Não Faça:

- Não suba senhas ou API keys
- Não faça commit direto de arquivos grandes
- Não delete o repositório sem backup

---

## 📱 Compartilhar o App

Agora que está online, compartilhe com:

1. **Link direto**:
   ```
   https://seu-app-frango.vercel.app
   ```

2. **QR Code**:
   - Gere em: https://www.qr-code-generator.com/
   - Cole o link do seu app
   - Imprima e cole na loja!

3. **Adicionar à tela inicial** (Mobile):
   - Abra o app no celular
   - Chrome: Menu → "Adicionar à tela inicial"
   - Safari: Compartilhar → "Adicionar à tela inicial"

---

## 🎉 Parabéns!

Você agora tem:
- ✅ Código versionado no GitHub
- ✅ App online e acessível de qualquer lugar
- ✅ Deploy automático a cada mudança
- ✅ URL profissional para compartilhar

**Seu App Frango está no ar! 🚀🍗**

---

## 📞 Links Úteis

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Git Documentation**: https://git-scm.com/doc
- **Vercel Documentation**: https://vercel.com/docs

---

## 🆘 Precisa de Ajuda?

- 📧 Email de suporte
- 💬 GitHub Issues: https://github.com/seu-usuario/app-frango/issues
- 📚 Documentação completa no repositório

---

<div align="center">

**Desenvolvido com ❤️**

[⬆ Voltar ao topo](#-guia-completo-github-e-deploy-na-vercel)

</div>

