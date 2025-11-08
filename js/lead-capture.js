// ============================================
// NEUROHACK QUIZ - LEAD CAPTURE SYSTEM
// ============================================

// Configuração do sistema de captura
const LEAD_CONFIG = {
    // Webhook para enviar dados (exemplo: Zapier, Make.com, n8n, etc)
    webhookUrl: '', // Adicione sua URL de webhook aqui
    
    // Google Sheets API (opcional)
    googleSheetId: '', // ID da planilha
    googleApiKey: '', // Chave da API
    
    // Configurações gerais
    saveLocally: true, // Salvar no navegador durante desenvolvimento
    validatePhone: true,
    validateEmail: true
};

let leadData = null;

// Inicializar captura de lead
document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.getElementById('lead-form');
    const phoneInput = document.getElementById('lead-phone');
    
    if (leadForm) {
        leadForm.addEventListener('submit', handleLeadSubmit);
    }
    
    // Máscara de telefone
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
        phoneInput.addEventListener('blur', validatePhoneNumber);
    }
    
    // Validação de email em tempo real
    const emailInput = document.getElementById('lead-email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmailAddress);
    }
});

// Formatar telefone com máscara
function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/^(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
        } else if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    e.target.value = value;
}

// Validar número de telefone
function validatePhoneNumber(e) {
    const value = e.target.value.replace(/\D/g, '');
    const input = e.target;
    
    if (value.length < 10 || value.length > 11) {
        input.setCustomValidity('Por favor, insira um número de telefone válido');
        input.classList.add('invalid');
    } else {
        input.setCustomValidity('');
        input.classList.remove('invalid');
    }
}

// Validar endereço de email
function validateEmailAddress(e) {
    const email = e.target.value;
    const input = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        input.setCustomValidity('Por favor, insira um e-mail válido');
        input.classList.add('invalid');
    } else {
        input.setCustomValidity('');
        input.classList.remove('invalid');
    }
}

// Processar envio do formulário
async function handleLeadSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-lead-btn');
    const originalText = submitBtn.textContent;
    
    // Desabilitar botão
    submitBtn.disabled = true;
    submitBtn.textContent = 'PROCESSANDO...';
    
    // Coletar dados do formulário
    const formData = new FormData(e.target);
    leadData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        institution: formData.get('institution'),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
    };
    
    try {
        // Enviar dados
        const success = await submitLeadData(leadData);
        
        if (success) {
            // Tracking
            if (typeof trackEvent === 'function') {
                trackEvent('lead_captured', {
                    name: leadData.name,
                    institution: leadData.institution
                });
            }
            
            // Armazenar dados do lead globalmente
            window.leadInfo = leadData;
            
            // Avançar para o quiz
            showScreen('start-screen');
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            throw new Error('Falha ao enviar dados');
        }
    } catch (error) {
        console.error('Erro ao processar lead:', error);
        alert('Ocorreu um erro ao processar seus dados. Por favor, tente novamente.');
        
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Enviar dados do lead
async function submitLeadData(data) {
    const promises = [];
    
    // 1. Salvar localmente (desenvolvimento)
    if (LEAD_CONFIG.saveLocally) {
        saveLeadLocally(data);
    }
    
    // 2. Enviar para Webhook
    if (LEAD_CONFIG.webhookUrl) {
        promises.push(sendToWebhook(data));
    }
    
    // 3. Enviar para Google Sheets
    if (LEAD_CONFIG.googleSheetId && LEAD_CONFIG.googleApiKey) {
        promises.push(sendToGoogleSheets(data));
    }
    
    // Se não houver nenhuma integração configurada, apenas simular sucesso
    if (promises.length === 0) {
        console.log('Lead capturado (desenvolvimento):', data);
        return true;
    }
    
    // Aguardar todas as requisições
    try {
        await Promise.all(promises);
        return true;
    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        // Mesmo com erro, continua (dados já foram salvos localmente)
        return true;
    }
}

// Salvar lead localmente (localStorage)
function saveLeadLocally(data) {
    try {
        // Obter leads existentes
        const existingLeads = JSON.parse(localStorage.getItem('neurohack_leads') || '[]');
        
        // Adicionar novo lead
        existingLeads.push(data);
        
        // Salvar de volta
        localStorage.setItem('neurohack_leads', JSON.stringify(existingLeads));
        
        console.log('Lead salvo localmente:', data);
        console.log('Total de leads:', existingLeads.length);
    } catch (error) {
        console.error('Erro ao salvar lead localmente:', error);
    }
}

// Enviar para Webhook (Zapier, Make.com, n8n, etc)
async function sendToWebhook(data) {
    if (!LEAD_CONFIG.webhookUrl) return;
    
    try {
        const response = await fetch(LEAD_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Webhook error: ${response.status}`);
        }
        
        console.log('Lead enviado para webhook com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao enviar para webhook:', error);
        throw error;
    }
}

// Enviar para Google Sheets
async function sendToGoogleSheets(data) {
    if (!LEAD_CONFIG.googleSheetId || !LEAD_CONFIG.googleApiKey) return;
    
    try {
        // Implementar integração com Google Sheets API
        // Documentação: https://developers.google.com/sheets/api/quickstart/js
        
        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${LEAD_CONFIG.googleSheetId}/values/Leads!A1:append?valueInputOption=RAW&key=${LEAD_CONFIG.googleApiKey}`;
        
        const values = [[
            data.timestamp,
            data.name,
            data.email,
            data.phone,
            data.institution,
            data.referrer
        ]];
        
        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values })
        });
        
        if (!response.ok) {
            throw new Error(`Google Sheets error: ${response.status}`);
        }
        
        console.log('Lead enviado para Google Sheets com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao enviar para Google Sheets:', error);
        throw error;
    }
}

// Função para exportar leads (desenvolvimento)
function exportLeads() {
    try {
        const leads = JSON.parse(localStorage.getItem('neurohack_leads') || '[]');
        
        if (leads.length === 0) {
            console.log('Nenhum lead para exportar');
            return;
        }
        
        // Criar CSV
        const headers = ['Data/Hora', 'Nome', 'E-mail', 'Telefone', 'Instituição', 'Origem'];
        const rows = leads.map(lead => [
            lead.timestamp,
            lead.name,
            lead.email,
            lead.phone,
            lead.institution,
            lead.referrer
        ]);
        
        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        // Download do arquivo
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `neurohack_leads_${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`${leads.length} leads exportados com sucesso`);
    } catch (error) {
        console.error('Erro ao exportar leads:', error);
    }
}

// Função para visualizar leads no console
function viewLeads() {
    try {
        const leads = JSON.parse(localStorage.getItem('neurohack_leads') || '[]');
        console.table(leads);
        console.log(`Total de leads: ${leads.length}`);
        return leads;
    } catch (error) {
        console.error('Erro ao visualizar leads:', error);
        return [];
    }
}

// Função para limpar leads (desenvolvimento)
function clearLeads() {
    if (confirm('Tem certeza que deseja limpar todos os leads salvos localmente?')) {
        localStorage.removeItem('neurohack_leads');
        console.log('Leads limpos com sucesso');
    }
}

// Exportar funções para uso no console
window.exportLeads = exportLeads;
window.viewLeads = viewLeads;
window.clearLeads = clearLeads;

// Exibir instruções no console
console.log(`
%c🧠 NEUROHACK QUIZ - Sistema de Captura de Leads

%cFunções disponíveis no console:
- viewLeads()     : Visualizar todos os leads capturados
- exportLeads()   : Exportar leads para CSV
- clearLeads()    : Limpar todos os leads salvos

%cConfiguração de Integrações:
Edite o arquivo js/lead-capture.js e configure:
1. webhookUrl: URL do seu webhook (Zapier, Make.com, etc)
2. googleSheetId e googleApiKey: Para integração com Google Sheets

Durante o desenvolvimento, os leads são salvos automaticamente no localStorage.
`, 
'color: #FFD700; font-size: 16px; font-weight: bold;',
'color: #4ECDC4; font-size: 12px;',
'color: #FFA500; font-size: 11px;'
);

