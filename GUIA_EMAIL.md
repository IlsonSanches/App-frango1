# 📧 Guia de Configuração de Email

Este guia vai te ensinar a configurar o envio automático de emails quando salvar dados no histórico.

---

## 🎯 O Que Vai Acontecer

Quando você clicar em **"💾 Salvar no Histórico"**, o sistema vai:
1. ✅ Salvar os dados normalmente
2. ✅ **Enviar automaticamente um email** para:
   - bili.sanches@gmail.com
   - sanches.ilson@gmail.com
3. ✅ Email contém uma tabela completa com todos os dados do dia

---

## 📋 Pré-requisitos

- ✅ Conta de email Gmail (já tem)
- ✅ 10 minutos de tempo
- ✅ Conexão com internet

---

## 🚀 PASSO A PASSO COMPLETO

### **PASSO 1: Criar Conta no EmailJS**

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (canto superior direito)
3. Preencha:
   - Email: **sanches.ilson@gmail.com** (ou outro)
   - Senha: (crie uma senha)
4. Clique em **"Sign Up"**
5. Vá no seu email e **confirme a conta**

---

### **PASSO 2: Conectar sua Conta Gmail**

1. Faça login no EmailJS
2. No menu lateral, clique em **"Email Services"**
3. Clique no botão **"Add New Service"**
4. Selecione **"Gmail"**
5. Clique em **"Connect Account"**
6. Faça login com: **sanches.ilson@gmail.com** (ou bili.sanches)
7. Autorize o EmailJS
8. Dê um nome ao serviço: **"Frango Email Service"**
9. Clique em **"Create Service"**
10. **COPIE o SERVICE ID** que aparece (algo como `service_abc1234`)
11. Anote em algum lugar!

---

### **PASSO 3: Criar Template de Email**

1. No menu lateral, clique em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Dê um nome: **"Relatório Diário Frango"**

#### Configure o Template:

**Subject (Assunto):**
```
📊 Relatório Diário de Frango - {{data}}
```

**Content (Conteúdo):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
        <h2 style="color: #667eea; margin-top: 0;">📊 Relatório Diário de Frango</h2>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Data:</strong> {{data}}</p>
            <p style="margin: 5px 0;"><strong>Dia da Semana:</strong> {{dia_semana}}</p>
            <p style="margin: 5px 0;"><strong>Tipo de Dia:</strong> {{tipo_dia}}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead style="background: #667eea; color: white;">
                <tr>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Tipo</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Trabalhar</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Final</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Fazer</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">KG</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Peito</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{peito_trabalhar}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{peito_final}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{peito_fazer}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{peito_kg}}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Coxa</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{coxa_trabalhar}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{coxa_final}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{coxa_fazer}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{coxa_kg}}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Asa</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{asa_trabalhar}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{asa_final}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{asa_fazer}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{asa_kg}}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Filé</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{file_trabalhar}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{file_final}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{file_fazer}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{file_kg}}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Chick</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{chick_trabalhar}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{chick_final}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{chick_fazer}}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{chick_kg}}</td>
                </tr>
            </tbody>
            <tfoot style="background: #667eea; color: white; font-weight: bold;">
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd;">TOTAL</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">{{total_trabalhar}}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">{{total_final}}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">{{total_fazer}}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">{{total_kg}}</td>
                </tr>
            </tfoot>
        </table>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2; font-size: 14px;">
                <strong>📧 Enviado automaticamente pelo Sistema de Controle de Frango</strong>
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                {{message}}
            </p>
        </div>
    </div>
</body>
</html>
```

**To Email (Destinatários):**
```
{{to_email}}
```

4. Clique em **"Save"**
5. **COPIE o TEMPLATE ID** (algo como `template_xyz5678`)
6. Anote!

---

### **PASSO 4: Pegar a Public Key**

1. No menu lateral, clique no seu **nome/foto** (canto superior)
2. Clique em **"Account"**
3. Na aba **"General"**
4. Procure **"Public Key"**
5. **COPIE a Public Key** (algo como `abcdefgh123456`)
6. Anote!

---

### **PASSO 5: Configurar no Projeto**

Agora você tem 3 códigos:
1. **SERVICE_ID** (ex: `service_abc1234`)
2. **TEMPLATE_ID** (ex: `template_xyz5678`)
3. **PUBLIC_KEY** (ex: `abcdefgh123456`)

Abra o arquivo **`emailConfig.js`** e substitua:

```javascript
const EMAIL_CONFIG = {
    SERVICE_ID: 'service_abc1234',      // Cole aqui o seu SERVICE_ID
    TEMPLATE_ID: 'template_xyz5678',    // Cole aqui o seu TEMPLATE_ID
    PUBLIC_KEY: 'abcdefgh123456',       // Cole aqui a sua PUBLIC_KEY
    
    DESTINATARIOS: [
        'bili.sanches@gmail.com',
        'sanches.ilson@gmail.com'
    ]
};
```

**Salve o arquivo!**

---

### **PASSO 6: Fazer Push para o GitHub**

```bash
git add .
git commit -m "✨ Adiciona envio automático de email no histórico"
git push
```

A Vercel vai fazer deploy automaticamente!

---

### **PASSO 7: Testar**

1. Aguarde 1-2 minutos (deploy da Vercel)
2. Abra seu app online
3. Digite os dados de hoje
4. Clique em **"💾 Salvar no Histórico"**
5. Aguarde alguns segundos
6. **Verifique os emails!** 📧

---

## ✅ O Que Você Vai Receber

### **Assunto do Email:**
```
📊 Relatório Diário de Frango - 20/10/2025
```

### **Conteúdo:**
- Tabela HTML bonita e profissional
- Todos os dados do dia
- Data, dia da semana e tipo
- Totais calculados
- Timestamp de quando foi enviado

---

## 🎯 Vantagens

✅ **Backup Automático** - Email serve como backup  
✅ **Notificação** - Você é notificado quando salva  
✅ **Registro** - Histórico de emails no Gmail  
✅ **Compartilhamento** - Fácil encaminhar para outros  
✅ **Profissional** - Email bem formatado  

---

## 📊 Limite Gratuito

**EmailJS Grátis:**
- ✅ 200 emails por mês
- ✅ Suficiente para ~6-7 emails por dia
- ✅ Perfeito para uso diário!

Se precisar de mais, tem planos pagos a partir de $15/mês.

---

## ⚙️ Configurações Avançadas (Opcional)

### Adicionar Mais Destinatários

Edite `emailConfig.js`:

```javascript
DESTINATARIOS: [
    'bili.sanches@gmail.com',
    'sanches.ilson@gmail.com',
    'outro@email.com',  // Adicione mais emails aqui
    'gerente@email.com'
]
```

### Mudar Horário de Envio

Por padrão envia imediatamente. Para agendar, seria necessário um backend mais complexo.

---

## 🐛 Solução de Problemas

### Problema: Email não chega

**Verificar:**
1. ✅ Configurou os 3 códigos corretamente?
2. ✅ Copiou e colou sem espaços extras?
3. ✅ Conectou o Gmail ao EmailJS?
4. ✅ Autorizou o EmailJS?
5. ✅ Verificou spam/lixeira?

### Problema: Erro "EmailJS not defined"

**Solução:**
- Certifique-se que o script do EmailJS está carregando
- Verifique internet ao abrir o app

### Problema: "Service ID not found"

**Solução:**
- Copie novamente o SERVICE_ID do EmailJS
- Verifique se não tem espaços ou aspas extras

---

## 📞 Suporte EmailJS

- **Docs**: https://www.emailjs.com/docs/
- **FAQ**: https://www.emailjs.com/docs/faq/
- **Support**: help@emailjs.com

---

## 🎉 Pronto!

Depois de configurado, todo dia que você salvar no histórico, os emails serão enviados automaticamente! 

**Fácil e automático!** 📧🍗

---

<div align="center">

**Configure uma vez, funciona para sempre!**

[⬆ Voltar ao topo](#-guia-de-configuração-de-email)

</div>

