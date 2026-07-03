// data.js — data dummy tagihan

var billData = {
  pln: {
    '123456789012': { nama: 'Budi Santoso', alamat: 'Jl. Merdeka No. 10, Jakarta Selatan', periode: 'Juni 2026', jumlah: 245000, admin: 2500, jatuhTempo: '2026-07-15', status: 'belum' },
    '123456789013': { nama: 'Siti Rahayu', alamat: 'Jl. Sudirman No. 25, Bandung', periode: 'Juni 2026', jumlah: 189000, admin: 2500, jatuhTempo: '2026-07-12', status: 'belum' },
    '123456789014': { nama: 'Ahmad Fauzi', alamat: 'Jl. Gatot Subroto No. 8, Surabaya', periode: 'Juni 2026', jumlah: 312000, admin: 2500, jatuhTempo: '2026-07-10', status: 'belum' },
    '123456789015': { nama: 'Dewi Lestari', alamat: 'Jl. Diponegoro No. 33, Yogyakarta', periode: 'Juni 2026', jumlah: 156000, admin: 2500, jatuhTempo: '2026-07-18', status: 'belum' },
    '123456789016': { nama: 'Rizki Pratama', alamat: 'Jl. Ahmad Yani No. 5, Semarang', periode: 'Juni 2026', jumlah: 278000, admin: 2500, jatuhTempo: '2026-07-20', status: 'belum' }
  },
  pdam: {
    'PDAM001234': { nama: 'Budi Santoso', alamat: 'Jl. Merdeka No. 10, Jakarta Selatan', periode: 'Juni 2026', jumlah: 85000, admin: 2000, jatuhTempo: '2026-07-14', status: 'belum' },
    'PDAM001235': { nama: 'Siti Rahayu', alamat: 'Jl. Sudirman No. 25, Bandung', periode: 'Juni 2026', jumlah: 62000, admin: 2000, jatuhTempo: '2026-07-16', status: 'belum' },
    'PDAM001236': { nama: 'Ahmad Fauzi', alamat: 'Jl. Gatot Subroto No. 8, Surabaya', periode: 'Juni 2026', jumlah: 94000, admin: 2000, jatuhTempo: '2026-07-11', status: 'belum' }
  },
  internet: {
    'INT9876543210': { nama: 'Budi Santoso', provider: 'IndiHome', paket: '100 Mbps', periode: 'Juni 2026', jumlah: 350000, admin: 2500, jatuhTempo: '2026-07-20', status: 'belum' },
    'INT9876543211': { nama: 'Siti Rahayu', provider: 'Biznet', paket: '75 Mbps', periode: 'Juni 2026', jumlah: 300000, admin: 2500, jatuhTempo: '2026-07-18', status: 'belum' },
    'INT9876543212': { nama: 'Ahmad Fauzi', provider: 'MyRepublic', paket: '50 Mbps', periode: 'Juni 2026', jumlah: 265000, admin: 2500, jatuhTempo: '2026-07-15', status: 'belum' }
  },
  seminar: {
    'SEM2026001': { nama: 'Seminar Nasional AI 2026', penyelenggara: 'Universitas Indonesia', tanggal: '2026-08-15', jumlah: 150000, admin: 5000, jatuhTempo: '2026-08-10', status: 'belum' },
    'SEM2026002': { nama: 'Workshop Blockchain & Web3', penyelenggara: 'ITB Bandung', tanggal: '2026-09-01', jumlah: 200000, admin: 5000, jatuhTempo: '2026-08-25', status: 'belum' },
    'SEM2026003': { nama: 'Tech Conference Jakarta 2026', penyelenggara: 'Kemkominfo', tanggal: '2026-07-28', jumlah: 100000, admin: 5000, jatuhTempo: '2026-07-20', status: 'belum' }
  }
};

var sppData = {
  '202310001': {
    nama: 'Zhaki Apriyan', prodi: 'Teknik Informatika', semester: 'Ganjil 2025/2026',
    cicilan: [
      { id: 1, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-1', jumlah: 2500000, status: 'lunas' },
      { id: 2, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-2', jumlah: 2500000, status: 'lunas' },
      { id: 3, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-3', jumlah: 2500000, status: 'belum' },
      { id: 4, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-4', jumlah: 2500000, status: 'belum' },
      { id: 5, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-1', jumlah: 2500000, status: 'belum' },
      { id: 6, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-2', jumlah: 2500000, status: 'belum' },
      { id: 7, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-3', jumlah: 2500000, status: 'belum' },
      { id: 8, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-4', jumlah: 2500000, status: 'belum' }
    ]
  },
  '202310002': {
    nama: 'Siti Rahayu', prodi: 'Sistem Informasi', semester: 'Ganjil 2025/2026',
    cicilan: [
      { id: 1, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-1', jumlah: 2200000, status: 'lunas' },
      { id: 2, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-2', jumlah: 2200000, status: 'lunas' },
      { id: 3, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-3', jumlah: 2200000, status: 'lunas' },
      { id: 4, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-4', jumlah: 2200000, status: 'belum' },
      { id: 5, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-1', jumlah: 2200000, status: 'belum' },
      { id: 6, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-2', jumlah: 2200000, status: 'belum' }
    ]
  },
  '202310003': {
    nama: 'Ahmad Fauzi', prodi: 'Teknik Komputer', semester: 'Ganjil 2025/2026',
    cicilan: [
      { id: 1, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-1', jumlah: 2800000, status: 'lunas' },
      { id: 2, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-2', jumlah: 2800000, status: 'belum' },
      { id: 3, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-3', jumlah: 2800000, status: 'belum' },
      { id: 4, desc: 'SPP Semester Ganjil 2025/2026 - Cicilan ke-4', jumlah: 2800000, status: 'belum' },
      { id: 5, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-1', jumlah: 2800000, status: 'belum' },
      { id: 6, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-2', jumlah: 2800000, status: 'belum' },
      { id: 7, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-3', jumlah: 2800000, status: 'belum' },
      { id: 8, desc: 'SPP Semester Genap 2025/2026 - Cicilan ke-4', jumlah: 2800000, status: 'belum' }
    ]
  }
};

// kode tagihan (fitur khusus no tagihan)
var kodeTagihanData = {
  '986248962486438': { nama: 'Zhaki Apriyan', desc: 'Tagihan UTS', semester: '20252', status: 'belum', jumlah: 500000 },
  '986248962486439': { nama: 'Siti Rahayu', desc: 'Tagihan UAS', semester: '20252', status: 'belum', jumlah: 750000 },
  '986248962486440': { nama: 'Ahmad Fauzi', desc: 'Tagihan Praktikum', semester: '20251', status: 'lunas', jumlah: 300000 }
};

var pulsaProvider = [
  { id: 'telkomsel', nama: 'Telkomsel', prefix: ['0811','0812','0813','0821','0822','0852','0853'] },
  { id: 'xl', nama: 'XL Axiata', prefix: ['0817','0818','0819','0859','0877','0878'] },
  { id: 'indosat', nama: 'Indosat', prefix: ['0814','0815','0816','0855','0856','0857','0858'] },
  { id: 'tri', nama: 'Tri', prefix: ['0895','0896','0897','0898','0899'] },
  { id: 'smartfren', nama: 'Smartfren', prefix: ['0881','0882','0883','0884','0885','0886','0887','0888','0889'] },
  { id: 'axis', nama: 'Axis', prefix: ['0831','0832','0833','0838'] }
];

var pulsaNominal = [10000, 25000, 50000, 100000, 200000];

function deteksiProvider(noHp) {
  var prefix = noHp.substring(0, 4);
  for (var i = 0; i < pulsaProvider.length; i++) {
    for (var j = 0; j < pulsaProvider[i].prefix.length; j++) {
      if (prefix === pulsaProvider[i].prefix[j]) return pulsaProvider[i];
    }
  }
  return null;
}
