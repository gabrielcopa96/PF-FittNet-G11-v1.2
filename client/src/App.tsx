import { LayoutUser, LayoutLanding, LayoutOffUser } from "./Layout";
import { Route, Routes } from "react-router-dom";
import InitRegister from "./views/InitRegister";
import Login from "./views/Login";
import "./App.css";
import { type JSXElementConstructor, type ReactElement } from "react";


function App(): ReactElement<JSXElementConstructor<HTMLElement>> {
  return (
    <>
      <LayoutLanding />
      <LayoutUser />
      <LayoutOffUser />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<InitRegister />} />
      </Routes>
    </>
  );
}

export default App;
