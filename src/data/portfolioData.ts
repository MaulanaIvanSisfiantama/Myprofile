export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  year: string;
  image: string; // Cover photo
  images?: string[]; // Multiple documentation screenshots
  summary: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string; // Full-time, Contract, Remote
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string; years?: string }[];
}

export interface UserProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  location: string;
  availability: string;
  avatarUrl: string;
}

export const initialProfile: UserProfile = {
  name: 'Maulana Ivan',
  role: 'IT Engineering & Infrastructure',
  tagline: 'Mengelola arsitektur infrastruktur IT, cloud, jaringan, dan sistem aplikasi yang andal, aman, dan siap skala produksi.',
  bio: 'Profesional di bidang IT Engineering & Infrastructure dengan pengalaman 5+ tahun dalam merancang dan memelihara sistem server, arsitektur jaringan, otomasi CI/CD, kontainerisasi cloud, serta keandalan sistem aplikasi secara end-to-end.',
  email: 'MaulanaIvan95@gmail.com',
  whatsapp: '+6281234567890',
  github: 'https://github.com/MaulanaIvanSisfiantama',
  linkedin: 'https://linkedin.com/in/maulana-ivan',
  location: 'Semarang, Jawa Tengah (Tersedia Remote)',
  availability: 'Terbuka untuk Kolaborasi Proyek & Peluang Karir',
  avatarUrl: '/src/assets/images/developer_profile_avatar_1793694350273.jpg'
};

export const initialProjects: Project[] = [
  {
    id: 'skyline-saas',
    title: 'Skyline Cloud Analytics',
    subtitle: 'Platform Monitoring Real-Time & Visualisasi Metrik Cloud',
    category: 'web',
    categoryLabel: 'Web Application',
    year: '2025',
    image: '/src/assets/images/showcase_saas_dashboard_1793694350834.jpg',
    images: [
      '/src/assets/images/showcase_saas_dashboard_1793694350834.jpg',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Dashboard analisis cloud performa tinggi dengan pemrosesan 45TB+ data, visualisasi latensi sub-detik, dan alerting cerdas.',
    fullDescription: 'Skyline Analytics adalah sistem SaaS pemantauan telemetri infrastruktur cloud. Dibangun dengan React 19, TypeScript, dan Tailwind CSS di sisi frontend serta arsitektur event-driven di backend, platform ini memungkinkan tim engineering mendeteksi degradasi sistem dalam hitungan detik.',
    challenge: 'Menampilkan ribuan titik data metrik real-time tanpa memicu re-render berat pada browser klien dan menjaga framerate stabil pada 60fps.',
    solution: 'Mengimplementasikan Web Workers untuk kalkulasi agregasi data di latar belakang, virtualized canvas charting, serta kompresi payload WebSocket.',
    metrics: [
      { label: 'Latency Data', value: '< 40ms' },
      { label: 'Data Processed', value: '45.8 TB' },
      { label: 'Query Speedup', value: '4.2x' }
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Redis', 'WebSockets', 'Chart.js'],
    demoUrl: 'https://example.com/demo/skyline',
    githubUrl: 'https://github.com/MaulanaIvanSisfiantama/skyline-analytics',
    featured: true
  },
  {
    id: 'aura-fintech',
    title: 'Aura Digital Wallet & Fintech',
    subtitle: 'Aplikasi Dompet Digital dengan Keamanan Biometrik',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    year: '2025',
    image: '/src/assets/images/showcase_mobile_fintech_1793694351764.jpg',
    images: [
      '/src/assets/images/showcase_mobile_fintech_1793694351764.jpg',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Aplikasi perbankan & transaksi instan dengan enkripsi end-to-end, multi-kartu reward, dan verifikasi biometrik real-time.',
    fullDescription: 'Aura Fintech mempermudah pengguna mengelola keuangan pribadi, melakukan transfer antar bank instan, serta memantau pengeluaran bulanan dengan visualisasi intuitif dan pengamanan multi-lapis standar perbankan.',
    challenge: 'Memastikan integritas transaksi keuangan tinggi dengan latensi proses di bawah 500ms pada koneksi jaringan seluler yang fluktuatif.',
    solution: 'Membangun arsitektur offline-first dengan sinkronisasi deterministik, enkripsi AES-256 pada local storage, serta otentikasi biometrik native.',
    metrics: [
      { label: 'Active Users', value: '120K+' },
      { label: 'Success Rate', value: '99.98%' },
      { label: 'App Store Rating', value: '4.9 ★' }
    ],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    demoUrl: 'https://example.com/demo/aura-fintech',
    githubUrl: 'https://github.com/MaulanaIvanSisfiantama/aura-mobile-fintech',
    featured: true
  },
  {
    id: 'apiops-platform',
    title: 'ApiOps Developer Gateway & Portal',
    subtitle: 'Gateway Manajemen API & Dokumentasi Interaktif',
    category: 'api',
    categoryLabel: 'Cloud & API Platform',
    year: '2024',
    image: '/src/assets/images/showcase_cloud_platform_1793694351695.jpg',
    images: [
      '/src/assets/images/showcase_cloud_platform_1793694351695.jpg',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Developer portal untuk otomasi deployment API, dokumentasi otomatis OpenAPI, rate limiting terdistribusi, dan sandbox pengujian.',
    fullDescription: 'ApiOps dirancang untuk menyederhanakan siklus rilis API bagi tim pengembang berskala menengah hingga enterprise. Dilengkapi dengan live code runner, swagger explorer terintegrasi, dan pemantau error otomatis.',
    challenge: 'Mengelola routing ribuan request per detik dengan proteksi DDoS dan rate-limiting presisi per API key.',
    solution: 'Menggunakan reverse proxy berbasis Go dengan integrasi Redis token-bucket cluster, didukung antarmuka web SPA yang sangat responsif.',
    metrics: [
      { label: 'Throughput', value: '8.5K req/s' },
      { label: 'Deployment Time', value: '-65%' },
      { label: 'Uptime', value: '99.99%' }
    ],
    technologies: ['Go (Golang)', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    demoUrl: 'https://example.com/demo/apiops',
    githubUrl: 'https://github.com/MaulanaIvanSisfiantama/apiops-developer-gateway',
    featured: true
  },
  {
    id: 'react-smooth-motion',
    title: 'PulseUI Components',
    subtitle: 'Koleksi Komponen UI Minimalis & Aksesibel Open-Source',
    category: 'opensource',
    categoryLabel: 'Open Source',
    year: '2024',
    image: '/src/assets/images/showcase_saas_dashboard_1793694350834.jpg',
    images: [
      '/src/assets/images/showcase_saas_dashboard_1793694350834.jpg',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Library komponen React berfokus pada aksesibilitas WCAG AA, ukuran bundle mikro (< 12KB), dan animasi halus tanpa layout thrashing.',
    fullDescription: 'Proyek open-source yang digunakan oleh ribuan developer untuk mempercepat pembangunan antarmuka web modern dengan standar desain yang ketat dan dokumentasi komprehensif.',
    challenge: 'Mencapai skor aksesibilitas 100% pada Lighthouse dan screen reader compatibility tanpa menambah beban bundle size.',
    solution: 'Penyusunan komponen berbasis primitive WAI-ARIA dan atomic styling CSS variabel zero-runtime.',
    metrics: [
      { label: 'GitHub Stars', value: '1.2K+' },
      { label: 'NPM Downloads', value: '45K/mo' },
      { label: 'Bundle Size', value: '11.4 KB' }
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'npm'],
    demoUrl: 'https://example.com/demo/pulseui',
    githubUrl: 'https://github.com/MaulanaIvanSisfiantama/pulse-ui-library',
    featured: false
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Full-Stack Engineer',
    company: 'Nusantara Tech Solusindo',
    period: '2023 — Sekarang',
    location: 'Jakarta, Indonesia',
    type: 'Full-time / Hybrid',
    description: 'Memimpin tim engineering yang bertanggung jawab atas pengembangan arsitektur web platform SaaS utama serta pipeline integrasi pembayaran.',
    achievements: [
      'Merancang ulang arsitektur front-end menjadi modular SPA, memangkas waktu First Contentful Paint (FCP) sebesar 52%.',
      'Mengembangkan microservices transaksi dengan Go & Redis yang mampu memproses hingga 10.000 transaksi bersamaan.',
      'Mengurangi biaya infrastruktur cloud sebesar 28% melalui optimasi caching dan container resource allocation.',
      'Mementori 6 junior engineer dalam best practice TypeScript, clean code, dan automated testing.'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Web Developer',
    company: 'Kreasi Digital Mandiri',
    period: '2021 — 2023',
    location: 'Bandung / Remote',
    type: 'Full-time / Remote',
    description: 'Membangun aplikasi web e-commerce kustom, CMS internal, dan portal klien terintegrasi untuk berbagai brand di Indonesia.',
    achievements: [
      'Menyelesaikan 14+ proyek web klien tepat waktu dengan tingkat kepuasan klien 98%.',
      'Membangun modul checkout dan sinkronisasi logistik kurir otomatis (JNE, SiCepat, J&T).',
      'Meningkatkan conversion rate platform e-commerce klien utama sebesar 35% melalui perbaikan UX mobile.'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MySQL', 'Redis', 'Git']
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'Inovasi Cipta Media',
    period: '2019 — 2021',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    description: 'Bertanggung jawab atas implementasi UI/UX dari mockup Figma ke antarmuka web responsif dan integrasi REST API backend.',
    achievements: [
      'Mengonversi lebih dari 50 halaman antarmuka desain menjadi kode web yang pixel-perfect dan responsif di semua perangkat.',
      'Menginisiasi penggunaan component library internal yang mempersingkat waktu development fitur baru hingga 40%.'
    ],
    technologies: ['JavaScript (ES6+)', 'React', 'HTML5/CSS3', 'REST API', 'Figma', 'Webpack']
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Membangun antarmuka web interaktif, responsif, dan berperforma tinggi dengan standar aksesibilitas internasional.',
    skills: [
      { name: 'React 18 / 19' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS v4' },
      { name: 'Next.js' },
      { name: 'State Management (Zustand/Redux)' },
      { name: 'Performance Optimization & SEO' }
    ]
  },
  {
    title: 'Backend & Database',
    description: 'Merancang API yang andal, scalable, aman, dan arsitektur database relasional serta caching terdistribusi.',
    skills: [
      { name: 'Node.js & Express' },
      { name: 'Go (Golang)' },
      { name: 'PostgreSQL' },
      { name: 'Redis Caching' },
      { name: 'REST & GraphQL APIs' },
      { name: 'Authentication (OAuth / JWT)' }
    ]
  },
  {
    title: 'DevOps & Tooling',
    description: 'Otomasi deployment, CI/CD pipeline, kontainerisasi, dan hosting praktis (GitHub Pages, Vercel, Docker).',
    skills: [
      { name: 'GitHub Actions & CI/CD' },
      { name: 'Git & Version Control' },
      { name: 'GitHub Pages Deployment' },
      { name: 'Docker & Containers' },
      { name: 'Vite & Modern Bundlers' },
      { name: 'Linux / Shell Scripting' }
    ]
  }
];

export const githubPagesWorkflowTemplate = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"] # Sesuaikan jika nama branch Anda 'master'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
