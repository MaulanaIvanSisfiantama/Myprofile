# Portofolio Pribadi Maulana Ivan — Siap GitHub Pages 🚀

Website profil pribadi dan portofolio profesional berkecepatan tinggi yang menampilkan:
- **Karya & Proyek Unggulan**: Showcase aplikasi web, mobile fintech, cloud gateway, dan open source dengan detail tantangan, solusi, metrik dampak, dan teknologi.
- **Pengalaman Kerja Profesional**: Linimasa karir rekayasa perangkat lunak dengan pencapaian terukur dan stack teknologi.
- **Keahlian Teknis**: Pemetaan keahlian frontend, backend & database, serta devops & tooling.
- **Kontak Terintegrasi**: Salin email 1-klik (`MaulanaIvan95@gmail.com`), chat langsung WhatsApp, unduh vCard ponsel (.vcf), serta formulir pesan interaktif.
- **Curriculum Vitae (CV) Siap Cetak**: Tampilan resume standar eksekutif dengan dukungan Cetak / Simpan PDF (`window.print`).
- **Pengaturan & Live Customizer**: Kemampuan menyesuaikan bio, kontak, serta menambah proyek kustom langsung dari antarmuka web dengan penyimpanan lokal (`localStorage`).

---

## 🌐 Cara Publikasi Gratis ke GitHub Pages (Tanpa Biaya Hosting)

Website ini dibangun menggunakan **React 19 + Vite** dengan konfigurasi `base: './'`, sehingga 100% kompatibel dan siap dihosting langsung secara gratis di GitHub Pages tanpa sewa server/VPS.

### Metode Otomatis (GitHub Actions) — Paling Mudah

1. **Buat Repository Baru di GitHub**:
   - Kunjungi [github.com/new](https://github.com/new).
   - Beri nama repository, misalnya `portfolio` atau `<username>.github.io`.
   - Pilih visibilitas **Public**.

2. **Hubungkan Kode Lokal & Push**:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi portofolio pribadi Maulana Ivan"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-ANDA>/<NAMA-REPO>.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**:
   - Masuk ke tab **Settings** di repositori GitHub Anda.
   - Klik menu **Pages** di panel kiri.
   - Pada bagian **Build and deployment > Source**, ubah dari *"Deploy from a branch"* menjadi **"GitHub Actions"**.

4. **Selesai!**
   - File workflow di `.github/workflows/deploy.yml` akan otomatis berjalan.
   - Dalam waktu ~40 detik, website profil Anda sudah dapat diakses online di:
     `https://<username-anda>.github.io/<nama-repo>/`

---

## 🛠️ Pengembangan Lokal

```bash
# Instalasi dependensi
npm install

# Jalankan server pengembangan lokal (port 3000)
npm run dev

# Uji coba build produksi
npm run build

# Pratinjau hasil build
npm run preview
```
