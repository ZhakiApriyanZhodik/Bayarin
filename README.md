# Bayarin

Aplikasi web untuk simulasi pembayaran tagihan dan isi pulsa. Dibuat menggunakan HTML5, CSS3 (Tailwind), dan JavaScript murni. Semua data disimpan di localStorage, tidak pakai backend.

## Cara Menjalankan

1. Clone repository ini
2. Buka `index.html` di browser

```
git clone https://github.com/ZhakiApriyanZhodik/Bayarin.git
```

Bisa langsung buka file `index.html` atau pakai Live Server di VSCode.

## Fitur

### Dashboard
- Saldo simulasi
- Akses cepat ke semua layanan
- Promo banner
- Transaksi terakhir

### Bayar Tagihan
- Listrik/PLN, PDAM, Internet, Seminar
- Cek tagihan berdasarkan nomor pelanggan
- 3 metode pembayaran:
  - Virtual Account (kode VA + instruksi transfer)
  - QRIS (QR code + countdown 5 menit)
  - Bayar di Teller (kode bayar + lokasi kantor)
- Loading state, struk pembayaran, unduh PDF

### Biaya Kuliah / SPP
- Input NIM untuk lihat cicilan semester
- Tabel cicilan dengan checkbox (bisa pilih beberapa)
- Input kode tagihan untuk lihat detail
- Bayar cicilan langsung

### Isi Pulsa
- 6 provider (Telkomsel, XL, Indosat, Tri, Smartfren, Axis)
- Deteksi provider otomatis dari nomor HP
- Pilih nominal, preview, lalu bayar

### Riwayat Transaksi
- List semua transaksi
- Chart pengeluaran per kategori (Chart.js)
- Hapus semua riwayat

## Teknologi yang Dipakai

| Teknologi | Fungsi |
|---|---|
| HTML5 | Struktur halaman |
| Tailwind CSS (CDN) | Styling |
| Font Awesome 6 | Ikon |
| Google Fonts (Inter) | Font |
| Vanilla JavaScript | Logika aplikasi |
| localStorage | Simpan transaksi |
| qrcode.js | Generate QR code QRIS |
| jsPDF | Unduh struk PDF |
| Chart.js | Chart pengeluaran |

## Struktur Folder

```
Bayarin/
├── index.html
├── styles.css
├── pages/
│   ├── tagihan.html
│   ├── spp.html
│   ├── pulsa.html
│   └── riwayat.html
├── scripts/
│   ├── app.js
│   ├── data.js
│   ├── tagihan.js
│   ├── spp.js
│   ├── pulsa.js
│   └── riwayat.js
└── docs/
    └── akun-test.md
```

## Data untuk Testing

Lihat file [docs/akun-test.md](docs/akun-test.md) untuk daftar nomor pelanggan, NIM, kode tagihan, dan nomor HP yang bisa dipakai coba aplikasi.

Link Youtube : https://www.youtube.com/watch?v=skprqf57aC8
Link demo web : https://zhakiapriyanzhodik.github.io/Bayarin/index.html
Link data data : https://github.com/ZhakiApriyanZhodik/Bayarin/blob/main/docs/akun-test.md


## Penjelasan

Aplikasi ini simulasi saja, tidak ada uang sungguhan. Semua transaksi hanya disimpan di browser (localStorage). Untuk menghapus data, bisa klik tombol "Hapus Semua" di halaman Riwayat.
