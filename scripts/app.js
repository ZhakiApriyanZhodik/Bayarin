// app.js — fungsi umum

var SALDO_KEY = 'bayarin_saldo';
var SALDO_DEFAULT = 2450000;

function ambilSaldo() {
  var s = localStorage.getItem(SALDO_KEY);
  if (s === null) return SALDO_DEFAULT;
  return Number(s);
}

function simpanSaldo(jumlah) {
  localStorage.setItem(SALDO_KEY, jumlah);
  updateTampilSaldo();
}

function kurangiSaldo(jumlah) {
  var s = ambilSaldo();
  if (s < jumlah) return false;
  simpanSaldo(s - jumlah);
  return true;
}

function tambahSaldo(jumlah) {
  simpanSaldo(ambilSaldo() + jumlah);
}

function updateTampilSaldo() {
  var el = document.getElementById('tampil-saldo');
  if (el) el.textContent = formatRp(ambilSaldo());
}

function formatRp(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}

function ambilRiwayat() {
  try { return JSON.parse(localStorage.getItem('bayarin_tx')) || []; }
  catch(e) { return []; }
}

function simpanRiwayat(tx) {
  var list = ambilRiwayat();
  list.unshift(tx);
  localStorage.setItem('bayarin_tx', JSON.stringify(list));
}

function visualKategori(kat) {
  var map = {
    pln:      { bg: '#E8F5E9', icon: 'fa-solid fa-bolt',           warna: '#2E7D32' },
    pdam:     { bg: '#E3F2FD', icon: 'fa-solid fa-droplet',        warna: '#1565C0' },
    internet: { bg: '#F3E5F5', icon: 'fa-solid fa-wifi',           warna: '#7B1FA2' },
    seminar:  { bg: '#FFF3E0', icon: 'fa-solid fa-graduation-cap', warna: '#E65100' },
    spp:      { bg: '#E0F7FA', icon: 'fa-solid fa-building-columns', warna: '#00838F' },
    pulsa:    { bg: '#FCE4EC', icon: 'fa-solid fa-mobile-screen',  warna: '#C62828' }
  };
  return map[kat] || { bg: '#F7F9FA', icon: 'fa-solid fa-receipt', warna: '#718096' };
}

function tampilToast(pesan, tipe) {
  var wadah = document.getElementById('wadah-toast');
  if (!wadah) return;
  var el = document.createElement('div');
  el.className = 'toast' + (tipe === 'sukses' ? ' sukses' : tipe === 'gagal' ? ' gagal' : '');
  el.textContent = pesan;
  wadah.appendChild(el);
  setTimeout(function() { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; }, 2500);
  setTimeout(function() { el.remove(); }, 3000);
}

function barisDetail(label, nilai, tebal) {
  return '<div class="baris-detail">' +
    '<span class="label-detail text-sm">' + label + '</span>' +
    '<span class="nilai-detail text-sm' + (tebal ? ' text-brand font-bold text-base' : '') + '">' + nilai + '</span>' +
  '</div>';
}

function showError(el, pesan) {
  el.textContent = pesan;
  el.classList.remove('hidden');
}

function unduhStrukPDF(judul, data) {
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 70, 67);
  doc.text('BAYARIN', 105, 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Bukti Pembayaran', 105, 28, { align: 'center' });
  doc.setDrawColor(0, 70, 67);
  doc.line(20, 33, 190, 33);
  var y = 45;
  doc.setTextColor(0);
  doc.setFontSize(11);
  data.forEach(function(item) {
    doc.setFont('helvetica', 'normal');
    doc.text(item[0], 25, y);
    doc.setFont('helvetica', 'bold');
    doc.text(item[1], 185, y, { align: 'right' });
    y += 8;
  });
  doc.setDrawColor(200);
  doc.line(20, y + 2, 190, y + 2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text('Dicetak oleh sistem Bayarin', 105, y + 12, { align: 'center' });
  doc.save('Bayarin_' + judul + '.pdf');
}

// update saldo saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  updateTampilSaldo();
});
