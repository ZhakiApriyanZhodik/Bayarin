// app.js — fungsi umum

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
