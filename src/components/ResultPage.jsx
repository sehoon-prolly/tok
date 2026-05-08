import { motion } from 'framer-motion';
import styles from './ResultPage.module.css';

const PRODUCT_URL = 'https://www.latpeed.com/products/ZwFj2';

export default function ResultPage({ result, onRestart }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `나의 여행 스타일은 "${result.title}"!`,
        text: result.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('링크가 복사되었습니다!');
      });
    }
  }

  return (
    <div className={styles.container} style={{ '--result-color': result.color }}>
      <div className={styles.bgDecor} style={{ background: result.bgGradient }} />

      <div className={styles.scrollArea}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Result header */}
          <div className={styles.resultHeader} style={{ background: result.bgGradient }}>
            <motion.div
              className={styles.resultEmoji}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              {result.emoji}
            </motion.div>
            <motion.p
              className={styles.resultLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              당신의 여행 스타일은
            </motion.p>
            <motion.h1
              className={styles.resultTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              {result.title}
            </motion.h1>
            <motion.p
              className={styles.resultSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {result.subtitle}
            </motion.p>
          </div>

          {/* Description */}
          <motion.div
            className={styles.descSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className={styles.descText}>{result.description}</p>
          </motion.div>

          {/* Tags */}
          <motion.div
            className={styles.tagsSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {result.tags.map((tag) => (
              <span
                key={tag}
                className={styles.resultTag}
                style={{ color: result.color, borderColor: result.color + '44', background: result.color + '11' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href={PRODUCT_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaBtn}
              style={{ background: result.bgGradient }}
              whileHover={{ scale: 1.03, boxShadow: `0 16px 48px ${result.color}55` }}
              whileTap={{ scale: 0.97 }}
            >
              자세히 보기 →
            </motion.a>

            <div className={styles.secondaryActions}>
              <motion.button
                className={styles.shareBtn}
                onClick={handleShare}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                공유하기 🔗
              </motion.button>
              <motion.button
                className={styles.restartBtn}
                onClick={onRestart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                다시 하기 🔄
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.credit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.1 }}
        >
          Made with Doda ♥
        </motion.p>
      </div>
    </div>
  );
}
