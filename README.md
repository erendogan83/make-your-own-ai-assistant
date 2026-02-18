# 🤖 make-your-own-chatbot

**Free, open-source AI portfolio chatbot** — deploy in under 10 minutes using GitHub Pages + Cloudflare Workers + Groq API. No backend servers, no monthly fees.

**🇹🇷 Türkçe açıklama aşağıda.**

---

## ✨ Features

- 💬 AI-powered chat about your research, projects, and skills
- 🆓 100% free stack (GitHub Pages + Cloudflare free tier + Groq free tier)
- 🔒 API key never exposed to the browser (Cloudflare Worker proxy)
- 🌐 Bilingual — auto-detects Turkish / English from user input
- 📱 Mobile-responsive dark theme
- ⚡ Zero build step — pure HTML/CSS/JS

---

## 🗂️ Project Structure

```
make-your-own-chatbot/
├── public/                   ← GitHub Pages serves this folder
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── config.js         ← ✏️  ONLY FILE YOU NEED TO EDIT
│       └── app.js
├── cloudflare-workers/
│   ├── worker.js             ← Groq API proxy (deployed to Cloudflare)
│   └── wrangler.toml
└── .github/workflows/
    └── deploy.yml            ← Auto-deploys public/ to GitHub Pages
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Fork & Clone

1. Click **Fork** on this repo.
2. Clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/make-your-own-chatbot.git
cd make-your-own-chatbot
```

---

### Step 2 — Edit `config.js` (Your Personal Info)

Open `public/js/config.js` and fill in your own data:

```js
const CONFIG = {
  owner: {
    name:       "Your Full Name",
    title:      "Graduate Student in EEE",
    university: "Your University",
    email:      "your@email.com",
    bio:        "Write a short bio here...",
    avatar:     "👨‍💻",   // emoji or link to profile photo
  },
  // ... add your projects, skills, thesis, etc.
```

> **That's it for the frontend.** You only touch this one file.

---

### Step 3 — Get a Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com) and sign up (free).
2. Click **API Keys → Create API Key**.
3. Copy the key — you'll need it in Step 5.

> Groq's free tier gives you ~100 requests/day on Llama 3.3 70B — plenty for a portfolio chatbot.

---

### Step 4 — Deploy the Cloudflare Worker

#### 4a. Install Wrangler CLI

```bash
npm install -g wrangler
```

#### 4b. Login to Cloudflare

```bash
wrangler login
```

A browser tab will open. Sign in (or create a free account at [dash.cloudflare.com](https://dash.cloudflare.com)).

#### 4c. Edit worker name (optional)

Open `cloudflare-workers/wrangler.toml` and change the name:

```toml
name = "my-portfolio-chatbot"   # rename this to something unique
```

#### 4d. Deploy the worker

```bash
cd cloudflare-workers
wrangler deploy
```

You'll see output like:

```
✅  Published my-portfolio-chatbot.YOUR-SUBDOMAIN.workers.dev
```

Copy that URL — you need it next.

#### 4e. Set your Groq API key as a secret

```bash
wrangler secret put GROQ_API_KEY
```

Paste your Groq key when prompted. This stores it securely — it will **never** appear in your code.

---

### Step 5 — Connect Frontend to Worker

Back in `public/js/config.js`, update the endpoint:

```js
apiEndpoint: "https://my-portfolio-chatbot.YOUR-SUBDOMAIN.workers.dev/chat",
```

---

### Step 6 — Enable GitHub Pages

1. Push your changes:

```bash
git add .
git commit -m "Configure my portfolio chatbot"
git push
```

2. In your GitHub repo go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. The `deploy.yml` workflow runs automatically on every push to `main`.
5. After ~1 minute, your site is live at:

```
https://YOUR-USERNAME.github.io/make-your-own-chatbot/
```

---

## 🧪 Test Locally (Optional)

No build needed — just open the HTML file:

```bash
# Option 1: Python
cd public && python3 -m http.server 8080

# Option 2: Node
npx serve public
```

Then open `http://localhost:8080`.

> The chatbot won't work locally until you set `apiEndpoint` in config.js. For local Worker testing, run `wrangler dev` in the `cloudflare-workers/` folder and set the endpoint to `http://localhost:8787/chat`.

---

## 🔧 Customisation Tips

| What | Where |
|------|--------|
| Name, bio, avatar | `public/js/config.js` → `owner` |
| Research / thesis | `config.js` → `research` |
| Projects | `config.js` → `projects` |
| Skills | `config.js` → `skills` |
| Chat suggestions | `config.js` → `chatbot.suggestions` |
| Colors / fonts | `public/css/style.css` → `:root` variables |
| AI model | `cloudflare-workers/worker.js` → `model` field |

---

## 🆓 Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| GitHub Pages | Unlimited static hosting |
| Cloudflare Workers | 100,000 requests/day |
| Groq API | ~100 req/day (Llama 3.3 70B) |

All limits are very generous for a personal portfolio site.

---

## 🛠️ Troubleshooting

**Chat says "couldn't connect to AI"**
- Check `apiEndpoint` in `config.js` — make sure it matches your Worker URL exactly.
- Open browser DevTools → Console to see the error.

**Worker returns 401**
- Your Groq key may not be set. Run `wrangler secret put GROQ_API_KEY` again.

**GitHub Pages shows old version**
- Wait 1-2 min and hard-refresh. Check Actions tab for build status.

---

## 📄 License

MIT — use it, fork it, build on it.

---

---

# 🇹🇷 Türkçe Kurulum Rehberi

## Genel Bakış

Bu proje ile kendi AI portföy chatbot'unuzu **tamamen ücretsiz** olarak kurabilirsiniz:

- **GitHub Pages** → statik site barındırma (ücretsiz)
- **Cloudflare Workers** → API key'i gizleyen proxy (ücretsiz)
- **Groq API** → Llama 3.3 70B ile AI yanıtları (ücretsiz tier)

---

## Adım Adım Kurulum

### Adım 1 — Repoyu Fork Et

1. Bu sayfanın sağ üstündeki **Fork** butonuna tıklayın.
2. Kendi bilgisayarınıza klonlayın:

```bash
git clone https://github.com/KULLANICI-ADINIZ/make-your-own-chatbot.git
cd make-your-own-chatbot
```

---

### Adım 2 — `config.js` Dosyasını Düzenle

`public/js/config.js` dosyasını açın ve **kendi bilgilerinizi** girin:

```js
owner: {
  name:       "Adınız Soyadınız",
  title:      "Elektrik-Elektronik Müh. Yüksek Lisans",
  university: "Üniversitenizin Adı",
  email:      "email@adresiniz.com",
  bio:        "Kısa biyografiniz...",
  avatar:     "👨‍💻",
},
```

Ayrıca projelerinizi, tezinizi, becerilerinizi ve sosyal medya linklerinizi de doldurun.

> **Sadece bu dosyayı düzenlemeniz yeterli.**

---

### Adım 3 — Ücretsiz Groq API Key Al

1. [console.groq.com](https://console.groq.com) adresine gidin, ücretsiz hesap açın.
2. **API Keys → Create API Key** butonuna tıklayın.
3. Key'i kopyalayın, 5. adımda kullanacaksınız.

---

### Adım 4 — Cloudflare Worker Kur

#### 4a. Wrangler CLI Kur

```bash
npm install -g wrangler
```

#### 4b. Cloudflare'e Giriş Yap

```bash
wrangler login
```

Açılan tarayıcı sekmesinde [cloudflare.com](https://dash.cloudflare.com) hesabınızla giriş yapın (ücretsiz hesap yeterli).

#### 4c. Worker'ı Deploy Et

```bash
cd cloudflare-workers
wrangler deploy
```

Deploy tamamlandığında şöyle bir URL görürsünüz:

```
✅  my-portfolio-chatbot.SUBDOMAIN-ADINIZ.workers.dev
```

Bu URL'yi kopyalayın.

#### 4d. Groq API Key'ini Gizli Olarak Kaydet

```bash
wrangler secret put GROQ_API_KEY
```

Sorulduğunda Groq key'inizi yapıştırın. Bu key **kod içinde asla görünmez**, Cloudflare'de güvenli saklanır.

---

### Adım 5 — Frontend'i Worker'a Bağla

`public/js/config.js` dosyasında şu satırı güncelleyin:

```js
apiEndpoint: "https://my-portfolio-chatbot.SUBDOMAIN-ADINIZ.workers.dev/chat",
```

---

### Adım 6 — GitHub Pages'i Etkinleştir

1. Değişiklikleri push edin:

```bash
git add .
git commit -m "Kendi portföy chatbotumu yapılandırdım"
git push
```

2. GitHub repo sayfanızda **Settings → Pages** bölümüne gidin.
3. **Source** olarak **GitHub Actions** seçin.
4. Yaklaşık 1 dakika sonra siteniz yayında:

```
https://KULLANICI-ADINIZ.github.io/make-your-own-chatbot/
```

---

## Özelleştirme

| Ne | Nerede |
|----|--------|
| İsim, biyografi | `config.js` → `owner` |
| Tez bilgileri | `config.js` → `research` |
| Projeler | `config.js` → `projects` |
| Beceriler | `config.js` → `skills` |
| Hızlı soru butonları | `config.js` → `chatbot.suggestions` |
| Renkler | `style.css` → `:root` değişkenleri |

---

## Sorun Giderme

**"couldn't connect to AI" hatası:**
→ `config.js` içindeki `apiEndpoint` URL'sini kontrol edin. Worker URL'siyle birebir aynı olmalı.

**Worker 401 hatası:**
→ `wrangler secret put GROQ_API_KEY` komutunu tekrar çalıştırın.

**GitHub Pages eski sürümü gösteriyor:**
→ 1-2 dakika bekleyin ve Ctrl+F5 ile sayfayı yenileyin. Repo'da Actions sekmesini kontrol edin.

---

## Lisans

MIT — dilediğiniz gibi kullanabilir, fork edebilir, geliştirebilirsiniz.
