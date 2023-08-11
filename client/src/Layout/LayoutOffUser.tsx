import { Route, Routes } from "react-router-dom";

import UserRegister from "../views/UserRegister";

import ClientRegister from "../views/ClientRegister";

import ResetPassword from "../components/UpdatePassword/ResetPassword";
import UpdatePasword from "../components/UpdatePassword/UpdatePassword";

import Activation from "../components/Activation/Activation";
import DeactivateAccount from "../components/DeactivateAccount/DeactivateAccount";

export const LayoutOffUser = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <Routes>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/user_register" element={<UserRegister />} />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/client_register" element={<ClientRegister />} />
            
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/updatepassword/:userId" element={<UpdatePasword />} />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/resetpassword" element={<ResetPassword />} />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/activation/:userId/:secretToken" element={<Activation />} />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Route path="/deactivate/:userId" element={<DeactivateAccount />} />
        </Routes>
    </>
  )
}

export default LayoutOffUser