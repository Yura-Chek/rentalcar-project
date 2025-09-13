import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CardOfCar.module.css";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";

import { selectFavoritos } from "../../redux/favorites/selectors.js";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice.js";

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritos);

  const isFav = favorites.some((item) => item.id === car.id);

  const handleFavorite = () => {
    isFav ? dispatch(removeFavorite(car)) : dispatch(addFavorite(car));
  };

  const [city, country] = car.address.split(",").slice(-2);
  const infoLine1 = `${city} | ${country} | ${car.rentalCompany} |`;
  const typeCar = car.type[0].toUpperCase() + car.type.slice(1).toLowerCase();
  const mileageCar = car.mileage.toLocaleString("uk-UA");
  const infoLine2 = `${typeCar} | ${mileageCar} km`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <button className={styles.favBtn} onClick={handleFavorite}>
          {isFav ? (
            <BsFillHeartFill color="#3470ff" />
          ) : (
            <BsHeart color="#fff" />
          )}
        </button>

        <img className={styles.image} src={car.img} alt={car.brand} />

        <div>
          <div className={styles.header}>
            <h3 className={styles.carTitle}>
              {car.brand} <span className={styles.highlight}>{car.model}</span>,{" "}
              {car.year}
            </h3>
            <p className={styles.priceTag}>${car.rentalPrice}</p>
          </div>
          <p className={`${styles.meta} ${styles.mb}`}>{infoLine1}</p>
          <p className={styles.meta}>{infoLine2}</p>
        </div>
      </div>

      <button
        className={styles.moreBtn}
        onClick={() => navigate(`/cars/${car.id}`)}
      >
        Read more
      </button>
    </div>
  );
}
