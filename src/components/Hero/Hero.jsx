import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Find your perfect rental car</h1>
        <p className={styles.subheading}>
          Reliable and budget-friendly rentals for any journey
        </p>
      </div>
      <Link to="/catalog" className={styles.ctaBtn}>
        View Catalog
      </Link>
    </div>
  );
}
