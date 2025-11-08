# 📊 Sistema de Captura de Leads - NeuroHack Quiz

## 🎯 Visão Geral

O quiz agora captura informações dos leads **antes** de iniciar o diagnóstico:
- ✅ Nome completo
- ✅ E-mail
- ✅ WhatsApp (com máscara automática)
- ✅ Instituição/Curso desejado
- ✅ Data/hora de captura
- ✅ Origem do tráfego

## 📥 Como Acessar os Leads

### Opção 1: Visualizar no Console do Navegador

Abra o Console (F12) e use os comandos:

```javascript
// Ver todos os leads em formato de tabela
viewLeads()

// Exportar leads para arquivo CSV
exportLeads()

// Limpar todos os leads salvos localmente
clearLeads()
```

### Opção 2: LocalStorage (Desenvolvimento)

Por padrão, os leads são salvos automaticamente no `localStorage` do navegador.

**Acessar manualmente:**
1. Abra o DevTools (F12)
2. Vá em "Application" ou "Armazenamento"
3. Clique em "Local Storage"
4. Procure por `neurohack_leads`

## 🔌 Integrações Disponíveis

### 1️⃣ Webhook (Zapier, Make.com, n8n)

**Mais Recomendado:** Simples e poderoso para integrar com qualquer ferramenta.

#### Como Configurar:

1. Crie um webhook em:
   - [Zapier](https://zapier.com) - Catch Hook
   - [Make.com](https://make.com) - Webhook trigger
   - [n8n](https://n8n.io) - Webhook node
   - [Pipedream](https://pipedream.com) - HTTP endpoint

2. Copie a URL do webhook gerada

3. Edite `js/lead-capture.js` na linha 8:

```javascript
const LEAD_CONFIG = {
    webhookUrl: 'https://hooks.zapier.com/hooks/catch/SEU_ID_AQUI/',
    // ...
};
```

4. Os dados serão enviados automaticamente neste formato:

```json
{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 98765-4321",
    "institution": "USP - Medicina",
    "timestamp": "2024-11-08T12:30:45.123Z",
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com"
}
```

#### Exemplos de Integração:

**Zapier:**
1. Webhook → Google Sheets
2. Webhook → Email (Gmail/Outlook)
3. Webhook → CRM (HubSpot, RD Station, ActiveCampaign)
4. Webhook → WhatsApp Business API
5. Webhook → Planilha Excel (OneDrive)

### 2️⃣ Google Sheets (API)

Enviar leads diretamente para uma planilha do Google Sheets.

#### Como Configurar:

1. Crie uma planilha no Google Sheets
2. Ative a Google Sheets API no [Google Cloud Console](https://console.cloud.google.com)
3. Crie uma chave de API
4. Configure em `js/lead-capture.js`:

```javascript
const LEAD_CONFIG = {
    googleSheetId: 'SEU_ID_DA_PLANILHA',
    googleApiKey: 'SUA_CHAVE_API',
    // ...
};
```

**Estrutura da Planilha:**
Crie uma aba chamada "Leads" com os cabeçalhos:
| Data/Hora | Nome | E-mail | Telefone | Instituição | Origem |
|-----------|------|--------|----------|-------------|--------|

### 3️⃣ Backend Próprio

Se você tem um backend, pode enviar os dados para sua API.

Edite a função `submitLeadData` em `js/lead-capture.js`:

```javascript
async function submitLeadData(data) {
    const response = await fetch('https://seu-backend.com/api/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SEU_TOKEN'
        },
        body: JSON.stringify(data)
    });
    
    return response.ok;
}
```

## 🔐 Segurança e Privacidade

- ✅ Dados criptografados em trânsito (HTTPS obrigatório em produção)
- ✅ Validação de email e telefone antes do envio
- ✅ Checkbox de consentimento obrigatório (LGPD compliant)
- ✅ Mensagem de privacidade visível
- ✅ Dados não compartilhados com terceiros

## 📊 Formato de Exportação CSV

Ao executar `exportLeads()`, um arquivo CSV é gerado com:

```csv
Data/Hora,Nome,E-mail,Telefone,Instituição,Origem
"2024-11-08T12:30:45.123Z","João Silva","joao@email.com","(11) 98765-4321","USP - Medicina","Direct"
```

Pode ser importado em:
- Excel
- Google Sheets
- CRM (HubSpot, Pipedrive, etc)
- Mailchimp
- Qualquer ferramenta de email marketing

## 🚀 Integrações Recomendadas

### Para E-mail Marketing:
1. **Zapier/Make** → Mailchimp/ActiveCampaign
2. Criar campanha de nutrição automática
3. Enviar sequência de emails com conteúdo ENEM

### Para CRM:
1. **Zapier/Make** → HubSpot/RD Station
2. Criar deal/oportunidade automaticamente
3. Atribuir para vendedor
4. Disparar WhatsApp automático

### Para WhatsApp:
1. **Zapier/Make** → API do WhatsApp Business
2. Enviar mensagem de boas-vindas
3. Oferecer suporte via chatbot
4. Lembrete sobre oferta com countdown

### Para Remarketing:
1. **Zapier/Make** → Facebook Custom Audiences
2. Criar público personalizado
3. Rodar anúncios direcionados
4. Aumentar taxa de conversão

## 🧪 Testando a Integração

1. Preencha o formulário no quiz
2. Abra o Console (F12)
3. Execute `viewLeads()` para ver os dados
4. Verifique se chegou no webhook/planilha configurado

## ⚙️ Configurações Avançadas

### Desabilitar Salvamento Local

Edite `js/lead-capture.js`:

```javascript
const LEAD_CONFIG = {
    saveLocally: false, // Não salvar no localStorage
    // ...
};
```

### Múltiplas Integrações Simultâneas

O sistema envia para **todas** as integrações configuradas:
- Webhook + Google Sheets
- Webhook + LocalStorage
- Todos ao mesmo tempo

### Rastreamento Personalizado

Os dados incluem:
- `userAgent`: Navegador/dispositivo usado
- `referrer`: De onde o visitante veio
- `timestamp`: Data/hora exata da captura

## 📞 Suporte

Para dúvidas sobre integração:
1. Consulte a documentação da ferramenta escolhida
2. Teste com `viewLeads()` no console
3. Verifique erros no console do navegador

## ✅ Checklist de Implementação

- [ ] Escolher método de integração (Webhook recomendado)
- [ ] Configurar webhook/API na ferramenta escolhida
- [ ] Editar `js/lead-capture.js` com as credenciais
- [ ] Testar preenchimento do formulário
- [ ] Verificar se dados chegaram no destino
- [ ] Configurar email de confirmação (opcional)
- [ ] Criar sequência de nutrição (opcional)
- [ ] Configurar remarketing (opcional)

---

**Desenvolvido para maximizar captura e conversão de leads! 🚀**

