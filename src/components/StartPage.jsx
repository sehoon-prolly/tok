import { motion } from 'framer-motion';
import styles from './StartPage.module.css';

export default function StartPage({ onStart }) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>TUK(툭)</h1>
        <p className={styles.subtitle}>매주 화요일, 당신의 운명의 상대 한 명을 알려드립니다.</p>

        <div className={styles.infoBox}>
          <p className={styles.infoHeading}>[대학생 전용 : 가까운 곳에서 찾는 인연]</p>
          <p className={styles.infoRow}>
            <strong>TARGET</strong> : 오직 한양대 · 성균관대 · 경희대 학생만
          </p>
          <p className={styles.infoRow}>
            <strong>MATCH</strong> : 30가지 가치관 분석으로 찾은 '결'이 맞는 1명
          </p>
          <p className={styles.infoRow}>
            <strong>TIME</strong> : 매주 화요일 밤 9시, 당신의 메일함으로 '툭'
          </p>
          <p className={styles.brand}>툭(TUK)</p>
        </div>
      </motion.div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45, ease: 'easeOut' }}
      >
        <button className={styles.startBtn} onClick={onStart}>
          <span className={styles.arrow}>›</span>
          시작하기
        </button>
      </motion.div>
    </div>
  );
}
