import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../Container/Container.jsx";
import CarCard from "../CardOfCar/CardOfCar.jsx";
import styles from "./ListCar.module.css";

import { fetchCars } from "../../redux/cars/operations.js";
import {
  selectIsLoadingInitial,
  selectIsLoadingMore,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors.js";
import { selectFilters } from "../../redux/filters/selectors.js";

export default function CarsList({ cars }) {
  const dispatch = useDispatch();

  const isFirstLoading = useSelector(selectIsLoadingInitial);
  const isExtraLoading = useSelector(selectIsLoadingMore);
  const filters = useSelector(selectFilters);
  const currentPage = useSelector(selectPage);
  const allPages = useSelector(selectTotalPages);

  useEffect(() => {
    if (!isExtraLoading && currentPage > 1) {
      requestAnimationFrame(() => {
        const elems = document.querySelectorAll(`.${styles.listItem}`);
        if (elems.length) {
          const lastElem = elems[elems.length - 1];
          const cardHeight = lastElem.offsetHeight;
          const offsetTop = lastElem.offsetTop;

          window.scrollTo({
            top: offsetTop - cardHeight * 2,
            behavior: "smooth",
          });
        }
      });
    }
  }, [cars, isExtraLoading, currentPage]);

  const pageNum = Number(currentPage);
  const totalNum = Number(allPages);

  return (
    <Container>
      <div className={styles.wrapper}>
        {isFirstLoading ? (
          <div className={styles.loaderBox}>
            <div className={styles.wheel}></div>
          </div>
        ) : cars.length === 0 ? (
          <p className={styles.empty}>Nothing found by your request</p>
        ) : (
          <ul className={styles.list}>
            {cars.map((car) => (
              <li key={car.id} className={styles.listItem}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        )}

        <div className={styles.btnWrapper}>
          {pageNum < totalNum && cars.length > 0 && (
            <button
              className={styles.loadBtn}
              onClick={() =>
                dispatch(fetchCars({ page: pageNum + 1, filters, limit: 12 }))
              }
            >
              {isExtraLoading ? (
                <div className={styles.btnWheel}></div>
              ) : (
                "Read More"
              )}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
