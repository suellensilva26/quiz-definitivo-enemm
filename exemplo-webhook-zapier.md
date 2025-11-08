# 🔗 Tutorial: Integração com Zapier (Passo a Passo)

## 📋 O que você vai conseguir:

Ao final deste tutorial, **todos os leads** que preencherem o formulário do quiz serão automaticamente enviados para:
- ✅ Google Sheets (planilha)
- ✅ E-mail de notificação
- ✅ CRM (opcional)
- ✅ WhatsApp (opcional)

---

## 🚀 Passo 1: Criar Conta no Zapier

1. Acesse [zapier.com](https://zapier.com)
2. Crie uma conta gratuita (permite até 100 leads/mês)
3. Clique em "Create Zap"

---

## ⚙️ Passo 2: Configurar o Webhook (Recebedor)

### 2.1 - Escolher Trigger

1. No campo "Trigger", busque por **"Webhooks by Zapier"**
2. Selecione "Webhooks by Zapier"
3. Escolha o evento: **"Catch Hook"**
4. Clique em "Continue"

### 2.2 - Copiar URL do Webhook

1. O Zapier vai gerar uma URL única, algo como:
   ```
   https://hooks.zapier.com/hooks/catch/123456/abcdef/
   ```
2. **COPIE ESTA URL** (você vai usar no próximo passo)
3. **NÃO FECHE** esta aba do Zapier ainda

---

## 💻 Passo 3: Configurar o Quiz

1. Abra o arquivo `js/lead-capture.js` do seu quiz
2. Encontre a linha 8:
   ```javascript
   webhookUrl: '',
   ```
3. Cole a URL copiada do Zapier:
   ```javascript
   webhookUrl: 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
   ```
4. Salve o arquivo

---

## 🧪 Passo 4: Testar o Envio

1. Abra o quiz no navegador
2. Preencha o formulário com **dados de teste**:
   - Nome: Teste Zapier
   - Email: teste@email.com
   - Telefone: (11) 99999-9999
   - Instituição: Teste USP
3. Clique em "INICIAR DIAGNÓSTICO GRATUITO"

4. **Volte para o Zapier** e clique em "Test Trigger"
5. Se tudo estiver certo, você verá os dados que acabou de enviar!

---

## 📊 Passo 5: Enviar para Google Sheets

### 5.1 - Adicionar Action

1. Clique em "+ Action"
2. Busque por **"Google Sheets"**
3. Escolha o evento: **"Create Spreadsheet Row"**
4. Conecte sua conta do Google

### 5.2 - Configurar Planilha

1. Crie uma nova planilha no Google Sheets ou use uma existente
2. Adicione os cabeçalhos na primeira linha:
   ```
   | Data/Hora | Nome | E-mail | Telefone | Instituição | Origem |
   ```

3. No Zapier, selecione:
   - **Spreadsheet**: Sua planilha
   - **Worksheet**: Sheet1 (ou o nome da aba)

### 5.3 - Mapear Campos

Conecte cada campo do webhook aos campos da planilha:

| Campo da Planilha | Campo do Webhook |
|-------------------|------------------|
| Data/Hora | timestamp |
| Nome | name |
| E-mail | email |
| Telefone | phone |
| Instituição | institution |
| Origem | referrer |

4. Clique em "Continue"
5. Clique em "Test Action"
6. Verifique se uma nova linha foi adicionada na planilha!

---

## 📧 Passo 6: Enviar E-mail de Notificação (Opcional)

### 6.1 - Adicionar Mais Uma Action

1. Clique em "+ Action" novamente
2. Busque por **"Gmail"** ou **"Email by Zapier"**
3. Escolha "Send Email"

### 6.2 - Configurar E-mail

```
Para: seu@email.com
Assunto: 🎯 Novo Lead Capturado - NeuroHack Quiz
Corpo:
━━━━━━━━━━━━━━━━━━━━━━
🧠 NOVO LEAD CAPTURADO
━━━━━━━━━━━━━━━━━━━━━━

👤 Nome: [name]
📧 E-mail: [email]
📱 WhatsApp: [phone]
🎓 Instituição: [institution]
⏰ Data/Hora: [timestamp]
🔗 Origem: [referrer]

━━━━━━━━━━━━━━━━━━━━━━
Entre em contato o quanto antes!
```

Use os campos do webhook entre colchetes (o Zapier vai preencher automaticamente).

---

## 🎉 Passo 7: Ativar o Zap

1. Clique em "Publish Zap"
2. Dê um nome: "NeuroHack Quiz - Captura de Leads"
3. Clique em "Turn on Zap"

**Pronto!** Agora todos os leads serão automaticamente:
- ✅ Salvos na planilha do Google Sheets
- ✅ Enviados por e-mail para você

---

## 🔥 Integrações Extras (Avançado)

### WhatsApp Business API

1. Adicione action: **"WhatsApp Business"**
2. Configure mensagem automática:
   ```
   Olá [name]! 👋
   
   Obrigado por fazer o Quiz NeuroHack!
   
   Seu diagnóstico está sendo processado...
   
   Em breve você receberá os próximos passos por e-mail.
   
   Qualquer dúvida, responda esta mensagem!
   ```

### HubSpot / RD Station (CRM)

1. Adicione action: **"HubSpot"** ou **"RD Station"**
2. Escolha "Create/Update Contact"
3. Mapeie os campos:
   - Email → email
   - Firstname → name
   - Phone → phone
   - Custom field "Instituição" → institution

### Mailchimp / ActiveCampaign

1. Adicione action: **"Mailchimp"**
2. Escolha "Add/Update Subscriber"
3. Selecione sua lista
4. Mapeie email e nome
5. Configure tag: "Quiz NeuroHack"

---

## 📈 Monitoramento

### Ver Histórico de Envios

1. No Zapier, vá em "Zap History"
2. Veja todos os leads capturados
3. Identifique erros (se houver)

### Testar Novamente

1. Preencha o formulário do quiz
2. Aguarde 1-2 minutos
3. Verifique:
   - Google Sheets (nova linha?)
   - E-mail (chegou notificação?)
   - Zapier History (sucesso?)

---

## ❓ Problemas Comuns

### "Não está enviando para o Zapier"

✅ **Solução:**
1. Verifique se a URL está correta em `js/lead-capture.js`
2. Abra o Console do navegador (F12)
3. Procure por erros
4. Teste com `viewLeads()` no console

### "Zapier não está recebendo dados"

✅ **Solução:**
1. Certifique-se que o Zap está "ON"
2. Verifique o Zap History
3. Teste o trigger novamente
4. Recarregue a página do quiz

### "Dados não aparecem na planilha"

✅ **Solução:**
1. Verifique o mapeamento de campos
2. Teste a Action do Google Sheets
3. Confirme que a planilha tem os cabeçalhos corretos

---

## 💰 Limites do Plano Gratuito

- **100 tarefas/mês** (cada lead = 1 tarefa)
- **Single-step Zaps** (um trigger + uma action)

### Precisa de mais?

Planos pagos a partir de $19.99/mês:
- 750+ tarefas/mês
- Multi-step Zaps (trigger + várias actions)
- Webhook + Sheets + Email + WhatsApp + CRM

---

## ✅ Checklist Final

- [ ] Webhook configurado no Zapier
- [ ] URL adicionada em `js/lead-capture.js`
- [ ] Teste realizado com sucesso
- [ ] Google Sheets conectado
- [ ] E-mail de notificação funcionando
- [ ] Zap está ativado (ON)
- [ ] Primeiro lead real capturado!

---

**Parabéns! Seu sistema de captura está funcionando! 🎉**

Agora você vai receber **automaticamente** todos os dados dos leads que preencherem o quiz.

