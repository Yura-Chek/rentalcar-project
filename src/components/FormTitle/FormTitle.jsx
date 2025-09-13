import styles from "./FormTitle.module.css";

export default function FormTitle() {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Book your car now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
    </div>
  );
}
