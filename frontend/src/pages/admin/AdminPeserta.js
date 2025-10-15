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
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPeserta = () => {
  const [pesertaList, setPesertaList] = useState([]);
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPeserta, setSelectedPeserta] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alamat: '',
    no_hp: '',
    jenis_kelamin: 'Perempuan',
    tanggal_lahir: '',
    jadwal_id: ''
  });

  useEffect(() => {
    fetchPeserta();
    fetchJadwal();
  }, []);

  const fetchPeserta = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/peserta`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPesertaList(response.data);
    } catch (error) {
      console.error('Error fetching peserta:', error);
      toast.error('Gagal memuat peserta');
    } finally {
      setLoading(false);
    }
  };

  const fetchJadwal = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/jadwal?status=Aktif`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJadwalList(response.data);
    } catch (error) {
      console.error('Error fetching jadwal:', error);
    }
  };

  const handleOpenDialog = (peserta = null) => {
    if (peserta) {
      setEditMode(true);
      setSelectedPeserta(peserta);
      setFormData({
        nama: peserta.nama,
        nik: peserta.nik,
        alamat: peserta.alamat,
        no_hp: peserta.no_hp,
        jenis_kelamin: peserta.jenis_kelamin,
        tanggal_lahir: peserta.tanggal_lahir,
        jadwal_id: peserta.jadwal_id || ''
      });
    } else {
      setEditMode(false);
      setSelectedPeserta(null);
      setFormData({
        nama: '',
        nik: '',
        alamat: '',
        no_hp: '',
        jenis_kelamin: 'Perempuan',
        tanggal_lahir: '',
        jadwal_id: ''
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.nama || !formData.nik || !formData.alamat || !formData.no_hp || !formData.tanggal_lahir) {
      toast.error('Semua field wajib harus diisi');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (editMode && selectedPeserta) {
        await axios.put(
          `${API}/peserta/${selectedPeserta.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Peserta berhasil diperbarui');
      } else {
        await axios.post(
          `${API}/peserta`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Peserta berhasil ditambahkan');
      }

      setDialogOpen(false);
      fetchPeserta();
    } catch (error) {
      console.error('Error saving peserta:', error);
      toast.error(error.response?.data?.detail || 'Gagal menyimpan peserta');
    }
  };

  const handleDelete = async () => {
    if (!selectedPeserta) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/peserta/${selectedPeserta.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Peserta berhasil dihapus');
      setDeleteDialogOpen(false);
      setSelectedPeserta(null);
      fetchPeserta();
    } catch (error) {
      console.error('Error deleting peserta:', error);
      toast.error(error.response?.data?.detail || 'Gagal menghapus peserta');
    }
  };

  const filteredPeserta = pesertaList.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8" data-testid="admin-peserta-main">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Kelola Peserta
                </h1>
                <p className="text-lg text-[#334155] mt-2">Tambah dan kelola data peserta Posyandu</p>
              </div>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 px-6 text-base font-semibold rounded-xl shadow-[0_2px_6px_rgba(19,95,175,0.18)]"
                data-testid="tambah-peserta-button"
              >
                <Plus className="w-5 h-5 mr-2" /> Tambah Peserta
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#334155]" />
                <Input
                  type="text"
                  placeholder="Cari nama atau NIK peserta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                  data-testid="search-peserta-input"
                />
              </div>
            </div>

            {/* Table */}
            <Card className="rounded-2xl border-[#E5EEF7]">
              {loading ? (
                <div className="p-12 text-center">
                  <p className="text-lg text-[#334155]">Memuat peserta...</p>
                </div>
              ) : filteredPeserta.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-lg text-[#334155]">
                    {searchTerm ? 'Tidak ada peserta ditemukan' : 'Belum ada peserta. Klik tombol "Tambah Peserta" untuk menambahkan peserta baru.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-testid="peserta-table">
                    <TableHeader>
                      <TableRow className="bg-[#EAF3FF]">
                        <TableHead className="text-[#0B1020] text-base font-semibold">Nama</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">NIK</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">No. HP</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Jenis Kelamin</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold">Tanggal Lahir</TableHead>
                        <TableHead className="text-[#0B1020] text-base font-semibold text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPeserta.map((peserta) => (
                        <TableRow key={peserta.id} className="odd:bg-[#F7FBFF] hover:bg-[#F0F7FF]" data-testid="peserta-row">
                          <TableCell className="text-base font-medium">{peserta.nama}</TableCell>
                          <TableCell className="text-base">{peserta.nik}</TableCell>
                          <TableCell className="text-base">{peserta.no_hp}</TableCell>
                          <TableCell className="text-base">{peserta.jenis_kelamin}</TableCell>
                          <TableCell className="text-base">{peserta.tanggal_lahir}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenDialog(peserta)}
                                className="h-10 px-3 text-[#1674D1] hover:bg-[#EAF3FF] rounded-lg"
                                data-testid="edit-peserta-button"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPeserta(peserta);
                                  setDeleteDialogOpen(true);
                                }}
                                className="h-10 px-3 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg"
                                data-testid="delete-peserta-button"
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="peserta-dialog">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editMode ? 'Edit Peserta' : 'Tambah Peserta Baru'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nama" className="text-base font-semibold">Nama Lengkap *</Label>
                <Input
                  id="nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="mt-2 h-12 text-base"
                  placeholder="Nama lengkap"
                  data-testid="nama-input"
                />
              </div>

              <div>
                <Label htmlFor="nik" className="text-base font-semibold">NIK *</Label>
                <Input
                  id="nik"
                  type="text"
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="mt-2 h-12 text-base"
                  placeholder="16 digit NIK"
                  data-testid="nik-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="alamat" className="text-base font-semibold">Alamat *</Label>
              <Input
                id="alamat"
                type="text"
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="mt-2 h-12 text-base"
                placeholder="Alamat lengkap"
                data-testid="alamat-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="no_hp" className="text-base font-semibold">No. HP *</Label>
                <Input
                  id="no_hp"
                  type="text"
                  value={formData.no_hp}
                  onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                  className="mt-2 h-12 text-base"
                  placeholder="08xxxxxxxxxx"
                  data-testid="no-hp-input"
                />
              </div>

              <div>
                <Label htmlFor="jenis_kelamin" className="text-base font-semibold">Jenis Kelamin *</Label>
                <Select value={formData.jenis_kelamin} onValueChange={(value) => setFormData({ ...formData, jenis_kelamin: value })}>
                  <SelectTrigger className="mt-2 h-12 text-base" data-testid="jenis-kelamin-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tanggal_lahir" className="text-base font-semibold">Tanggal Lahir *</Label>
                <Input
                  id="tanggal_lahir"
                  type="date"
                  value={formData.tanggal_lahir}
                  onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                  className="mt-2 h-12 text-base"
                  data-testid="tanggal-lahir-input"
                />
              </div>

              <div>
                <Label htmlFor="jadwal_id" className="text-base font-semibold">Jadwal (Opsional)</Label>
                <Select value={formData.jadwal_id} onValueChange={(value) => setFormData({ ...formData, jadwal_id: value })}>
                  <SelectTrigger className="mt-2 h-12 text-base" data-testid="jadwal-select">
                    <SelectValue placeholder="Pilih jadwal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tidak ada</SelectItem>
                    {jadwalList.map((jadwal) => (
                      <SelectItem key={jadwal.id} value={jadwal.id}>
                        {jadwal.tanggal} - {jadwal.jenis_layanan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            <DialogTitle className="text-2xl font-bold text-[#DC2626]">Hapus Peserta</DialogTitle>
          </DialogHeader>
          <p className="text-lg text-[#334155] py-4">
            Apakah Anda yakin ingin menghapus peserta ini? Tindakan ini tidak dapat dibatalkan.
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

export default AdminPeserta;
