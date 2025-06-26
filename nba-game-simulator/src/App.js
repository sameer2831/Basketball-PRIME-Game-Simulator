import { TeamProvider } from './context/TeamContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


import SimulationPage from './pages/SimulationPage';
import LandingPage from './pages/LandingPage';
// example page

function App() {
  return (
    <TeamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/simulator" element={<SimulationPage />} />
        </Routes>
      </Router>
    </TeamProvider>
  );
}

export default App;
