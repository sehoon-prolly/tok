import { motion } from 'framer-motion';
import styles from './CompletePage.module.css';

export default function CompletePage({ answers, submitDone, onRestart }) {
  const email      = answers[30] || '';
  const university = answers[29] || '';
  const webhookSet = !!import.meta.env.VITE_SHEETS_WEBHOOK;

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.icon}>💌</div>

        <h2 className={styles.heading}>신청이 완료되었습니다!</h2>

        <div className={styles.infoCard}>
          <p className={styles.cardText}>
            <strong>매주 화요일 밤 9시</strong>,<br />
            당신의 메일함으로 '툭' 도착할 예정이에요.
          </p>
          {university && (
            <p className={styles.cardSub}>소속 대학교 : {university}</p>
          )}
          {email && (
            <p className={styles.cardSub}>결과 수신 이메일 : {email}</p>
          )}
        </div>

        <div className={styles.matchInfo}>
          <div className={styles.matchRow}>
            <span className={styles.matchLabel}>MATCH</span>
            <span className={styles.matchValue}>30가지 가치관 분석으로 찾은 '결'이 맞는 1명</span>
          </div>
          <div className={styles.matchRow}>
            <span className={styles.matchLabel}>TIME</span>
            <span className={styles.matchValue}>매주 화요일 밤 9시</span>
          </div>
        </div>

        {/* 저장 상태 표시 */}
        {webhookSet && (
          <motion.div
            className={`${styles.saveStatus} ${submitDone ? styles.saveOk : styles.savePending}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {submitDone ? '✓ 응답이 저장되었습니다.' : '⏳ 응답 저장 중...'}
          </motion.div>
        )}

        <p className={styles.note}>스팸 메일함도 꼭 확인해주세요 :)</p>

        <button className={styles.restartBtn} onClick={onRestart}>
          처음으로 돌아가기
        </button>

        <p className={styles.brand}>툭(TUK)</p>
      </motion.div>
    </div>
  );
}
