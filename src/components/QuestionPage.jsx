import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/quizData';
import styles from './QuestionPage.module.css';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
};

export default function QuestionPage({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');

  const total = questions.length;
  const current = questions[step];
  const progress = (step / total) * 100;
  const scaleValue = answers[current.id] ?? null;

  function advance(newAnswers) {
    const ans = newAnswers ?? answers;
    if (step < total - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      onComplete(ans);
    }
  }

  function handleYesNo(value) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    setTimeout(() => advance(updated), 220);
  }

  function handleChoice(value) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    setTimeout(() => advance(updated), 220);
  }

  function handleScale(value) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  function handleNext() {
    if (current.type === 'email') {
      if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setEmailError('올바른 이메일 형식을 입력해주세요.');
        return;
      }
      const updated = { ...answers, [current.id]: emailValue };
      setAnswers(updated);
      advance(updated);
    } else {
      advance();
    }
  }

  function goBack() {
    if (step === 0) {
      onBack();
    } else {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  const showNextBtn = current.type === 'scale' || current.type === 'email';
  const scaleSelected = current.type === 'scale' && scaleValue !== null;
  const nextEnabled = current.type === 'email' ? true : scaleSelected;

  return (
    <div className={styles.container}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={styles.stepCount}>{step + 1}/{total}</span>
        <div className={styles.progressRow}>
          <button className={styles.backBtn} onClick={goBack} aria-label="뒤로">‹</button>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Slide area */}
      <div className={styles.slideArea}>
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className={styles.slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Watermark Q number */}
            <div className={styles.qLabel} aria-hidden>Q{step + 1}.</div>

            {/* Question */}
            <p className={styles.question}>{current.question}</p>

            {/* Scale type */}
            {current.type === 'scale' && (
              <div className={styles.scaleWrap}>
                <div className={styles.scaleDots}>
                  {Array.from({ length: current.max - current.min + 1 }, (_, i) => {
                    const val = current.min + i;
                    const active = scaleValue === val;
                    const filled = scaleValue !== null && val <= scaleValue;
                    return (
                      <motion.button
                        key={val}
                        className={`${styles.dot} ${filled ? styles.dotFilled : ''} ${active ? styles.dotActive : ''}`}
                        onClick={() => handleScale(val)}
                        whileTap={{ scale: 0.88 }}
                      >
                        {val}
                      </motion.button>
                    );
                  })}
                </div>
                {(current.minLabel || current.maxLabel) && (
                  <div className={styles.scaleLabels}>
                    <span>{current.minLabel}</span>
                    <span>{current.maxLabel}</span>
                  </div>
                )}
              </div>
            )}

            {/* Email type */}
            {current.type === 'email' && (
              <div className={styles.emailWrap}>
                <input
                  type="email"
                  className={`${styles.emailInput} ${emailError ? styles.inputError : ''}`}
                  placeholder={current.placeholder}
                  value={emailValue}
                  onChange={(e) => { setEmailValue(e.target.value); setEmailError(''); }}
                  autoComplete="email"
                />
                {emailError && <p className={styles.errorMsg}>{emailError}</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer buttons */}
      <div className={styles.btnArea}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`btns-${current.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className={styles.btnInner}
          >
            {/* Yes/No */}
            {current.type === 'yesno' && (
              <>
                <motion.button
                  className={`${styles.answerBtn} ${answers[current.id] === true ? styles.answerSelected : ''}`}
                  onClick={() => handleYesNo(true)}
                  whileTap={{ scale: 0.97 }}
                >
                  그렇다
                </motion.button>
                <motion.button
                  className={`${styles.answerBtn} ${answers[current.id] === false ? styles.answerSelected : ''}`}
                  onClick={() => handleYesNo(false)}
                  whileTap={{ scale: 0.97 }}
                >
                  아니다
                </motion.button>
              </>
            )}

            {/* Multiple choice */}
            {current.type === 'choice' && current.options.map((opt) => (
              <motion.button
                key={opt}
                className={`${styles.answerBtn} ${answers[current.id] === opt ? styles.answerSelected : ''}`}
                onClick={() => handleChoice(opt)}
                whileTap={{ scale: 0.97 }}
              >
                {opt}
              </motion.button>
            ))}

            {/* Next button (scale & email) */}
            {showNextBtn && (
              <motion.button
                className={`${styles.nextBtn} ${nextEnabled ? styles.nextEnabled : ''}`}
                onClick={handleNext}
                whileTap={nextEnabled ? { scale: 0.97 } : {}}
              >
                <span className={styles.nextArrow}>›</span>
                {step === total - 1 ? '제출하기' : '다음 문제'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
