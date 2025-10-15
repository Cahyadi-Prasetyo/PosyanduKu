import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLORS = ['#1674D1', '#34C6A3', '#48B7E2', '#F59E0B', '#DC2626'];

const AdminLaporan = () => {
  const [statistik, setStatistik] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistik();
  }, []);

  const fetchStatistik = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/laporan/statistik`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatistik(response.data);
    } catch (error) {
      console.error('Error fetching statistik:', error);
      toast.error('Gagal memuat statistik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8" data-testid="admin-laporan-main">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Laporan & Statistik
              </h1>
              <p className="text-lg text-[#334155] mt-2">Ringkasan data dan statistik Posyandu</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-[#334155]">Memuat statistik...</p>
              </div>
            ) : !statistik ? (
              <div className="text-center py-12">
                <p className="text-lg text-[#334155]">Gagal memuat data statistik</p>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 rounded-2xl border-[#E5EEF7]" data-testid="total-jadwal-card">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#EAF3FF] flex items-center justify-center">
                        <CalendarDays className="w-7 h-7 text-[#1674D1]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-[#334155]">Total Jadwal</p>
                        <p className="text-3xl md:text-4xl font-bold text-[#0B1020] mt-1">{statistik.total_jadwal}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-2xl border-[#E5EEF7]" data-testid="jadwal-aktif-card">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#E8F7F2] flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-[#34C6A3]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-[#334155]">Jadwal Aktif</p>
                        <p className="text-3xl md:text-4xl font-bold text-[#0B1020] mt-1">{statistik.jadwal_aktif}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-2xl border-[#E5EEF7]" data-testid="total-peserta-card">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#FFF7E8] flex items-center justify-center">
                        <Users className="w-7 h-7 text-[#F59E0B]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-[#334155]">Total Peserta</p>
                        <p className="text-3xl md:text-4xl font-bold text-[#0B1020] mt-1">{statistik.total_peserta}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="report-charts">
                  {/* Peserta by Layanan */}
                  <Card className="p-6 rounded-2xl border-[#E5EEF7]">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B1020] mb-6">Peserta per Layanan</h3>
                    {statistik.peserta_by_layanan.length === 0 ? (
                      <div className="h-64 flex items-center justify-center text-[#334155]">
                        Belum ada data
                      </div>
                    ) : (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={statistik.peserta_by_layanan}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ fontSize: 14 }} />
                            <Bar dataKey="value" fill="#1674D1" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </Card>

                  {/* Peserta by Gender */}
                  <Card className="p-6 rounded-2xl border-[#E5EEF7]">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0B1020] mb-6">Komposisi Jenis Kelamin</h3>
                    {statistik.peserta_by_gender.length === 0 ? (
                      <div className="h-64 flex items-center justify-center text-[#334155]">
                        Belum ada data
                      </div>
                    ) : (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statistik.peserta_by_gender}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={58}
                              outerRadius={88}
                              paddingAngle={4}
                              label={(entry) => entry.name}
                            >
                              {statistik.peserta_by_gender.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: 14 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLaporan;
