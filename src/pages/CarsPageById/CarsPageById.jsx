import {
  BsCheckCircle,
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGear,
} from "react-icons/bs";

import { IoLocationOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container/Container.jsx";
import css from "./CarsPageById.module.css";
import Form from "../../components/Form/Form.jsx";

export default function CarsPageById() {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://car-rental-api.goit.global/cars/${id}`)
      .then((res) => setCarDetails(res.data));
  }, [id]);

  if (!carDetails) return <div>Loading...</div>;

  const shortId = carDetails.img.match(/\/(\d+)-ai\.jpg$/)[1];

  const [city, country] = carDetails.address.split(",").slice(-2);
  const mileage = carDetails.mileage.toLocaleString("uk-UA");
  const carType =
    carDetails.type.charAt(0).toUpperCase() +
    carDetails.type.slice(1).toLowerCase();

  return (
    <Container>
      <div className={css.pageContainer}>
        <div className={css.leftSection}>
          <img src={carDetails.img} className={css.carImage} />
          <div className={css.formWrapper}>
            <Form />
          </div>
        </div>
        <div className={css.rightSection}>
          <div className={css.description}>
            <h4 className={css.carTitle}>
              {carDetails.brand} {carDetails.model}, {carDetails.year}
              <span className={css.grayText}>Id: {shortId}</span>
            </h4>

            <div className={css.carMileage}>
              <div className={css.locationWrapper}>
                <IoLocationOutline />
                <p className={css.cityText}>
                  {city}, {country}
                </p>
              </div>
              <p className={css.cityText}>Mileage: {mileage} km</p>
            </div>
            <p className={css.price}>${carDetails.rentalPrice}</p>
            <p className={css.cityText}>{carDetails.description}</p>
          </div>

          <div className={css.options}>
            <h3 className={css.sectionTitle}>Rental Conditions:</h3>
            <ul className={`${css.optionList} ${css.marginBottomLarge}`}>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.rentalConditions[0]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.rentalConditions[2]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.rentalConditions[1]}</p>
              </li>
            </ul>

            <h3 className={css.sectionTitle}>Car Specifications:</h3>
            <ul className={`${css.optionList} ${css.marginBottomLarge}`}>
              <li className={css.optionItem}>
                <BsCalendar2Week />
                <p>Year: {carDetails.year}</p>
              </li>
              <li className={css.optionItem}>
                <BsCarFront />
                <p>Type: {carType}</p>
              </li>
              <li className={css.optionItem}>
                <BsFuelPump />
                <p>Fuel Consumption: {carDetails.fuelConsumption}</p>
              </li>
              <li className={css.optionItem}>
                <BsGear />
                <p>Engine Size: {carDetails.engineSize}</p>
              </li>
            </ul>

            <h3 className={css.sectionTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={css.optionList}>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.accessories[0]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.accessories[1]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.functionalities[1]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.functionalities[2]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.functionalities[0]}</p>
              </li>
              <li className={css.optionItem}>
                <BsCheckCircle />
                <p>{carDetails.accessories[2]}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
