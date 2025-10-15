import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import PublicHeader from '../components/PublicHeader';
import { ChevronRight, CalendarDays, Heart, Stethoscope, Baby, Scale, MapPin, Phone, Clock } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [jadwalTerdekat, setJadwalTerdekat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJadwalTerdekat();
  }, []);

  const fetchJadwalTerdekat = async () => {
    try {
      const response = await axios.get(`${API}/jadwal`);
      // Get next 3 schedules
      setJadwalTerdekat(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching jadwal:', error);
    } finally {
      setLoading(false);
    }
  };

  const layananList = [
    { icon: Baby, title: 'Imunisasi Anak', desc: 'Vaksinasi lengkap untuk bayi dan balita', color: '#1674D1' },
    { icon: Scale, title: 'Penimbangan', desc: 'Monitoring pertumbuhan dan berat badan', color: '#34C6A3' },
    { icon: Stethoscope, title: 'Konseling Gizi', desc: 'Konsultasi gizi dan pola makan sehat', color: '#48B7E2' },
    { icon: Heart, title: 'Pemeriksaan Ibu', desc: 'Pemeriksaan kesehatan ibu hamil', color: '#F59E0B' },
  ];

  const faqList = [
    {
      q: 'Apa itu Posyandu?',
      a: 'Posyandu adalah pusat kegiatan masyarakat untuk pelayanan kesehatan dasar seperti imunisasi, penimbangan, dan konseling gizi.'
    },
    {
      q: 'Siapa yang bisa mengikuti Posyandu?',
      a: 'Semua anggota masyarakat, terutama ibu hamil, balita, dan lansia dapat mengikuti layanan Posyandu.'
    },
    {
      q: 'Apakah layanan Posyandu gratis?',
      a: 'Ya, sebagian besar layanan Posyandu gratis atau dengan biaya yang sangat terjangkau.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="w-full" style={{ background: 'linear-gradient(135deg, #E8F7F2 0%, #EAF3FF 55%, #FFF7E8 100%)' }} data-testid="hero-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#E8F7F2] text-[#1C9078] border-[#34C6A3] text-base py-2 px-4" data-testid="hero-badge">
                Pelayanan Kesehatan Komunitas
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1020] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Posyandu yang Ramah untuk Semua Usia
              </h1>
              <p className="mt-4 text-lg md:text-xl leading-8 text-[#334155] max-w-2xl">
                Cek jadwal terbaru imunisasi, penimbangan, dan konseling gizi di wilayah Anda. Kesehatan keluarga adalah prioritas kami.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate('/jadwal')}
                  className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-14 px-7 text-lg font-semibold rounded-xl shadow-[0_2px_6px_rgba(19,95,175,0.18)]"
                  data-testid="hero-lihat-jadwal-button"
                >
                  Lihat Jadwal <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjb21tdW5pdHklMjBoZWFsdGglMjBjbGluaWMlMjBmcmllbmRseSUyMHN0YWZmfGVufDB8fHx8MTc2MDUwMjkzN3ww&ixlib=rb-4.1.0&q=85"
                alt="Pelayanan Posyandu"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Jadwal Terdekat */}
      <section className="w-full py-12 md:py-16 bg-white" data-testid="jadwal-terdekat-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Jadwal Terdekat
            </h2>
            <p className="mt-3 text-lg md:text-xl text-[#334155]">
              Jangan lewatkan jadwal Posyandu di wilayah Anda
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-lg text-[#334155]">Memuat jadwal...</p>
            </div>
          ) : jadwalTerdekat.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-[#334155]">Belum ada jadwal tersedia</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jadwalTerdekat.map((jadwal, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow rounded-2xl border-[#E5EEF7]" data-testid="jadwal-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-6 h-6 text-[#1674D1]" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2 text-sm">{jadwal.jenis_layanan}</Badge>
                      <p className="text-base md:text-lg font-semibold text-[#0B1020]">{jadwal.tanggal}</p>
                      <p className="text-base text-[#334155] mt-1">{jadwal.waktu}</p>
                      <p className="text-base text-[#334155] mt-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {jadwal.lokasi}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('/jadwal')}
              variant="outline"
              className="h-12 px-6 text-base border-[#1674D1] text-[#1674D1] hover:bg-[#EAF3FF] rounded-xl"
              data-testid="lihat-semua-jadwal-button"
            >
              Lihat Semua Jadwal
            </Button>
          </div>
        </div>
      </section>

      {/* Jenis Layanan */}
      <section className="w-full py-12 md:py-16 bg-[#F5FAFD]" data-testid="layanan-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Layanan Kami
            </h2>
            <p className="mt-3 text-lg md:text-xl text-[#334155]">
              Berbagai layanan kesehatan untuk keluarga Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layananList.map((layanan, idx) => {
              const Icon = layanan.icon;
              return (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow rounded-2xl border-[#E5EEF7]" data-testid="layanan-card">
                  <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center" style={{ backgroundColor: `${layanan.color}15` }}>
                    <Icon className="w-8 h-8" style={{ color: layanan.color }} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#0B1020]">{layanan.title}</h3>
                  <p className="mt-2 text-base text-[#334155]">{layanan.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lokasi & Kontak */}
      <section className="w-full py-12 md:py-16 bg-white" data-testid="lokasi-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Lokasi & Kontak
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#1674D1]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#0B1020]">Alamat</p>
                    <p className="text-base text-[#334155] mt-1">Jl. Kesehatan No. 123, RT 05/RW 03<br />Kelurahan Sehat, Jakarta</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F7F2] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#34C6A3]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#0B1020]">Jam Pelayanan</p>
                    <p className="text-base text-[#334155] mt-1">Senin - Jumat: 08.00 - 14.00 WIB<br />Sabtu: 08.00 - 12.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF7E8] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#0B1020]">Telepon</p>
                    <p className="text-base text-[#334155] mt-1">(021) 1234-5678</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-[#F5FAFD] flex items-center justify-center">
              <p className="text-[#334155]">Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 md:py-16 bg-[#F5FAFD]" data-testid="faq-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pertanyaan Umum
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqList.map((faq, idx) => (
              <Card key={idx} className="p-6 rounded-2xl border-[#E5EEF7]" data-testid="faq-item">
                <h3 className="text-lg md:text-xl font-bold text-[#0B1020]">{faq.q}</h3>
                <p className="text-base md:text-lg text-[#334155] mt-2">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#0B1020] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base md:text-lg">&copy; 2025 Posyandu Revitalisasi. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
