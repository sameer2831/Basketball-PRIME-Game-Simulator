import { TeamProvider } from './context/TeamContext';
import Home from './pages/Home';

function App() {
  return (
    <TeamProvider>
      <Home />
    </TeamProvider>
  );
}

export default App;