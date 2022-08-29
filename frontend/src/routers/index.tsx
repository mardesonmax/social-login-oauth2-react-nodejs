import { Route, Routes } from "react-router-dom";
import { AuthFacebook } from "../pages/auth/AuthFacebook";
import { AuthGoogle } from "../pages/auth/AuthGoogle";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<SignIn />} />
      <Route path="/auth/google" element={<AuthGoogle />} />
      <Route path="/auth/facebook" element={<AuthFacebook />} />
    </Routes>
  );
}
