import { Outlet, Await } from 'react-router-dom';
import NavBarProfile from "../components/NavBarProfile/NavBarProfile";
import { Suspense } from 'react';
import Loading from '../components/atoms/Loading/Loading';

export const MiddlewareUserLogged = () => {
  return (
    <Suspense
      fallback={<Loading />}
    >
      <Await
        resolve={async () => {
          await import('../views/Home');
          await import('../views/Profile');
          await import('../components/Forms/FormUser');
          await import('../components/NavBarProfile/NavBarProfile');
          await import('../components/UpDatePartner/partner');
          await import('../components/UpDatePartner/gym');
          await import('../components/UpDatePartner/service');
          await import('../components/StripeCart/StripeCart');
          await import('../components/MapsAndGeo/GymsForUsers');
        }}
        children={() => (
          <>
            <NavBarProfile />
            <Outlet />
          </>
        )}
      />
    </Suspense>
  )
}

export default MiddlewareUserLogged;