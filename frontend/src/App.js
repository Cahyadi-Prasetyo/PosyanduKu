import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "@/App.css";

// Public Pages
import Home from "./pages/Home";
import JadwalPublic from "./pages/JadwalPublic";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJadwal from "./pages/admin/AdminJadwal";
import AdminPeserta from "./pages/admin/AdminPeserta";
import AdminLaporan from "./pages/admin/AdminLaporan";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jadwal" element={<JadwalPublic />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/jadwal" element={<ProtectedRoute><AdminJadwal /></ProtectedRoute>} />
          <Route path="/admin/peserta" element={<ProtectedRoute><AdminPeserta /></ProtectedRoute>} />
          <Route path="/admin/laporan" element={<ProtectedRoute><AdminLaporan /></ProtectedRoute>} />
          
          {/* Redirect admin to dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
