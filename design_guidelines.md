{
  "brand": {
    "name": "Posyandu Revitalisasi",
    "attributes": ["Hangat", "Ramah", "Terpercaya", "Sederhana", "Bersih"],
    "audience": [
      "Publik/Komunitas (orang tua, ibu, lansia)",
      "Kader Posyandu (Admin)"
    ],
    "success_actions": {
      "publik": [
        "Menemukan jadwal Posyandu terdekat dengan jelas",
        "Menyaring jadwal berdasarkan lokasi/layanan (Imunisasi, Penimbangan, Konseling)",
        "Mendaftar atau konfirmasi kehadiran (opsional)",
        "Membaca informasi layanan dengan mudah (teks besar, kontras tinggi)"
      ],
      "admin": [
        "Login cepat dan aman",
        "Tambah/Edit/Hapus jadwal dengan beberapa klik",
        "Kelola peserta/registran",
        "Melihat laporan/statistik sederhana (grafik bar/pie)"
      ]
    }
  },

  "design_style": {
    "fusion": "Swiss Style + Glassmorphism ringan pada kartu + Grid/Bento untuk fitur utama",
    "tone": "Profesional, hangat, komunitas; ramah lansia (teks sangat besar, kontras tinggi)"
  },

  "typography": {
    "font_pairing": {
      "heading": "Poppins",
      "body": "Inter",
      "fallback": "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    },
    "import": "<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@600;700;800&display=swap\" rel=\"stylesheet\">",
    "scale": {
      "base_body": "text-lg leading-8 md:text-xl",
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight",
      "h2": "text-base md:text-lg font-semibold",
      "h3": "text-xl md:text-2xl font-semibold",
      "small": "text-sm",
      "caption": "text-xs"
    },
    "senior_mode": {
      "description": "Tingkatkan ukuran font global 1.25x–1.4x saat toggle 'Mode Lansia' aktif.",
      "css_snippet": ":root[data-senior=\"on\"] { font-size: 18px; } @media (min-width: 768px){ :root[data-senior=\"on\"] { font-size: 19px; }}"
    }
  },

  "color_system": {
    "semantic_tokens": {
      "--bg": "#FFFFFF",
      "--bg-muted": "#F5FAFD",
      "--bg-mint": "#E8F7F2",
      "--bg-sky": "#EAF3FF",
      "--fg": "#0B1020",
      "--fg-muted": "#334155",
      "--primary": "#1674D1",
      "--primary-600": "#135FAF",
      "--primary-50": "#E8F2FF",
      "--mint": "#34C6A3",
      "--mint-700": "#1C9078",
      "--accent": "#48B7E2",
      "--warning": "#F59E0B",
      "--success": "#10B981",
      "--error": "#DC2626",
      "--border": "#E5EEF7",
      "--ring": "#135FAF"
    },
    "contrast_rules": [
      "Teks utama selalu #0B1020 pada latar terang",
      "Ukuran teks minimum 18px untuk konten utama",
      "Rasio kontras minimal 4.5:1 untuk body, 3:1 untuk teks besar"
    ],
    "gradients": {
      "hero_soft": {
        "css": "background: linear-gradient(135deg, #E8F7F2 0%, #EAF3FF 55%, #FFF7E8 100%);",
        "usage": "Hanya pada header/hero dan dekorasi section. Maks 20% viewport."
      },
      "accent_bar": {
        "css": "background: linear-gradient(90deg, #EAF3FF 0%, #E8F7F2 100%);",
        "usage": "Garis dekoratif di belakang judul section."
      },
      "enforcement": "Jika area gradient >20% viewport atau mengganggu keterbacaan, ganti dengan warna solid (--bg, --bg-mint, --bg-sky)."
    }
  },

  "css_design_tokens": {
    "snippet": ":root{--radius-xxs:4px;--radius-xs:6px;--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--shadow-sm:0 1px 2px rgba(16,24,40,.06);--shadow-md:0 2px 8px rgba(16,24,40,.08);--shadow-lg:0 8px 24px rgba(16,24,40,.12);--container-max:1200px;--gap:24px;--btn-radius:12px;--btn-shadow:0 2px 6px rgba(19,95,175,.18);--focus-ring:2px solid var(--ring);} body{font-family: Inter, system-ui, sans-serif;background-color: var(--bg);color: var(--fg);} .text-contrast{color:var(--fg);} .card-surface{background:rgba(255,255,255,.75);backdrop-filter:saturate(120%) blur(6px);box-shadow:var(--shadow-md);border:1px solid var(--border);}",
    "tailwind_tips": [
      "Gunakan bg-[hsl(var(--background))] dsb hanya bila perlu. Warna khusus gunakan hex pada kelas utilitas (bg-[#EAF3FF]).",
      "Hindari .App { text-align:center } – gunakan container mx-auto px-4 dengan text-left."
    ]
  },

  "grid_and_spacing": {
    "system": "8pt spacing",
    "container": "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8",
    "layout_patterns": {
      "public": "Header sticky, hero dua-kolom (stack di mobile), section jadwal, info layanan, peta/lokasi, FAQ, footer",
      "admin": "Sidebar kiri + konten, kartu aksi besar, tabel data dengan filter di atas"
    }
  },

  "components": {
    "paths": {
      "button": "./components/ui/button",
      "card": "./components/ui/card",
      "table": "./components/ui/table",
      "input": "./components/ui/input",
      "label": "./components/ui/label",
      "form": "./components/ui/form",
      "select": "./components/ui/select",
      "dialog": "./components/ui/dialog",
      "sheet": "./components/ui/sheet",
      "tabs": "./components/ui/tabs",
      "pagination": "./components/ui/pagination",
      "badge": "./components/ui/badge",
      "calendar": "./components/ui/calendar",
      "toast_toaster": "./components/ui/sonner",
      "switch": "./components/ui/switch",
      "alert": "./components/ui/alert",
      "separator": "./components/ui/separator"
    },
    "usage": {
      "buttons": {
        "variants": {
          "primary": "bg-[#1674D1] text-white hover:bg-[#135FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#135FAF] rounded-[var(--btn-radius)] shadow-[var(--btn-shadow)]",
          "secondary": "bg-white text-[#0B1020] border border-[#D5E6F7] hover:bg-[#F5FAFD] rounded-[var(--btn-radius)]",
          "ghost": "bg-transparent text-[#135FAF] hover:bg-[#EAF3FF] rounded-[var(--btn-radius)]"
        },
        "sizes": {
          "lg": "h-14 px-7 text-lg font-semibold",
          "md": "h-12 px-6 text-base font-semibold",
          "sm": "h-10 px-4 text-sm font-medium"
        },
        "notes": [
          "Setiap <button> wajib memiliki data-testid sesuai peran, contoh: data-testid=\"hero-lihat-jadwal-button\"",
          "Jangan gunakan transition: all; gunakan transition-colors atau transition-opacity"
        ]
      },
      "tables": "Gunakan Table dari shadcn untuk jadwal & peserta; baris tinggi (min-h-14), font besar, zebra stripes (odd:bg-[#F7FBFF])",
      "forms": "Pakai Form, Input, Select, Calendar dari shadcn. Label di atas input, ukuran input h-12, placeholder singkat & jelas.",
      "dialogs": "Konfirmasi hapus (Admin) menggunakan Dialog dengan teks besar dan tombol primer/sekunder yang jelas.",
      "toasts": "Gunakan sonner untuk notifikasi: keberhasilan simpan, gagal validasi, dll.",
      "tabs": "Tab untuk memisahkan jenis layanan (Balita, Ibu Hamil, Lansia) di halaman Jadwal.",
      "pagination": "Gunakan Pagination shadcn untuk jadwal dan peserta (>10 item). Tombol besar mudah diklik."
    }
  },

  "pages_and_layouts": {
    "public_home": {
      "sections": [
        "Header (logo kiri, tombol Masuk Admin kanan)",
        "Hero dengan judul besar dan tombol Lihat Jadwal",
        "Jadwal Terdekat (tabel/kartu)",
        "Jenis Layanan (kartu ikon)",
        "Lokasi & Jam Pelayanan",
        "FAQ",
        "Footer"
      ],
      "hero_example_jsx": """
        // PublicHero.js
        import { Button } from './components/ui/button'
        import { Badge } from './components/ui/badge'
        import { ChevronRight } from 'lucide-react'
        export default function PublicHero(){
          return (
            <section className=\"w-full\" style={{background: 'linear-gradient(135deg,#E8F7F2 0%,#EAF3FF 55%,#FFF7E8 100%)'}}>
              <div className=\"max-w-[1200px] mx-auto px-4 py-12 sm:py-16 lg:py-20\">
                <Badge className=\"mb-4\" data-testid=\"hero-badge\">Pelayanan Kesehatan Komunitas</Badge>
                <h1 className=\"text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1020]\">Posyandu yang Ramah untuk Semua Usia</h1>
                <p className=\"mt-4 text-lg md:text-xl text-[#334155] max-w-2xl\">Cek jadwal terbaru imunisasi, penimbangan, dan konseling gizi di wilayah Anda.</p>
                <div className=\"mt-8 flex flex-wrap gap-3\">
                  <Button className=\"bg-[#1674D1] text-white hover:bg-[#135FAF] h-14 px-7 text-lg\" data-testid=\"hero-lihat-jadwal-button\">Lihat Jadwal <ChevronRight className=\"ml-2\"/></Button>
                  <Button variant=\"ghost\" className=\"h-14 px-7 text-lg\" data-testid=\"hero-lokasi-button\">Lihat Lokasi</Button>
                </div>
              </div>
            </section>
          )
        }
      """
    },

    "public_schedule": {
      "filters": ["Tanggal (Calendar)", "Lokasi (Select)", "Jenis Layanan (Tabs/Select)"],
      "table_example_jsx": """
        // ScheduleTable.js
        import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from './components/ui/table'
        import { Badge } from './components/ui/badge'
        export const ScheduleTable = ({items=[]}) => (
          <div className=\"mt-6 overflow-x-auto\">
            <Table data-testid=\"schedule-table\" className=\"min-w-full\">
              <TableHeader>
                <TableRow className=\"bg-[#EAF3FF]\">
                  <TableHead className=\"text-[#0B1020] text-base\">Tanggal</TableHead>
                  <TableHead className=\"text-[#0B1020] text-base\">Waktu</TableHead>
                  <TableHead className=\"text-[#0B1020] text-base\">Lokasi</TableHead>
                  <TableHead className=\"text-[#0B1020] text-base\">Layanan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it,idx)=> (
                  <TableRow key={idx} className=\"odd:bg-[#F7FBFF] hover:bg-[#F0F7FF]\" data-testid=\"schedule-row\"> 
                    <TableCell className=\"text-lg\">{it.tanggal}</TableCell>
                    <TableCell className=\"text-lg\">{it.waktu}</TableCell>
                    <TableCell className=\"text-lg\">{it.lokasi}</TableCell>
                    <TableCell className=\"text-lg\"><Badge className=\"text-base py-2 px-3\">{it.layanan}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      """
    },

    "admin": {
      "pages": ["Login", "Dashboard", "Jadwal (CRUD)", "Peserta", "Laporan"],
      "dashboard_example_jsx": """
        // AdminDashboard.js
        import { Card } from './components/ui/card'
        import { Button } from './components/ui/button'
        import { Plus, CalendarDays, Users, BarChart3 } from 'lucide-react'
        export default function AdminDashboard(){
          const ActionCard = ({icon:Icon, title, desc, testId}) => (
            <Card className=\"p-6 md:p-8 hover:shadow-lg transition-shadow rounded-2xl\">
              <div className=\"flex items-center gap-4\">
                <div className=\"w-14 h-14 rounded-xl bg-[#EAF3FF] grid place-items-center\"><Icon className=\"text-[#135FAF]\"/></div>
                <div>
                  <div className=\"text-xl md:text-2xl font-bold\">{title}</div>
                  <p className=\"text-[#334155] mt-1\">{desc}</p>
                </div>
              </div>
              <Button className=\"mt-6 h-12 text-base\" data-testid={testId}>Buka</Button>
            </Card>
          )
          return (
            <div className=\"max-w-[1200px] mx-auto px-4 py-8\">
              <div className=\"flex flex-wrap items-center justify-between gap-4\">
                <h1 className=\"text-4xl font-extrabold\">Dashboard</h1>
                <Button className=\"h-12\" data-testid=\"dashboard-tambah-jadwal-button\"><Plus className=\"mr-2\"/> Tambah Jadwal Baru</Button>
              </div>
              <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8\">
                <ActionCard icon={CalendarDays} title=\"Kelola Jadwal\" desc=\"Tambah, ubah, hapus jadwal\" testId=\"dashboard-kelola-jadwal-card\" />
                <ActionCard icon={Users} title=\"Peserta\" desc=\"Data registran & riwayat\" testId=\"dashboard-peserta-card\" />
                <ActionCard icon={BarChart3} title=\"Laporan\" desc=\"Statistik layanan\" testId=\"dashboard-laporan-card\" />
              </div>
            </div>
          )
        }
      """
    }
  },

  "data_shapes": {
    "schedule_item": {
      "tanggal": "string (format: 12 Jan 2025)",
      "waktu": "string (08.00–11.00)",
      "lokasi": "string (Balai RW 05)",
      "layanan": "string (Imunisasi|Penimbangan|Konseling)"
    }
  },

  "motion_and_micro_interactions": {
    "libraries": ["framer-motion"],
    "rules": [
      "Hindari transition-all. Gunakan transition-colors, transition-opacity, transition-shadow",
      "Hover kartu: shadow-sm -> shadow-lg, translate-y-[2px] maksimal",
      "Reveal on scroll: fade + slight up (y:16) dengan durasi 300–450ms",
      "Button press: scale-95 selama 80–120ms"
    ],
    "snippets": {
      "reveal": "import { m as motion } from 'framer-motion' // alias\n<motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.36,ease:'easeOut'}}/>"
    }
  },

  "accessibility": {
    "checklist": [
      "Kontras WCAG AA untuk semua teks",
      "Ukuran target sentuh minimal 44x44px",
      "Fokus terlihat (ring 2px) di semua elemen interaktif",
      "Toggle 'Mode Lansia' untuk memperbesar teks",
      "Dukungan keyboard (Tab/Shift+Tab) termasuk di dialog dan menu",
      "Hormati prefers-reduced-motion"
    ],
    "skip_link": "Tambahkan <a href='#main' class='sr-only focus:not-sr-only'>Lewati ke Konten</a>"
  },

  "icons": {
    "library": "lucide-react",
    "import_example": "import { CalendarDays, Users, BarChart3, ChevronRight, Plus } from 'lucide-react'"
  },

  "images_urls": [
    {
      "url": "https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjb21tdW5pdHklMjBoZWFsdGglMjBjbGluaWMlMjBmcmllbmRseSUyMHN0YWZmfGVufDB8fHx8MTc2MDUwMjkzN3ww&ixlib=rb-4.1.0&q=85",
      "category": "hero",
      "description": "Staf klinik ramah untuk hero section"
    },
    {
      "url": "https://images.pexels.com/photos/7465700/pexels-photo-7465700.jpeg",
      "category": "layanan-komunitas",
      "description": "Kegiatan layanan komunitas (ilustratif)"
    },
    {
      "url": "https://images.pexels.com/photos/7465697/pexels-photo-7465697.jpeg",
      "category": "komunitas-anak",
      "description": "Suasana edukasi anak (ilustratif)"
    },
    {
      "url": "https://images.pexels.com/photos/33836787/pexels-photo-33836787.jpeg",
      "category": "tim",
      "description": "Foto tim/relawan (ilustratif)"
    },
    {
      "url": "https://images.unsplash.com/photo-1724632824319-4b43e74e000c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoZWFsdGglMjBjbGluaWMlMjBmcmllbmRseSUyMHN0YWZmfGVufDB8fHx8MTc2MDUwMjkzN3ww&ixlib=rb-4.1.0&q=85",
      "category": "fasilitas",
      "description": "Fasad bangunan sederhana (ilustratif)"
    },
    {
      "url": "https://images.unsplash.com/photo-1599666882726-fe28581e3147?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjb21tdW5pdHklMjBoZWFsdGglMjBjbGluaWMlMjBmcmllbmRseSUyMHN0YWZmfGVufDB8fHx8MTc2MDUwMjkzN3ww&ixlib=rb-4.1.0&q=85",
      "category": "lokasi",
      "description": "Lingkungan sekitar posyandu (ilustratif)"
    }
  ],

  "charts_and_reports": {
    "library": "recharts",
    "install": "npm i recharts",
    "example_jsx": """
      // ReportCharts.js
      import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
      const COLORS = ['#1674D1','#34C6A3','#48B7E2','#F59E0B']
      export default function ReportCharts({dataBar=[], dataPie=[]}){
        return (
          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\" data-testid=\"report-charts\"> 
            <div className=\"card-surface p-4 rounded-2xl\">
              <h3 className=\"text-xl font-bold\">Kunjungan per Layanan</h3>
              <div className=\"h-64\">
                <ResponsiveContainer width=\"100%\" height=\"100%\"> 
                  <BarChart data={dataBar}>
                    <XAxis dataKey=\"name\" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey=\"value\" fill=\"#1674D1\" radius={[8,8,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className=\"card-surface p-4 rounded-2xl\">
              <h3 className=\"text-xl font-bold\">Komposisi Peserta</h3>
              <div className=\"h-64\">
                <ResponsiveContainer width=\"100%\" height=\"100%\"> 
                  <PieChart>
                    <Pie data={dataPie} dataKey=\"value\" nameKey=\"name\" innerRadius={58} outerRadius={88} paddingAngle={4}>
                      {dataPie.map((_,idx)=> <Cell key={idx} fill={COLORS[idx%COLORS.length]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      }
    """
  },

  "forms_and_validation": {
    "date_picker": "Gunakan ./components/ui/calendar.jsx untuk memilih tanggal jadwal.",
    "input_sizes": "h-12 text-lg px-4; label text-base md:text-lg",
    "error_states": "Tampilkan teks kesalahan jelas merah (#DC2626) di bawah input; gunakan data-testid=\"form-error-<field>\""
  },

  "toasts": {
    "path": "./components/ui/sonner",
    "usage": "import { toast } from './components/ui/sonner' // toast.success('Data tersimpan')",
    "container": "Tempatkan <Toaster position=\"top-center\" richColors /> di Root"
  },

  "responsive_patterns": {
    "mobile_first": true,
    "header": "Gunakan sticky top-0 backdrop-blur dengan tinggi 64px, tombol besar dan kontras",
    "bottom_nav_mobile": "Opsional: 3-4 aksi utama sebagai nav bawah untuk publik (Beranda, Jadwal, Lokasi, Kontak)"
  },

  "testing_attributes": {
    "rule": "Semua elemen interaktif dan informasi penting WAJIB memiliki data-testid (kebab-case) berdasarkan peran.",
    "examples": [
      "data-testid=\"hero-lihat-jadwal-button\"",
      "data-testid=\"schedule-table\"",
      "data-testid=\"dashboard-tambah-jadwal-button\"",
      "data-testid=\"form-error-nama\"",
      "data-testid=\"pagination-next-button\""
    ]
  },

  
  "content_strings_id": {
    "nav": {"beranda": "Beranda", "jadwal": "Jadwal", "layanan": "Layanan", "lokasi": "Lokasi", "faq": "FAQ", "masuk_admin": "Masuk Admin"},
    "cta": {"lihat_jadwal": "Lihat Jadwal", "daftar": "Daftar", "tambah_jadwal": "Tambah Jadwal Baru"},
    "admin_labels": {"kelola_jadwal": "Kelola Jadwal", "peserta": "Peserta", "laporan": "Laporan"}
  },

  "instructions_to_main_agent": [
    "Tambahkan import Google Fonts (Inter, Poppins) di index.html",
    "Override App.css agar tidak memusatkan konten; gunakan container mx-auto text-left",
    "Implementasikan toggle 'Mode Lansia' dengan men-set attribute data-senior=on pada <html> untuk memperbesar font",
    "Bangun halaman publik (Home, Jadwal) dan admin (Login, Dashboard, Jadwal CRUD, Peserta, Laporan) sesuai skeleton",
    "Pakai komponen shadcn dari ./components/ui (dropdown/select, calendar, table, form, dialog, toast)",
    "Gunakan Recharts untuk laporan sederhana",
    "Tambahkan data-testid pada SEMUA tombol, input, link, menu, pesan error, konfirmasi",
    "Pastikan warna dan ukuran mengikuti token dan skala yang didefinisikan",
    "Ikuti aturan gradient (maks 20% viewport, jangan pada area teks panjang)",
    "Gunakan fokus ring yang jelas dan ukuran target sentuh 44px+"
  ],

  "component_path": {
    "shadcn": [
      "./components/ui/button.jsx",
      "./components/ui/card.jsx",
      "./components/ui/table.jsx",
      "./components/ui/input.jsx",
      "./components/ui/label.jsx",
      "./components/ui/form.jsx",
      "./components/ui/select.jsx",
      "./components/ui/dialog.jsx",
      "./components/ui/sheet.jsx",
      "./components/ui/tabs.jsx",
      "./components/ui/pagination.jsx",
      "./components/ui/badge.jsx",
      "./components/ui/calendar.jsx",
      "./components/ui/sonner.jsx",
      "./components/ui/switch.jsx",
      "./components/ui/alert.jsx",
      "./components/ui/separator.jsx"
    ]
  },

  "button_styles": {
    "category": "Professional / Corporate",
    "shape": "Medium radius (8–12px)",
    "surface": "Tonal/flat, bayangan halus",
    "motion": "Hover: shade shift + ring fokus; Press: scale-95",
    "variants": ["primary", "secondary", "ghost"],
    "sizes": ["sm", "md", "lg"],
    "wcag": "AA compliant"
  }
}


<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
