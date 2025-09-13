import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./Input.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Input() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.success("You have successfully submitted your order");
    setName("");
    setEmail("");
    setComment("");
    setSelectedDate(null);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <>
      <form className={css.container} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          className={css.input}
          value={name}
          minLength={2}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email*"
          className={css.input}
          value={email}
          pattern="^[a-zA-Z0-9_\-+]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={css.colendarWrupper}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Booking date"
            dateFormat="d.MM.yyyy"
            minDate={today}
            className={css.input}
            calendarStartDay={1}
            formatWeekDay={(day) => day.slice(0, 3)}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className={css.headerCalendar}>
                <button
                  type="button"
                  onClick={decreaseMonth}
                  className={css.customArrow}
                >
                  <IoIosArrowBack color="#3470ff" size={20} />
                </button>
                <span className={css.span}>
                  {date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  type="button"
                  onClick={increaseMonth}
                  className={css.customArrow}
                >
                  <IoIosArrowForward color="#3470ff" size={20} />
                </button>
              </div>
            )}
          />
        </div>
        <textarea
          rows="5"
          placeholder="Comment"
          className={css.inputTextarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit" className={css.button}>
          Send
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
