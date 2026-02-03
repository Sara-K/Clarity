import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CategorySelectionPage from './pages/CategorySelectionPage';
import TopicsSelectionPage from './pages/TopicsSelectionPage';
import FeedPage from './pages/FeedPage';

const App: React.FC = () => {

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<CategorySelectionPage />} />
          <Route path="/topics" element={<TopicsSelectionPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
