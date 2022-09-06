import { Route, Routes } from "react-router-dom";
import { Clients } from "./pages/Clients";
import { ClientsV0 } from "./pages/ClientsV0";
import { Projects } from "./pages/Projects";
import { SignUp } from "./pages/SignUp";
import { Users } from "./pages/Users";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/clients/v0" element={<ClientsV0 />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/users" element={<Users />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}
