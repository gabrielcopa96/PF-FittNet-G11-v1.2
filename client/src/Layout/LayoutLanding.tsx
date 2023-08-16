import { Suspense } from 'react';
import { Outlet, Await } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Loading from '../helpers/Loading/Loading';

export const LayoutLanding = (): JSX.Element => {
  return (
    <Suspense
      fallback={<Loading />}
    >
      <Await
        resolve={async () => {
          await import('../components/LegendCe/LegendCe');
          await import('../components/LegendUf/LegendUf');
          await import('../components/NavBar/NavBar');
          await import('../views/Landing');
        }}
        children={() => (
          <>
            <NavBar />
            <Outlet />
          </>
        )}
      />
    </Suspense>
  );
};

export default LayoutLanding;