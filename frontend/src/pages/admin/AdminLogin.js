import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Username dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      
      toast.success('Login berhasil!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.detail || 'Login gagal. Periksa username dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #E8F7F2 0%, #EAF3FF 55%, #FFF7E8 100%)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF3FF] flex items-center justify-center">
              <Heart className="w-9 h-9 text-[#1674D1]" />
            </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Posyandu Admin
          </h1>
          <p className="text-lg text-[#334155] mt-2">Masuk untuk mengelola Posyandu</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 rounded-2xl shadow-lg border-[#E5EEF7]" data-testid="login-card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-base md:text-lg font-semibold text-[#0B1020]">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-2 h-12 text-lg px-4 border-[#E5EEF7] focus:ring-2 focus:ring-[#135FAF]"
                placeholder="Masukkan username"
                data-testid="login-username-input"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-base md:text-lg font-semibold text-[#0B1020]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 h-12 text-lg px-4 border-[#E5EEF7] focus:ring-2 focus:ring-[#135FAF]"
                placeholder="Masukkan password"
                data-testid="login-password-input"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1674D1] text-white hover:bg-[#135FAF] h-14 text-lg font-semibold rounded-xl shadow-[0_2px_6px_rgba(19,95,175,0.18)]"
              data-testid="login-submit-button"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-base text-[#1674D1] hover:underline">
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mt-6 p-4 bg-[#EAF3FF] rounded-xl">
            <p className="text-sm text-[#334155] text-center">
              <strong>Demo:</strong> username: admin | password: admin123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
