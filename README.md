# 🧠 Quiz Neurológico ENEM - NeuroHack

[![Deploy Status](https://github.com/suellensilva26/quiz-definitivo-enemm/actions/workflows/deploy.yml/badge.svg)](https://github.com/suellensilva26/quiz-definitivo-enemm/actions)
[![Live Demo](https://img.shields.io/badge/demo-online-success)](https://suellensilva26.github.io/quiz-definitivo-enemm/)

Quiz interativo mobile-first que identifica o perfil neurológico de vestibulandos e gera urgência para compra do app NeuroHack ENEM.

## 🌐 Site ao Vivo

**[👉 Acesse o Quiz Aqui](https://suellensilva26.github.io/quiz-definitivo-enemm/)**

## 📋 Características

- ✅ Design mobile-first responsivo
- ✅ 8 perguntas estratégicas de identificação
- ✅ Sistema de pontuação inteligente
- ✅ 4 perfis de resultado personalizados
- ✅ Animações e micro-interações suaves
- ✅ Tracking completo (Google Analytics, Facebook Pixel, Hotjar)
- ✅ Timer de urgência dinâmico
- ✅ CTA otimizado para conversão

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Ou sirva via servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. Acesse `http://localhost:8000`

## 📊 Sistema de Captura de Leads

O quiz agora captura dados dos usuários **antes** de iniciar:
- ✅ Nome completo
- ✅ E-mail
- ✅ WhatsApp (com máscara automática)
- ✅ Instituição/Curso desejado
- ✅ Data/hora e origem do tráfego

### Visualizar Leads Capturados

Abra `visualizar-leads.html` no navegador para:
- Ver todos os leads em formato de tabela
- Exportar para CSV ou JSON
- Filtrar e buscar leads
- Ver estatísticas (hoje, semana, total)

### Integrar com Ferramentas Externas

Consulte os arquivos de documentação:
- `INTEGRACAO_LEADS.md` - Guia completo de integrações
- `exemplo-webhook-zapier.md` - Tutorial passo a passo do Zapier

**Integrações disponíveis:**
- Webhook (Zapier, Make.com, n8n)
- Google Sheets
- CRM (HubSpot, RD Station)
- Email Marketing (Mailchimp, ActiveCampaign)
- WhatsApp Business API

## 📁 Estrutura de Arquivos

```
quiz-neurohack/
├── index.html              # Página principal
├── styles/
│   ├── main.css           # Estilos principais
│   ├── animations.css     # Animações
│   └── responsive.css     # Media queries
├── js/
│   ├── quiz.js            # Lógica do quiz
│   ├── results.js         # Sistema de resultados
│   ├── animations.js      # Funções de animação
│   └── tracking.js        # Analytics e tracking
├── data/
│   └── questions.json     # Perguntas do quiz
└── assets/
    ├── icons/
    ├── images/
    └── sounds/
```

## 🎨 Design System

### Cores
- **Primária**: #000000 (preto absoluto)
- **Secundária**: #FFD700 (dourado vibrante)
- **Accent**: #FFA500 (laranja dourado)
- **Background**: Linear gradient #1a1a1a to #000000
- **Texto**: #FFFFFF (branco)
- **Danger**: #FF6B6B (vermelho suave)
- **Success**: #4ECDC4 (verde água)

### Tipografia
- **Fonte**: Poppins (Google Fonts)
- **Título Quiz**: 700, 28px
- **Perguntas**: 600, 22px
- **Opções**: 400, 18px
- **Resultados**: 800, 24px

## 📊 Perfis de Resultado

1. **Risco Baixo (0-150 pontos)**: Cérebro Otimizado
2. **Risco Médio (151-350 pontos)**: Cérebro em Alerta
3. **Risco Alto (351-550 pontos)**: Cérebro em Pânico
4. **Risco Crítico (551-700 pontos)**: Cérebro Procrastinador Extremo

## 🔧 Configuração de Tracking

Edite o arquivo `js/tracking.js` e configure:

```javascript
const TRACKING_CONFIG = {
    googleAnalytics: {
        enabled: true,
        trackingId: 'UA-XXXXXXXXX-X' // Seu ID aqui
    },
    facebookPixel: {
        enabled: true,
        pixelId: 'XXXXXXXXXXXXXXX' // Seu ID aqui
    },
    hotjar: {
        enabled: true,
        siteId: 0000000 // Seu ID aqui
    }
};
```

## 📱 Responsividade

- **Mobile**: 320px - 767px (mobile-first)
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Touch devices**: Otimizado para gestos

## 🎯 Funcionalidades

### Quiz
- Progress bar animada
- Transições suaves entre perguntas
- Partículas douradas ao selecionar
- Vibração no mobile
- Tracking de tempo por pergunta

### Resultados
- Gráfico circular de risco
- Timer de urgência (24h)
- Números dinâmicos (compras/vagas)
- CTA destacado com animação
- Copy personalizada por perfil

### Animações
- Fade in/out
- Slide transitions
- Pulse effects
- Shake animations
- Typewriter effect
- Loading spinners

## 🔒 Segurança

- Rate limiting (max 3 tentativas/IP)
- Sanitização de inputs
- SSL obrigatório em produção
- GDPR compliance ready

## 📈 Otimizações

- Lazy loading de imagens
- Preload das próximas perguntas
- Cache de resultados
- Compressão de assets
- PWA capabilities (pronto para implementar)

## 🛠️ Personalização

### Alterar Perguntas
Edite `data/questions.json` para modificar as perguntas e pontuações.

### Alterar Perfis
Edite `js/results.js` para modificar os perfis, cores e mensagens.

### Alterar Design
Edite os arquivos em `styles/` para personalizar cores, fontes e layout.

## 📝 Licença

Este projeto foi desenvolvido para fins comerciais.

## 🚨 Notas Importantes

- Configure os IDs de tracking antes de usar em produção
- Teste em diferentes dispositivos e navegadores
- Implemente rate limiting no backend
- Configure SSL/HTTPS em produção
- Adicione validação de formulários se necessário
- Implemente a integração real com checkout/pagamento

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ para maximizar conversões e identificar perfis neurológicos de vestibulandos.

