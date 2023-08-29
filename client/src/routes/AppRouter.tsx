import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
/* ------------------ LAYOUTS ------------------ */
import { MiddlewareLanding, MiddlewareOffUser, MiddlewareUserLogged } from "../middlewares";
/* ------------------ COMPONENTS AUTH / OFFUSER ------------------ */
import UpdatePasword from "../components/UpdatePassword/UpdatePassword";
import ResetPassword from "../components/UpdatePassword/ResetPassword";
import Activation from "../components/Activation/Activation";
import DeactivateAccount from "../components/DeactivateAccount/DeactivateAccount";
import Login from "../pages/Login";
import InitRegister from "../pages/InitRegister";
import TestingAtoms from "./TestingAtoms";
/* ------------------ COMPONENTS LANDING ------------------ */
const Landing = lazy(() => import("../pages/Landing"));
const LegendCe = lazy(() => import("../components/templates/LegendCe/LegendCe"));
const LegendUf = lazy(() => import("../components/templates/LegendUf/LegendUf"));
/* ------------------ COMPONENTS USER LOGGED ------------------ */
const Home = lazy(() => import("../pages/Home"));
const GymDetail = lazy(() => import("../components/GymDetail/GymDetail"));
const Profile = lazy(() => import("../pages/Profile"));
const FormUser = lazy(() => import("../components/Forms/FormUser"));
const UpdatePartner = lazy(() => import("../components/UpDatePartner/partner"));
const UpdateGym = lazy(() => import("../components/UpDatePartner/gym"));
const Services = lazy(() => import("../components/UpDatePartner/service"));
const GymsForUsersMap = lazy(() => import("../components/MapsAndGeo/GymsForUsers"));
const StripeCart = lazy(() => import("../components/StripeCart/StripeCart"));

/* ------------------ COMPONENT APP ROUTER ------------------ */
const AppRouter = (): JSX.Element => {
  /* ------------------ RENDER ------------------ */
  return (
    <Routes>
      {/* ROUTES LANDING */}
      <Route element={<MiddlewareLanding />}>
        <Route path="/" element={<Landing />} />
        <Route path="/legendCe" element={<LegendCe />} />
        <Route path="/legendUf" element={<LegendUf />} />
      </Route>
      {/* ROUTES AUTH OR OFFUSER */}
      <Route element={<MiddlewareOffUser />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<InitRegister />} />
        <Route path="/updatepassword/:userId" element={<UpdatePasword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/activation/:userId/:secretToken" element={<Activation />} />
        <Route path="/deactivate/:userId" element={<DeactivateAccount />} />
        {/* AFTER DELETE, ONLY TESTING OF ATOMS COMPONENTS */}
        <Route path="/test/atoms" element={<TestingAtoms />}/>
      </Route>
      {/* ROUTES USER LOGGED */}
      <Route element={<MiddlewareUserLogged />}>
        <Route path="/home/:type/:name/:userId/:avatar" element={<Home />} />
        <Route path="/detail/gym/:userId" element={<GymDetail />} />
        <Route path="/profile/:type/:name/:userId" element={<Profile />} />
        <Route path="/home/editprofile/:type/:name/:userId" element={<FormUser />} />
        <Route path="/profile/edit/partner/:name/:userId" element={<UpdatePartner />} />
        <Route path="/profile/edit/partner/:name/:userId/:gymId" element={<UpdateGym />} />
        <Route path="/profile/edit/partner/:name/:userId/gym/service" element={<Services />} />
        <Route path="/api/partner/gyms/gymbyid/:id" element={<GymDetail />} />
        <Route path="/home/:type/:name/:userId/:avatar/FormUser" element={<FormUser />} />
        <Route path="/home/:type/:name/:userId" element={<Home />} />
        <Route path="/maps" element={<GymsForUsersMap />} />
        <Route path="/stripe" element={<StripeCart />} />
        <Route path="/profile/partner/:name/:userId/gym" element={<UpdateGym />} />
        <Route path="/profile/partner/:name/:userId/gym/service" element={<Services />} />
      </Route>
    </Routes>
  )
}

export default AppRouter;