import { Routes, Route, Outlet } from 'react-router-dom';

import GymDetail from "../components/GymDetail/GymDetail";
import Profile from "../views/Profile";
import FormUser from "../components/Forms/FormUser";
import NavBarProfile from "../components/NavBarProfile/NavBarProfile";
import UpdatePartner from "../components/UpDatePartner/partner";
import UpdateGym from "../components/UpDatePartner/gym";
import Services from "../components/UpDatePartner/service";
import StripeCart from "../components/StripeCart/StripeCart";
import Home from "../views/Home";
import GymsForUsersMap from "../components/MapsAndGeo/GymsForUsers";



const MainLayoutUser = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <NavBarProfile />
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <Outlet />
    </div>
  );
};

export const LayoutUser = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <Routes>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <Route element={<MainLayoutUser />}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/detail/gym/:userId" element={<GymDetail />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/:type/:name/:userId" element={<Profile />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/home/editprofile/:type/:name/:userId" element={<FormUser />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/edit/partner/:name/:userId" element={<UpdatePartner />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/edit/partner/:name/:userId/:gymId" element={<UpdateGym />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/edit/partner/:name/:userId/gym/service" element={<Services />}/>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/api/partner/gyms/gymbyid/:id" element={<GymDetail />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/home/:type/:name/:userId/:avatar/FormUser" element={<FormUser />}/>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/home/:type/:name/:userId" element={<Home />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/maps" element={<GymsForUsersMap />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/stripe" element={<StripeCart />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/partner/:name/:userId/gym" element={<UpdateGym />} />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Route path="/profile/partner/:name/:userId/gym/service" element={<Services />} />
        </Route>
      </Routes>
    </>
  )
}

export default LayoutUser