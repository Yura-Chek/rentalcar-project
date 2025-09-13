import styles from "./SearchBox.module.css";
import { BsChevronDown } from "react-icons/bs";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operations.js";
import { setFilters } from "../../redux/filters/slice.js";
import { selectFilters } from "../../redux/filters/selectors.js";
import { selectCars, selectTotalCars } from "../../redux/cars/selectors.js";
import { useEffect } from "react";

export default function SearchBox({ brands, priceOptions }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const cars = useSelector(selectCars);
  const totalCars = useSelector(selectTotalCars);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCars({ page: 1, filters: filters, limit: 12 }));
  };

  useEffect(() => {
    if (cars.cars.length === totalCars) {
      dispatch(
        setFilters({
          brand: null,
          price: null,
          minMileage: null,
          maxMileage: null,
        })
      );
    }
  }, [dispatch, cars, totalCars]);

  const handleBrandChange = (value) =>
    dispatch(setFilters({ ...filters, brand: value ? value.value : null }));

  const handlePriceChange = (value) =>
    dispatch(
      setFilters({ ...filters, price: value ? Number(value.value) : null })
    );

  const handleMinMileageChange = (e) => {
    const val = e.target.value.replace(/,/g, "").slice(0, 6);
    dispatch(setFilters({ ...filters, minMileage: val ? Number(val) : null }));
  };

  const handleMaxMileageChange = (e) => {
    const val = e.target.value.replace(/,/g, "").slice(0, 6);
    dispatch(setFilters({ ...filters, maxMileage: val ? Number(val) : null }));
  };

  const formatNumber = (num) => {
    if (!num) return "";
    const raw = num.toString().replace(/,/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <label className={styles.label}>
            Car brand
            <Select
              components={{ DropdownIndicator }}
              value={
                filters.brand
                  ? { value: filters.brand, label: filters.brand }
                  : null
              }
              onChange={handleBrandChange}
              options={brands.map((b) => ({ value: b, label: b }))}
              placeholder="Choose a brand"
              classNamePrefix="custom-select"
              isSearchable={false}
              styles={selectStyles}
            />
          </label>

          <label className={styles.label}>
            Price/ 1 hour
            <Select
              components={{ DropdownIndicator }}
              value={
                filters.price
                  ? { value: filters.price, label: filters.price }
                  : null
              }
              onChange={handlePriceChange}
              options={priceOptions}
              placeholder="Choose a price"
              formatOptionLabel={(option, { context }) =>
                context === "menu" ? option.label : `To $${option.label}`
              }
              classNamePrefix="custom-select"
              isSearchable={false}
              styles={selectStyles}
            />
          </label>

          <label className={styles.labelMileage}>
            Сar mileage / km
            <div className={styles.mileageWrapper}>
              <div className={styles.inputGroup}>
                <span className={styles.from}>From</span>
                <input
                  type="text"
                  className={`${styles.inputLeft} ${styles.noSpin}`}
                  value={formatNumber(filters.minMileage)}
                  onChange={handleMinMileageChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.to}>To</span>
                <input
                  type="text"
                  className={`${styles.inputRight} ${styles.noSpin}`}
                  value={formatNumber(filters.maxMileage)}
                  onChange={handleMaxMileageChange}
                />
              </div>
            </div>
          </label>

          <button type="submit" className={styles.submitBtn}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

const DropdownIndicator = (props) => {
  const open = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <BsChevronDown
        style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.8s ease",
          fontSize: 16,
          color: "#101828",
        }}
      />
    </components.DropdownIndicator>
  );
};

const selectStyles = {
  control: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 204,
    height: 44,
    borderRadius: 12,
    background: "#f7f7f7",
    outline: "none",
    border: "none",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "125%",
    color: "#101828",
    boxShadow: "none",
  }),
  valueContainer: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 112,
    padding: "0 24px 0 16px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    background: "#fff",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "125%",
    color: "#8d929a",
    border: "1px solid #f7f7f7",
    marginTop: 4,
    paddingTop: 10,
    paddingBottom: 10,
    boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
    zIndex: 10,
  }),
  menuList: (base) => ({
    ...base,
    borderRadius: 12,
    background: "#fff",
    "::-webkit-scrollbar": { width: "8px" },
    "::-webkit-scrollbar-button": { display: "none" },
    "::-webkit-scrollbar-thumb": {
      background: "#dadde1",
      borderRadius: "10px",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isSelected ? "#101828" : "#8d929a;",
    cursor: "pointer",
    padding: "4px 18px",
    "&:active": { backgroundColor: "#fff" },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#101828",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingLeft: 0,
    paddingRight: 16,
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};
