import { Link } from "react-router-dom";
import styles from "./LogoCar.module.css";

export default function LogoCar() {
  return (
    <Link className={styles.wrapper} to="/">
      <span className={styles.brand}>
        <span className={styles.brandMain}>Rental</span>
        <span className={styles.brandAccent}>Car</span>
      </span>
    </Link>
  );
}
