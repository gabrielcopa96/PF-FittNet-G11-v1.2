import { Routes, Route, Outlet, RouteObject } from 'react-router-dom'
import LegendCe from '../components/LegendCe/LegendCe'
import LegendUf from '../components/LegendUf/LegendUf'
import NavBar from '../components/NavBar/NavBar'
import Landing from '../views/Landing'
import { JSXElementConstructor, ReactElement } from 'react'

export const LayoutLanding = (): ReactElement<JSXElementConstructor<HTMLElement>> => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default LayoutLanding;