<div align="center">

# 🤖 make-your-own-ai-assistant

**Build your own AI-powered portfolio chatbot — free, serverless, deployed in 10 minutes.**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/erendogan83/make-your-own-ai-assistant?style=social)](https://github.com/erendogan83/make-your-own-ai-assistant/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/erendogan83/make-your-own-ai-assistant?style=social)](https://github.com/erendogan83/make-your-own-ai-assistant/fork)
[![Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Powered by Groq](https://img.shields.io/badge/AI-Groq_LLaMA_3.3_70B-00AA44?logo=meta&logoColor=white)](https://console.groq.com)

<br/>

**[🚀 Live Demo](https://eren-ai-assistant.pages.dev/) &nbsp;·&nbsp; [📖 Türkçe](#-türkçe-kurulum-rehberi) &nbsp;·&nbsp; [🐛 Issues](https://github.com/erendogan83/make-your-own-ai-assistant/issues) &nbsp;·&nbsp; [💬 Discussions](https://github.com/erendogan83/make-your-own-ai-assistant/discussions)**

<br/>

> *One config file. No backend. No credit card. Your AI assistant, live in minutes.*

</div>

---

## 🎬 See It In Action

> 💡 **[Try the live demo →](https://eren-ai-assistant.pages.dev/)**
> Ask it about research, projects, skills — or anything!

---

## ✨ Why Use This?

Most AI chatbot templates require paid hosting, complex backends, or leave API keys exposed in the browser. This project solves all three:

| Problem | This Solution |
|---------|--------------|
| 💸 Expensive hosting | GitHub Pages — **free forever** |
| 🔓 API keys exposed in browser | Cloudflare Worker proxy — **key stays secret** |
| 🖥️ Complex backend needed | Serverless Workers — **no server to manage** |
| 🤖 Weak AI models | Groq + LLaMA 3.3 70B — **state-of-the-art, free tier** |
| ⏱️ Days to set up | Edit one file + 3 commands — **under 10 minutes** |

---

## 🏗️ Architecture

```
User Browser ──────► GitHub Pages          (your static portfolio site)
                            │
                            │  POST /chat
                            ▼
                  Cloudflare Worker         (API key stored here, never in code)
                            │
                            │  Groq API call
                            ▼
                  LLaMA 3.3 70B             (Groq free tier · blazing fast)
```

**No server. No database. No monthly bill.**

---

## 📁 Project Structure

```
make-your-own-ai-assistant/
│
├── 📂 public/                     ← GitHub Pages serves this
│   ├── index.html                 ← Portfolio + chat UI
│   ├── css/style.css              ← Dark theme, responsive
│   └── js/
│       ├── config.js              ← ✏️  THE ONLY FILE YOU EDIT
│       └── app.js                 ← Chat logic (no need to touch)
│
├── 📂 cloudflare-workers/
│   ├── worker.js                  ← Groq API proxy (secure)
│   └── wrangler.toml              ← Worker config
│
└── 📂 .github/workflows/
    └── deploy.yml                 ← Auto-deploy to GitHub Pages on push
```

---

## 🚀 Setup Guide

### Step 1 — Fork & Clone

Click the **Fork** button at the top right, then:

```bash
git clone https://github.com/YOUR-USERNAME/make-your-own-ai-assistant.git
cd make-your-own-ai-assistant
```

---

### Step 2 — Edit `config.js` (The Only File You Touch)

Open **`public/js/config.js`** and fill in your details:

```js
const CONFIG = {
  owner: {
    name:       "Your Full Name",
    title:      "Graduate Student / Engineer / Researcher",
    university: "Your University",
    email:      "your@email.com",
    bio:        "A short bio about yourself...",
    avatar:     "👨‍💻",   // emoji or URL to a photo
  },
  research: {
    thesis: {
      title:    "Your Thesis Title",
      keywords: ["AI", "IoT", "Power Systems"],
      abstract: "Brief description of your research...",
      status:   "In Progress",
    },
  },
  projects: [
    {
      name:        "My Cool Project",
      description: "What it does...",
      tech:        ["Python", "ESP32", "React"],
      github:      "https://github.com/you/project",
    },
  ],
  skills: {
    programming: ["Python", "JavaScript", "MATLAB"],
    tools:       ["Git", "Docker", "Linux"],
  },
  social: {
    github:   "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    orcid:    "https://orcid.org/0000-0000-0000-0000",
  },
  chatbot: {
    name:     "AI Assistant",
    greeting: "Hi! I'm {owner}'s AI assistant. Ask me anything! 👋",
    suggestions: [
      "Tell me about your research",
      "What projects have you built?",
      "How can I contact you?",
    ],
  },
  // ← Update this after Step 4
  apiEndpoint: "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/chat",
};
```

> That's it for the frontend. Everything else is automated.

---

### Step 3 — Get a Free Groq API Key

1. Go to **[console.groq.com](https://console.groq.com)** → Sign up (free, no credit card)
2. **API Keys → Create API Key**
3. Copy the key — you'll use it in the next step

---

### Step 4 — Deploy the Cloudflare Worker

```bash
# 1. Install Wrangler (Cloudflare's CLI)
npm install -g wrangler

# 2. Login to Cloudflare (free account at cloudflare.com)
wrangler login

# 3. (Optional) Rename your worker in cloudflare-workers/wrangler.toml
#    name = "my-portfolio-bot"

# 4. Deploy
cd cloudflare-workers
wrangler deploy

# 5. Store your Groq key — it's encrypted, never appears in code
wrangler secret put GROQ_API_KEY
# → Paste your key when prompted
```

After deploy you'll see:
```
✅  Published: https://my-portfolio-bot.YOUR-SUBDOMAIN.workers.dev
```

Copy this URL and set it as `apiEndpoint` in `config.js`.

---

### Step 5 — Enable GitHub Pages

```bash
git add .
git commit -m "feat: configure my AI portfolio assistant"
git push
```

In your GitHub repo: **Settings → Pages → Source: GitHub Actions**

After ~1 minute:
```
https://YOUR-USERNAME.github.io/make-your-own-ai-assistant/
```

**Done. 🎉**

---

## 🆓 100% Free Stack

| Service | Free Tier | Ever Need to Pay? |
|---------|-----------|-------------------|
| GitHub Pages | Unlimited static hosting | ❌ No |
| Cloudflare Workers | 100,000 requests / day | ❌ No (personal use) |
| Groq API (LLaMA 3.3 70B) | ~100 requests / day | ❌ No (personal use) |

**Monthly cost: $0.00**

---

## 🔧 Customisation

**Change the AI model** in `cloudflare-workers/worker.js`:
```js
model: "llama-3.3-70b-versatile"
// Other free Groq models:
// "gemma2-9b-it"  |  "mixtral-8x7b-32768"  |  "llama-3.1-8b-instant"
```

**Change the color theme** in `public/css/style.css`:
```css
:root {
  --accent: #00d4ff;   /* change to your favourite color */
  --bg:     #0d1117;   /* dark background */
}
```

**The chatbot auto-detects language** — it replies in Turkish 🇹🇷 if the user writes in Turkish, and in English 🇬🇧 otherwise.

---

## 🧪 Local Testing

No build step required:

```bash
# Terminal 1 — serve the site
cd public
python3 -m http.server 8080

# Terminal 2 — run the worker locally
cd cloudflare-workers
wrangler dev
```

Set `apiEndpoint: "http://localhost:8787/chat"` in `config.js` while testing locally.

---

## 🛠️ Troubleshooting

| Symptom | Fix |
|---------|-----|
| "couldn't connect to AI" | Check `apiEndpoint` in `config.js` — must be exact Worker URL with `https://` |
| Worker returns 401 | Run `wrangler secret put GROQ_API_KEY` again |
| GitHub Pages blank page | Check **Actions** tab for deploy errors; confirm source is set to "GitHub Actions" |
| Mobile CORS error | Already handled in `worker.js` — check your Worker deployed successfully |

---

## 🤝 Contributing

All contributions welcome!

- 🐛 [Open an issue](https://github.com/erendogan83/make-your-own-ai-assistant/issues) for bugs
- 💡 [Start a discussion](https://github.com/erendogan83/make-your-own-ai-assistant/discussions) for feature ideas  
- 🔀 Submit a PR — all skill levels welcome

**Roadmap / good first issues:**
- [ ] Dark / light theme toggle
- [ ] Voice input (Web Speech API)
- [ ] One-click "Deploy to Cloudflare" button
- [ ] PDF resume download
- [ ] More language auto-detection (Arabic, German, French...)
- [ ] Typing animation for bot responses

---

## 🌍 Community Builds

Built your own version with this template? Share it in [Discussions](https://github.com/erendogan83/make-your-own-ai-assistant/discussions/categories/show-and-tell) — I'll feature it here!

---

## 📄 License

MIT © [Eren DOĞAN](https://github.com/erendogan83) — free to use, modify, and distribute.

**If this saved you time, a ⭐ star means a lot!**

---

---

## 🇹🇷 Türkçe Kurulum Rehberi

### Nedir Bu Proje?

Bu şablonla kendi AI portföy asistanınızı **tamamen ücretsiz** ve **10 dakikada** kurabilirsiniz. Sunucu gerekmez, aylık ücret yok, API key'iniz asla tarayıcıda görünmez.

**Kullanılan stack:**

- **GitHub Pages** → Statik site barındırma (ücretsiz, sınırsız)
- **Cloudflare Workers** → API key'i güvenle saklayan proxy (ücretsiz, günde 100K istek)
- **Groq API + LLaMA 3.3 70B** → AI yanıtları (ücretsiz tier, kart gerekmez)

---

### Adım 1 — Fork Et

Sayfanın sağ üstündeki **Fork** butonuna tıklayın, ardından klonlayın:

```bash
git clone https://github.com/KULLANICI-ADINIZ/make-your-own-ai-assistant.git
cd make-your-own-ai-assistant
```

---

### Adım 2 — `config.js` Dosyasını Düzenle

**`public/js/config.js`** dosyasını açın. **Sadece bu dosyayı düzenlemeniz yeterli:**

```js
owner: {
  name:       "Adınız Soyadınız",
  title:      "Elektrik-Elektronik Müh. Yüksek Lisans",
  university: "Gaziantep İslam Bilim ve Teknoloji Üniversitesi",
  email:      "email@adresiniz.com",
  bio:        "Kısa biyografiniz...",
  avatar:     "👨‍💻",
},
```

`research`, `projects`, `skills`, `social` alanlarını da kendinize göre doldurun.

---

### Adım 3 — Ücretsiz Groq API Key Al

1. **[console.groq.com](https://console.groq.com)** → Ücretsiz hesap aç (kart gerekmez)
2. **API Keys → Create API Key** → Key'i kopyala

---

### Adım 4 — Cloudflare Worker Kur

```bash
# Wrangler CLI kur
npm install -g wrangler

# Cloudflare hesabına giriş yap (cloudflare.com — ücretsiz)
wrangler login

# Worker'ı deploy et
cd cloudflare-workers
wrangler deploy

# Groq key'ini güvenle kaydet (kod içinde asla görünmez)
wrangler secret put GROQ_API_KEY
# → Key'inizi yapıştırın
```

Çıktıdaki URL'yi kopyalayıp `config.js` → `apiEndpoint` alanına yapıştırın.

---

### Adım 5 — GitHub Pages'i Etkinleştir

```bash
git add .
git commit -m "kendi portföy asistanım hazır"
git push
```

Repo'da **Settings → Pages → Source: GitHub Actions** seçin.

~1 dakika sonra:
```
https://KULLANICI-ADINIZ.github.io/make-your-own-ai-assistant/
```

---

### Maliyet

| Hizmet | Ücretsiz Limit | Ücret Gerekir mi? |
|--------|---------------|-------------------|
| GitHub Pages | Sınırsız | ❌ Hayır |
| Cloudflare Workers | Günde 100.000 istek | ❌ Hayır |
| Groq API | Günde ~100 istek | ❌ Hayır |

**Aylık maliyet: ₺0**

---

### Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| "couldn't connect to AI" | `config.js`'deki `apiEndpoint` URL'sini kontrol et |
| Worker 401 hatası | `wrangler secret put GROQ_API_KEY` komutunu tekrar çalıştır |
| Sayfa boş görünüyor | Repo'da **Actions** sekmesini kontrol et |

---

<div align="center">

**Beğendiyseniz ⭐ star atın ve 🔀 fork'layın — açık kaynak projeleri bu şekilde büyür!**

<br/>

[Eren DOĞAN](https://github.com/erendogan83) &nbsp;·&nbsp;
[LinkedIn](https://www.linkedin.com/in/eren-dogan27/) &nbsp;·&nbsp;
[X / Twitter](https://x.com/erendogan_tr) &nbsp;·&nbsp;
[ORCID](https://orcid.org/0009-0009-0430-3395)

</div>
