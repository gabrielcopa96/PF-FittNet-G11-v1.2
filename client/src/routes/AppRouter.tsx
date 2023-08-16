import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayoutLanding } from "../Layout/LayoutLanding";
const Landing = lazy(() => import("../views/Landing"));
const LegendCe = lazy(() => import("../components/LegendCe/LegendCe"));
const LegendUf = lazy(() => import("../components/LegendUf/LegendUf"));


const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<MainLayoutLanding />}>
        <Route path="/" element={<Landing />} />
        <Route path="/legendCe" element={<LegendCe />} />
        <Route path="/legendUf" element={<LegendUf />} />
      </Route>
    </Routes>
  )
}

export default AppRouter;