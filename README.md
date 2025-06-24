# Basketball PRIME Game Simulator

This is a React-based NBA team matchup simulator app that lets you select players and simulate realistic basketball game scores.

---

## Features

- Select NBA players for two teams
- Simulate realistic game scores based on player stats
- Responsive UI built with React and Tailwind CSS
- Live deployment on GitHub Pages

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sameer2831/Basketball-PRIME-Game-Simulator.git
   cd Basketball-PRIME-Game-Simulator/nba-game-simulator
   
  bash```

2. Install   dependencies:
```bash
npm install
```

### Running Locally
   Start the development server:
   ```bash
    npm start
  ```
  Open http://localhost:3000 in your browser to view the app.

### Build & Deployment
Build the app
```bash
npm run build
```
This creates an optimized production build in the build/ folder.

### Deploy to GitHub Pages
You can deploy the app using the provided deploy script:
```
npm run deploy
```
This will build the app and push the output to the gh-pages branch, which GitHub Pages serves.

### GitHub Actions CI/CD
  This project uses GitHub Actions to automatically build and deploy the app on every push to the main branch.

  The workflow is defined in .github/workflows/deploy.yml.

## Project Structure
```
/
├── Data_script/          # Data scraping notebooks and CSV files
├── nba-game-simulator/   # React app source code
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow for deployment
└── README.md

```

## License
MIT License © Sameer Balkawade

## Contact
Sameer Balkawade



