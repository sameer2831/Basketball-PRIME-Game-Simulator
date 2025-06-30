# 🏀 Basketball PRIME Game Simulator

Welcome to **Basketball PRIME** — an interactive NBA game simulator where you draft your dream teams and let stats-driven matchups decide the winner! Whether you're curious about how legends from different eras stack up, or just want to visualize simulated NBA showdowns, this app brings basketball strategy and stats to life.

[🌐 Live Demo](https://sameer2831.github.io/Basketball-PRIME-Game-Simulator/)

---

## 🚀 Why I Built This

As a basketball enthusiast and software developer, I wanted to create a simulator that blends **player performance analytics** with a fun, visual experience. The goal? To simulate **realistic games** using **real-world stats** — and let fans explore endless “What If” scenarios like LeBron vs MJ, prime Shaq vs Jokic, and more.

---

## ✨ Key Features

🔹 **Draft Your Teams**  
Pick real NBA players for Team A and Team B from a curated stats-backed roster.

🔹 **Simulate Realistic Games**  
Games play out with quarter-by-quarter scoring, performance variance, and stat-based outcomes.

🔹 **Top Performers & Game Charts**  
Each game shows key player contributions, stat charts, and MVPs based on impact.

🔹 **Best-of-7 Series Mode**  
Simulate entire playoff-style series and track game-by-game momentum.

🔹 **Modern UI**  
Built with **React + Tailwind CSS** for a sleek, responsive, and animated experience.

🔹 **GitHub Pages Deployment + CI/CD**  
Auto-deploys using GitHub Actions every time a change hits the main branch.

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| **Python, Pandas, BeautifulSoup, Jupyter Notebook** | Data Scraping |
| **React** | Frontend framework |
| **Tailwind CSS** | Utility-first styling |
| **Chart.js** | In-game player stat charts |
| **Framer Motion** | Animations & transitions |
| **GitHub Actions** | CI/CD pipeline for auto-deploy |
| **GitHub Pages** | Hosting |

---

## 📊 Data Scraping Tech Stack

NBA player stats were collected using:

- **🔍 BeautifulSoup (Python)** – to scrape advanced stats from Basketball Reference and other sources.
- **📊 Pandas** – for data cleaning, transformation, and CSV generation.
- **📓 Jupyter Notebooks** – to document, visualize, and preprocess datasets before using them in the app.

Scraping scripts and preprocessed data can be found in the [`Data_script/`](./Data_script/) folder.

---

## 📁 Project Structure

```
/
├── Data_script/ # Data scraping notebooks and CSV player stats
├── nba-game-simulator/ # React app source code
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── ...
├── .github/
│ └── workflows/
│ └── deploy.yml # CI/CD workflow
└── README.md

```

---

## 🧪 Getting Started

### 📦 Prerequisites
- Node.js (v16+)
- npm

### 🔧 Installation

```bash
git clone https://github.com/sameer2831/Basketball-PRIME-Game-Simulator.git
cd Basketball-PRIME-Game-Simulator/nba-game-simulator
npm install
```

### 🚴‍♂️ Running Locally
```
npm start
```
  Then visit http://localhost:3000 in your browser.

### 🏗️ Build & Deploy
To create an optimized production build:
```
npm run build
```

### 📤 Deploy to GitHub Pages
```
npm run deploy
```
  This pushes the built app to the gh-pages branch, served via GitHub Pages.

## 🔁 Continuous Deployment
Automated deployment is powered by GitHub Actions. Every push to main triggers:

- Lint & Build

- Deploy to GitHub Pages

Workflow: .github/workflows/deploy.yml

---

## 📜 License
MIT License © Sameer Balkawade

## 📬 Contact
Have suggestions, feedback, or NBA debates to share?

** Sameer Balkawade **
📧 sameerbalkawade2831@gmail.com
🌐 [LinkedIn](https://www.linkedin.com/in/sameer-balkawade/) | [GitHub](https://github.com/sameer2831)

## 🏁 Let the Simulated Madness Begin!
Build your dream teams. Simulate the impossible. Let the stats settle the debate.

---

Let me know if you'd like [visual badges](f), [demo GIFs](f), or [project logo suggestions](f) for the README!
