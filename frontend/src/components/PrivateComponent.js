import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");

  return auth ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateComponent;

// import React from "react";
// import { Navigate ,Outlet} from "react-router-dom";
// import SignUp from "./SignUp";

// const PrivateComponent=()=>{
//     const auth=localStorage.getItem("user");
//     // if data then outlet dikhe else redirect to SignUp page
//     return auth?<Outlet/> : <Navigate to="/signup"/>
// }

// export default PrivateComponent
