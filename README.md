# Bayarin

Aplikasi web simulasi pembayaran tagihan & isi pulsa. Dibangun dengan HTML5, Tailwind CSS, dan Vanilla JavaScript. Berjalan sepenuhnya di sisi klien (client-side) tanpa backend.

## Cara Menjalankan

1. Clone repository ini
2. Buka `index.html` di browser (bisa langsung double-click atau pakai Live Server VSCode)

```
git clone https://github.com/ZhakiApriyanZhodik/Bayarin.git
cd Bayarin
```

Kalau pakai VSCode, install extension **Live Server** klik kanan `index.html` → "Open with Live Server".

## Fitur

### 1. Dashboard
- Ringkasan saldo simulasi
- Quick access ke 6 layanan (Listrik, PDAM, Internet, Seminar, SPP, Pulsa)
- Promo banner
- Transaksi terakhir (dari localStorage)

### 2. Bayar Tagihan
- 4 kategori: Listrik/PLN, PDAM, Internet, Seminar/Event
- Form cek tagihan dengan validasi input
- Detail tagihan (nama, alamat, periode, total, jatuh tempo)
- 3 metode pembayaran:
  - **Virtual Account** — generate nomor VA unik + instruksi transfer bank (BCA, BNI, Mandiri, BRI, BSI)
  - **QRIS** — QR code (qrcode.js) + countdown timer 5 menit
  - **Bayar di Teller/Kasir** — kode pembayaran + daftar lokasi kantor
- Loading state spinner (simulasi 800-1500ms)
- Struk pembayaran + unduh PDF (jsPDF)

### 3. Biaya Kuliah / SPP
- Input NIM → tampil tabel cicilan semester (6-8 item)
- Checkbox multi-pilih cicilan + hitung total otomatis
- Input kode tagihan → detail tagihan (nama, deskripsi, semester, status)
- Bayar cicilan + update status lunas

### 4. Isi Pulsa & Paket Data
- 6 provider: Telkomsel, XL Axiata, Indosat, Tri, Smartfren, Axis
- Input nomor HP + deteksi provider otomatis dari prefix
- Pilihan nominal: Rp 10.000 - Rp 200.000
- Preview detail sebelum bayar

### 5. Riwayat Transaksi
- Tabel histori semua transaksi dari localStorage
- Chart pengeluaran per kategori (Chart.js doughnut)
- Hapus semua riwayat

### Fitur Tambahan
- Responsive design (mobile-first, bagus di desktop juga)
- Toast notifikasi (sukses/error)
- Validasi form di semua input
- Navigasi SPA antar halaman
- Cetak struk (window.print + CSS print media query)

## Stack

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| Tailwind CSS (CDN) | Styling |
| Font Awesome 6 | Ikon |
| Inter (Google Fonts) | Tipografi |
| Vanilla JavaScript (ES6+) | Logika aplikasi |
| localStorage | Penyimpanan transaksi |
| qrcode.js (CDN) | Generate QR code QRIS |
| jsPDF (CDN) | Generate PDF struk |
| Chart.js (CDN) | Chart pengeluaran |

## Struktur Folder

```
Bayarin/
├── index.html          Dashboard
├── styles.css          Custom CSS
├── pages/
│   ├── tagihan.html    Bayar Tagihan
│   ├── spp.html        SPP / Cicilan
│   ├── pulsa.html      Isi Pulsa
│   └── riwayat.html    Riwayat Transaksi
├── scripts/
│   ├── app.js          Fungsi umum
│   ├── data.js         Data dummy
│   ├── tagihan.js      Logika tagihan
│   ├── spp.js          Logika SPP
│   ├── pulsa.js        Logika pulsa
│   └── riwayat.js      Logika riwayat
└── docs/
    └── akun-test.md    Data akun untuk testing
```

## Data Test

Lihat [docs/akun-test.md](docs/akun-test.md) untuk daftar nomor pelanggan, NIM, dan nomor HP yang bisa dipakai untuk mencoba aplikasi.

## Screenshot

*TODO: tambahkan screenshot tampilan desktop & mobile*

## Link Demo

*TODO: deploy ke GitHub Pages*

## Author

Zhaki Apriyan
