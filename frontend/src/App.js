import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import AddEditUser from "./components/AddEditUser";
import MeetTheTeam from "./pages/MeetTheTeam";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MeetTheTeam />} />
      <Route path="/admin" element={<UserListPage />} />
      <Route path="/edit/:id" element={<AddEditUser />} />
      <Route path="/add" element={<AddEditUser />} />
    </Routes>
  </Router>
);

export default App;
