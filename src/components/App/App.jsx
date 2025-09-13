import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loyaut from "../Loyaut/Loyaut.jsx";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const CarsPage = lazy(() => import("../../pages/CarsPage/CarsPage.jsx"));
const CarsPageById = lazy(() =>
  import("../../pages/CarsPageById/CarsPageById.jsx")
);

export default function App() {
  return (
    <Loyaut>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarsPageById />} />
        </Routes>
      </Suspense>
    </Loyaut>
  );
}
