import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpaceBackground from './components/SpaceBackground';
import Dashboard from './pages/Dashboard';
import AnalysisResult from './pages/AnalysisResult';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        {/* The background is OUTSIDE the Routes, so it never re-renders */}
        <SpaceBackground />

        {/* The content is INSIDE the Routes */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/analysis" element={<AnalysisResult />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;