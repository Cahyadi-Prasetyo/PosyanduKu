import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5EEF7]" data-testid="public-header">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="header-logo">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#EAF3FF] flex items-center justify-center">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-[#1674D1]" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-[#0B1020]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Posyandu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-lg text-[#334155] hover:text-[#1674D1] font-medium" data-testid="nav-beranda">
              Beranda
            </Link>
            <Link to="/jadwal" className="text-lg text-[#334155] hover:text-[#1674D1] font-medium" data-testid="nav-jadwal">
              Jadwal
            </Link>
            <Link to="/admin/login">
              <Button className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 px-6 text-base font-semibold rounded-xl" data-testid="nav-masuk-admin">
                Masuk Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5EEF7]" data-testid="mobile-menu">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-lg text-[#334155] hover:text-[#1674D1] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/jadwal"
                className="text-lg text-[#334155] hover:text-[#1674D1] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jadwal
              </Link>
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-[#1674D1] text-white hover:bg-[#135FAF] h-12 w-full text-base font-semibold rounded-xl">
                  Masuk Admin
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
