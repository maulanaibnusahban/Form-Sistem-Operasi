# Web Form Pendaftaran Mahasiswa (Neo-Brutalism Fullstack)

Aplikasi web formulir pendaftaran responden mahasiswa dengan arsitektur **Fullstack** dan desain bergaya **Neo-Brutalism**.

---

## 🎨 Karakteristik Desain (Neo-Brutalism)
- **Border & Shadow**: Border hitam tebal (3-4px solid black) dengan hard shadow tajam tanpa blur (`shadow-[6px_6px_0px_0px_#000]`).
- **Zero Rounded**: Semua sudut siku tegas (`rounded-none`).
- **Palet Warna Kontras**: Background krem (`#FFFDF5`), aksen kuning terang (`#FFE500`), merah error (`#FF3B3B`), lime green (`#B8F500`), pink (`#FF6B9D`), dan biru (`#4D96FF`).
- **Tipografi**: Heading ekstra tebal UPPERCASE (*Space Grotesk*) dan teks label/input monospace (*Space Mono*).
- **Interaksi Taktil**: Efek hover tombol bergeser 2px dengan bayangan mengecil; active menempel penuh.

---

## 🏗️ Struktur Proyek

```
apk-so/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── responden.js      # Fetch client dengan path relatif /api/...
│   │   ├── components/
│   │   │   ├── AlertBox.jsx      # Alert box merah saat error sistem/jaringan
│   │   │   ├── FormField.jsx     # Input field dengan counter & error badge
│   │   │   ├── SelectField.jsx   # Dropdown opsi program studi brutalist
│   │   │   ├── SubmitButton.jsx  # Tombol submit besar dengan status loading
│   │   │   └── SuccessCard.jsx   # Card konfirmasi sukses & tombol reset
│   │   ├── utils/
│   │   │   └── validators.js     # Aturan validasi & normalisasi sisi klien
│   │   ├── App.jsx               # Komponen utama form & state management
│   │   ├── index.css             # Tailwind CSS & utilitas neo-brutalism
│   │   └── main.jsx
│   ├── index.html                # Google Fonts & metadata
│   ├── package.json
│   └── vite.config.js            # Tailwind v4 plugin + proxy /api ke :3000
├── backend/
│   ├── routes/
│   │   ├── health.js             # GET /api/health (status koneksi database)
│   │   └── responden.js          # POST /api/responden (registrasi & validasi)
│   ├── utils/
│   │   └── validators.js         # Normalisasi & validasi sisi server
│   ├── .env.example              # Template variabel lingkungan
│   ├── db.js                     # MySQL pool & inisialisasi tabel responden
│   ├── index.js                  # Express entrypoint, helmet, rate-limit, static
│   └── package.json
├── package.json                  # Root scripts (install:all, dev, build, start)
├── .gitignore
└── README.md
```

---

## 📋 Persyaratan Sistem
- **Node.js**: v18.x atau lebih baru (direkomendasikan v20+ / v22+)
- **MySQL**: 8.x / MariaDB yang sedang berjalan (misalnya via Laragon/XAMPP)
- Database: `db_so_app`

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Instalasi Seluruh Dependensi
Jalankan perintah ini di root folder untuk menginstall dependensi frontend dan backend sekaligus:
```bash
npm run install:all
```
*(Atau jika pertama kali, Anda juga dapat menjalankan `npm install` di root untuk memasang library pembantu `concurrently`).*

### 2. Konfigurasi Environment Backend
Salin template konfigurasi di dalam folder `backend/`:
```bash
cp backend/.env.example backend/.env
```
Buka file `backend/.env` dan sesuaikan kredensial MySQL Anda:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=maul-db
DB_PASSWORD=isi_password_mysql_anda
DB_NAME=db_so_app
NODE_ENV=development
```
> **Catatan:** Database `db_so_app` harus sudah dibuat sebelumnya di MySQL Anda. Tabel `responden` akan secara otomatis dibuat oleh fungsi `initDatabase()` saat server backend pertama kali dijalankan.

---

### 3. Menjalankan Mode Development
Jalankan frontend dan backend secara bersamaan menggunakan:
```bash
npm run dev
```
- **Frontend (Vite)**: `http://localhost:5173`
- **Backend (Express)**: `http://localhost:3000`
- Proxy otomatis meneruskan request dari `http://localhost:5173/api/*` ke backend `http://localhost:3000`.

---

### 4. Build & Menjalankan Mode Production (Single Port)
Untuk menjalankan dalam mode production di mana Express menyajikan aset statis frontend dari satu port:
```bash
# 1. Build frontend ke folder frontend/dist
npm run build

# 2. Jalankan server production
npm start
```
Akses aplikasi lengkap di: `http://localhost:3000`.

---

## 🧪 Contoh Pengujian API dengan cURL

### 1. Pengecekan Kesehatan Server & Database (Health Check)
```bash
curl -X GET http://localhost:3000/api/health
```
**Respon Sukses (200 OK):**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

### 2. Pendaftaran Berhasil (201 Created)
```bash
curl -X POST http://localhost:3000/api/responden \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Muhammad Maulana",
    "nim": "A11.2025.16509",
    "email": "maulana@mahasiswa.ac.id",
    "no_hp": "081234567890",
    "program_studi": "Teknik Informatika"
  }'
```
**Respon (201 Created):**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil",
  "data": {
    "id": 1,
    "nama_lengkap": "Muhammad Maulana",
    "nim": "A11.2025.16509",
    "email": "maulana@mahasiswa.ac.id",
    "no_hp": "081234567890",
    "program_studi": "Teknik Informatika"
  }
}
```

---

### 3. Validasi Gagal (422 Unprocessable Content)
Kirim data yang tidak sesuai aturan (misal nama dengan angka, NIM salah format, email tanpa domain, nomor HP kurang digit):
```bash
curl -X POST http://localhost:3000/api/responden \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Budi123",
    "nim": "SALAH_FORMAT",
    "email": "budi-bukan-email",
    "no_hp": "07123",
    "program_studi": "Jurusan Tidak Ada"
  }'
```
**Respon (422 Unprocessable Content):**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "nama_lengkap": "Nama lengkap hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung",
    "nim": "Format NIM tidak valid (contoh format: A11.2025.16509)",
    "email": "Format email tidak valid (contoh: user@domain.com)",
    "no_hp": "Nomor HP harus diawali 08 dan memiliki panjang 10-13 digit angka",
    "program_studi": "Program studi tidak valid atau tidak terdaftar dalam pilihan"
  }
}
```

---

### 4. Duplikasi NIM atau Email (409 Conflict)
Kirim kembali data dengan NIM atau Email yang sudah tersimpan sebelumnya:
```bash
curl -X POST http://localhost:3000/api/responden \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Nama Baru",
    "nim": "A11.2025.16509",
    "email": "emailbaru@mahasiswa.ac.id",
    "no_hp": "089876543210",
    "program_studi": "Sistem Informasi"
  }'
```
**Respon (409 Conflict):**
```json
{
  "success": false,
  "message": "Data sudah terdaftar",
  "errors": {
    "nim": "NIM sudah terdaftar"
  }
}
```

---

## 🔒 Fitur Keamanan
1. **Prepared Statement Parameterized Queries**: Mencegah SQL Injection sepenuhnya.
2. **Helmet HTTP Headers**: Mengamankan header HTTP terhadap berbagai serangan web umum.
3. **Express Rate Limit**: Membatasi maksimal 20 percobaan pendaftaran per 15 menit per IP untuk menangkal spam / flood.
4. **Body Size Limiter**: Payload JSON dibatasi hingga maksimal 10kb.
5. **CORS Terisolasi**: CORS hanya diaktifkan di development; di mode production disajikan dari origin yang sama.
