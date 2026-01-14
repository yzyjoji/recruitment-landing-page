# ⚡ QUICK START - Deploy in 60 Seconds

## 🎯 You Only Need To:

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Update ONE Line
Open `vite.config.ts` and change:
```typescript
base: '/YOUR_REPO_NAME/',  // ← Put your actual repo name here
```

### 3. Deploy
```bash
npm install
npm run deploy
```

### 4. Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Select **`gh-pages`** branch
- Click **Save**

### ✅ DONE!
Your site is live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 🔥 Even Faster: Vercel (30 Seconds)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repo
5. Click "Deploy"

**That's it!** No configuration needed for Vercel.

---

## 📦 What's Included

✅ Fully configured Vite project  
✅ All dependencies listed in package.json  
✅ Build scripts ready  
✅ TypeScript configured  
✅ Tailwind CSS 4.0 setup  
✅ GitHub Pages deployment script  
✅ .gitignore file  
✅ Professional README  

## 🆘 Problems?

- **Blank page?** → Check `base: '/YOUR_REPO_NAME/'` matches your repo name exactly
- **Still issues?** → Try Vercel instead (it's easier!)

---

**You're literally 3 commands away from deployment! 🚀**
