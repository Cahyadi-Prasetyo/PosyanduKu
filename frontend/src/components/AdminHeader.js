import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Heart, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const AdminHeader = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('admin') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    toast.success('Berhasil logout');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5EEF7]" data-testid="admin-header">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center gap-2" data-testid="admin-header-logo">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-[#1674D1]" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Posyandu Admin
              </span>
            </div>
          </Link>

          {/* Admin Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm md:text-base font-semibold text-[#0B1020]">{adminData.nama || 'Admin'}</p>
              <p className="text-xs md:text-sm text-[#334155]">{adminData.role || 'Kader'}</p>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="h-10 md:h-12 px-4 text-sm md:text-base text-[#DC2626] hover:bg-[#FEE2E2] rounded-xl"
              data-testid="admin-logout-button"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
