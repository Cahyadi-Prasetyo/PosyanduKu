import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import { CalendarDays, Users, BarChart3, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const actionCards = [
    {
      icon: CalendarDays,
      title: 'Kelola Jadwal',
      desc: 'Tambah, ubah, dan hapus jadwal Posyandu',
      color: '#1674D1',
      bgColor: '#EAF3FF',
      path: '/admin/jadwal',
      testId: 'dashboard-kelola-jadwal-card'
    },
    {
      icon: Users,
      title: 'Peserta',
      desc: 'Kelola data peserta dan registrasi',
      color: '#34C6A3',
      bgColor: '#E8F7F2',
      path: '/admin/peserta',
      testId: 'dashboard-peserta-card'
    },
    {
      icon: BarChart3,
      title: 'Laporan',
      desc: 'Lihat statistik dan laporan layanan',
      color: '#F59E0B',
      bgColor: '#FFF7E8',
      path: '/admin/laporan',
      testId: 'dashboard-laporan-card'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8" data-testid="dashboard-main">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Dashboard
                </h1>
                <p className="text-lg text-[#334155] mt-2">Selamat datang kembali, Kader Posyandu!</p>
              </div>
              <Button
                onClick={() => navigate('/admin/jadwal')}
                className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 px-6 text-base font-semibold rounded-xl shadow-[0_2px_6px_rgba(19,95,175,0.18)]"
                data-testid="dashboard-tambah-jadwal-button"
              >
                <Plus className="w-5 h-5 mr-2" /> Tambah Jadwal Baru
              </Button>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.path}
                    className="p-6 md:p-8 hover:shadow-lg transition-shadow rounded-2xl cursor-pointer border-[#E5EEF7]"
                    onClick={() => navigate(card.path)}
                    data-testid={card.testId}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: card.bgColor }}>
                        <Icon className="w-7 h-7" style={{ color: card.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-[#0B1020]">{card.title}</h3>
                        <p className="text-base text-[#334155] mt-2">{card.desc}</p>
                      </div>
                    </div>
                    <Button
                      className="mt-6 h-12 text-base bg-white text-[#0B1020] border border-[#E5EEF7] hover:bg-[#F5FAFD] rounded-xl w-full"
                      data-testid={`${card.testId}-button`}
                    >
                      Buka
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border-[#E5EEF7]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center mx-auto">
                    <CalendarDays className="w-6 h-6 text-[#1674D1]" />
                  </div>
                  <p className="text-4xl font-bold text-[#0B1020] mt-4">-</p>
                  <p className="text-base text-[#334155] mt-2">Jadwal Aktif</p>
                </div>
              </Card>
              <Card className="p-6 rounded-2xl border-[#E5EEF7]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F7F2] flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-[#34C6A3]" />
                  </div>
                  <p className="text-4xl font-bold text-[#0B1020] mt-4">-</p>
                  <p className="text-base text-[#334155] mt-2">Total Peserta</p>
                </div>
              </Card>
              <Card className="p-6 rounded-2xl border-[#E5EEF7]">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF7E8] flex items-center justify-center mx-auto">
                    <BarChart3 className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <p className="text-4xl font-bold text-[#0B1020] mt-4">-</p>
                  <p className="text-base text-[#334155] mt-2">Layanan Bulan Ini</p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
