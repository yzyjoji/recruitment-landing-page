# 🚀 Binance Futures Customer Service Recruitment Website

A visually stunning, highly interactive single-page recruitment website for Binance Futures Customer Service Agents. Features a dark theme with vibrant accents, live trading simulations, and engaging animations.

## ✨ Features

- **Authentic Binance Futures Interface** - Mimics the real trading platform
- **Live Candlestick Chart** - Continuously moving FD/USDT perpetual futures chart
- **Interactive Trading Buttons**:
  - **Long (Apply)** - Triggers 6-second price animation, PNL overlay, and rocket "to the moon" animation
  - **Short (Learn More)** - Shows cat slapping animation for "missing this opportunity"
- **Copy Trading Section** - Shows top gainers (somerandomchinesedude) and top losers (SL Onur - TR Quant-Hedging)
- **Auto-Rotating Notification Banner** - Displays hiring announcements
- **Complete Trading Panel** - Positions, Open Orders, Order History, and Assets tabs
- **Smooth Application Flow** - All recruitment buttons trigger the same application form

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4.0** - Utility-first styling
- **Motion (Framer Motion)** - Smooth animations
- **Recharts** - Trading charts and visualizations
- **Lightweight Charts** - Professional candlestick charts
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/binance-futures-recruitment.git
cd binance-futures-recruitment

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Update package.json** with your GitHub username:
```json
"repository": {
  "url": "git+https://github.com/YOUR_USERNAME/binance-futures-recruitment.git"
}
```

2. **Update vite.config.ts** with your repository name:
```typescript
export default defineConfig({
  base: '/binance-futures-recruitment/', // Change to your repo name
  // ... rest of config
});
```

3. **Deploy to GitHub Pages**:
```bash
# Build and deploy
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to Pages
   - Select `gh-pages` branch as source
   - Your site will be live at: `https://YOUR_USERNAME.github.io/binance-futures-recruitment/`

### Vercel (Alternative)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and deploy!

### Netlify (Alternative)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## 📁 Project Structure

```
/
├── components/
│   ├── ApplicationForm.tsx      # Job application form
│   ├── BinanceChart.tsx         # Main candlestick chart
│   ├── ChartSection.tsx         # Chart container with trading buttons
│   ├── CopyTradingSection.tsx   # Copy trading leaderboard
│   ├── NotificationBanner.tsx   # Auto-rotating announcements
│   ├── OrderBook.tsx            # Order book display
│   ├── PositionsPanel.tsx       # Trading positions/orders panel
│   ├── Sidebar.tsx              # Left navigation sidebar
│   ├── TopNav.tsx               # Top navigation bar
│   ├── TradingInterface.tsx     # Main trading interface
│   └── ui/                      # Reusable UI components
├── styles/
│   └── globals.css              # Global styles & Tailwind config
├── App.tsx                      # Root component
├── main.tsx                     # App entry point
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎨 Customization

### Colors
Edit `/styles/globals.css` to change the color scheme:
- Primary: Electric Blue (#0ECDF4)
- Success: Neon Green (#0ECB81)
- Warning: Gold (#F0B90B)
- Danger: Red (#F6465D)

### Trading Data
Edit trader data in `/components/CopyTradingSection.tsx`:
- `topGainers` array for successful traders
- `topLosers` array for unsuccessful traders

### Chart Symbol
Change the trading pair in `/components/ChartSection.tsx` and `/components/BinanceChart.tsx`

## 📝 Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Build and deploy to GitHub Pages
```

## 🌟 Key Interactive Features

1. **Long Button (Apply)**:
   - 6-second upward price animation
   - Transparent green PNL overlay showing profits
   - Rocket animation flying "to the moon"
   - Smooth transition to application form

2. **Short Button (Learn More)**:
   - Cat slapping animation
   - Warning message about missing opportunity
   - Links to more information

3. **Copy Trading**:
   - Toggle between Top Gainers and Top Losers
   - Detailed trader statistics
   - Call-to-action for CS recruitment

## ⚠️ Disclaimer

This is a recruitment website concept and is not affiliated with Binance. It's designed to showcase web development skills and create an engaging recruitment experience.

## 📄 License

MIT License - Feel free to use this project for your own recruitment pages!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made with 💛 for Binance Futures CS Recruitment**
