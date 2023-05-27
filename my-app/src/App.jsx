// import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./page/authPage/Dashboard/Dashboard.jsx";
// import Patient from "./page/authPage/patient/Patient";
// import Doctor from "./page/authPage/Doctor/Doctor";
import HomePage from "./page/HomePage/HomePage.jsx";
import NotFound from "./page/NotFoundPage/NotFound";
import { useDispatch, useSelector } from "react-redux";
import Request from "./page/request/Request";
import Chat from "./page/ById/Chat";
import { useEffect } from "react";
import { myAccount } from "./redux/accountSlice/accountSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.account);
  useEffect(() => {
    dispatch(myAccount());
  }, [isAuth, dispatch]);

  // const myData = useSelector((state) => state.account.myUser);

  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};
// const RestrictedRoutes = () => {
//   const { isAuth } = useSelector((state) => state.auth);
//   return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
// };
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NotFound />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<Request />} />
            <Route path="/request/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
