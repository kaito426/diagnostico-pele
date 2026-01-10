import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import ResultPage from './components/ResultPage';
import AdminPanel from './components/AdminPanel';
import { calculateSkinType } from './utils/skinLogic';

type View = 'landing' | 'quiz' | 'result' | 'admin';

function App() {
  const [view, setView] = useState<View>('landing');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Check for admin URL
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView('admin');
    }
  }, []);

  // Preload Google Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('quiz');
  };

  const handleQuizFinish = (collectedAnswers: Record<number, string>) => {
    setAnswers(collectedAnswers);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('result');
  };

  const handleBackToLanding = () => {
    setView('landing');
    setAnswers({});
  };

  const skinType = calculateSkinType(answers);

  return (
    <div className="font-sans text-gray-800 antialiased selection:bg-pink-brand selection:text-white">
      {view === 'landing' && <LandingPage onStart={handleStart} />}
      {view === 'quiz' && <Quiz onFinish={handleQuizFinish} onBack={handleBackToLanding} />}
      {view === 'result' && <ResultPage skinType={skinType} />}
      {view === 'admin' && <AdminPanel />}
    </div>
  );
}

export default App;
