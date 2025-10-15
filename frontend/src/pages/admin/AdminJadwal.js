import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import { Plus, Edit, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminJadwal = () => {
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    tanggal: '',
    waktu: '',
    lokasi: '',
    jenis_layanan: 'Imunisasi',
    keterangan: '',
    status: 'Aktif'
  });

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const token = localStorage.getItem('token');
      // Get all jadwal including inactive ones for admin
      const response = await axios.get(`${API}/jadwal?status=`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJadwalList(response.data);
    } catch (error) {
      console.error('Error fetching jadwal:', error);
      toast.error('Gagal memuat jadwal');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (jadwal = null) => {
    if (jadwal) {
      setEditMode(true);
      setSelectedJadwal(jadwal);
      setFormData({
        tanggal: jadwal.tanggal,
        waktu: jadwal.waktu,
        lokasi: jadwal.lokasi,
        jenis_layanan: jadwal.jenis_layanan,
        keterangan: jadwal.keterangan || '',
        status: jadwal.status
      });
    } else {
      setEditMode(false);
      setSelectedJadwal(null);
      setFormData({
        tanggal: '',
        waktu: '',
        lokasi: '',
        jenis_layanan: 'Imunisasi',
        keterangan: '',
        status: 'Aktif'
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.tanggal || !formData.waktu || !formData.lokasi) {
      toast.error('Tanggal, waktu, dan lokasi harus diisi');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (editMode && selectedJadwal) {
        await axios.put(
          `${API}/jadwal/${selectedJadwal.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Jadwal berhasil diperbarui');
      } else {
        await axios.post(
          `${API}/jadwal`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Jadwal berhasil ditambahkan');
      }

      setDialogOpen(false);
      fetchJadwal();
    } catch (error) {
      console.error('Error saving jadwal:', error);
      toast.error(error.response?.data?.detail || 'Gagal menyimpan jadwal');
    }
  };

  const handleDelete = async () => {
    if (!selectedJadwal) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/jadwal/${selectedJadwal.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Jadwal berhasil dihapus');
      setDeleteDialogOpen(false);
      setSelectedJadwal(null);
      fetchJadwal();
    } catch (error) {
      console.error('Error deleting jadwal:', error);
      toast.error(error.response?.data?.detail || 'Gagal menghapus jadwal');
    }
  };

  const handleDateSelect = (date) => {
    if (date) {
      setFormData({ ...formData, tanggal: format(date, 'yyyy-MM-dd') });
      setDatePickerOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8" data-testid="admin-jadwal-main">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Kelola Jadwal
                </h1>
                <p className="text-lg text-[#334155] mt-2">Tambah, edit, dan hapus jadwal Posyandu</p>
              </div>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 px-6 text-base font-semibold rounded-xl shadow-[0_2px_6px_rgba(19,95,175,0.18)]"
                data-testid="tambah-jadwal-button"
              >
                <Plus className="w-5 h-5 mr-2" /> Tambah Jadwal
              </Button>
            </div>

            {/* Table */}
            <Card className="rounded-2xl border-[#E5EEF7]">
              {loading ? (
                <div className="p-12 text-center">
                  <p className="text-lg text-[#334155]">Memuat jadwal...</p>
                </div>
              ) : jadwalList.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-lg text-[#334155]">Belum ada jadwal. Klik tombol "Tambah Jadwal" untuk membuat jadwal baru.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-testid="jadwal-table">
                    <TableHeader>
                      <TableRow className="bg-[#EAF3FF]">
                        <TableHead className="text-[#0B1020] text-base font-semibold">Tanggal</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Waktu</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Lokasi</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Layanan</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Status</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jadwalList.map((jadwal) => (
                        <TableRow key={jadwal.id} className="odd:bg-[#F7FBFF] hover:bg-[#F0F7FF]" data-testid="jadwal-row">
                          <TableCell className="text-base">{jadwal.tanggal}</TableCell>
                          <TableCell className="text-base">{jadwal.waktu}</TableCell>
                          <TableCell className="text-base">{jadwal.lokasi}</TableCell>
                          <TableCell className="text-base">{jadwal.jenis_layanan}</TableCell>
                          <TableCell className="text-base">
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              jadwal.status === 'Aktif' ? 'bg-[#D1FAE5] text-[#065F46]' :
                              jadwal.status === 'Selesai' ? 'bg-[#E5E7EB] text-[#374151]' :
                              'bg-[#FEE2E2] text-[#991B1B]'
                            }`}>
                              {jadwal.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenDialog(jadwal)}
                                className="h-10 px-3 text-[#1674D1] hover:bg-[#EAF3FF] rounded-lg"
                                data-testid="edit-jadwal-button"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedJadwal(jadwal);
                                  setDeleteDialogOpen(true);
                                }}
                                className="h-10 px-3 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg"
                                data-testid="delete-jadwal-button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="jadwal-dialog">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editMode ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tanggal" className="text-base font-semibold">Tanggal</Label>
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal mt-2"
                      data-testid="tanggal-picker-button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.tanggal || 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.tanggal ? new Date(formData.tanggal) : undefined}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="waktu" className="text-base font-semibold">Waktu (HH:MM-HH:MM)</Label>
                <Input
                  id="waktu"
                  type="text"
                  value={formData.waktu}
                  onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                  className="mt-2 h-12 text-base"
                  placeholder="08:00-11:00"
                  data-testid="waktu-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lokasi" className="text-base font-semibold">Lokasi</Label>
              <Input
                id="lokasi"
                type="text"
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                className="mt-2 h-12 text-base"
                placeholder="Contoh: Balai RW 05"
                data-testid="lokasi-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jenis_layanan" className="text-base font-semibold">Jenis Layanan</Label>
                <Select value={formData.jenis_layanan} onValueChange={(value) => setFormData({ ...formData, jenis_layanan: value })}>
                  <SelectTrigger className="mt-2 h-12 text-base" data-testid="jenis-layanan-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Imunisasi">Imunisasi</SelectItem>
                    <SelectItem value="Penimbangan">Penimbangan</SelectItem>
                    <SelectItem value="Konseling Gizi">Konseling Gizi</SelectItem>
                    <SelectItem value="Pemeriksaan Ibu Hamil">Pemeriksaan Ibu Hamil</SelectItem>
                    <SelectItem value="Pemberian Vitamin">Pemberian Vitamin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status" className="text-base font-semibold">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-2 h-12 text-base" data-testid="status-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="keterangan" className="text-base font-semibold">Keterangan (Opsional)</Label>
              <Input
                id="keterangan"
                type="text"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                className="mt-2 h-12 text-base"
                placeholder="Catatan tambahan"
                data-testid="keterangan-input"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="h-12 px-6 text-base rounded-xl"
              data-testid="cancel-button"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 px-6 text-base rounded-xl"
              data-testid="submit-button"
            >
              {editMode ? 'Perbarui' : 'Tambah'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent data-testid="delete-dialog">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#DC2626]">Hapus Jadwal</DialogTitle>
          </DialogHeader>
          <p className="text-lg text-[#334155] py-4">
            Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="h-12 px-6 text-base rounded-xl"
              data-testid="cancel-delete-button"
            >
              Batal
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-[#DC2626] text-white hover:bg-[#B91C1C] h-12 px-6 text-base rounded-xl"
              data-testid="confirm-delete-button"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJadwal;
