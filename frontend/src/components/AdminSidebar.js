import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, testId: 'sidebar-dashboard' },
    { path: '/admin/jadwal', label: 'Kelola Jadwal', icon: CalendarDays, testId: 'sidebar-jadwal' },
    { path: '/admin/peserta', label: 'Peserta', icon: Users, testId: 'sidebar-peserta' },
    { path: '/admin/laporan', label: 'Laporan', icon: BarChart3, testId: 'sidebar-laporan' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E5EEF7] min-h-[calc(100vh-5rem)]" data-testid="admin-sidebar">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  data-testid={item.testId}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base md:text-lg font-medium transition-colors",
                    isActive
                      ? "bg-[#EAF3FF] text-[#1674D1]"
                      : "text-[#334155] hover:bg-[#F5FAFD]"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
