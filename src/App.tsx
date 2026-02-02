import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import CategorySelectionPage from './pages/CategorySelectionPage';

const App: React.FC = () => {

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/categories" element={<CategorySelectionPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
