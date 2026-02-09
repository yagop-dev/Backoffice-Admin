import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CommissionsPage from "./pages/CommissionsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full flex flex-col">
        <Header/>

        <main className="flex-1 w-full">
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/commissions" element={<CommissionsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
