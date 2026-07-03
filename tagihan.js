// tagihan.js — form cek tagihan + tampil hasil

(function() {

  var kategoriInfo = {
    pln:      { judul: 'Listrik / PLN', sub: 'Bayar tagihan listrik PLN', icon: 'fa-solid fa-bolt',          iconBg: 'bg-green-50',  iconWarna: 'text-green-700',  label: 'Nomor Meter / ID Pelanggan', placeholder: '123456789012', min: 12, max: 12, pola: /^\d+$/ },
    pdam:     { judul: 'PDAM',          sub: 'Bayar tagihan air bersih', icon: 'fa-solid fa-droplet',       iconBg: 'bg-blue-50',   iconWarna: 'text-blue-700',   label: 'Nomor Pelanggan PDAM',     placeholder: 'PDAM001234',  min: 8,  max: 12, pola: /^[A-Za-z0-9]+$/ },
    internet: { judul: 'Internet',      sub: 'Bayar tagihan internet',   icon: 'fa-solid fa-wifi',          iconBg: 'bg-purple-50', iconWarna: 'text-purple-700', label: 'Nomor Pelanggan Internet', placeholder: 'INT9876543210', min: 10, max: 14, pola: /^[A-Za-z0-9]+$/ },
    seminar:  { judul: 'Seminar',       sub: 'Bayar tiket seminar',      icon: 'fa-solid fa-graduation-cap', iconBg: 'bg-orange-50', iconWarna: 'text-orange-700', label: 'Kode Referensi',           placeholder: 'SEM2026001',  min: 6,  max: 14, pola: /^[A-Za-z0-9]+$/ }
  };

  var katAktif = null;
  var tagihanAktif = null;

  // ambil kategori dari URL
  var params = new URLSearchParams(window.location.search);
  var katDariUrl = params.get('kat');

  // === DOM ===
  var bagKategori = document.getElementById('bagian-kategori');
  var bagForm = document.getElementById('bagian-form');
  var bagHasil = document.getElementById('bagian-hasil');
  var bagDetailMetode = document.getElementById('bagian-detail-metode');
  var bagLoading = document.getElementById('bagian-loading');
  var bagSukses = document.getElementById('bagian-sukses');

  // tombol kategori
  var tombolKat = document.querySelectorAll('.kartu-kategori');
  for (var i = 0; i < tombolKat.length; i++) {
    tombolKat[i].addEventListener('click', function() {
      bukaForm(this.getAttribute('data-kat'));
    });
  }

  // tombol navigasi
  document.getElementById('tombol-kembali-kat').addEventListener('click', function() {
    tampilBagian('kategori');
  });
  document.getElementById('tombol-kembali-form').addEventListener('click', function() {
    tampilBagian('form');
  });
  document.getElementById('tombol-kembali-hasil').addEventListener('click', function() {
    tampilBagian('hasil');
  });

  // tombol cek
  document.getElementById('tombol-cek').addEventListener('click', cekTagihan);

  // tombol bayar
  document.getElementById('tombol-bayar').addEventListener('click', prosesBayar);

  // tombol konfirmasi
  document.getElementById('tombol-konfirmasi').addEventListener('click', konfirmasiBayar);

  // tombol PDF
  document.getElementById('tombol-pdf').addEventListener('click', function() {
    unduhPDF();
  });

  // enter di input
  document.getElementById('input-tagihan').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') cekTagihan();
  });

  // === FUNGSI ===

  function tampilBagian(nama) {
    bagKategori.classList.add('hidden');
    bagForm.classList.add('hidden');
    bagHasil.classList.add('hidden');
    bagDetailMetode.classList.add('hidden');
    bagLoading.classList.add('hidden');
    bagSukses.classList.add('hidden');

    if (nama === 'kategori') bagKategori.classList.remove('hidden');
    if (nama === 'form') bagForm.classList.remove('hidden');
    if (nama === 'hasil') bagHasil.classList.remove('hidden');
    if (nama === 'detail') bagDetailMetode.classList.remove('hidden');
    if (nama === 'loading') bagLoading.classList.remove('hidden');
    if (nama === 'sukses') bagSukses.classList.remove('hidden');

    window.scrollTo(0, 0);
  }

  function bukaForm(kat) {
    katAktif = kat;
    var info = kategoriInfo[kat];

    document.getElementById('ikon-form').className = 'w-10 h-10 rounded-lg flex items-center justify-center ' + info.iconBg;
    document.getElementById('ikon-form').innerHTML = '<i class="' + info.icon + ' ' + info.iconWarna + '"></i>';
    document.getElementById('judul-form').textContent = info.judul;
    document.getElementById('subjudul-form').textContent = info.sub;
    document.getElementById('label-input').textContent = info.label;
    document.getElementById('input-tagihan').value = '';
    document.getElementById('input-tagihan').placeholder = info.placeholder;
    document.getElementById('error-tagihan').classList.add('hidden');

    tampilBagian('form');
    document.getElementById('input-tagihan').focus();
  }

  function cekTagihan() {
    var input = document.getElementById('input-tagihan').value.trim();
    var errEl = document.getElementById('error-tagihan');
    var info = kategoriInfo[katAktif];

    if (!input) { showError(errEl, 'Nomor tidak boleh kosong'); return; }
    if (input.length < info.min || input.length > info.max) {
      showError(errEl, 'Harus ' + info.min + '-' + info.max + ' karakter'); return;
    }
    if (!info.pola.test(input)) { showError(errEl, 'Format nomor tidak valid'); return; }

    var data = billData[katAktif] ? billData[katAktif][input] : null;
    if (!data) { showError(errEl, 'Nomor pelanggan tidak ditemukan'); return; }

    errEl.classList.add('hidden');
    tagihanAktif = { data: data, id: input, kategori: katAktif };

    // render detail
    var total = data.jumlah + (data.admin || 0);
    var html = '';
    if (data.nama) html += barisDetail('Nama Pelanggan', data.nama);
    if (data.alamat) html += barisDetail('Alamat', data.alamat);
    if (data.provider) html += barisDetail('Provider', data.provider);
    if (data.paket) html += barisDetail('Paket', data.paket);
    if (data.penyelenggara) html += barisDetail('Penyelenggara', data.penyelenggara);
    if (data.periode) html += barisDetail('Periode', data.periode);
    if (data.tanggal) html += barisDetail('Tanggal Event', data.tanggal);
    html += barisDetail('Tagihan Pokok', formatRp(data.jumlah));
    html += barisDetail('Biaya Admin', formatRp(data.admin || 0));
    html += '<div class="garis-detail"></div>';
    html += barisDetail('Total Pembayaran', formatRp(total), true);
    if (data.jatuhTempo) {
      var tgl = new Date(data.jatuhTempo).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      html += barisDetail('Jatuh Tempo', tgl);
    }

    document.getElementById('detail-tagihan').innerHTML = html;

    // reset radio
    var radios = document.querySelectorAll('input[name="metode"]');
    for (var i = 0; i < radios.length; i++) radios[i].checked = false;
    document.getElementById('error-metode').classList.add('hidden');

    tampilBagian('hasil');
  }

  function prosesBayar() {
    var metode = document.querySelector('input[name="metode"]:checked');
    var errEl = document.getElementById('error-metode');
    if (!metode) { errEl.classList.remove('hidden'); return; }
    errEl.classList.add('hidden');

    var nilai = metode.value;
    var total = tagihanAktif.data.jumlah + (tagihanAktif.data.admin || 0);
    var konten = document.getElementById('isi-detail-metode');

    if (nilai === 'va') {
      var kode = buatKodeVA();
      var bankList = ['BCA', 'BNI', 'Mandiri', 'BRI', 'BSI'];
      var html = '<div class="text-center w-full">';
      html += '<div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-building-columns text-blue-600 text-lg"></i></div>';
      html += '<h3 class="text-base font-semibold mb-1">Virtual Account</h3>';
      html += '<p class="text-xs text-gray-500 mb-4">Transfer ke nomor VA berikut</p>';
      html += '<div class="kode-va">' + kode + '</div>';
      html += '<p class="text-xs text-gray-400 mt-2">Bayarin Payment Gateway</p>';
      html += '<div class="mt-4 text-left bg-gray-50 rounded-xl p-4 text-sm">';
      html += '<p class="font-medium mb-2">Instruksi Transfer:</p>';
      html += '<ol class="list-decimal list-inside space-y-1 text-gray-600 text-xs">';
      html += '<li>Buka aplikasi mobile banking / internet banking</li>';
      html += '<li>Pilih menu Transfer > Virtual Account</li>';
      html += '<li>Masukkan nomor VA: <strong>' + kode + '</strong></li>';
      html += '<li>Pilih bank tujuan</li>';
      html += '<li>Konfirmasi jumlah: <strong>' + formatRp(total) + '</strong></li>';
      html += '<li>Selesaikan transfer</li>';
      html += '</ol></div>';
      html += '<div class="mt-3 flex flex-wrap gap-2 justify-center">';
      bankList.forEach(function(b) { html += '<span class="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">' + b + '</span>'; });
      html += '</div></div>';
      konten.innerHTML = html;

    } else if (nilai === 'qris') {
      var html = '<div class="text-center w-full">';
      html += '<div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-qrcode text-indigo-600 text-lg"></i></div>';
      html += '<h3 class="text-base font-semibold mb-1">QRIS</h3>';
      html += '<p class="text-xs text-gray-500 mb-4">Scan QR code di bawah ini</p>';
      html += '<canvas id="canvas-qr" class="mx-auto"></canvas>';
      html += '<p class="text-sm font-semibold mt-3">' + formatRp(total) + '</p>';
      html += '<div class="mt-2"><span class="countdown" id="countdown-qr">05:00</span></div>';
      html += '<p class="text-xs text-gray-400 mt-1">QR code berlaku 5 menit</p>';
      html += '</div>';
      konten.innerHTML = html;

      // generate QR
      setTimeout(function() {
        var canvas = document.getElementById('canvas-qr');
        if (canvas && window.QRCode) {
          QRCode.toCanvas(canvas, 'BAYARIN:' + tagihanAktif.id + ':' + total, {
            width: 180,
            margin: 2,
            color: { dark: '#004643', light: '#ffffff' }
          });
        }
      }, 100);

      // countdown 5 menit
      var detik = 300;
      var el = document.getElementById('countdown-qr');
      var timer = setInterval(function() {
        detik--;
        var m = Math.floor(detik / 60);
        var s = detik % 60;
        if (el) el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        if (detik <= 0) {
          clearInterval(timer);
          if (el) { el.textContent = 'Kedaluwarsa'; el.style.color = '#E74C3C'; }
        }
      }, 1000);

    } else if (nilai === 'teller') {
      var kodeBayar = buatKodeBayar();
      var lokasi = [
        'Kantor Bayarin Pusat — Jl. Sudirman Kav. 21, Jakarta',
        'Mall Central Park — Lt. 2, Jakarta Barat',
        'Kantor Cabang Bandung — Jl. Dago No. 15, Bandung',
        'Kantor Cabang Surabaya — Jl. Pemuda No. 30, Surabaya'
      ];
      var html = '<div class="text-center w-full">';
      html += '<div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3"><i class="fa-solid fa-store text-amber-600 text-lg"></i></div>';
      html += '<h3 class="text-base font-semibold mb-1">Bayar di Teller</h3>';
      html += '<p class="text-xs text-gray-500 mb-4">Tunjukkan kode ini ke kasir</p>';
      html += '<div class="kode-va" style="letter-spacing:6px">' + kodeBayar + '</div>';
      html += '<p class="text-sm font-semibold mt-3">' + formatRp(total) + '</p>';
      html += '<div class="mt-4 text-left bg-gray-50 rounded-xl p-4 text-sm">';
      html += '<p class="font-medium mb-2">Lokasi Pembayaran:</p>';
      html += '<ul class="space-y-2 text-xs text-gray-600">';
      lokasi.forEach(function(l) { html += '<li class="flex items-start gap-2"><i class="fa-solid fa-location-dot text-brand mt-0.5"></i>' + l + '</li>'; });
      html += '</ul></div></div>';
      konten.innerHTML = html;
    }

    tagihanAktif.metode = nilai;
    tampilBagian('detail');
  }

  function konfirmasiBayar() {
    tampilBagian('loading');

    var delay = 800 + Math.random() * 700;
    setTimeout(function() {
      var total = tagihanAktif.data.jumlah + (tagihanAktif.data.admin || 0);
      var tx = {
        id: 'TX' + Date.now(),
        kategori: tagihanAktif.kategori,
        label: tagihanAktif.data.nama || 'Tagihan',
        jumlah: total,
        metode: tagihanAktif.metode,
        tanggal: new Date().toISOString()
      };
      simpanRiwayat(tx);

      // render struk
      var struk = '';
      struk += barisDetail('No. Transaksi', tx.id);
      struk += barisDetail('Layanan', kategoriInfo[tagihanAktif.kategori].judul);
      struk += barisDetail('Pelanggan', tagihanAktif.data.nama || '-');
      var metodeLabel = tx.metode === 'va' ? 'Virtual Account' : tx.metode === 'qris' ? 'QRIS' : 'Teller/Kasir';
      struk += barisDetail('Metode', metodeLabel);
      struk += barisDetail('Total', formatRp(total), true);
      struk += barisDetail('Waktu', new Date().toLocaleString('id-ID'));
      document.getElementById('kartu-struk').innerHTML = struk;

      tagihanAktif.tx = tx;
      tagihanAktif.total = total;

      tampilBagian('sukses');
      tampilToast('Pembayaran berhasil!', 'sukses');
    }, delay);
  }

  function unduhPDF() {
    var data = [
      ['No. Transaksi', tagihanAktif.tx.id],
      ['Layanan', kategoriInfo[tagihanAktif.kategori].judul],
      ['Pelanggan', tagihanAktif.data.nama || '-'],
      ['Metode', tagihanAktif.tx.metode === 'va' ? 'Virtual Account' : tagihanAktif.tx.metode === 'qris' ? 'QRIS' : 'Teller/Kasir'],
      ['Total', formatRp(tagihanAktif.total)],
      ['Waktu', new Date(tagihanAktif.tx.tanggal).toLocaleString('id-ID')]
    ];
    unduhStrukPDF(tagihanAktif.tx.id, data);
  }

  function buatKodeVA() {
    var kode = '88';
    for (var i = 0; i < 10; i++) kode += Math.floor(Math.random() * 10);
    return kode;
  }

  function buatKodeBayar() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var kode = '';
    for (var i = 0; i < 8; i++) kode += chars.charAt(Math.floor(Math.random() * chars.length));
    return kode;
  }

  // auto buka kategori dari URL
  if (katDariUrl && kategoriInfo[katDariUrl]) {
    bukaForm(katDariUrl);
  }

})();
