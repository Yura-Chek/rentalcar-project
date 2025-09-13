import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import css from "./Loyaut.module.css";

export default function Loyaut({ children }) {
  return (
    <div className={css.wrapper}>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
