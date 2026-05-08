import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import StartPage    from './components/StartPage';
import QuestionPage from './components/QuestionPage';
import CompletePage from './components/CompletePage';
import { submitAnswers } from './lib/submitAnswers';

const fade = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1 },
  exit:     { opacity: 0 },
};

export default function App() {
  const [page,       setPage]       = useState('start');
  const [answers,    setAnswers]    = useState({});
  const [submitDone, setSubmitDone] = useState(false);

  async function handleComplete(ans) {
    setAnswers(ans);
    setPage('complete');
    // 백그라운드에서 시트로 전송 (완료 화면 표시를 막지 않음)
    await submitAnswers(ans);
    setSubmitDone(true);
  }

  function handleRestart() {
    setAnswers({});
    setSubmitDone(false);
    setPage('start');
  }

  return (
    <AnimatePresence mode="wait">
      {page === 'start' && (
        <motion.div key="start" style={{ position: 'absolute', inset: 0 }} {...fade} transition={{ duration: 0.3 }}>
          <StartPage onStart={() => setPage('quiz')} />
        </motion.div>
      )}

      {page === 'quiz' && (
        <motion.div key="quiz" style={{ position: 'absolute', inset: 0 }} {...fade} transition={{ duration: 0.3 }}>
          <QuestionPage
            onComplete={handleComplete}
            onBack={() => setPage('start')}
          />
        </motion.div>
      )}

      {page === 'complete' && (
        <motion.div key="complete" style={{ position: 'absolute', inset: 0 }} {...fade} transition={{ duration: 0.3 }}>
          <CompletePage
            answers={answers}
            submitDone={submitDone}
            onRestart={handleRestart}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
