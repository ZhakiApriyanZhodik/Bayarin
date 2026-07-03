// riwayat.js — riwayat transaksi

(function() {

  var daftarEl = document.getElementById('daftar-riwayat');
  var kosongEl = document.getElementById('riwayat-kosong');
  var tombolHapus = document.getElementById('tombol-hapus-semua');

  renderRiwayat();

  function renderRiwayat() {
    var txs = ambilRiwayat();

    if (txs.length === 0) {
      daftarEl.style.display = 'none';
      kosongEl.classList.remove('hidden');
      tombolHapus.classList.add('hidden');
      return;
    }

    kosongEl.classList.add('hidden');
    daftarEl.style.display = 'flex';
    tombolHapus.classList.remove('hidden');

    var html = '';
    txs.forEach(function(tx) {
      var v = visualKategori(tx.kategori);
      var tgl = new Date(tx.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      var jam = new Date(tx.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

      html += '<div class="item-tx">';
      html += '<div class="ikon-tx" style="background:' + v.bg + '"><i class="' + v.icon + '" style="color:' + v.warna + '"></i></div>';
      html += '<div class="info-tx"><span class="nama-tx">' + tx.label + '</span><span class="tanggal-tx">' + tgl + ' ' + jam + '</span></div>';
      html += '<span class="jumlah-tx">-' + formatRp(tx.jumlah) + '</span>';
      html += '</div>';
    });
    daftarEl.innerHTML = html;
  }

  // hapus semua riwayat
  tombolHapus.addEventListener('click', function() {
    if (!confirm('Hapus semua riwayat transaksi?')) return;
    localStorage.removeItem('bayarin_tx');
    renderRiwayat();
    tampilToast('Riwayat berhasil dihapus');
  });

})();
