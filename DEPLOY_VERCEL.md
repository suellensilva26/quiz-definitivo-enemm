# ⚡ Deploy Automático na Vercel

> Este guia mostra como ativar o deploy contínuo do quiz NeuroHack ENEM na Vercel.  
> O workflow já está configurado (`.github/workflows/vercel-deploy.yml`). Você só precisa conectar o projeto na Vercel e adicionar três secrets no GitHub.

---

## ✅ Passo a passo rápido

1. **Criar conta na Vercel** (gratuita): https://vercel.com/signup  
2. **Importar o repositório** `suellensilva26/quiz-definitivo-enemm` para a Vercel  
3. **Copiar** os valores de `ORG_ID`, `PROJECT_ID` e `TOKEN`  
4. **Adicionar** no GitHub (Settings → Secrets → Actions)  
   - `VERCEL_ORG_ID`  
   - `VERCEL_PROJECT_ID`  
   - `VERCEL_TOKEN`  
5. **Fazer um commit/push** → o deploy roda automaticamente

---

## 🛠️ 1. Criando o Projeto na Vercel

1. Acesse https://vercel.com/dashboard  
2. Clique em **“Add New…” → “Project”**  
3. Selecione **“Import Git Repository”**  
4. Conecte sua conta do GitHub (se ainda não conectou)  
5. Escolha o repositório: **`quiz-definitivo-enemm`**  
6. Configurações:
   - **Framework Preset:** `Other` (site estático)
   - **Root Directory:** `/` (padrão)
   - **Build Command:** deixe em branco (não precisa build)
   - **Output Directory:** deixe em branco
7. Clique em **Deploy**  

> 🔁 Após a importação, copie o **Project ID** e o **Org ID**.  
> Eles ficam em *Settings → General → Project → IDs*.

---

## 🔑 2. Gerando o Token da Vercel

1. Acesse https://vercel.com/account/tokens  
2. Clique em **“Create Token”**  
3. Dê um nome (ex: `github-actions`)  
4. Copie o token gerado imediatamente (só aparece uma vez)

---

## 🔒 3. Adicionando Secrets no GitHub

No repositório **quiz-definitivo-enemm**:

1. Vá em **Settings → Secrets and variables → Actions**  
2. Clique em **“New repository secret”**  
3. Adicione os três secrets:

| Nome                | Valor (exemplo)                | Onde obter                          |
|---------------------|--------------------------------|-------------------------------------|
| `VERCEL_ORG_ID`     | `team_abc123XYZ`               | Vercel → Project → Settings → General |
| `VERCEL_PROJECT_ID` | `prj_123abcXYZ`                | Vercel → Project → Settings → General |
| `VERCEL_TOKEN`      | `VERCEL....`                   | https://vercel.com/account/tokens   |

---

## 🚀 4. Disparando o Deploy

1. Faça qualquer alteração no projeto
2. Rode:
   ```bash
   git add .
   git commit -m "chore: atualiza conteúdo"
   git push
   ```
3. Vá até **GitHub → Actions**  
4. Veja o workflow **“Deploy to Vercel”** rodando  
5. Ao final (✅), o site estará online em `https://SUA-URL.vercel.app`

---

## 🌐 Configurando Domínio Customizado (Opcional)

1. Vercel → Projeto → **Settings → Domains**  
2. Clique em **Add** e informe seu domínio  
3. Atualize os DNS do domínio apontando para a Vercel  
4. Aguarde a propagação (até 24h)

---

## ✅ Status do Workflow

Arquivo: `.github/workflows/vercel-deploy.yml`

```yaml
jobs:
  deploy:
    if: ${{ secrets.VERCEL_TOKEN != '' && secrets.VERCEL_ORG_ID != '' && secrets.VERCEL_PROJECT_ID != '' }}
    ...
```

> ℹ️ Se os secrets não existirem, o job é ignorado automaticamente (sem falhas).

---

## 🔁 Deploy manual (opcional)

Após configurar os secrets, você também pode rodar o workflow manualmente:

1. GitHub → Actions → “Deploy to Vercel”  
2. Clique em **“Run workflow”** → **Run**  

---

## 🧪 Testando localmente antes do deploy

```bash
cd "/home/usuario/quiz app"
python3 -m http.server 8000

# Acesse http://localhost:8000
```

---

## 📞 Suporte

- Documentação Vercel: https://vercel.com/docs
- Tokens Vercel: https://vercel.com/account/tokens
- Suporte GitHub Actions: https://docs.github.com/actions

---

**Pronto! Seu quiz agora pode ser publicado automaticamente tanto no GitHub Pages quanto na Vercel.** 🎉

