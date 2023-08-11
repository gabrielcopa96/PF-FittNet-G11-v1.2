import { Routes, Route, Outlet } from 'react-router-dom'
import LegendCe from '../components/LegendCe/LegendCe'
import LegendUf from '../components/LegendUf/LegendUf'
import NavBar from '../components/NavBar/NavBar'
import Landing from '../views/Landing'

const MainLayoutLanding = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <NavBar />
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <Outlet />
    </div>
  );
};

export const LayoutLanding = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <Routes>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <Route element={<MainLayoutLanding />}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/" element={<Landing />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/legendCe" element={<LegendCe />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/legendUf" element={<LegendUf />} />
        </Route>
      </Routes>
    </>
  )
}

export default LayoutLanding