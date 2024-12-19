import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRouter() {
  const { userInfo, fileUrl } = useContext(UserContext);

  const location = useLocation();
  console.log(userInfo);
  if (!userInfo.email && !fileUrl) {
    console.log("is it");
    return <Navigate to={"/login"} />;
  }

  if (userInfo && !fileUrl && location.pathname == "/main") {
    return <Navigate to={"/"} />;
  }

  console.log(location.pathname);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PrivateRouter;
