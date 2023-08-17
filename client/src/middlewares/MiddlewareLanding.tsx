import { Suspense } from 'react';
import { Outlet, Await } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Loading from '../components/atoms/Loading/Loading';

export const MiddlewareLanding = (): JSX.Element => {
  return (
    <Suspense
      fallback={<Loading />}
    >
      <Await
        resolve={async () => {
          await import('../components/LegendCe/LegendCe');
          await import('../components/LegendUf/LegendUf');
          await import('../components/NavBar/NavBar');
          await import('../pages/Landing');
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

export default MiddlewareLanding;