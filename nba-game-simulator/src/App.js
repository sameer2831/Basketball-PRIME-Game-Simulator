import { TeamProvider } from './context/TeamContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// example page

function App() {
  return (
    <TeamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
         
        </Routes>
      </Router>
    </TeamProvider>
  );
}

export default App;
