import { useDispatch, useSelector } from "react-redux";
import CarsList from "../../components/CarList/CarList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import { fetchBrands } from "../../redux/brands/operations.js";
import { fetchCars } from "../../redux/cars/operations.js";
import { useEffect } from "react";
import { selectBrands } from "../../redux/brands/selectors.js";
import { selectCars } from "../../redux/cars/selectors.js";

import { clearCars } from "../../redux/cars/slice.js";
import { setFilters } from "../../redux/filters/slice.js";

export default function CarsPage() {
  const availableBrands = useSelector(selectBrands);
  const carsData = useSelector(selectCars);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(setFilters({}));
    dispatch(clearCars());
    dispatch(fetchCars({ page: 1, filters: {}, limit: 12 }));
  }, [dispatch]);

  const priceOptionsList = [30, 40, 50, 60, 70, 80].map((p) => ({
    value: p,
    label: `${p}`,
  }));

  return (
    <div>
      <SearchBox brands={availableBrands} priceOptions={priceOptionsList} />
      <CarsList cars={carsData.cars} />
    </div>
  );
}
