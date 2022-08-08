import { Routes, Route, Outlet } from 'react-router-dom'
import LegendCe from '../components/LegendCe/LegendCe'
import LegendUf from '../components/LegendUf/LegendUf'
import NavBar from '../components/NavBar/NavBar'
import Landing from '../views/Landing'

const MainLayoutLanding = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export const LayoutLanding = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayoutLanding />}>
          <Route path="/" element={<Landing />} />
          <Route path="/legendCe" element={<LegendCe />} />
          <Route path="/legendUf" element={<LegendUf />} />
        </Route>
      </Routes>
    </>
  )
}

export default LayoutLanding