import { LayoutUser, LayoutLanding, LayoutOffUser } from "./Layout";
import InitRegister from "./views/InitRegister";
import Login from "./views/Login";
import "./App.css";
import AppRouter from "./routes/AppRouter";

const App = (): JSX.Element => <AppRouter />

export default App;
