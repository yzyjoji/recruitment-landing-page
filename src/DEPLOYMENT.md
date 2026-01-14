# 🚀 Quick Deployment Guide

## Step-by-Step: Deploy to GitHub Pages in 2 Minutes

### 1️⃣ Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Binance Futures CS Recruitment Website"

# Create a new repository on GitHub (https://github.com/new)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2️⃣ Update Configuration

**Edit `vite.config.ts`** - Change the base path:
```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/', // ⚠️ IMPORTANT: Change this to match your repo name
  // ... rest stays the same
});
```

**Edit `package.json`** - Update repository URL:
```json
"repository": {
  "url": "git+https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
}
```

### 3️⃣ Install Dependencies & Deploy

```bash
# Install dependencies
npm install

# Build and deploy to GitHub Pages
npm run deploy
```

### 4️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Under "Source", select **`gh-pages`** branch
5. Click **Save**

### 5️⃣ Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

⏱️ It may take 1-2 minutes for the first deployment.

---

## Alternative: Deploy to Vercel (Even Easier!)

### Option A: Via Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"**
4. Import your GitHub repository
5. Click **"Deploy"**
6. Done! ✅

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## Alternative: Deploy to Netlify

### Netlify Drop (Drag & Drop)

```bash
# Build your project
npm run build

# Go to https://app.netlify.com/drop
# Drag the 'dist' folder
# Done! ✅
```

### Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Troubleshooting

### ❌ Blank page after deployment?
- Make sure `base: '/YOUR_REPO_NAME/'` in `vite.config.ts` matches your repository name
- Check browser console for errors

### ❌ 404 errors?
- Verify the `base` path is correct
- Ensure GitHub Pages is enabled on `gh-pages` branch

### ❌ Changes not showing?
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Wait 1-2 minutes for GitHub Pages to update
- Check GitHub Actions tab for deployment status

---

## Need Custom Domain?

### GitHub Pages

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Add `CNAME` file to `/public` folder with your domain
3. Configure DNS records at your domain provider:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```
4. Go to GitHub repo Settings → Pages → Custom domain
5. Enter your domain and save

### Vercel

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🎉 That's It!

Your Binance Futures CS Recruitment website is now live!

**Share your deployment URL and start recruiting! 🚀**
