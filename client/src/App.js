import ButtonScrollTop from "./Configs/ButtonScrollTop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RouterApp from "./Routers/RouterApp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./Layouts/Header";
import "./App.css";
function App() {
  return (
    <div className="bg-white dark:bg-bgThemeUI dark:text-textThemeUI">
      <GoogleOAuthProvider clientId="816753771109-v8q4mjv1fu82ak2s6piha2o144a6g8gc.apps.googleusercontent.com">
        <ToastContainer />
        <Header></Header>
        <RouterApp></RouterApp>
        <ButtonScrollTop></ButtonScrollTop>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
