import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataContext";
function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(dispatch);
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
}

export default ProtectedRoute;
