import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilterPage } from "../view/pages/Filter";
import { MainLayout } from "../view/layouts/Main";


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<FilterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
