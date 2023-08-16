import { Routes, Route, Outlet } from 'react-router-dom'
import LegendCe from '../components/LegendCe/LegendCe'
import LegendUf from '../components/LegendUf/LegendUf'
import NavBar from '../components/NavBar/NavBar'
import Landing from '../views/Landing'
import { JSXElementConstructor, ReactElement } from 'react'

export const MainLayoutLanding = (): ReactElement<JSXElementConstructor<HTMLElement>> => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export const LayoutLanding = (): ReactElement<JSXElementConstructor<HTMLElement>> => {
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

export default LayoutLanding;