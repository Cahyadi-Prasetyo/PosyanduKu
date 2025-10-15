import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import PublicHeader from '../components/PublicHeader';
import { CalendarDays, MapPin, Clock, Filter } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JadwalPublic = () => {
  const [jadwalList, setJadwalList] = useState([]);
  const [filteredJadwal, setFilteredJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLokasi, setSelectedLokasi] = useState('semua');
  const [selectedLayanan, setSelectedLayanan] = useState('Semua');

  useEffect(() => {
    fetchJadwal();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jadwalList, selectedLokasi, selectedLayanan]);

  const fetchJadwal = async () => {
    try {
      const response = await axios.get(`${API}/jadwal`);
      setJadwalList(response.data);
      setFilteredJadwal(response.data);
    } catch (error) {
      console.error('Error fetching jadwal:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jadwalList];

    if (selectedLokasi !== 'semua') {
      filtered = filtered.filter(j => j.lokasi.toLowerCase().includes(selectedLokasi.toLowerCase()));
    }

    if (selectedLayanan !== 'Semua') {
      filtered = filtered.filter(j => j.jenis_layanan === selectedLayanan);
    }

    setFilteredJadwal(filtered);
  };

  const lokasiList = ['semua', ...new Set(jadwalList.map(j => j.lokasi))];
  const layananList = ['Semua', 'Imunisasi', 'Penimbangan', 'Konseling Gizi', 'Pemeriksaan Ibu Hamil', 'Pemberian Vitamin'];

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Header Section */}
      <section className="w-full py-12 md:py-16 bg-[#EAF3FF]" data-testid="jadwal-header">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1020] text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Jadwal Posyandu
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#334155] text-center max-w-2xl mx-auto">
            Temukan jadwal layanan Posyandu di wilayah Anda
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full py-8 bg-white border-b border-[#E5EEF7]" data-testid="filter-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#334155]" />
            <h3 className="text-lg md:text-xl font-bold text-[#0B1020]">Filter Jadwal</h3>
          </div>

          <Tabs value={selectedLayanan} onValueChange={setSelectedLayanan} className="w-full" data-testid="layanan-tabs">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2">
              {layananList.map((layanan) => (
                <TabsTrigger key={layanan} value={layanan} className="text-sm md:text-base py-2 px-3 data-[state=active]:bg-[#1674D1] data-[state=active]:text-white" data-testid={`tab-${layanan.toLowerCase().replace(/\s+/g, '-')}`}>
                  {layanan}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedLokasi} onValueChange={setSelectedLokasi}>
                <SelectTrigger className="h-12 text-base" data-testid="lokasi-select">
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {lokasiList.map((lokasi) => (
                    <SelectItem key={lokasi} value={lokasi} className="text-base">
                      {lokasi === 'semua' ? 'Semua Lokasi' : lokasi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Jadwal List */}
      <section className="w-full py-12 bg-white" data-testid="jadwal-list-section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-[#334155]">Memuat jadwal...</p>
            </div>
          ) : filteredJadwal.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-[#334155]">Tidak ada jadwal ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJadwal.map((jadwal) => (
                <Card key={jadwal.id} className="p-6 hover:shadow-lg transition-shadow rounded-2xl border-[#E5EEF7]" data-testid="jadwal-card">
                  <Badge className="mb-3 text-base py-2 px-3">{jadwal.jenis_layanan}</Badge>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-5 h-5 text-[#1674D1] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-[#334155]">Tanggal</p>
                        <p className="text-lg font-semibold text-[#0B1020]">{jadwal.tanggal}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#34C6A3] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-[#334155]">Waktu</p>
                        <p className="text-base font-medium text-[#0B1020]">{jadwal.waktu}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-[#334155]">Lokasi</p>
                        <p className="text-base font-medium text-[#0B1020]">{jadwal.lokasi}</p>
                      </div>
                    </div>
                    {jadwal.keterangan && (
                      <div className="pt-2 border-t border-[#E5EEF7]">
                        <p className="text-sm text-[#334155]">{jadwal.keterangan}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
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

export default JadwalPublic;
