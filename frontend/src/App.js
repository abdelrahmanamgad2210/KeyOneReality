import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import AddEditUser from "./components/AddEditUser";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar title="CRM System" />
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/edit/:id" element={<AddEditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
