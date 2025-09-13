import { NavLink } from "react-router-dom";
import styles from "./Navigate.module.css";

export default function Navigate() {
  return (
    <nav className={styles.navbar}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
        to="/catalog"
      >
        Catalog
      </NavLink>
    </nav>
  );
}
