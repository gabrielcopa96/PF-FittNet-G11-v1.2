import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutLanding from "../Layout/LayoutLanding";
import Landing from "../views/Landing";
import LegendCe from "../components/LegendCe/LegendCe";
import LegendUf from "../components/LegendUf/LegendUf";

const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<LayoutLanding />}>
        <Route path="/" element={<Landing />} />
        <Route path="/legendCe" element={<LegendCe />} />
        <Route path="/legendUf" element={<LegendUf />} />
      </Route>
    </Routes>
  )
}

export default AppRouter;