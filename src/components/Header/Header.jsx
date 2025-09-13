import Container from "../Container/Container.jsx";
import LogoCar from "../LogoCar/LogoCar.jsx";
import Navigate from "../Navigate/Navigate.jsx";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.wrapper}>
      <LogoCar />
      <Navigate />
    </header>
  );
}
