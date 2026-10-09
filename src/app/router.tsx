import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Brief } from "@/pages/Brief";
import CarsPage from "@/features/cars/pages/cars-page";
import NewCarPage from "@/features/cars/pages/new-car-page";

/**
 * Add routes for your own pages here. `/` is the brief; you are free to move
 * it to `/brief` and put your work on `/`.
 */
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CarsPage />} />
      <Route path="cars/new" element={<NewCarPage />} />
      <Route path="/brief" element={<Brief />} />
    </Routes>
  </BrowserRouter>
);
