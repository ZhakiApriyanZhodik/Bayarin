// riwayat.js — riwayat transaksi

(function() {

  var daftarEl = document.getElementById('daftar-riwayat');
  var kosongEl = document.getElementById('riwayat-kosong');
  var tombolHapus = document.getElementById('tombol-hapus-semua');
  var filterAktif = 'semua';

  // tambah filter bar
  var bagianChart = document.getElementById('bagian-chart');
  var filterHtml = '<div class="flex gap-2 overflow-x-auto pb-1" id="filter-bar">';
  var filters = [
    { id: 'semua', label: 'Semua' },
    { id: 'pln', label: 'Listrik' },
    { id: 'pdam', label: 'PDAM' },
    { id: 'internet', label: 'Internet' },
    { id: 'seminar', label: 'Seminar' },
    { id: 'spp', label: 'SPP' },
    { id: 'pulsa', label: 'Pulsa' }
  ];
  filters.forEach(function(f) {
    var aktif = f.id === filterAktif;
    filterHtml += '<button data-filter="' + f.id + '" class="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition ' + (aktif ? 'bg-brand text-white border-brand' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-light') + '">' + f.label + '</button>';
  });
  filterHtml += '</div>';

  // sisipkan filter sebelum chart
  bagianChart.insertAdjacentHTML('beforebegin', filterHtml);

  var filterBar = document.getElementById('filter-bar');

  renderRiwayat();

  function renderRiwayat() {
    var txs = ambilRiwayat();

    // filter
    if (filterAktif !== 'semua') {
      txs = txs.filter(function(tx) { return tx.kategori === filterAktif; });
    }

    if (txs.length === 0) {
      daftarEl.style.display = 'none';
      kosongEl.classList.remove('hidden');
      if (ambilRiwayat().length > 0) tombolHapus.classList.remove('hidden');
      else tombolHapus.classList.add('hidden');
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

    renderChart(ambilRiwayat());
  }

  // event filter
  filterBar.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-filter]');
    if (!btn) return;
    filterAktif = btn.getAttribute('data-filter');

    // update tombol
    var allBtns = filterBar.querySelectorAll('button');
    for (var i = 0; i < allBtns.length; i++) {
      var b = allBtns[i];
      if (b.getAttribute('data-filter') === filterAktif) {
        b.className = 'whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition bg-brand text-white border-brand';
      } else {
        b.className = 'whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition bg-white text-gray-500 border-gray-200 hover:border-brand-light';
      }
    }

    renderRiwayat();
  });

  // hapus semua
  tombolHapus.addEventListener('click', function() {
    if (!confirm('Hapus semua riwayat transaksi?')) return;
    localStorage.removeItem('bayarin_tx');
    renderRiwayat();
    tampilToast('Riwayat berhasil dihapus');
  });

  // chart pengeluaran per kategori
  function renderChart(txs) {
    var perKat = {};
    txs.forEach(function(tx) {
      if (!perKat[tx.kategori]) perKat[tx.kategori] = 0;
      perKat[tx.kategori] += tx.jumlah;
    });

    var labels = [], data = [], colors = [];
    var warnaMap = { pln: '#2E7D32', pdam: '#1565C0', internet: '#7B1FA2', seminar: '#E65100', spp: '#00838F', pulsa: '#C62828' };
    var namaMap = { pln: 'Listrik', pdam: 'PDAM', internet: 'Internet', seminar: 'Seminar', spp: 'SPP', pulsa: 'Pulsa' };

    Object.keys(perKat).forEach(function(kat) {
      labels.push(namaMap[kat] || kat);
      data.push(perKat[kat]);
      colors.push(warnaMap[kat] || '#718096');
    });

    var bagianChart = document.getElementById('bagian-chart');

    if (data.length === 0) {
      bagianChart.classList.add('hidden');
      return;
    }

    bagianChart.classList.remove('hidden');

    if (window._chartBayarin) window._chartBayarin.destroy();

    window._chartBayarin = new Chart(document.getElementById('chart-pengeluaran').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{ data: data, backgroundColor: colors, borderWidth: 0 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12, padding: 10,
              font: { family: 'Inter', size: 11 },
              generateLabels: function(chart) {
                var ds = chart.data.datasets[0];
                return chart.data.labels.map(function(label, i) {
                  return { text: label + ' (' + formatRp(ds.data[i]) + ')', fillStyle: ds.backgroundColor[i], hidden: false, index: i };
                });
              }
            }
          },
          tooltip: {
            callbacks: { label: function(ctx) { return ctx.label + ': ' + formatRp(ctx.raw); } }
          }
        }
      }
    });
  }

})();
