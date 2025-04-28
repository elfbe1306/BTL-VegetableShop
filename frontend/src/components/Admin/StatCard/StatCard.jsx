import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      <div className={styles.content}>
        <span className={styles.title}>
          <Icon size={20} className={styles.icon} style={{ color }} />
          {name}
        </span>
        <p className={styles.value}>{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
