import styles from './fire.module.scss';

const PARTS = 30;

export default function Fire({ className, style }) {
  return (
    <div className={`${styles.fire} ${className ?? ''}`} style={style}>
      {Array.from({ length: PARTS }).map((_, i) => (
        <div key={i} className={styles.particle} />
      ))}
    </div>
  );
}